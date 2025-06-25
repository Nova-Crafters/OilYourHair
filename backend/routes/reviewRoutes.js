const express = require('express');
const router = express.Router();
const { 
    getReviews, 
    createReview, 
    updateHelpfulCount 
} = require('../controllers/reviewController');

router.route('/')
    .get(getReviews)
    .post(createReview);

router.patch('/:id/helpful', updateHelpfulCount);

module.exports = router;