const path = require("path");
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
// const fileupload = require('express-fileupload')

module.exports = () => {
  let router = express.Router();

  // uploads middleware
  // router.fileupload()

  let uploadsDir = path.resolve(__dirname, "..", "..", "uploads");
  router.use("/uploads", express.static(uploadsDir));

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  // cors whitelist - for frontends
  const originsWhitelist = ["frontendsitegoeshere"];
  let corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
      let isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
      callback(null, isWhitelisted);
    },
  };

  router.use(cors(corsOptions));
  router.use(logger("dev"));

  router.use((req, res, next) => {
    //allowed headers and responses
    //retrieve the domain the request came from
    let origin = req.headers.origin;

    //since the "Access-Control-Allow-Origin" can only accept a single value,
    //check if req origin exists in array. use it if it exists
    //otherwise use the default 4200
    let originExists = originsWhitelist.indexOf(origin) !== -1;
    if (originExists) {
      res.header("Access-Control-Allow-Origin", origin);
    } else {
      res.header("Access-Control-Allow-Origin", "*");
    }

    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    //allow credentials(cookies)
    res.header("Access-Control-Allow-Credentials", "true");

    res.header(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With,Content-Type,Accept,content-type"
    );

    next();
  });

  return router;
};
