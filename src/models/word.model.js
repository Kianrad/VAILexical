const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wordModelSchema = new Schema({
  word: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model("NLWord", wordModelSchema);
