const { JWT_COOKIE_EXPIRE_TIME, NODE_ENV } = require("../../config/settings");
const Restaurant = require("../../models/Restaurant");

// @route   GET /api/v1/restaurants/
// @desc    List all restaurants
// @access  Public
exports.index = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();
    return res.status(200).json({
      success: true,
      count: restaurants.length === 0 ? 0 : restaurants.length,
      restaurants,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Could not fetch restaurants" });
  }
};

// @route   GET /api/v1/restaurants/:restaurantId
// @desc    Get single restaurant by id
// @access  Public
exports.single = async (req, res, next) => {
  try {
    const _id = req.params.restaurantId;
    const restaurant = await Restaurant.findById({ _id });

    return res.status(200).json({ success: true, restaurant });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Restaurant does not exist" });
  }

  //
};

// @route   POST /api/v1/restaurants/add
// @desc    Create restaurant
// @access  Private
exports.create = async (req, res, next) => {
  const newRestaurant = { ...req.body };

  // check existing restaurant - by name
  const existingRestaurant = await Restaurant.findOne({
    name: newRestaurant.name,
  });

  if (existingRestaurant) {
    return res.status(400).json({
      success: false,
      message: `${existingRestaurant.name} already exists.`,
    });
  }

  try {
    const restaurant = await Restaurant.create(newRestaurant);
    return res.status(201).json({ success: true, restaurant });
  } catch (err) {
    console.log("error=====", err);
    return res.status(400).json({
      success: false,
      message: "Sorry, could not create a restaurant",
    });
  }
};

// @route   DELETE /api/v1/restaurants/:restaurantId
// @desc    Delete restaurant by id
// @access  Private
exports.remove = async (req, res, next) => {
  try {
    const _id = req.params.restaurantId;
    const restaurant = await Restaurant.findByIdAndRemove(_id);
    // console.log(restaurant);
    return res.status(200).json({
      success: true,
      message: `${restaurant.name} deleted`,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Restaurant does not exist" });
  }
};

// @route   PUT /api/v1/restaurants/:restaurantId
// @desc    Update restaurant by id
// @access  Private
exports.update = async (req, res, next) => {
  try {
    const _id = req.params.restaurantId;
    const restaurant = await Restaurant.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    // console.log(restaurant);
    return res.status(201).json({
      success: true,
      message: "Update successful",
      restaurant,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Restaurant does not exist" });
  }
};
