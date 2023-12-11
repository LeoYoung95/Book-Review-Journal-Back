import * as dao from './daos.js';

function ReviewsRoutes(app) {

    // Get All Reviews
    app.get('/api/reviews', async (req, res) => {
        const reviews = await dao.findAllReviews();
        res.json(reviews);
    });

    // Get Review by Review ID
    app.get('/api/reviews/:id', async (req, res) => {
        const review = await dao.findReviewById(req.params.id);
        res.json(review);
    });

    // Get Review's Liked Users by Review ID
    app.get('/api/reviews/:id/liked_users', async (req, res) => {
        const users = await dao.findReviewLikedUsersById(req.params.id);
        res.json(users);
    });

    // Add to Review's Liked Users by Review ID
    app.post('/api/reviews/:id/liked_users', async (req, res) => {
        const response = await dao.addReviewLikedUsersById(req.params.id, req.body.userId);
        res.json(response);
    });

    // Delete Review's Liked Users by Review ID
    app.delete('/api/reviews/:id/liked_users', async (req, res) => {
        const response = await dao.deleteReviewLikedUsersById(req.params.id, req.body.userId);
        res.json(response);
    });

    // Author Only: Post Review
    app.post('/api/reviews/post', async (req, res) => {
        const response = await dao.createReview(req.body);
        res.json(response);
    });

    // Author Only: Update Review
    app.put('/api/reviews/:id', async (req, res) => {
        const response = await dao.updateReview(req.params.id, req.body);
        res.json(response);
    });

    // Author Only: Add Tags to Review
    app.post('/api/reviews/:id/tags', async (req, res) => {
        const response = await dao.addTagsToReview(req.params.id, req.body.tagIds);
        res.json(response);
    });

    // Author & Admin Only: Soft Delete Review
    app.put('/api/reviews/delete/:id', async (req, res) => {
        const response = await dao.deleteReview(req.params.id, req.body.deletedBy);
        res.json(response);
    });

    // Admin Only: Recover Review
    app.put('/api/reviews/recover/:id', async (req, res) => {
        const response = await dao.recoverReview(req.params.id);
        res.json(response);
    });

    // Admin Only: Hard Delete Review
    app.delete('/api/reviews/:id', async (req, res) => {
        const response = await dao.hardDeleteReview(req.params.id);
        res.json(response);
    });
}

export default ReviewsRoutes;
