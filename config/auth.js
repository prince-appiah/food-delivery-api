const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_TOKEN, JWT_COOKIE_EXPIRE_TIME, NODE_ENV } = require("./settings");

exports.sendTokenResponse = (user, statusCode, res) => {
  // create token
  const token = user.getJWT();

  const options = {
    maxAge: new Date(Date.now() + JWT_COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: NODE_ENV === "production" ? true : false,
  };

  // if (NODE_ENV === "production") {
  //   options.secure = true;
  // }
  return res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token, user });
};

// Protect routes
exports.protect = async (req, res, next) => {
  const { authorization } = req.headers;
  let token;
  // let token = req.cookies.token;

  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // make sure token exists
  if (!token) {
    return next(
      res.status(401).json({
        success: false,
        message: "Not authorised to access this route",
      })
    );
  }

  try {
    const decoded = jwt.verify(token, JWT_TOKEN);

    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(
      res.status(401).json({
        success: false,
        message: "Not authorised to access this route",
      })
    );
  }
};

// Grant access based on roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(
        res.status(403).json({ message: `${req.user.role} is not authorized` })
      );
    }
    next();
  };
};
