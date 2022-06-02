const express = require("express");
// const expressLayouts = require("express-ejs-layouts");
import configViewEngine from "./configs/viewEngine";

require("dotenv").config();

import homeRoute from "./routes/home";
import donorRoute from "./routes/donor";
import hospitalRoute from "./routes/hospital";
import staffRoute from "./routes/staff";

const app = express();

// app.use(expressLayouts);

// setup view engine
configViewEngine(app);

// set layout
// app.set("layout", "./layouts/main.ejs");

//route home.js
homeRoute(app);
donorRoute(app);
hospitalRoute(app);
staffRoute(app);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
