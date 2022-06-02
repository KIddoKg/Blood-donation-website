const express = require("express");
import hospitalController from "../controller/hospitalController";

let router = express.Router();

const initHospitalpage = (app) => {
  router.get("/", hospitalController.getHomepage);
  router.get("/ordering", hospitalController.Ordering);
  router.get("/historyOrder", hospitalController.HistoryOrder);

  return app.use("/hospital", router);
};

module.exports = initHospitalpage;
