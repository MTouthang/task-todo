require("dotenv").config();
const app = require("./app");

const connectWithDB = require("./config/db");
connectWithDB();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server up and running at port ${PORT}`);
});
