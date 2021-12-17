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
    "value-per-hour": 75,
  },
  controllers: {
    index(req, res) {
      return res.render(views + "profile", { profile: Profile.data });
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
      budget: 4500,
      remaining_hours: 3,
    },
    {
      id: 2,
      name: "OneTwo Project2",
      "daily-hours": 3,
      "total-hours": 2,
      created_at: Date.now(),
      budget: 4500,
      remaining_hours: 3,
    },
  ],
  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map((job) => {
        const remaining = remainingDays(job);
        const status = remaining <= 0 ? "done" : "progress";

        return {
          ...job,
          remaining,
          status,
          budget: Profile.data["value-per-hour"] * job["total-hours"],
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
  },
};

function remainingDays(job) {
  const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
  const date = new Date(job.created_at);
  const dueDay = date.getDate() + Number(remainingDays);
  const dueDateInMs = date.setDate(dueDay);

  const timeDiffInMs = dueDateInMs - Date.now();

  const dayInMs = 1000 * 60 * 60 * 24;
  const dayDiff = Math.round(timeDiffInMs / dayInMs);

  return dayDiff;
}

routes.get("/", Job.controllers.index);

routes.get("/job", (req, res) => res.render(views + "job"));
routes.post("/job", Job.controllers.create);

routes.get("/job/edit", (req, res) => res.render(views + "job-edit"));
routes.get("/profile", Profile.controllers.index);

routes.get("/index", (req, res) => {
  return res.redirect("/");
});

module.exports = routes;
