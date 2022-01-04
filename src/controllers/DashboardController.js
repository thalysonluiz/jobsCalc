const Job = require("../model/Job");
const Profile = require("../model/Profile");
const jobUtils = require("../utils/jobUtils");

module.exports = {
  async index(req, res) {
    const profile = await Profile.get();
    const jobs = await Job.get();

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };

    let jobTotalHours = 0;
    const updatedJobs = jobs.map((job) => {
      const remaining = jobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";

      if (status === "progress") {
        jobTotalHours += Number(job["daily-hours"]);
      }

      statusCount[status] += 1;

      // console.log({
      //   ...job,
      //   remaining,
      //   status,
      //   budget: jobUtils.calculateBudget(job, profile["value-hour"]),
      // });

      return {
        ...job,
        remaining,
        status,
        budget: jobUtils.calculateBudget(job, profile["value-hour"]),
      };
    });

    const freeHours = profile["hours-per-day"] - jobTotalHours;

    // console.log({
    //   jobs,
    //   profile,
    //   statusCount,
    //   freeHours,
    // });

    return res.render("index", {
      jobs: updatedJobs,
      profile: profile,
      statusCount: statusCount,
      freeHours: freeHours,
    });
  },
};
