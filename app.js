const express = require("express");
const morgan = require("morgan");

const app = express();

/** middleware */
app.use(express.json());

// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );

app.use(morgan("tiny"))

/** routes */
const taskRoute = require("./routes/taskRoute");

app.use("/api/v1", taskRoute);

module.exports = app;
