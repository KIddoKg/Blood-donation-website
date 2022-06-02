let getHomepage = (req, res) => {
  return res.render("home_main.ejs");
};

let Nutripage = (req, res) => {
  return res.render("nutri.ejs");
};

let Login = (req, res) => {
  // return res.send("Login");
  return res.render("login.ejs", { layout: "./layouts/authentication" });
};

let Signup = (req, res) => {
  return res.render("Signup.ejs", { layout: "./layouts/authentication" });
};

module.exports = {
  getHomepage,
  Nutripage,
  Login,
  Signup,
};
