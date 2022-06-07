const express = require("express");
import homeController from "../controller/homeController";
import passport from "passport";
import passportLocal from "../configs/passport";

let router = express.Router();

const initHomepage = (app) => {
  // Get page
  router.get("/", homeController.getHomepage);
  router.get("/nutri", homeController.Nutripage);
  router.get("/login", homeController.ShowLogin);
  router.get("/signup", homeController.Signup);

  // Post new donor
  router.post("/signup", homeController.Register);

  // Post login donor
  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
    })
  );

  return app.use("/", router);
};

module.exports = initHomepage;
