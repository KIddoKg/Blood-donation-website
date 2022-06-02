const express = require("express");
import donorController from "../controller/donorController";

let router = express.Router();

const initDonorpage = (app) => {
  router.get("/", donorController.HomepageDonor);
  router.get("/nutri", donorController.Nutripage);
  router.get("/appointment", donorController.Appointment);
  router.get("/information", donorController.Information);
  router.get("/updateDonor", donorController.UpdateDonor);

  return app.use("/donor", router);
};

module.exports = initDonorpage;
