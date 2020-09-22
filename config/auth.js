const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_TOKEN } = require("./settings");

exports.protect = async (req, res, next) => {
  const { authorization } = req.headers;
  let token;

  if (authorization && authorization.startsWith("Bearer ")) {
    token = authorization.split("")[1];
  }
  //   else if (req.cookies.token) {
  //     token = req.cookies.token;
  //   }

  // make sure token exists
  if (!token)
    return next(
      res.status(401).json({
        success: false,
        message: "Not authorised to access this route",
      })
    );

  try {
    // verify token
    const decoded = jwt.verify(token, JWT_TOKEN);

    console.log(decoded);
    // current logged in user
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
