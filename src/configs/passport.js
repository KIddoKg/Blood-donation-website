const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
import connection from "../configs/connectDB";
import bcrypt from "bcryptjs";

// Load Donor Model
import Donor from "../models/donorModels";

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Match Donor
      var sql = "SELECT * FROM Donor WHERE email = ?";
      connection.query(sql, [email], (err, data, fields) => {
        if (err) throw err;
        if (!data.length) {
          return done(null, false, { message: "That email is not registered" });
        }

        // Math password
        bcrypt.compare(password, data.password, (err, isMatch) => {
          if (err) throw err;

          if (isMatch) {
            return done(null, data);
          } else {
            return done(null, false, { message: "Password incorrect" });
          }
        });
      });
    })
  );

  passport.serializeUser((data, done) => {
    done(null, data.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.deserializeUser((id, done) => {
    // loginService
    //   .findUserById(id)
    //   .then((user) => {
    //     return done(null, user);
    //   })
    //   .catch((error) => {
    //     return done(error, null);
    //   });
    var sql = "SELECT * FROM Donor WHERE id = ?";
    connection.query(sql, [id], (err, data) => {
      if (err) throw err;
      return done(null, data);
    });
  });
};
