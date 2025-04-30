const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware.js")
const reviewController = require("../controllers/reviews.js")

//Post Reviews route
router.post(
    "/", 
    isLoggedIn, 
    validateReview, 
    wrapAsync(reviewController.createReview)
);

//Delete Review Route
router.delete(
    "/:reviewId", 
    isLoggedIn, 
    isReviewAuthor, 
    wrapAsync(reviewController.deleteReview)
);

module.exports = router;