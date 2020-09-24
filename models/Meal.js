const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MealSchema = Schema(
  {
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
      type: mongoose.SchemaTypes.ObjectId,
      ref: "restaurant",
    },
  },
  { timestamps: true }
);

// Sign JWT amd return user
// MealSchema.methods.getJWT = function () {
//   return jwt.sign({ id: this._id }, JWT_TOKEN, { expiresIn: JWT_EXPIRE_TIME });
// };

module.exports = mongoose.model("meal", MealSchema);
