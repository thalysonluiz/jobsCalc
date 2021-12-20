const express = require("express");
const routes = express.Router();

const views = __dirname + "/views/";

const Profile = {
  data: {
    name: "Jakeliny",
    avatar:
      "https://avatars.githubusercontent.com/u/17316392?s=460&u=6912a91a70bc89745a2079fdcdad3bc3ce370f13&v=4",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 4,
    "value-hour": 75,
  },
  controllers: {
    index(req, res) {
      return res.render(views + "profile", { profile: Profile.data });
    },

    update(req, res) {
      const data = req.body;

      const weeksPerYear = 52;

      const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
      const weekTotalHours = data["hours-per-day"] * data["days-per-week"];
      const monthlyTotalHours = weeksPerMonth * weekTotalHours;

      const valueHour = data["monthly-budget"] / monthlyTotalHours;

      Profile.data = {
        ...Profile.data,
        ...data,
        "value-hour": valueHour,
      };
      //console.log(Profile.data);

      return res.redirect("/profile");
    },
  },
};

const Job = {
  data: [
    {
      id: 1,
      name: "Pizzaria Guloso",
      "daily-hours": 2,
      "total-hours": 60,
      created_at: Date.now(),
      remaining_hours: 3,
    },
    {
      id: 2,
      name: "OneTwo Project2",
      "daily-hours": 3,
      "total-hours": 2,
      created_at: Date.now(),
      remaining_hours: 3,
    },
  ],
  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map((job) => {
        const remaining = Job.services.remainingDays(job);
        const status = remaining <= 0 ? "done" : "progress";

        return {
          ...job,
          remaining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data["value-hour"]),
        };
      });

      return res.render(views + "index", { jobs: updatedJobs });
    },

    create(req, res) {
      const job = req.body;
      const lastId = Job.data[Job.data.length - 1]?.id || 0;
      job.id = lastId + 1;
      job.created_at = Date.now();

      Job.data.push(job);
      //console.log(jobs);
      return res.redirect("/");
    },

    show(req, res) {
      const { id } = req.params;

      const job = Job.data.find((job) => Number(job.id) === Number(id));
      if (!job) return res.status(404).send({ message: "Job not found" });

      job.budget = Job.services.calculateBudget(
        job,
        Profile.data["value-hour"]
      );
      //console.log(job);
      return res.render(views + "job-edit", { job });
    },

    update(req, res) {
      const { id } = req.params;
      const UpJob = req.body;

      const job = Job.data.find((job) => Number(job.id) === Number(id));
      if (!job) return res.status(404).send({ message: "Job not found" });

      budget = Job.services.calculateBudget(job, Profile.data["value-hour"]);

      const updatedJob = {
        ...job,
        ...UpJob,
        budget,
      };

      Job.data = Job.data.map((job) => {
        if (Number(job.id) === Number(id)) {
          job = updatedJob;
        }

        return job;
      });

      res.redirect("/job/" + id);
    },
    delete(req, res) {
      const { id } = req.params;

      Job.data = Job.data.filter((job) => Number(job.id) !== Number(id));

      res.redirect("/");
    },
  },
  services: {
    remainingDays(job) {
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
      const date = new Date(job.created_at);
      const dueDay = date.getDate() + Number(remainingDays);
      const dueDateInMs = date.setDate(dueDay);

      const timeDiffInMs = dueDateInMs - Date.now();

      const dayInMs = 1000 * 60 * 60 * 24;
      const dayDiff = Math.round(timeDiffInMs / dayInMs);

      return dayDiff;
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"],
  },
};

routes.get("/", Job.controllers.index);

routes.get("/job", (req, res) => res.render(views + "job"));
routes.post("/job", Job.controllers.create);

routes.get("/job/:id", Job.controllers.show);
routes.post("/job/:id", Job.controllers.update);
routes.post("/job/delete/:id", Job.controllers.delete);

routes.get("/profile", Profile.controllers.index);
routes.post("/profile", Profile.controllers.update);

routes.get("/index", (req, res) => {
  return res.redirect("/");
});

module.exports = routes;
