const express = require("express");
const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../../config/auth");
const {
  index,
  create,
  single,
  update,
  remove,
} = require("../controllers/ratings.controller");

router.route("/").get(index).post(protect, authorize("user"), create);
router
  .route("/:ratingId")
  .get(single)
  .put(protect, authorize("user"), update)
  .delete(protect, authorize("user"), remove);

module.exports = router;
