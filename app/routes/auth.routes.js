const express = require("express");
const controller = require("../controllers/auth.controller");

module.exports = (app) => {
  let router = express.Router();

  router.post("/sign-up", controller.signUp);
  router.post("/sign-in", controller.signIn);

  return router;
};
