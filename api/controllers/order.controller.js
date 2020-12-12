const Order = require("../../models/Order");
const { successHandler } = require("../utils");
const {
  findAll,
  findItemById,
  createItem,
  updateItem,
  removeItem,
} = require("../../models/queries");

/**
 * @route   GET /api/v1/orders
 * @route   GET /api/v1/orders/:restaurantId/ratings
 * @desc    List all ratings / restaurant's ratings
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
    // console.log("rating", ratings);

    return successHandler(res, 200, ratings);
  } catch (error) {
    console.log(error);
  }
};

/**
 * @route   GET /api/v1/ratings/:ratingId
 * @desc    Get single rating
 * @access  Public
 * */
exports.single = async (req, res, next) => {
  try {
    const _id = req.params.ratingId;
    const populate = [{ path: "restaurant", select: "name contact email" }];
    const rating = await findItemById(res, Rating, _id, populate);

    return successHandler(res, 200, rating);
  } catch (err) {
    // @TODO use mongoose error handlers here
    console.log(err);
  }
};

/**
 * @route   POST /api/v1/:userId/orders
 * @desc    Add an order
 * @access  Private
 **/
exports.create = async (req, res, next) => {
  try {
    // req.body.restaurant = req.params.restaurantId;
    req.body.user = req.user._id;
    const body = { ...req.body };
    const _id = req.params.userId;

    const existingOrder = await findItemById(res, Order, _id);

    if (!existingOrder) {
      return res
        .status(404)                                           
        .json({ success: false, message: "Order does not exist" });
    }

    const order = await createItem(res, Order, body);

    return successHandler(res, 201, order);
  } catch (error) {
    console.log(error);
  }
};

/**
 * @route   PUT /api/v1/ratings/:ratingId
 * @desc    Update rating by id
 * @access  Private
 * */
exports.update = async (req, res, next) => {
  try {
    const _id = req.params.ratingId;
    const body = { ...req.body };
    const rating = await updateItem(res, Rating, _id, body);

    if (!rating) {
      return res
        .status(400)
        .json({ success: false, message: "Rating does not exist" });
    }
    return res.status(201).json({
      success: true,
      message: "Update successful",
      rating,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @route   DELETE /api/v1/ratings/:ratingId
 * @desc    Delete rating by id
 * @access  Private
 * */
exports.remove = async (req, res, next) => {
  try {
    const _id = req.params.ratingId;
    const rating = await removeItem(res, Rating, _id);
    return res
      .status(200)
      .json({ success: true, message: `${rating.name} deleted` });
  } catch (error) {
    console.log(error);
  }
};
