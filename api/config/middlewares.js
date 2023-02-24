const { prepareError, verifyToken } = require("../config/functions");
const { status_codes, messages, ROLE_ADMINISTRATIOR } = require("./constants");

const errorHandler = (err, req, res, next) => {
  if (err) {
    res.status(status_codes.SERVER_ERROR).send(prepareError(err));
  }

  next();
};

const isAuthenticated = (req, res, next) => {
  const token_data = req.headers.authorization;
  if (!token_data) {
    res
      .status(status_codes.NOT_AUTHORIZED)
      .send(prepareError({ message: messages.NOT_AUTHORIZED }));
    return;
  }

  const splittedToken = token_data.split("Bearer ");
  const token = splittedToken[1];

  const decodedUser = verifyToken(token);

  if (!decodedUser) {
    res
      .status(status_codes.NOT_AUTHORIZED)
      .send(prepareError({ message: messages.NOT_AUTHORIZED }));
  }

  req.user = decodedUser;
  next();
};

const isGuest = (req, res, next) => {
  const token_data = req.headers.authorization;

  if (token_data) {
    const splittedToken = token_data.split("Bearer ");
    const token = splittedToken[1];

    if (verifyToken(token)) {
      res
        .status(status_codes.BAD_REQUEST)
        .send(prepareError({ message: messages.YOU_MUST_BE_LOGGED_OUT }));
      return;
    }
  }

  next();
};

const isAdmin = (req, res, next) => {
  if (!req.user.role_as === ROLE_ADMINISTRATIOR) {
    res
      .status(status_codes.NOT_AUTHORIZED)
      .send(prepareError({ message: messages.NOT_AUTHORIZED }));
  }

  next();
};

module.exports = {
  errorHandler,
  isAuthenticated,
  isGuest,
  isAdmin,
};
