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

// post actions
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

  return res.status(status_codes.CREATED).send(prepareSuccess(response));
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

  return res.status(status_codes.OK).send(prepareSuccess({ token }));
});

const saveItem = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const body = req.body;

  if (!id) {
    return res
      .status(status_codes.BAD_REQUEST)
      .send(prepareError({ message: messages.INVALID_ID }));
  }

  const updatedItem = await User.findByIdAndUpdate(
    id,
    {
      $set: { ...body },
    },
    { new: true }
  );

  if (!updatedItem) {
    return res
      .status(status_codes.BAD_REQUEST)
      .send(prepareError({ message: messages.INVALID_ID }));
  }

  return res.status(status_codes.OK).send(prepareSuccess(updatedItem));
});

// get actions
const getItem = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res
      .status(status_codes.BAD_REQUEST)
      .send(prepareError({ message: messages.INVALID_ID }));
  }

  const user = await User.findById(id);

  if (!id) {
    return res
      .status(status_codes.BAD_REQUEST)
      .send(prepareError({ message: messages.INVALID_ID }));
  }

  return res.status(status_codes.OK).send(prepareError(user));
});

const getItems = asyncHandler(async (req, res) => {
  const users = await User.find();
  return res.status(status_codes.OK).send(prepareSuccess(users));
});

const getLoggedItem = asyncHandler(async (req, res) => {
  const loggedInUser = req.user;
  if (!loggedInUser) {
    return res
      .status(status_codes.NOT_AUTHORIZED)
      .send(prepareError({ message: messages.NOT_AUTHORIZED }));
  }

  const user = await User.findById(loggedInUser._id);

  if (!user) {
    return res
      .status(status_codes.NOT_AUTHORIZED)
      .send(prepareError({ message: messages.NOT_AUTHORIZED }));
  }

  return res.status(status_codes.OK).send(prepareSuccess(user));
});

const deleteItem = asyncHandler(async (req, res) => {
  const id = req.user._id;

  if (id) {
    return res
      .status(status_codes.BAD_REQUEST)
      .send(prepareError({ message: messages.INVALID_ID }));
  }

  await User.findByIdAndDelete(id);
  return res
    .status(status_codes.OK)
    .send(prepareSuccess({ message: messages.DELETED }));
});

module.exports = {
  register,
  login,
  saveItem,
  getItem,
  getItems,
  getLoggedItem,
  deleteItem,
};
