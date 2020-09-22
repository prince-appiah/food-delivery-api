const mongoose = require("mongoose");
const settings = require("./settings");

const connectDB = async () => {
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useUnifiedTopology", true);
  mongoose.set("useCreateIndex", true);
  mongoose.set("useFindAndModify", false);

  const conn = await mongoose.connect(settings.MONGO_URI);

  console.log(
    `==> Database connected with ${conn.connection.host} 🔥 `.green.inverse
  );
};

module.exports = connectDB;
