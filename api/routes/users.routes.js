const usersRouter = require("express").Router();

const { routes_constants } = require("../config/constants");
const { isGuest } = require("../config/middlewares");
const { register, login } = require("../controllers/users.controller");

usersRouter.post(routes_constants.users.REGISTER, isGuest, register);
usersRouter.post(routes_constants.users.LOGIN, isGuest, login);

module.exports = usersRouter;
