const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");

module.exports.createReview = async (req, res) => {
    try {
        let listing = await Listing.findById(req.params.id);

        if (!listing) {
            req.flash("error", "Listing not found!");
            return res.redirect("/listings");
        }

        let newReview = new Review(req.body.review);
        newReview.author = req.user._id;
        listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();

        req.flash("success", "New Review Created!");
        res.redirect(`/listings/${listing.id}`);
    } catch (error) {
        req.flash("error", "Something went wrong!");
        res.redirect(`/listings/${req.params.id}`);
    }
};

module.exports.deleteReview = async (req, res) => {
    try {
        let { id, reviewId } = req.params;
        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);

        req.flash("success", "Review Deleted!");
        res.redirect(`/listings/${id}`);
    } catch (error) {
        req.flash("error", "Something went wrong!");
        res.redirect(`/listings/${req.params.id}`);
    }
};
