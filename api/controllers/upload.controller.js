const multer = require("multer");
const { messages, paths } = require("../config/constants");
const { prepareSuccess } = require("../config/functions");
const uploadController = require("express").Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, paths.UPLOADS);
    },
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}-${Date.now()}.png`);
    },
  }),
}).single("avatar");

uploadController.post("/", upload, (req, res) => {
  res.send(prepareSuccess({  message: messages.FILE_UPLOADED }));
});

module.exports = uploadController;
