let HomepageDonor = (req, res) => {
  return res.render("home_donor.ejs");
};

let Nutripage = (req, res) => {
  return res.render("nutri.ejs");
};

let Appointment = (req, res) => {
  return res.render("appointment.ejs");
};

let Information = (req, res) => {
  return res.render("information.ejs");
};

let UpdateDonor = (req, res) => {
  return res.render("updateDonor.ejs");
};

module.exports = {
  HomepageDonor,
  Nutripage,
  Appointment,
  Information,
  UpdateDonor,
};
