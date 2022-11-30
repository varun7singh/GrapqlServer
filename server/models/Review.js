const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  suggestion: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

module.exports = mongoose.model("Review", ReviewSchema);
