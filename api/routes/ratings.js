const express = require("express");
const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../../config/auth");
const { index, create, single } = require("../controllers/ratings.controller");

router.route("/").get(index).post(protect, authorize("user"), create);
router.route("/:ratingId").get(single);
// .put(update).delete(remove);

module.exports = router;
