// const express = require("express");
import connection from "../configs/connectDB";
import bcrypt from "bcryptjs";
import Donor from "../models/donorModels";
// import passport from "passport";

let getHomepage = (req, res) => {
  return res.render("home_main.ejs");
};

let Nutripage = (req, res) => {
  return res.render("nutri.ejs");
};

let ShowLogin = (req, res) => {
  // return res.send("Login");
  return res.render("login.ejs", { layout: "./layouts/authentication" });
};

let Signup = (req, res) => {
  return res.render("Signup.ejs", { layout: "./layouts/authentication" });
};

let Register = (req, res) => {
  const {
    name,
    ssn,
    gender,
    birthday,
    phone,
    email,
    address,
    password,
    pass_confirm,
  } = req.body;

  let errors = [];

  // Check required fields
  if (
    !name ||
    !ssn ||
    !gender ||
    !birthday ||
    !phone ||
    !email ||
    !address ||
    !password ||
    !pass_confirm
  ) {
    errors.push({ msg: "Please fill in all fields" });
  }

  if (password !== pass_confirm) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("signup.ejs", {
      layout: "./layouts/authentication.ejs",
      errors,
      name,
      ssn,
      gender,
      birthday,
      phone,
      email,
      address,
      password,
      pass_confirm,
    });
  } else {
    // Validation passed
    var sql = "SELECT * FROM Donor WHERE email = ?";
    connection.query(sql, [email], function (err, data, fields) {
      if (err) throw err;
      if (data.length > 0) {
        errors.push({ msg: "Email already exists" });
        res.render("signup.ejs", {
          layout: "./layouts/authentication.ejs",
          errors,
          name,
          ssn,
          gender,
          birthday,
          phone,
          email,
          address,
          password,
          pass_confirm,
        });
      } else {
        const newDonor = new Donor({
          name,
          ssn,
          gender,
          birthday,
          phone,
          email,
          address,
          password,
        });
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newDonor.password, salt, (err, hash) => {
            if (err) throw err;
            // Set password to hashed
            newDonor.password = hash;
            var sql =
              "INSERT INTO Donor(name, ssn, gender, birthday, phone, email, address, password) Values (?, ?, ?, ?, ?, ?, ?, ?)";
            var Values = [
              name,
              ssn,
              gender,
              birthday,
              phone,
              email,
              address,
              hash,
            ];
            connection.query(sql, Values, function (err, data) {
              if (err) throw err;
            });
            req.flash("success_msg", "You are now registered and can login");
            res.redirect("/login");
          })
        );
      }
    });
    ///
  }
};

// let Login = (req, res) => {
//   const { email, password } = req.body;
//   let errors = [];
//   if (!email || !password) {
//     errors.push({ msg: "Please fill in all fields" });
//   }
//   if (errors.length > 0) {
//     res.render("login.ejs", {
//       layout: "./layouts/authentication.ejs",
//       errors,
//       email,
//       password,
//     });
//   } else {
//     var sql = "select * from Donor Where email = ?";
//     connection.query(sql, [email], (err, data, fields) => {
//       if (err) throw err;
//       if (!data.length) {
//         console.log(data);
//         errors.push({ msg: "That email is not registered" });
//         res.render("login.ejs", {
//           layout: "./layouts/authentication.ejs",
//           errors,
//           email,
//           password,
//         });
//       } else {
//         var hashedPassword = data[0].password;
//         bcrypt.compare(password, hashedPassword, (error, isMatch) => {
//           if (error) throw error;
//           if (isMatch) {
//             res.redirect("/donor");
//           } else {
//             errors.push({ msg: "Password incorrect" });
//             return res.render("login.ejs", {
//               layout: "./layouts/authentication.ejs",
//               errors,
//               email,
//               password,
//             });
//           }
//         });
//       }
//     });
//   }
// };

let Login = (req, res) => {
  const { email, password } = req.body;
  let errors = [];
  if (!email || !password) {
    errors.push({ msg: "Please fill in all fields" });
  }
  if (errors.length > 0) {
    res.render("login.ejs", {
      layout: "./layouts/authentication.ejs",
      errors,
      email,
      password,
    });
  } else {
    var sql = "select * from Donor Where email = ?";
    connection.query(sql, [email], (err, data, fields) => {
      if (err) throw err;
      if (!data.length) {
        errors.push({ msg: "That email is not registered" });
        res.render("login.ejs", {
          layout: "./layouts/authentication.ejs",
          errors,
          email,
          password,
        });
      } else {
        bcrypt.compare(password, data[0].password, (err, result) => {
          if (result == true) {
            req.session.loggedin = true;
            req.session.data = data;
            res.redirect("/donor");
          } else {
            errors.push({ msg: "Password incorrect" });
            return res.render("login.ejs", {
              layout: "./layouts/authentication.ejs",
              errors,
              email,
              password,
            });
          }
        });
      }
    });
  }
};

module.exports = {
  getHomepage,
  Nutripage,
  ShowLogin,
  Signup,
  Register,
  Login,
};
