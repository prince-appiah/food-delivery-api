// Library Imports
const express = require("express");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
require("dotenv").config();

// User Imports
const connectDB = require("./config/db");
const authRoutes = require("./api/routes/auth");
const restaurantRoutes = require("./api/routes/restaurant");

// Middleware Configs
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Connect database
connectDB();

/* 
  *
  Register api routes
  *
*/
app.use("/api/v1/auth/user", authRoutes);
app.use("/api/v1/restaurants", restaurantRoutes);

module.exports = app;
