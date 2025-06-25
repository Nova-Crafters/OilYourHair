const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    product: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
    highlight: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    helpfulCount: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Review', reviewSchema);