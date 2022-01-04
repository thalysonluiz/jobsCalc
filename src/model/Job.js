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
  async update(newData, id) {
    const db = await Database();

    const data = await db.run(`UPDATE jobs SET
      name = "${newData.name}",
      daily_hours = ${newData["daily-hours"]},
      total_hours = ${newData["total-hours"]}
      WHERE id=${id}
    ;`);

    await db.close();
  },
  async delete(id) {
    const db = await Database();

    const data = await db.run(`DELETE FROM jobs
        WHERE id=${id}
    ;`);

    await db.close();
  },
  async create(newJob) {
    const db = await Database();

    const data = await db.run(`INSERT INTO jobs (
      name,
      daily_hours,
      total_hours,
      created_at
      ) VALUES (
        "${newJob.name}",
        ${newJob["daily-hours"]},
        ${newJob["total-hours"]},
        ${newJob.created_at}
    );`);

    await db.close();
  },
};
