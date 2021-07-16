const express = require("express");

module.exports = (app) => {
  let router = express.Router();

  // Access Denied - Must come first
  router.get("/access-denied", (req, res) => {
    let response = { code: 401, status: "error", message: "Access Denied" };

    return res.status(200).json(response);
  });

  // Home Routes
  let homeRoutes = require("./home.routes")(app);
  router.use(homeRoutes);

  // User Routes
  let userRoutes = require("./user.routes")(app);
  router.use(userRoutes);

  return router;
};
