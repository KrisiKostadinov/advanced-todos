const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const { prepareSuccess, prepareError } = require("../config/functions");
const {
  HASH_SALT_ROUNDS,
  status_codes,
  messages,
} = require("../config/constants");
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

const login = asyncHandler(async (req, res) => {
  const body = req.body;

  const existingUser = await User.findOne({ username: body.username });

  if (!existingUser) {
    res
      .status(status_codes.BAD_REQUEST)
      .send(prepareError({ message: messages.INVALID_CREDENTIALS }));
  }

  const user = existingUser;

  const validPassword = await bcrypt.compare(body.password, user.password);
  if (!validPassword) {
    res
      .status(status_codes.BAD_REQUEST)
      .send(prepareError({ message: messages.INVALID_CREDENTIALS }));
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(status_codes.OK).send(prepareSuccess({ token }));
});

const getUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res
      .status(status_codes.NOT_FOUND)
      .send(prepareError({ message: messages.INVALID_ID }));
  }

  const user = await User.findById(id);

  if (!id) {
    return res
      .status(status_codes.NOT_FOUND)
      .send(prepareError({ message: messages.INVALID_ID }));
  }

  res.status(status_codes.OK).send(prepareError(user));
});

const getAll = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(status_codes.OK).send(prepareSuccess(users));
});

module.exports = {
  register,
  login,
  getUser,
  getAll,
};
