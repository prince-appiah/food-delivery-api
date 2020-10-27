const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
// const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { isEmail } = require("validator");

const { JWT_TOKEN, JWT_EXPIRE_TIME } = require("../config/settings");

const UserSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide your name"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
      required: [true, "Please enter your email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password should be at least 6 characters long"],
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "owner"],
      default: "user",
    },
    contact: {
      type: Number,
      required: [true, "Please provide your contact"],
    },
    // photo: {
    //   type: String,
    //   // default:''  // default user photo from our static folder
    // },
    // resetPasswordToken: { type: String },
    // resetPasswordExpire: { type: Date },
  },
  { timestamps: true }
);

// Save password
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT amd return user
UserSchema.methods.getJWT = function () {
  return jwt.sign({ id: this._id }, JWT_TOKEN, { expiresIn: JWT_EXPIRE_TIME });
};

// Compare password
UserSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model("user", UserSchema);
