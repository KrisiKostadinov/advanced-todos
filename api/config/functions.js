require("dotenv").config();
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

const response = {
  prepareSuccess,
  prepareError,
};

module.exports = response;
