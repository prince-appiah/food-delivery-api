const { isEmpty } = require("../helpers/validate");
const AuthRepository = require("../repositories/authRepository");

// sign up
exports.signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (isEmpty(email) || isEmpty(password)) {
      return res.status(204).send({ error: "Content must not be empty" });
    }

    const result = await AuthRepository.signupUser({ email, password });

    if (result.data !== null) {
      return res.status(201).json(result);
    }
    return res.status(400).json(result);
  } catch (error) {
    console.log("error in userController/create: \n", error);
  }
};

// sign in
exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (isEmpty(email) || isEmpty(password)) {
      return res.status(204).send({ error: "Content must not be empty" });
    }
    // find existing email
    const result = await AuthRepository.signinUser({ email, password });
    console.log("result from controller/signin", result);

    // check password
  } catch (error) {
    console.log("error in userController/signIn: \n", error);
  }
};

// sign out
exports.signOut = async (req, res) => {
  try {
  } catch (error) {
    console.log("error in userController/signOut: \n", error);
  }
};
