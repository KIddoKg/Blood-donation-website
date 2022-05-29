const express = require("express");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello Group 3");
});

const port = process.env.PORT;
//const port = 5000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
