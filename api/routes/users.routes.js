const usersRouter = require("express").Router();

const { isGuest, isAuthenticated } = require("../config/middlewares");
const {
  register,
  login,
  getItem,
  getItems,
  getLoggedItem,
  saveItem,
  deleteItem,
} = require("../controllers/users.controller");

usersRouter.get("/all", isAuthenticated, getItems);
usersRouter.get("/:id", isAuthenticated, getItem);
usersRouter.get("/", isAuthenticated, getLoggedItem);

usersRouter.post("/register", isGuest, register);
usersRouter.post("/login", isGuest, login);
usersRouter.post("/", isAuthenticated, saveItem);

usersRouter.delete("/", isAuthenticated, deleteItem);

module.exports = usersRouter;
