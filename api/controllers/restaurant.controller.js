const Restaurant = require("../../models/Restaurant");
const { successHandler } = require("../utils");
const {
  findAll,
  findItemById,
  updateItem,
  createItem,
  removeItem,
} = require("../../models/queries");

/**
 * @route   GET /api/v1/restaurants/
 * @desc    List all restaurants
 * @access  Public
 * */
exports.index = async (req, res, next) => {
  try {
    const populate = [
      { path: "owner", select: "name address contact" },
      { path: "menu", select: "name cuisineType price" },
    ];

    const restaurants = await findAll(req, Restaurant, populate);
    return successHandler(res, 200, restaurants);
  } catch (error) {
    // @TODO use custom mongoose error handler here
    console.log(error);
    // return res.status(400).json({ success: false, message: error });
  }
};

// @route   GET /api/v1/restaurants/:restaurantId
// @desc    Get single restaurant by id
// @access  Public
exports.single = async (req, res, next) => {
  try {
    const _id = req.params.restaurantId;
    const populate = [
      { path: "meal" },
      { path: "owner", select: "name address contact email" },
    ];

    const restaurant = await findItemById(res, Restaurant, _id, populate);

    return successHandler(res, 200, restaurant);
  } catch (err) {
    // @TODO use mongoose error handlers here
    // handleError(err);
    console.log(err);
  }

  //
};

// @route   POST /api/v1/restaurants/add
// @desc    Create restaurant
// @access  Private
exports.create = async (req, res, next) => {
  try {
    const newRestaurant = { ...req.body };
    const restaurant = await createItem(res, Restaurant, newRestaurant);

    return successHandler(res, 201, restaurant);
  } catch (err) {
    // @TODO use custom mongoose error handlers
    console.log(err);
  }
};

/**
 * @route   DELETE /api/v1/restaurants/:restaurantId
 * @desc    Delete restaurant by id
 * @access  Private
 * */
exports.remove = async (req, res, next) => {
  try {
    const _id = req.params.restaurantId;
    const restaurant = await removeItem(res, Restaurant, _id);

    return res
      .status(200)
      .json({ success: true, message: `${restaurant.name} deleted` });
  } catch (error) {
    // @TODO use custom mongoose error handling
    console.log(error);
  }
};

/**
 * @route   PUT /api/v1/restaurants/:restaurantId
 * @desc    Update restaurant by id
 * @access  Private
 * */
exports.update = async (req, res, next) => {
  try {
    const _id = req.params.restaurantId;
    const body = { ...req.body };
    const restaurant = await updateItem(res, Restaurant, _id, body);

    if (!restaurant) {
      return res.status(400).json({ success: false });
    }
    return res.status(201).json({
      success: true,
      message: "Update successful",
      restaurant,
    });
  } catch (error) {
    console.log(error);
  }
};
