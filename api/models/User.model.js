const mongoose = require("mongoose");
const { ROLE_ADMINISTRATIOR, ROLE_USER } = require("../config/constants");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      quique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    img: {
      type: String,
    },
    role_as: {
      type: String,
      enum: [ROLE_ADMINISTRATIOR, ROLE_USER]
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
