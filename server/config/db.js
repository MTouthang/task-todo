const mongoose = require("mongoose");

const connectWithDB = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log(`Db connected successfully :D`))
    .catch((err) => {
      console.log(`Db connection fail: ${err}`);
    });
};

module.exports = connectWithDB;
