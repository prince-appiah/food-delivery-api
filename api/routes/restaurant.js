const express = require("express");
const router = express.Router();

const {
  create,
  index,
  single,
  remove,
  update,
} = require("../controllers/restaurant.controller");

router.get("/", index);
router.get("/:restaurantId", single);
router.delete("/:restaurantId", remove);
router.put("/:restaurantId", update);
router.post("/add", create);

module.exports = router;
