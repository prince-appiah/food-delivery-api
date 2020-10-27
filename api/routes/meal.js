const express = require("express");
const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../../config/auth");
const {
  create,
  index,
  single,
  remove,
  update,
} = require("../controllers/meal.controller");

router.route("/").get(index).post(protect, authorize("owner"), create);
router
  .route("/:mealId")
  .get(single)
  .put(protect, authorize("owner"), update)
  .delete(protect, authorize("owner"), remove);

module.exports = router;
