const express = require("express");
import homeController from "../controller/homeController";
import auth from "../configs/auth";

let router = express.Router();

const initHomepage = (app) => {
  // Get page
  router.get("/", auth.isAuth, homeController.getHomepage);
  router.get("/nutri", auth.isAuth, homeController.Nutripage);

  //------------ Login Route ------------// ---
  router.get("/login", auth.isAuth, homeController.ShowLogin);

  //------------ Forgot Password Route ------------// ---
  router.get("/forgot", homeController.getForgot);

  //------------ Reset Password Route ------------//
  router.get(`/resetPass/:id`, (req, res) => {
    return res.render("pass_reset.ejs", {
      layout: "./layouts/authentication",
      id: req.params.id,
    });
  });

  //------------ Register Route ------------// ---
  router.get("/signup", auth.isAuth, homeController.Signup);

  //------------ Register POST Handle ------------// ---
  router.post("/signup", homeController.Register);

  //------------ Email ACTIVATE Handle ------------// ---
  router.get("/activate/:token", homeController.activateHandle);

  //------------ Forgot Password Handle ------------// ---
  router.post("/forgot", homeController.forgotPassword);

  //------------ Reset Password Handle ------------//
  router.post(`/resetPass/:id`, homeController.resetPassword);

  //------------ Reset Password Handle ------------// ---
  router.get("/forgot/:token", homeController.gotoReset);
  // Post login donor
  router.post("/login", homeController.Login);

  return app.use("/", router);
};

module.exports = initHomepage;
