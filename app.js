const express = require("express");

const app = express();

/** middleware */
app.use(express.json());

// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );

/** routes */
const taskRoute = require("./routes/taskRoute");

app.use("/api/v1", taskRoute);

module.exports = app;
