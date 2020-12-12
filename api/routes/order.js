const express = require("express");
const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../../config/auth");
const {
  create,
  index,
  single, 
  remove,
  update,
} = require("../controllers/order.controller");

router
  .route("/:userId/orders")
  .get(index)
  .post(protect, authorize("user"), create);
router
  .route("/:userId/:orderId")
  .get(single)
  .put(protect, authorize("user"), update)
  .delete(protect, authorize("user"), remove);

module.exports = router;
