const express = require("express");
import donorController from "../controller/donorController";

let router = express.Router();

const initDonorpage = (app) => {
  router.get("/", donorController.HomepageDonor);
  router.get("/showdonate", donorController.Showdonate);

  router.get("/appointment", donorController.Appointment);
  router.post("/appointment", donorController.Appointmentpost);
  router.get("/information", donorController.Information);

  router.post("/information/update", donorController.Updatepage);
  router.get("/information/update", donorController.Updatepagefill);
  router.get("/information/avatar", donorController.Updateavatar);
  router.post("/information/avatar", donorController.Posteavatar);

  return app.use("/donor", router);
};

module.exports = initDonorpage;
