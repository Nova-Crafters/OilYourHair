const Review = require('../models/Review');

// Get reviews with pagination
exports.getReviews = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const reviews = await Review.find()
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit);
        const total = await Review.countDocuments();
        
        res.json({
            reviews,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalReviews: total
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new review
exports.createReview = async (req, res) => {
    try {
        const review = new Review({
            name: req.body.name,
            rating: req.body.rating,
            product: req.body.product,
            text: req.body.text,
            highlight: req.body.highlight
        });

        const newReview = await review.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update helpful count
exports.updateHelpfulCount = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        review.helpfulCount += 1;
        const updatedReview = await review.save();
        res.json(updatedReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};