const CircularJSON = require("circular-json");

const { findAll, findItemById, createItem } = require("../../models/queries");
const { successHandler } = require("../utils");
const Rating = require("../../models/Rating");
const Restaurant = require("../../models/Restaurant");

/**
 * @route   GET /api/v1/ratings
 * @route   GET /api/v1/restaurants/:restaurantId/ratings
 * @desc    List all meals / restaurant's ratings
 * @access  Public
 * */
exports.index = async (req, res, next) => {
  try {
    const populate = [{ path: "restaurant", select: "id name" }];
    let query;

    if (req.params.restaurantId) {
      query = Rating.find({ restaurant: req.params.restaurantId });
    } else {
      query = findAll(req, Rating, populate);
    }

    const ratings = await query;
    console.log("rating", ratings);

    return successHandler(res, 200, ratings);
  } catch (error) {
    console.log(error);
  }
};

// @route   GET /api/v1/ratings/:ratingId
// @desc    Get single rating
// @access  Public
exports.single = async (req, res, next) => {
  try {
    const _id = req.params.ratingId;
    const populate = [{ path: "restaurant", select: "name contact email" }];

    const rating = await findItemById(res, Rating, _id, populate);

    return successHandler(res, 200, rating);
  } catch (err) {
    // @TODO use mongoose error handlers here
    // handleError(err);
    console.log(err);
  }

  //
};

/**
 * @route   POST /api/v1/restaurants/:restaurantId/ratings
 * @desc    Add a rating
 * @access  Private
 * */
exports.create = async (req, res, next) => {
  /**@TODO Fix req.body */

  req.body.restaurant = req.params.restaurantId;
  req.body.user = req.user._id;
  const body = { ...req.body };
  const _id = req.params.restaurantId;

  const restaurant = await findItemById(res, Restaurant, _id);

  if (!restaurant) {
    return res
      .status(404)
      .json({ success: false, message: "Restaurant does not exist" });
  }

  const rating = await createItem(res, Rating, body);

  return successHandler(res, 201, rating);
};
