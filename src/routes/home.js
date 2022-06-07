const express = require("express");
import homeController from "../controller/homeController";
import auth from "../configs/auth";

let router = express.Router();

const initHomepage = (app) => {
  // Get page
  router.get("/", auth.isAuth, homeController.getHomepage);
  router.get("/nutri", homeController.Nutripage);
  router.get("/login", auth.isAuth, homeController.ShowLogin);
  router.get("/signup", auth.isAuth, homeController.Signup);

  // Post new donor
  router.post("/signup", homeController.Register);

  // Post login donor
  router.post("/login", homeController.Login);

  return app.use("/", router);
};

module.exports = initHomepage;
