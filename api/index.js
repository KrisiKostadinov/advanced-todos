require("dotenv").config();
const colors = require("colors");
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const connection = require("./config/db.js");
const { errorHandler } = require("./config/middlewares.js");

const { usersRouter } = require("./routes/index.js");
const {
  DEVELOPMENT,
  messages,
  ruotes_constats,
} = require("./config/constants.js");

const PORT = process.env.PORT || 3000;

connection
  .then(() => {
    if (process.env.NODE_ENV === DEVELOPMENT) {
      console.log(colors.green(messages.CONNECTED_TO_DB));
    }
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(
      morgan("common", {
        stream: fs.createWriteStream(path.join(__dirname, "logs/all.log"), {
          flags: "a",
        }),
      })
    );

    // routes

    app.get("/", (req, res) => {
      res.send(messages.SERVER_WORKS);
    });
    app.use(`${ruotes_constats.users.INITIAL}`, usersRouter);

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
