const express = require("express");
const router = express.Router();

const { protect } = require("../../config/auth");
const {
  create,
  index,
  single,
  remove,
  update,
} = require("../controllers/restaurant.controller");

router.get("/", index);
router.post("/add", protect, create);
router.get("/:restaurantId", single);
router.delete("/:restaurantId", protect, remove);
router.put("/:restaurantId", protect, update);

module.exports = router;
