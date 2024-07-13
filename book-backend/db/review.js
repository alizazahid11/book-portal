// models/Review.js

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  reviewText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model('Reviews', reviewSchema);

module.exports = Review;
