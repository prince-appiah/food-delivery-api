// Library Imports
const express = require("express");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");
const hpp = require("hpp");
const xss = require("xss-clean");
const cors = require("cors");
const app = express();
require("dotenv").config();

// User Imports
const connectDB = require("./config/db");
const authRoutes = require("./api/routes/auth");
const restaurantRoutes = require("./api/routes/restaurant");
const mealRoutes = require("./api/routes/meal");
const ratingsRoutes = require("./api/routes/rating");
const ordersRoutes = require("./api/routes/order");

const limiter = rateLimiter({
  // 10 minutes
  windowMs: 10 * 60 * 1000,
  maxAge: 1,
});

// Middleware Configs
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(limiter);

connectDB();

/* 
  *
  Register api routes
  *
*/
app.use("/api/v1/auth/user", authRoutes);
app.use("/api/v1/restaurants", restaurantRoutes);
app.use("/api/v1/meals", mealRoutes);
app.use("/api/v1/ratings", ratingsRoutes);
app.use("/api/v1/orders", ordersRoutes);

module.exports = app;
