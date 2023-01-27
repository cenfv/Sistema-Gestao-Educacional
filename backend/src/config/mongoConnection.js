const mongoose = require("mongoose");

mongoose.set("runValidators", true);

const options = {
  autoIndex: true,
};

mongoose.set("strictQuery", false);
require("dotenv").config();

module.exports = async function establishConnection() {
  await mongoose.connect(process.env.MONGODB_URL, options, (err, res) => {
    if (err) {
      console.log("Unable to establish connection with mongodb");
    } else {
      console.log("Connection with mongodb successfully established");
    }
  });
};
