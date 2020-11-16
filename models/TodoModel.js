const mongoose = require("mongoose");
const mongodb = require('../config/mongodb');

const todoSchema = new mongoose.Schema({
    description: mongoose.Schema.Types.String,
    done: mongoose.Schema.Types.Boolean,
});

const TodoModel = mongodb.model("Todo", todoSchema);

module.exports = TodoModel;
