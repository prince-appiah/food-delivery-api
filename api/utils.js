exports.successHandler = (res, code, data) => {
  // return res.status(code).json({ success: true, count: data.length, data });
  return res.status(code).json({ success: true, count: data.length, data });
};

exports.errorHandler = (error) => {
  // console.log(error.message);
  switch (error.code) {
    case 11000:
      return res
        .status(400)
        .json({ success: false, message: "Resource already exists" });

    default:
      return error;
  }
};

exports.handleError = (err) => {
  let errors = { email: "", password: "" };

  // duplicate error codes
  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};
