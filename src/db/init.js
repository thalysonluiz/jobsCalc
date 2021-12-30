const Database = require("./config");

const now = Date.now();

const initDb = {
  async init() {
    const db = await Database();

    await db.exec(`CREATE TABLE profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      avatar TEXT,
      monthly_budget INT,
      days_per_week INT,
      hours_per_day INT,
      vacation_per_year INT,
      value_hour INT
    );`);

    await db.exec(`CREATE TABLE jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      daily_hour INT,
      total_hour INT,
      created_at DATETIME
    );`);

    await db.run(`INSERT INTO profile (
      name,
      avatar,
      monthly_budget,
      days_per_week,
      hours_per_day,
      vacation_per_year,
      value_hour
    ) VALUES (
      "Thalyson",
      "https://avatars.githubusercontent.com/u/6808286?v=4",
      3000,
      5,
      6,
      4,
      70
    );`);

    await db.run(`INSERT INTO jobs (
      name,
      daily_hour,
      total_hour,
      created_at
    ) VALUES (
      "Pizzaria Guloso",
      2,
      60,
      ${now}
    );`);

    await db.run(`INSERT INTO jobs (
      name,
      daily_hour,
      total_hour,
      created_at
      ) VALUES (
        "OneTwo Project",
        3,
        2,
        ${now}
    );`);

    await db.close();
  },
};

initDb.init();
