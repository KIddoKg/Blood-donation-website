const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();

import configViewEngine from "./configs/viewEngine";
import connection from "./configs/connectDB";
import bodyParser from "body-parser";
require("dotenv").config();

//flash
app.use(flash());

//Var
// app.use((req, res, next) =>{
//   res.locals.success_msg = req.flash('success_msg');
//   res.locals.error_msg = req.flash('error_msg');
//   next()
// })

// New Express session
// app.use(session ({
//   secret: 'secret',
//   resave: true,
//   saveUninitialized: true,
// }));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

// setup body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// import routes
import homeRoute from "./routes/home";
import donorRoute from "./routes/donor";
import hospitalRoute from "./routes/hospital";
import staffRoute from "./routes/staff";
import campaignRoute from "./routes/campaign";

// app.use(expressLayouts);

// setup view engine
configViewEngine(app);

// setup routes
homeRoute(app);
donorRoute(app);
hospitalRoute(app);
staffRoute(app);
campaignRoute(app);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// app.get('/addBlood', function(req,res) {
//   return res.render("addBlood.ejs");
//   });

// app.post('/addBlood', function(req, res) {
//   var iddonor = req.body.iddonor;
//   var email = req.body.email;
//   var mno = req.body.mno;
//   connection.connect(function(error){
//        console.log(error);
//        var sql= "INSERT INTO bloodstocks (did) VALUES ?";
//        var values = [
//        [iddonor]
//        ]
//        connection.query(sql, [values ], function(error, result){
//        console.log(error) ;
//        res.send("Data inserted Success full ");
//           })
//   })
// })
