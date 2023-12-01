const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/JobPortal")
  .then(() => console.log("Connected!"));

const jobsRoute = require("./routes//jobs");
const authRoute = require("./routes/auth");
const handleServerError = require("./middleware/handleServerError");

app.use(express.json());
app.use(jobsRoute);
app.use(authRoute);

app.get("/", (req, res) => {
  res.send("Job Portal");
});

app.use(handleServerError);

app.listen(8000, () => {
  console.log("Serer Started");
});
