const { JWT_COOKIE_EXPIRE_TIME, NODE_ENV } = require("../../config/settings");
const User = require("../../models/User");

// @route   POST /api/v1/auth/user/register
// @desc    Register user
// @access  Public
exports.register = async (req, res, next) => {
  const newUser = { ...req.body };

  // check existing user - by email
  const existingUser = await User.findOne({ email: newUser.email });
  if (existingUser)
    return res
      .status(400)
      .json({ success: false, message: "Email already exists" });
  // console.log("exiting user===>>>", existingUser);

  try {
    const user = await User.create(newUser);
    // create token
    sendTokenResponse(user, 201, res);
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }

  // return res.status(201).json({ success: true, token, user });
};

// @route   POST /api/v1/auth/user/login
// @desc    Log in user
// @access  Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // check email and password
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Please provide your login details" });

  // check customer
  // 'select' includes password for validation
  const customer = await User.findOne({ email }).select("+password");
  if (!customer)
    return res
      .status(400)
      .json({ success: false, message: "Invalid credentials" });

  // validate password
  const matched = await customer.comparePassword(password);
  if (!matched)
    return res
      .status(400)
      .json({ success: false, message: "Invalid credentials" });

  // send token and login
  sendTokenResponse(customer, 200, res);
};

const sendTokenResponse = (user, statusCode, res) => {
  // create token
  const token = user.getJWT();

  const options = {
    expires: new Date(
      Date.now() + JWT_COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token, user }); // display user details
};
