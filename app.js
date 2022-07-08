const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { Swaggiffy } = require("swaggiffy");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser());

/**
 * defining the middlewares
 * */ 
app.use(
  cors({
    // origin: "http://localhost:80",
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json({ limit: "150mb" }));



/**
 * Defining the routes
 *
 */

 app.use("/api/users", require("./routes/authRoutes"));
 app.use("/api/vote", require("./routes/pollingRoutes"));

// configure swagger
new Swaggiffy().setupExpress(app).swaggiffy();
module.exports = app;
