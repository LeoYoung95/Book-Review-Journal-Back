import ReviewModel from './model.js'; // Assuming your review model is in 'model.js'

const findTrendingReviews = async () => {
    // Fetch trending reviews, logic depends on how you define 'trending'
    const trendingReviews = await ReviewModel.find({ /* criteria for trending */ }).limit(10); // Example
    return trendingReviews;
};

const findReviewById = async (reviewId) => {
    // Fetch a review by its ID
    const review = await ReviewModel.findById(reviewId);
    return review;
};

const findReviewLikedUsersById = async (reviewId) => {
    // Fetch users who liked a specific review, assuming there's an array of user references/IDs in the review document
    const review = await ReviewModel.findById(reviewId).populate('likedUsers'); // Adjust field name as per your schema
    return review ? review.likedUsers : [];
};

const addReviewLikedUsersById = async (reviewId, user) => {
    // Add a user to the review's liked users
    const review = await ReviewModel.findById(reviewId);
    if (review) {
        review.likedUsers.push(user); // Adjust field name as per your schema
        await review.save();
    }
    return review;
};

const deleteReviewLikedUsersById = async (reviewId, userId) => {
    // Remove a user from the review's liked users
    const review = await ReviewModel.findById(reviewId);
    if (review) {
        review.likedUsers = review.likedUsers.filter(id => id.toString() !== userId); // Adjust as needed
        await review.save();
    }
    return review;
};

const createReview = async (userId, reviewData) => {
    // Create a new review
    const newReview = new ReviewModel({ ...reviewData, author: userId }); // Assuming 'author' field stores user ID
    await newReview.save();
    return newReview;
};

const updateReview = async (reviewId, reviewUpdates) => {
    // Update a review
    const updatedReview = await ReviewModel.findByIdAndUpdate(reviewId, reviewUpdates, { new: true });
    return updatedReview;
};

const deleteReview = async (reviewId) => {
    // Soft delete a review, assuming there's a 'deleted' or similar field
    const deletedReview = await ReviewModel.findByIdAndUpdate(reviewId, { deleted: true }, { new: true });
    return deletedReview;
};

export {
    findTrendingReviews,
    findReviewById,
    findReviewLikedUsersById,
    addReviewLikedUsersById,
    deleteReviewLikedUsersById,
    createReview,
    updateReview,
    deleteReview
};
