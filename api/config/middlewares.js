const { prepareError } = require("../config/functions");
const { status_codes } = require("./constants");

const errorHandler = (err, req, res, next) => {
    if (err) {
        res.status(status_codes.SERVER_ERROR).send(prepareError(err));
    }

    next();
}

module.exports = {
    errorHandler
}
