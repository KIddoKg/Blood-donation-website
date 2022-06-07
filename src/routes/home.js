const express = require("express");
import homeController from "../controller/homeController";

let router = express.Router();

const initHomepage = (app) => {
  router.get("/", homeController.getHomepage);

  router.get("/nutri", homeController.Nutripage);
  router.get("/login", homeController.Login);
  router.get("/signup", homeController.Signup);

  return app.use("/", router);
};

module.exports = initHomepage;
