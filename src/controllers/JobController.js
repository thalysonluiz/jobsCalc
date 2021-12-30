const Job = require("../model/Job");
const Profile = require("../model/Profile");
const jobUtils = require("../utils/JobUtils");

module.exports = {
  create: (req, res) => res.render("job"),

  store(req, res) {
    const job = req.body;
    const lastId = Job.get()[Job.get().length - 1]?.id || 0;
    job.id = lastId + 1;
    job.created_at = Date.now();

    Job.create(job);
    //console.log(jobs);
    return res.redirect("/");
  },

  show(req, res) {
    const { id } = req.params;

    const job = Job.get().find((job) => Number(job.id) === Number(id));
    if (!job) return res.status(404).send({ message: "Job not found" });

    job.budget = jobUtils.calculateBudget(job, Profile.get()["value-hour"]);
    //console.log(job);
    return res.render("job-edit", { job });
  },

  update(req, res) {
    const { id } = req.params;
    const UpJob = req.body;

    const job = Job.get().find((job) => Number(job.id) === Number(id));
    if (!job) return res.status(404).send({ message: "Job not found" });

    budget = jobUtils.calculateBudget(job, Profile.get()["value-hour"]);

    const updatedJob = {
      ...job,
      ...UpJob,
      budget,
    };

    const newJobs = Job.get().map((job) => {
      if (Number(job.id) === Number(id)) {
        job = updatedJob;
      }

      return job;
    });

    Job.update(newJobs);

    res.redirect("/job/" + id);
  },

  delete(req, res) {
    const { id } = req.params;

    Job.delete(id);

    res.redirect("/");
  },
};
