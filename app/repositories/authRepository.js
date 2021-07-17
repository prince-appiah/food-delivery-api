const { User } = require("../models");

class AuthRepository {
  /**
   * @param {object} {email,password}
   * */
  static async signupUser({ email, password }) {
    let result = { code: null, msg: "", data: null };
    try {
      let existingUser = await User.findOne({ where: { email: email } });

      if (existingUser) {
        result.code = 409;
        result.msg = "User already exists";

        return result;
      } else {
        // create new user
        const newUser = await User.create({ email, password });

        if (newUser) {
          result.code = 201;
          result.msg = "User created successfully";
          result.data = newUser;

          return result;
        }
        result.code = 400;
        result.msg = "Could not create a user";

        return result;
      }
    } catch (error) {
      console.log("error in userRepo/create:>> \n", error);
    }
  }

  /**
   * @param {string} email
   * @param {string} password
   *  */
  static async signinUser({ email, password }) {
    let result = { code: null, msg: "", data: null };

    try {
      let existingUser = await User.findOne({ where: { email } });
      if (!existingUser || existingUser == null) {
        result.code = "404";
        result.msg = `No user found with the email ${email}`;
        // compare passwords
        return result;
      } else {
        const { dataValues: data } = existingUser;
        console.log("compare passwords: ", password === data["password"]);
        bcryptjs();
      }
    } catch (error) {
      console.log("error in userRepo/signinUser:>> \n", error);
    }
  }
  // delete user
}

module.exports = AuthRepository;
