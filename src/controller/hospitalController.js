import connection from "../configs/connectDB";

let getHomepage = (req, res) => {
  return res.render("home_hospital.ejs");
};

function format(date) {
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return day + "/" + month + "/" + year;
}

let Searching = (req, res) => {
  var product_type = req.query.producttype;
  var blood_type = req.query.bloodtype;
  var volume = req.query.volume;

  var sqlSearch =
    "select * from BloodStock where product_type = ? and blood_type = ? and volume = ? and is_ordered = 0;";

  connection.query(
    sqlSearch,
    [product_type, blood_type, volume],
    (err, result) => {
      if (err) {
        console.log(err);
      }

      // Convert full date string to "dd/mm/yyyy" format
      const input = [];
      // const expiry = [];
      for (var i = 0; i < result.length; i++) {
        input[i] = format(result[i].input_date);
        // expiry[i] = format(result[i].exp_date);
      }
      res.render("orderBlood.ejs", {
        orderBlood: result,
        input_date: input,
        // exp_date: expiry,
        layout: "./layouts/authentication",
      });
    }
  );
};

let Ordering = (req, res) => {
  var hid = "H0001";
  var order_date = new Date();

  var sqlOrder = "insert into Ordering(hid, bid, order_date) values (?, ?, ?);";
  var sqlUpdate = "update BloodStock set is_ordered = 1 where bid = ?;";

  const { orderedBs } = req.body;
  if (typeof orderedBs === "string") {
    connection.query(sqlOrder, [hid, orderedBs, order_date], (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log("insert successfully");
    });
    connection.query(sqlUpdate, orderedBs, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log("update successfully");
    });
  } else {
    Object.values(orderedBs).forEach((bid) => {
      connection.query(sqlOrder, [hid, bid, order_date], (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log("insert successfully");
      });
      connection.query(sqlUpdate, [bid], (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log("update successfully");
      });
    });
  }
};

let HistoryOrder = (req, res) => {
  var product_type = req.query.producttype;
  var blood_type = req.query.bloodtype;
  var volume = req.query.volume;

  var sqlSearch =
    "select * from BloodStock where product_type = ? and blood_type = ? and volume = ? and is_ordered = 0;";

  connection.query(
    sqlSearch,
    [product_type, blood_type, volume],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);

      // Convert full date string to "dd/mm/yyyy" format
      const input = [];
      // const expiry = [];
      for (var i = 0; i < result.length; i++) {
        input[i] = format(result[i].input_date);
        // expiry[i] = format(result[i].exp_date);
      }
      res.render("orderBlood.ejs", {
        orderBlood: result,
        input_date: input,
        // exp_date: expiry,
        layout: "./layouts/authentication",
      });
    }
  );
  return res.render("history_hospital.ejs");
};

module.exports = {
  getHomepage,
  Searching,
  Ordering,
  HistoryOrder,
};
