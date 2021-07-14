const express = require("express");
const controller = require("../controllers/home.controller");

module.exports = (app) => {
  let router = express.Router();

  router.get("/", controller.home);

  return router;
};
