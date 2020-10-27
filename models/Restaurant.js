const slugify = require("slugify");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = Schema(
  {
    // _id: uuidv4(),
    slug: { type: String },
    name: {
      type: String,
      trim: true,
      unique: [true, "Two or more restaurants cannot have the same name"],
      required: [true, "Restaurant must have a name"],
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    address: {
      type: String,
      trim: true,
      required: [true, "Address is required"],
    },
    city: {
      type: String,
      trim: true,
      required: [true, "City is required"],
    },
    status: {
      type: Boolean,
      required: [true, "Restaurant must either be opened or closed"],
      default: false, // false - closed || true - opened
    },
    ratings: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must not exceed 5"],
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    menu: [
      {
        type: Schema.Types.ObjectId,
        ref: "meal",
      },
    ],
  },
  { timestamps: true }
);

RestaurantSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

RestaurantSchema.pre("findOneAndUpdate", function (next) {
  this._update.slug = slugify(String(this._update.name), { lower: true });
  next();
});

module.exports = mongoose.model("restaurant", RestaurantSchema);
