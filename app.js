const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {Swaggiffy} = require("swaggiffy");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser());

app.use(
  cors({
    // origin: "http://localhost:80",
    origin:"http://localhost:3000",
    credentials: true,
  })
);

// const whitelist = [
//   "http://localhost:80",
//   "http://localhost",
//   "http://localhost:3000",
// ];
// app.use(
//   cors({
//     credentials: true,
//     origin: function (origin, callback) {
//       if (whitelist.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );

/*
app.use((req, res, next) => {
  console.log(req.cookies.votieToken);
  next()
});
*/

app.use(morgan("dev"));
app.use(express.json({ limit: "150mb" }));

/**
 * Defining the routes
 * 
 */

// configure swagger
new Swaggiffy().setupExpress(app).swaggiffy();
module.exports = app;
