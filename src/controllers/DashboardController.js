const Job = require("../model/Job");
const Profile = require("../model/Profile");
const jobUtils = require("../utils/jobUtils");

module.exports = {
  index(req, res) {
    let statusCount = {
      progress: 0,
      done: 0,
      total: Job.get().length,
    };

    let jobTotalHours = 0;
    const updatedJobs = Job.get().map((job) => {
      const remaining = jobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";

      if (status === "progress") {
        jobTotalHours += Number(job["daily-hours"]);
      }

      statusCount[status] += 1;

      return {
        ...job,
        remaining,
        status,
        budget: jobUtils.calculateBudget(job, Profile.get()["value-hour"]),
      };
    });

    const freeHours = Profile.get()["hours-per-day"] - jobTotalHours;

    return res.render("index", {
      jobs: updatedJobs,
      profile: Profile.get(),
      statusCount: statusCount,
      freeHours: freeHours,
    });
  },
};
