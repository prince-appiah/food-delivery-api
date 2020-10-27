const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");
const MealSchema = Schema(
  {
    slug: { type: String },
    name: {
      type: String,
      trim: true,
      required: [true, "Meals must have a name"],
    },
    cuisineType: {
      type: String,
      required: [true, "Please specify the type of meal"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    // orderStatus: {
    //   type: String,
    //   enum: ["confirmed", "en route", "delivered", "canceled"],
    // },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "restaurant",
      // required: true,
    },
  },
  { timestamps: true }
);

MealSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

MealSchema.pre("findOneAndUpdate", function (next) {
  this._update.slug = slugify(String(this._update.name), { lower: true });
  next();
});

module.exports = mongoose.model("meal", MealSchema);
