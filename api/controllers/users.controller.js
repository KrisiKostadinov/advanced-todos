const bcrypt = require("bcrypt");
const { prepareSuccess, prepareError } = require("../config/functions");
const asyncHandler = require("express-async-handler");

const User = require("../models/User.model");

const register = asyncHandler(async (req, res) => {
  const body = req.body;

  const existingUser = await User.findOne({
    $or: [{ username: body.username }, { email: body.email }],
  });

  if (existingUser) {
    res.status(409).send({
      success: false,
      message: "Dublicate username or email address!",
    });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(body.password, salt);

  const createdUser = new User({ ...body, password: hashPassword });
  await createdUser.save();

  const response = createdUser._doc;
  delete response.password;

  res.status(201).send(prepareSuccess(response));
});

const login = async (req, res) => {};

module.exports = {
  register,
  login,
};
