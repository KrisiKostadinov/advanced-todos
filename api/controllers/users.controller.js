const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const { prepareSuccess, prepareError } = require("../config/functions");
const { HASH_SALT_ROUNDS, status_codes } = require("../config/constants");
const User = require("../models/User.model");

const register = asyncHandler(async (req, res) => {
  const body = req.body;

  const existingUser = await User.findOne({
    $or: [{ username: body.username }, { email: body.email }],
  });

  if (existingUser) {
    res
      .status(status_codes.CONFLICT)
      .send(prepareError({ message: "Dublicate username or email address!" }));
    return;
  }

  const salt = await bcrypt.genSalt(HASH_SALT_ROUNDS);
  const hashPassword = await bcrypt.hash(body.password, salt);

  const createdUser = new User({ ...body, password: hashPassword });
  await createdUser.save();

  const response = createdUser._doc;
  delete response.password;

  res.status(status_codes.CREATED).send(prepareSuccess(response));
});

const login = async (req, res) => {};

module.exports = {
  register,
  login,
};
