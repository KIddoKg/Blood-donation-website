const express = require("express");
import donorController from "../controller/donorController";

let router = express.Router();

const initDonorpage = (app) => {
  router.get("/", donorController.HomepageDonor);
  router.get("/appointment", donorController.Appointment);
  router.get("/information", donorController.Information);

  return app.use("/donor", router);
};

module.exports = initDonorpage;
