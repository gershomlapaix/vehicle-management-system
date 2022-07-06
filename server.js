const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();

// database connection

const env = process.env.NODE_ENV || "development";
const DB_URL =
  env === "container"
    ? process.env.DATABASE_URL_CONTAINER
    : process.env.DATABASE_URL_DEV;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully...");
  });

const port = process.env.PORT || 5000;


app.listen(port, () => {
  console.log("Server is up and runnning");
});
