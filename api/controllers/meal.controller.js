const { JWT_COOKIE_EXPIRE_TIME, NODE_ENV } = require("../../config/settings");
const Meal = require("../../models/Meal");

// @route   GET /api/v1/meals/
// @desc    List all meals
// @access  Public
exports.index = async (req, res, next) => {
  try {
    const meals = await Meal.find().populate({
      path: "restaurant",
      select: "name",
    });
    return res.status(200).json({ success: true, meals });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

// @route   GET /api/v1/meals/:mealId
// @desc    Get single meal by id
// @access  Public
exports.single = async (req, res, next) => {
  try {
    const _id = req.params.mealId;
    const meal = await Meal.findById({ _id }).populate("restaurant");

    return res.status(200).json({ success: true, meal });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Meal does not exist" });
  }
};

// @route   POST /api/v1/meals/add
// @desc    Create meal
// @access  Private
exports.create = async (req, res, next) => {
  const newMeal = { ...req.body };

  try {
    const meal = await Meal.create(newMeal);
    return res.status(201).json({ success: true, meal });
  } catch (err) {
    console.log("error=====", err);
    return res.status(400).json({
      success: false,
      message: "Sorry, could not add this meal",
    });
  }
};

// @route   DELETE /api/v1/meals/:mealId
// @desc    Delete meal by id
// @access  Private
exports.remove = async (req, res, next) => {
  try {
    const _id = req.params.mealId;
    const meal = await Meal.findByIdAndRemove(_id);

    return res.status(200).json({
      success: true,
      message: `${meal.name} deleted`,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Meal does not exist" });
  }
};

// @route   PUT /api/v1/meals/:mealId
// @desc    Update meal by id
// @access  Private
exports.update = async (req, res, next) => {
  try {
    const _id = req.params.mealId;
    const meal = await Meal.findByIdAndUpdate(_id, req.body, { new: true });

    return res.status(201).json({
      success: true,
      message: "Update successful",
      meal,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Could not update meal" });
  }
};
