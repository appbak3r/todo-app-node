const mongoose = require("mongoose");

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/todos";

module.exports = mongoose.createConnection(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

