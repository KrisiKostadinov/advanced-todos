const usersRouter = require("express").Router();

const { ruotes_constats } = require("../config/constants");
const { register, login } = require("../controllers/users.controller");

usersRouter.post(ruotes_constats.users.REGISTER, register);
usersRouter.post(ruotes_constats.users.LOGIN, login);

module.exports = usersRouter;
