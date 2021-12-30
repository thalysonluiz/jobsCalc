const Job = require("../model/Job");
const Profile = require("../model/Profile");
const jobUtils = require("../utils/JobUtils");

module.exports = {
  create: (req, res) => res.render("job"),

  async store(req, res) {
    const job = req.body;
    const jobs = await Job.get();

    const lastId = jobs[jobs.length - 1]?.id || 0;
    job.id = lastId + 1;
    job.created_at = Date.now();

    Job.create(job);
    //console.log(jobs);
    return res.redirect("/");
  },

  async show(req, res) {
    const { id } = req.params;
    const jobs = await Job.get();
    const profile = await Profile.get();

    const job = jobs.find((job) => Number(job.id) === Number(id));
    if (!job) return res.status(404).send({ message: "Job not found" });

    job.budget = jobUtils.calculateBudget(job, profile["value-hour"]);
    //console.log(job);
    return res.render("job-edit", { job });
  },

  async update(req, res) {
    const { id } = req.params;
    const UpJob = req.body;
    const jobs = await Job.get();
    const profile = await Profile.get();

    const job = jobs.find((job) => Number(job.id) === Number(id));
    if (!job) return res.status(404).send({ message: "Job not found" });

    budget = jobUtils.calculateBudget(job, profile["value-hour"]);

    const updatedJob = {
      ...job,
      ...UpJob,
      budget,
    };

    const newJobs = jobs.map((job) => {
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
