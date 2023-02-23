require("dotenv").config();
const colors = require("colors");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { errorHandler } = require("./config/middlewares.js");
const logger = require("./config/logger.js");

const { usersRouter } = require("./routes/index.js");
const uploadController = require("./controllers/upload.controller.js");

const connection = require("./config/db.js");

const {
  DEVELOPMENT,
  messages,
  routes_constants,
} = require("./config/constants.js");

const PORT = process.env.PORT || 3000;

connection
  .then(() => {
    if (process.env.NODE_ENV === DEVELOPMENT) {
      console.log(colors.green(messages.CONNECTED_TO_DB));
    }
    const app = express();

    // middlewares
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use("static", express.static("public"));
    app.use(logger);

    // routes
    app.get("/", (req, res) => {
      res.send(messages.SERVER_WORKS);
    });
    app.use(routes_constants.upload, uploadController);
    app.use(`${routes_constants.users.INITIAL}`, usersRouter);

    app.use(errorHandler);

    app.listen(PORT, () => {
      if (process.env.NODE_ENV === DEVELOPMENT) {
        console.log(
          colors.green(`${messages.SERVER_STARTED} ${colors.yellow(PORT)}`)
        );
      }
    });
  })
  .catch((error) => {
    if (process.env.NODE_ENV === DEVELOPMENT) {
      console.log(colors.red(messages.CONNECTION_ERROR));
      console.log(colors.red(error));
    }
  });
