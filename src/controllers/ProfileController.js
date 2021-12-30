const Profile = require("../model/Profile");

module.exports = {
  async index(req, res) {
    return res.render("profile", { profile: await Profile.get() });
  },

  async update(req, res) {
    const data = req.body;
    const profile = await Profile.get();

    const weeksPerYear = 52;

    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"];
    const monthlyTotalHours = weeksPerMonth * weekTotalHours;

    const valueHour = data["monthly-budget"] / monthlyTotalHours;

    await Profile.update({
      ...profile,
      ...data,
      "value-hour": valueHour,
    });
    //console.log(Profile.data);

    return res.redirect("/profile");
  },
};
