const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 100,
      required: [true, "Please add a name for your review"],
    },
    text: {
      type: String,
      required: [true, "Please add some text"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please add a rating"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      //   required: true,
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "restaurant",
      // required: true,
    },
  },
  { timestamps: true }
);

RatingSchema.index({ user: 1, restaurant: 1 }, { unique: true });

module.exports = mongoose.model("review", RatingSchema);
