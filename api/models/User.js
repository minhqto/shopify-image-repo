const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports.userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  email: String,
});
