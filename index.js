require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/test", (req, res) => {
  res.send("asd")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
