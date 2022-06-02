const express = require("express");
const app = express();

import configViewEngine from "./configs/viewEngine";
import connection from "./configs/connectDB";
import bodyParser from "body-parser";
require("dotenv").config();

// setup body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// import routes
import homeRoute from "./routes/home";
import donorRoute from "./routes/donor";
import hospitalRoute from "./routes/hospital";
import staffRoute from "./routes/staff";

// app.use(expressLayouts);

// setup view engine
configViewEngine(app);

// setup routes
homeRoute(app);
donorRoute(app);
hospitalRoute(app);
staffRoute(app);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
