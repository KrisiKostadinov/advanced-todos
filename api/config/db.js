const mongoose = require("mongoose");

mongoose.set('strictQuery', true);

module.exports = mongoose.connect(process.env.MONGO_URL);