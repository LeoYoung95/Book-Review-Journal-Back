import * as dao from './daos.js';

function ReviewsRoutes(app) {
    // Get Trending Reviews
    const findTrendingReviews = async (req, res) => {
        const reviews = await dao.findTrendingReviews();
        res.json(reviews);
    };

    // Get Review by Review ID
    const findReviewById = async (req, res) => {
        const review = await dao.findReviewById(req.params.id);
        res.json(review);
    };

    // Get Review's Liked Users by Review ID
    const findReviewLikedUsersById = async (req, res) => {
        const users = await dao.findReviewLikedUsersById(req.params.id);
        res.json(users);
    };

    // Add to Review's Liked Users by Review ID
    const addReviewLikedUsersById = async (req, res) => {
        const response = await dao.addReviewLikedUsersById(req.params.id, req.body);
        res.json(response);
    };

    // Delete Review's Liked Users by Review ID
    const deleteReviewLikedUsersById = async (req, res) => {
        const response = await dao.deleteReviewLikedUsersById(req.params.id, req.body);
        res.json(response);
    };

    // Author Only: Post Review
    const createReview = async (req, res) => {
        const response = await dao.createReview(req.params.userId, req.body);
        res.json(response);
    };

    // Author Only: Update Review
    const updateReview = async (req, res) => {
        const response = await dao.updateReview(req.params.id, req.body);
        res.json(response);
    };

    // Author & Admin Only: Delete Review [Soft Delete]
    const deleteReview = async (req, res) => {
        const response = await dao.deleteReview(req.params.userId, req.body);
        res.json(response);
    };

    // Define the routes
    app.get('/api/reviews/trending', findTrendingReviews);
    app.get('/api/reviews/:id', findReviewById);
    app.get('/api/reviews/:id/liked_users', findReviewLikedUsersById);
    app.post('/api/reviews/:id/liked_users', addReviewLikedUsersById);
    app.delete('/api/reviews/:id/liked_users', deleteReviewLikedUsersById);
    app.post('/api/reviews/post/:userId', createReview);
    app.put('/api/reviews/:id', updateReview);
    app.put('/api/reviews/delete/:userId', deleteReview);
}

export default ReviewsRoutes;
