const Profile = require("../model/Profile");

module.exports = {
  index(req, res) {
    return res.render("profile", { profile: Profile.get() });
  },

  update(req, res) {
    const data = req.body;

    const weeksPerYear = 52;

    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"];
    const monthlyTotalHours = weeksPerMonth * weekTotalHours;

    const valueHour = data["monthly-budget"] / monthlyTotalHours;

    Profile.update({
      ...Profile.get(),
      ...data,
      "value-hour": valueHour,
    });
    //console.log(Profile.data);

    return res.redirect("/profile");
  },
};
