const express = require("express");
const routes = express.Router();

const views = __dirname + "/views/";

const profile = {
  name: "Jakeliny",
  avatar:
    "https://avatars.githubusercontent.com/u/17316392?s=460&u=6912a91a70bc89745a2079fdcdad3bc3ce370f13&v=4",
  "monthly-budget": 3000,
  "hours-per-day": 5,
  "days-per-week": 5,
  "vacation-per-year": 4,
};

const jobs = [];

routes.get("/", (req, res) => res.render(views + "index"));

routes.get("/job", (req, res) => res.render(views + "job"));
routes.post("/job", (req, res) => {
  const job = req.body;
  job.createdAt = Date.now();

  jobs.push(job);
  //console.log(jobs);
  return res.redirect("/");
});

routes.get("/job/edit", (req, res) => res.render(views + "job-edit"));
routes.get("/profile", (req, res) =>
  res.render(views + "profile", { profile })
);

routes.get("/index", (req, res) => {
  return res.redirect("/");
});

module.exports = routes;
