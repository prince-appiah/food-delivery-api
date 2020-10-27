const Meal = require("../../models/Meal");
const Restaurant = require("../../models/Restaurant");
const { successHandler } = require("../utils");
const {
  findAll,
  findItemById,
  createItem,
  removeItem,
  updateItem,
} = require("../../models/queries");

/**
 * @route   GET /api/v1/meals/
 * @route   GET /api/v1/restaurants/:restaurantId/meals
 * @desc    List all meals / restaurant's menu
 * @access  Public
 * */
exports.index = async (req, res, next) => {
  try {
    const populate = [{ path: "restaurant", select: "name" }];
    let query;

    if (req.params.restaurantId) {
      query = Meal.find({ restaurant: req.params.restaurantId });
    } else {
      query = findAll(req, Meal, populate);
    }

    const menu = await query;

    return successHandler(res, 200, menu);
  } catch (error) {
    console.log(error);
  }
};

/**
 * @route   GET /api/v1/meals/:mealId
 * @desc    Get single meal by id
 * @access  Public
 * */
exports.single = async (req, res, next) => {
  try {
    const _id = req.params.mealId;
    const populate = [{ path: "restaurant" }];

    const meal = await findItemById(res, Meal, _id, populate);
    return successHandler(res, 200, meal);
  } catch (err) {
    console.log(err);
  }
};

/**
 * @route   POST /api/v1/restaurants/:restaurantId/meals
 * @desc    Create meal
 * @access  Private
 * */
exports.create = async (req, res, next) => {
  try {
    req.body.restaurant = req.params.restaurantId;
    const body = { ...req.body };

    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant) {
      return res.status(400).json({
        success: false,
        message: "Restaurant does not exist, you cannot add meal",
      });
    }

    // const meal = await Meal.create(req.body);
    const meal = await createItem(res, Meal, body);

    return successHandler(res, 201, meal);
  } catch (err) {
    console.log(err);
  }
};

/**
 * @route   DELETE /api/v1/meals/:mealId
 * @desc    Delete meal by id
 * @access  Private
 * */
exports.remove = async (req, res, next) => {
  try {
    const _id = req.params.mealId;
    const meal = await removeItem(res, Meal, _id);
    console.log("meal deleted ", meal);
    return res
      .status(200)
      .json({ success: true, message: `${meal.name} deleted` });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @route   PUT /api/v1/meals/:mealId
 * @desc    Update meal by id
 * @access  Private
 * */
exports.update = async (req, res, next) => {
  try {
    const _id = req.params.mealId;
    const body = { ...req.body };
    const meal = await updateItem(res, Meal, _id, body);

    if (!meal) {
      return res
        .status(400)
        .json({ success: false, message: "Meal does not exist" });
    }
    return res.status(201).json({
      success: true,
      message: "Update successful",
      meal,
    });
  } catch (error) {
    console.log(error);
  }
};
