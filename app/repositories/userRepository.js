const { User } = require("../models");

class UserRepo {
  /**
   * @param {object} {email,password}
   * */
  static async createUser(data) {
    let result = { code: null, msg: "", data: null };
    try {
      // check if user exists
      let existingUser = await User.findOne({ where: { email: data.email } });

      // console.log("existing user:> ", existingUser);
      // return;
      if (existingUser) {
        result.code = 409;
        result.msg = "User already exists";

        return result;
      } else {
        // create new user
        const newUser = await User.create(data);

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

  // update user
  // delete user
}

module.exports = UserRepo;
