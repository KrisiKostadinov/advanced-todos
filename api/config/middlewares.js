const errorHandler = (err, req, res, next) => {
    if (err) {
        res.status(500).send({ message: err.message, success: false });
    }

    next();
}

module.exports = {
    errorHandler
}
