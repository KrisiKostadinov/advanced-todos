require("dotenv").config();
const jwt = require("jsonwebtoken");

const { DEVELOPMENT } = require("./constants");

const prepareSuccess = (data) => {
  return {
    success: true,
    data: data,
  };
};

const prepareError = (err) => {
  return {
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === DEVELOPMENT ? err.stack : null,
  };
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}

const response = {
  prepareSuccess,
  prepareError
};

module.exports = {
  ...response,
  verifyToken,
}
