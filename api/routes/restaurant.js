const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../../config/auth");
const {
  create,
  index,
  single,
  remove,
  update,
} = require("../controllers/restaurant.controller");

const mealRouter = require("./meal");
const ratingRouter = require("./rating");

router.use("/:restaurantId/meals", mealRouter);
router.use("/:restaurantId/ratings", ratingRouter);

router.route("/").get(index).post(protect, authorize("owner"), create);
router
  .route("/:restaurantId")
  .get(single)
  .put(protect, authorize("owner"), update)
  .delete(protect, authorize("owner"), remove);

module.exports = router;
