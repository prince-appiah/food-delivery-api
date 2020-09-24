const express = require("express");
const router = express.Router();

const { protect } = require("../../config/auth");
const {
  create,
  index,
  single,
  remove,
  update,
} = require("../controllers/meal.controller");

router.get("/", index);
router.post("/add", protect, create);
router.get("/:mealId", single);
router.delete("/:mealId", protect, remove);
router.put("/:mealId", protect, update);

module.exports = router;
