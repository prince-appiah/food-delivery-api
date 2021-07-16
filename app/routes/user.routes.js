const express = require("express");
const controller = require("../controllers/user.controller");

module.exports = (app) => {
  let router = express.Router();

  router.post("/users", controller.create);

  return router;
};
