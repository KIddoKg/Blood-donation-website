const express = require("express");
import donorController from "../controller/donorController";

let router = express.Router();

const initDonorpage = (app) => {
  router.get("/", donorController.HomepageDonor);
  router.get("/showdonate", donorController.Showdonate);
  router.get("/appointment", donorController.Appointment);
  router.get("/information", donorController.Information);

  router.post("/information/update", donorController.Updatepage);
  router.get("/information/update", donorController.Updatepagefill);

  return app.use("/donor", router);
};

module.exports = initDonorpage;
