const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { isEmail } = require("validator");
const Schema = mongoose.Schema;

const { JWT_TOKEN, JWT_EXPIRE_TIME } = require("../config/settings");
const { BCRYPT_SALT } = require("../config/settings");

const UserSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    role: {
      type: String,
      enum: ["user", "owner"],
      default: "user",
    },
    address: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: function (email) {
          console.log(email);
        },
        message: "Email ho hia",
      },
      trim: true,
      lowercase: [true, "Email must not contain uppercase letters"],
      // validate: [isEmail, "Please enter a valid email"],
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      // select: false,
    },
    contact: {
      type: Number,
    },
    avatarUrl: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    // resetPasswordToken: { type: String },
    // resetPasswordExpire: { type: Date },
  },
  { timestamps: true }
);

// Rename _id to uid
UserSchema.set("toJSON", {
  versionKey: false,
  transform: function (doc, result) {
    delete result._id;
    return { ...result, uid: doc._id };
  },
});

// Save password
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(BCRYPT_SALT);
  this.password = await bcrypt.hash(this.password, salt);

  next();
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
