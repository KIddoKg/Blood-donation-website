const express = require("express");
const app = express();


app.get('/', (req, res) => {
    return res.send('Hello Group 3');
})

const port = 3000;
app.listen(port , () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
