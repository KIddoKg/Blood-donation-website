const express = require("express");
const app = express();

import configViewEngine from "./configs/viewEngine";
import connection from "./configs/connectDB";
import bodyParser from "body-parser";
require("dotenv").config();

import flash from "connect-flash";
import session from "express-session";
import passport from "passport";
import passportLocal from "passport-local";
require("./configs/passport")(passport);

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

// setup session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// setup flash
app.use(flash());

// Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// setup routes
homeRoute(app);
donorRoute(app);
hospitalRoute(app);
staffRoute(app);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
