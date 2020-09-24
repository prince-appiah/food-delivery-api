const express = require("express");
const router = express.Router();

const { protect } = require("../../config/auth");
const {
  register,
  login,
  me,
  logout,
} = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, me);
router.get("/logout", protect, logout);

module.exports = router;
