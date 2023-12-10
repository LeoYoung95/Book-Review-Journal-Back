import * as dao from './daos.js';

function TagsRoutes(app) {
    const wrapAsync = (fn) => (req, res, next) => {
        fn(req, res, next).catch(next);
    }

    // Get All Tags
    app.get('/api/tags', wrapAsync(async (req, res) => {
        const tags = await dao.findAllTags();
        res.json(tags);
    }));

    // Get Tag by Tag ID
    app.get('/api/tags/:id', wrapAsync(async (req, res) => {
        const response = await dao.findTagById(req.params.id);
        res.json(response);
    }));

    // Add a new Tag
    app.post('/api/tags', wrapAsync(async (req, res) => {
        const response = await dao.createTag(req.body);
        res.json(response);
    }));

    // Add a new Review to an existing Tag
    app.post('/api/tags/:id/reviews', wrapAsync(async (req, res) => {
        const response = await dao.addReviewToTag(req.params.id, req.body.reviewId);
        res.json(response);
    }));

    // Remove a Review from an existing Tag [Hard Delete]
    app.delete('/api/tags/:id/reviews', wrapAsync(async (req, res) => {
        const response = await dao.removeReviewFromTag(req.params.id, req.body.reviewId);
        res.json(response);
    }));
}


export default TagsRoutes;