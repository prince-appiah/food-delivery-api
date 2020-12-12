const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = Schema(
  {
    name: {
      type: Schema.Types.ObjectId,
      ref: "meal", 
    },
    // amount: {
    //   type: Number,
    //   required: true
    // },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    restaurant: { 
      type: Schema.Types.ObjectId,
      ref: "restaurant",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", OrderSchema);
