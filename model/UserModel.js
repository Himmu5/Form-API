const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, require: true },
    username: { type: String, require: true, min: 2 },
    password: { type: String, require: true, min: 6 },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);
module.exports = { UserModel };
