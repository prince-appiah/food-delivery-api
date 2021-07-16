const UserRepo = require("../repositories/userRepository");

exports.create = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(204).json({ error: "Content must not be empty" });
    }

    const result = await UserRepo.createUser({
      email: req.body.email,
      password: req.body.password,
    });

    // console.log("result frim controller/create:>> ", result);
    // return;
    if (result.data !== null) {
      return res.status(201).json(result);
    }
    return res.status(400).json(result);
  } catch (error) {
    console.log("error in userController/create: \n", error);
  }
};
