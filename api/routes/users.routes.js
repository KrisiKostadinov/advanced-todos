const usersRouter = require("express").Router();

const { ruotes_constats } = require("../config/constants");
const { isGuest } = require("../config/middlewares");
const { register, login } = require("../controllers/users.controller");

usersRouter.post(ruotes_constats.users.REGISTER, isGuest, register);
usersRouter.post(ruotes_constats.users.LOGIN, isGuest, login);

module.exports = usersRouter;
