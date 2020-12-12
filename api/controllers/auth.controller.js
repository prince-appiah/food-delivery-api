const { sendTokenResponse } = require("../../config/auth");
const User = require("../../models/User");
const { handleError } = require("../utils");

/**
 * @route   POST /api/v1/auth/user/register
 * @headers Content-Type: application/json
 * @desc    Register user
 * @access  Public
 * */
exports.register = async (req, res) => {
  try {
    const newUser = { ...req.body };
    const user = await User.create(newUser);

    return sendTokenResponse(user, 201, res);
  } catch (error) {
    const errors = handleError(error);
    console.log("errors from api register :>> ", errors);
    return res.status(400).json({ success: false, errors });
  }
};

/**
 * @route   POST /api/v1/auth/user/login
 * @headers Content-Type: application/json
 * @desc    Log in user
 * @access  Public
 * */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide your login details" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const matched = await user.comparePassword(password);
    if (!matched) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // TODO: Exclude password from api response ⤵

    // send token and login
    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.log("errors from api login :>> ", error);
  }
};

/**
 * @route   GET /api/v1/auth/me
 * @desc    Get logged in user
 * @access  Private
 * */
exports.me = async (req, res, next) => {
  // console.log("-=======", req.cookies);

  // const token = req.cookies.token;

  // try {
  const user = await User.findById(req.user._id);

  return res.status(200).json({ success: true, data: user });
  // } catch (error) {
  // console.error(error);
  // }
};
/**
 *  @route   GET /api/v1/auth/logout
 *  @desc    Log out user/clear cookies
 *  @access  Private
 * */
exports.logout = (req, res) => {
  try {
    return res
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
      })
      .status(200)
      .json({ success: true });
    // console.log(req.cookies);
  } catch (error) {
    console.log(error);
  }
  // res.redirect("/");
  // console.log(res.cookie);
};
