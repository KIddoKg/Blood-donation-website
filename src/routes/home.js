const express = require("express");
import homeController from "../controller/homeController";
import auth from "../configs/auth";

let router = express.Router();

const initHomepage = (app) => {
  // Get page
  router.get("/", auth.isAuth, homeController.getHomepage);
  router.get("/nutri", auth.isAuth, homeController.Nutripage);
  router.get("/login", auth.isAuth, homeController.ShowLogin);
  router.get("/signup", auth.isAuth, homeController.Signup);
  router.get("/forgotPass", homeController.getForgot);
  router.get("/resetPass", homeController.getReset);

  // Post new donor
  router.post("/signup", homeController.Register);

  // Email Activate Handle
  router.get("/activate/:token", homeController.activateHandle);

  // Post login donor
  router.post("/login", homeController.Login);

  router.post("/forgotPass", homeController.forgotPassword);

  return app.use("/", router);
};

module.exports = initHomepage;
