module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV,
  // Uncomment in production
  // MONGO_URI: process.env.MONGO_URI ||
  MONGO_URI: "mongodb://localhost/food-delivery",
  JWT_TOKEN: process.env.JWT_TOKEN,
  JWT_EXPIRE_TIME: process.env.JWT_EXPIRE_TIME,
  JWT_COOKIE_EXPIRE_TIME: process.env.JWT_COOKIE_EXPIRE_TIME,
};
