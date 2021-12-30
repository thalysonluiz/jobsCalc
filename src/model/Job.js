const Database = require("../db/config");

// let data = [
//   {
//     id: 1,
//     name: "Pizzaria Guloso",
//     "daily-hours": 2,
//     "total-hours": 60,
//     created_at: Date.now(),
//     remaining_hours: 3,
//   },
//   {
//     id: 2,
//     name: "OneTwo Project",
//     "daily-hours": 3,
//     "total-hours": 2,
//     created_at: Date.now(),
//     remaining_hours: 3,
//   },
// ];

module.exports = {
  async get() {
    const db = await Database();

    const data = await db.all(`SELECT * FROM jobs`);

    await db.close();

    return data.map((job) => {
      return {
        id: job.id,
        name: job.name,
        "daily-hours": job.daily_hours,
        "total-hours": job.total_hours,
        created_at: job.created_at,
      };
    });
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
