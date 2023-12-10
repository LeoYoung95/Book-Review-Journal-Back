import ReviewModel from './model.js';

const findAllReviews = async () => {
    // Fetch all reviews
    const reviews = await ReviewModel.find();
    return reviews;
}

const findReviewById = async (reviewId) => {
    // Fetch a review by its ID
    const review = await ReviewModel.findById(reviewId);
    return review;
};


const findReviewLikedUsersById = async (reviewId) => {
    // Fetch users who liked a specific review
    const review = await ReviewModel.findById(reviewId).populate('likedUsers');
    return review ? review.likedUsers : [];
};

const addReviewLikedUsersById = async (reviewId, userId) => {
    // Add a user to the review's liked users
    const review = await ReviewModel.findById(reviewId);
    if (review) {
        review.likedUsers.push(userId);
        await review.save();
    }
    return review;
};

const deleteReviewLikedUsersById = async (reviewId, userId) => {
    // Remove a user from the review's liked users
    const review = await ReviewModel.findById(reviewId);
    if (review) {
        review.likedUsers = review.likedUsers.filter(id => id !== null && id.toString() !== userId);
        await review.save();
    }
    return review;
};

const createReview = async (reviewData) => {
    // Create a new review
    const newReview = new ReviewModel(reviewData);
    await newReview.save();
    return newReview;
};

const updateReview = async (reviewId, reviewUpdates) => {
    // Update a review
    const updatedReview = await ReviewModel.findByIdAndUpdate(reviewId, reviewUpdates, {new: true});
    return updatedReview;
};

const deleteReview = async (reviewId, deletedBy) => {
    // Soft delete a review
    const deletedReview = await ReviewModel.findByIdAndUpdate(reviewId, {
        is_deleted: true, deleted_by: deletedBy
    }, {new: true});
    return deletedReview;
};

const recoverReview = async (reviewId) => {
    // Recover a soft-deleted review
    const recoveredReview = await ReviewModel.findByIdAndUpdate(reviewId, {
        is_deleted: false, deleted_by: null
    });
    return recoveredReview;
};

const hardDeleteReview = async (reviewId) => {
    // Hard delete a review
    const deletedReview = await ReviewModel.findByIdAndDelete(reviewId);
    return deletedReview;
};

const addTagsToReview = async (reviewId, tagIds) => {
    // Add tags to a review
    const review = await ReviewModel.findById(reviewId);
    if (review) {
        review.tags = [...new Set([...review.tags, ...tagIds])];
        await review.save();
    }
    return review;
}


export {
    findReviewById,
    findReviewLikedUsersById,
    addReviewLikedUsersById,
    deleteReviewLikedUsersById,
    createReview,
    updateReview,
    deleteReview,
    recoverReview,
    findAllReviews,
    hardDeleteReview,
    addTagsToReview
};
