const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

router.use(
  morgan("common", {
    stream: fs.createWriteStream(path.join(__dirname, "../logs/all.log"), {
      flags: "a",
    }),
  })
);

module.exports = router;
