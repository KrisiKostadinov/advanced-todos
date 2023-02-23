const usersRouter = require("express").Router();

const { register, login } = require("../controllers/users.controller");

usersRouter.post("/register", register);
usersRouter.post("/login", login);

module.exports = usersRouter;
