const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = Schema(
  {
    slug: { type: String },
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Restaurant must have name"],
      maxLength: [50, "Name cannot be more than 50 characters"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    city: {
      type: String,
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
    menu: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "meal",
      },
    ],

    // menu - should house a list of dishes ('ref')
  },
  { timestamps: true }
);

// Sign JWT amd return user
// RestaurantSchema.methods.getJWT = function () {
//   return jwt.sign({ id: this._id }, JWT_TOKEN, { expiresIn: JWT_EXPIRE_TIME });
// };

module.exports = mongoose.model("restaurant", RestaurantSchema);
