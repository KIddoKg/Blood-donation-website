import { request } from "express";
import { response } from "express";
import connection from "../configs/connectDB";

function format(date) {
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return day + "/" + month + "/" + year;
}

let HomepageDonor = (req, res) => {
  connection.connect(function (error) {
    if (error) console.log(error);
    var sql = "select * from campaign";
    connection.query(sql, function (error, result) {
      if (error) {
        console.log(error);
      }
      const startDate = [];
      const endDate = [];

      for (var i = 0; i < result.length; i++) {
        startDate[i] = format(result[i].start_date);
        endDate[i] = format(result[i].end_date);
      }
      res.render("./home_donor", {
        event: result,
        start_date: startDate,
        end_date: endDate,
      });
    });
  });
};

// let Nutripage = (req, res) => {
//   return res.render("nutri.ejs");
// };

let Appointment = (req, res) => {
  return res.render("appointment.ejs");
};

let Information = (req, res) => {
  var iddonorsea = "D0001";
  connection.connect(function (error) {
    if (error) console.log(error);
    var sql = "SELECT * FROM donor  where did LIKE ?";

    var values = [[iddonorsea]];

    connection.query(sql, [values], function (error, result) {
      if (error) {
        console.log(error);
      }
      const dobDate = [];

      for (var i = 0; i < result.length; i++) {
        dobDate[i] = format(result[i].dob);
        result[i].dob = dobDate[i];
      }

      console.log(iddonorsea);
      // res.render("./addBlood",{donor:result});
      console.log(result);

      res.render("information.ejs", { info: result });
    });
  });
};

let Showdonate = (req, res) => {
  var iddonorsea = "D0001";
  connection.connect(function (error) {
    if (error) console.log(error);
    var sql = "SELECT * FROM bloodstock  where did LIKE ?";

    var values = [[iddonorsea]];

    connection.query(sql, [values], function (error, result) {
      if (error) {
        console.log(error);
      }
      const inputDate = [];

      for (var i = 0; i < result.length; i++) {
        inputDate[i] = format(result[i].input_date);
        result[i].input_date = inputDate[i];
      }

      console.log(iddonorsea);
      // res.render("./addBlood",{donor:result});
      console.log(result);

      res.send(result);
    });
  });
};

let Updatepagefill = (req, res) => {
  var iddonorsea = "D0001";
  connection.connect(function (error) {
    if (error) console.log(error);
    var sql = "SELECT * FROM donor  where did LIKE ?";

    var values = [[iddonorsea]];

    connection.query(sql, [values], function (error, result) {
      if (error) {
        console.log(error);
      }
      const dobDate = [];

      for (var i = 0; i < result.length; i++) {
        dobDate[i] = format(result[i].dob);
        result[i].dob = dobDate[i];
      }

      console.log(iddonorsea);
      // res.render("./addBlood",{donor:result});
      console.log(result);

      res.render("updateDonor.ejs", {
        fill: result,
        layout: "./layouts/authentication",
      });
    });
  });
};
let Updatepage = (req, res) => {
  var username = req.body.username;
  var ssn = req.body.ssn;
  var gender = req.body.gender;

  var dob = req.body.dob;
  var phone = req.body.phone;
  var email = req.body.email;
  var addr = req.body.addr;

  var iddonorup = "D0001";

  connection.connect(function (error) {
    console.log(error);
    var sql =
      "update donor set dname = ?, ssn = ?, gender = ?, dob = ?, phone = ?, email = ?, address = ? where did = ?";

    connection.query(
      sql,
      [username, ssn, gender, dob, phone, email, addr, iddonorup],
      function (error, result) {
        console.log(result);
        console.log(error);
        console.log(username);

        if (error) {
          res.send("ok");
        } else {
          res.send("ok");
        }
      }
    );
  });
};

module.exports = {
  HomepageDonor,
  // Nutripage,
  Appointment,
  Information,
  Showdonate,
  Updatepagefill,
  Updatepage,
};
