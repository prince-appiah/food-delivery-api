// Get all items and populate
exports.findAll = async (req, Model, ...populate) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5; // 5 per page
  const start = (page - 1) * limit;
  const end = page * limit;
  const total = await Model.countDocuments();

  const docs = await Model.find().populate(populate).skip(start).limit(limit);

  let nextPage = end < total ? { number: page + 1, limit } : null;
  let prevPage = start > 0 ? { number: page - 1, limit } : null;

  if (docs) {
    return { nextPage, prevPage, count: docs.length, docs };
  } else {
    return { count: docs.length, docs };
  }
};

// Get single item by id
exports.findItemById = async (res, Model, id, populate) => {
  const doc = await Model.findById(id).populate(populate);

  if (doc) {
    return doc;
  } else {
    return res
      .status(400)
      .json({ success: false, message: `${doc.name} does not exist` });
  }
};

// Create new item
exports.createItem = async (res, Model, body) => {
  const existingItem = await Model.findOne({ name: body.name });

  if (existingItem) {
    return res.status(400).json({
      success: false,
      // message: "Item already exists",
      message: `${existingItem.name} already exists`,
    });
  }
  // create new item
  const doc = await Model.create(body);
  return doc;
};

// Delete an item
exports.removeItem = (res, Model, id) => {
  const doc = Model.findByIdAndRemove(id, (err, resp) => {
    if (err) {
      console.log("error", err);
      return res.status(400).json({ success: false, message: err.message });
    }
    return resp;
  });

  return doc;
};

// Update an item
exports.updateItem = (res, Model, id, body) => {
  const options = { new: true, runValidators: true };

  const doc = Model.findByIdAndUpdate(id, body, options, (err, resp) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    return resp;
  });

  return doc;
};
