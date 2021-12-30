const Database = require("../db/config");

let data = [
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
    name: "OneTwo Project",
    "daily-hours": 3,
    "total-hours": 2,
    created_at: Date.now(),
    remaining_hours: 3,
  },
];

module.exports = {
  get() {
    return data;
  },
  update(newData) {
    data = newData;
  },
  delete(id) {
    data = data.filter((job) => Number(job.id) !== Number(id));
  },
  create(newJob) {
    data.push(newJob);
  },
};
