const express = require("express");
import donorController from "../controller/donorController";
import auth from "../configs/auth";

let router = express.Router();

const initDonorpage = (app) => {
  router.get("/", auth.loggedin, donorController.HomepageDonor);
  router.get("/nutri", auth.loggedin, donorController.Nutripage);
  router.get("/appointment", auth.loggedin, donorController.Appointment);
  router.get("/information", auth.loggedin, donorController.Information);
  // router.get("/updateDonor", auth.loggedin, donorController.UpdateDonor);
  // router.get("/", donorController.HomepageDonor);
  router.get("/showdonate", donorController.Showdonate);

  // router.get("/appointment", donorController.Appointment);
  router.post("/appointment", donorController.Appointmentpost);
  // router.get("/information", donorController.Information);

  router.post("/information/update", donorController.Updatepage);
  router.get("/information/update", donorController.Updatepagefill);
  router.get("/information/avatar", donorController.Updateavatar);
  router.post("/information/avatar", donorController.Posteavatar);

  router.get("/logout", auth.loggedin, donorController.Logout);
  return app.use("/donor", router);
};

module.exports = initDonorpage;
