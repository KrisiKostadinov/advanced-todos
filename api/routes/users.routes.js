const usersRouter = require("express").Router();

const { routes_constants } = require("../config/constants");
const { isGuest, isAuthenticated, isAdmin } = require("../config/middlewares");
const { register, login, getUser, getAll } = require("../controllers/users.controller");

usersRouter.get(routes_constants.users.GET_ALL, isAuthenticated, isAdmin, getAll);
usersRouter.get(routes_constants.users.GET, isAuthenticated, isAdmin, getUser);

usersRouter.post(routes_constants.users.REGISTER, isGuest, register);
usersRouter.post(routes_constants.users.LOGIN, isGuest, login);

module.exports = usersRouter;
