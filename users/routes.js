import * as dao from "./daos.js";

function UsersRoutes(app) {
    // Error handling wrapper
    const wrapAsync = (fn) => (req, res, next) => {
        fn(req, res, next).catch(next);
    };

    // User Authentication
    app.post('/api/users/signin', wrapAsync(async (req, res) => {
        const user = await dao.signin(req.body);
        res.status(200).json(user);
    }));

    app.post('/api/users/signup', wrapAsync(async (req, res) => {
        const newUser = await dao.signup(req.body);
        res.status(201).json(newUser);
    }));

    app.post('/api/users/signout', wrapAsync(async (req, res) => {
        const response = await dao.signout();
        res.status(200).json(response);
    }));

    // Get User Info
    app.get('/api/users/current', wrapAsync(async (req, res) => {
        const user = await dao.findCurrentUser(req.sessionToken); // Adjust to use actual session token
        res.status(200).json(user);
    }));

    app.get('/api/users/:id', wrapAsync(async (req, res) => {
        const user = await dao.findUserById(req.params.id);
        res.status(200).json(user);
    }));

    // Update User Profile
    app.put('/api/users/:id', wrapAsync(async (req, res) => {
        const updatedUser = await dao.updateProfile(req.params.id, req.body);
        res.status(200).json(updatedUser);
    }));

    // Author Only: Get Written Reviews
    app.get('/api/users/:id/written_reviews', wrapAsync(async (req, res) => {
        const reviews = await dao.findWrittenReviewsByUserId(req.params.id);
        res.status(200).json(reviews);
    }));

    // Reader Only: Get Liked Reviews
    app.get('/api/users/:id/liked_reviews', wrapAsync(async (req, res) => {
        const reviews = await dao.findLikedReviewsByUserId(req.params.id);
        res.status(200).json(reviews);
    }));

    // Reader Only: Get Liked Books
    app.get('/api/users/:id/liked_books', wrapAsync(async (req, res) => {
        const books = await dao.findLikedBooksByUserId(req.params.id);
        res.status(200).json(books);
    }));

    // Admin Only: Get Deleted Reviews
    app.get('/api/users/:id/deleted_reviews', wrapAsync(async (req, res) => {
        const reviews = await dao.findDeletedReviewsByUserId(req.params.id);
        res.status(200).json(reviews);
    }));

    // Reader Only: Add Liked Review
    app.post('/api/users/:id/liked_reviews', wrapAsync(async (req, res) => {
        const review = await dao.addLikedReview(req.params.id, req.body);
        res.status(201).json(review);
    }));

    // Reader Only: Remove Liked Review
    app.delete('/api/users/:id/liked_reviews', wrapAsync(async (req, res) => {
        const response = await dao.removeLikedReview(req.params.id, req.body.reviewId);
        res.status(200).json(response);
    }));

    // Reader Only: Add Liked Book
    app.post('/api/users/:id/liked_books', wrapAsync(async (req, res) => {
        const book = await dao.addLikedBook(req.params.id, req.body);
        res.status(201).json(book);
    }));

    // Reader Only: Remove Liked Book
    app.delete('/api/users/:id/liked_books', wrapAsync(async (req, res) => {
        const response = await dao.removeLikedBook(req.params.id, req.body.bookId);
        res.status(200).json(response);
    }));

    // Author Only: Add Written Review
    app.post('/api/users/:id/written_reviews', wrapAsync(async (req, res) => {
        const review = await dao.addWrittenReview(req.params.id, req.body);
        res.status(201).json(review);
    }));

    // Author & Admin Only: Remove Written Review
    app.delete('/api/users/:id/written_reviews', wrapAsync(async (req, res) => {
        const response = await dao.removeWrittenReview(req.params.id, req.body.reviewId);
        res.status(200).json(response);
    }));

    // Author Only: Edit Written Review
    app.put('/api/users/:id/written_reviews', wrapAsync(async (req, res) => {
        const review = await dao.editWrittenReview(req.params.id, req.body.reviewId, req.body);
        if (review) {
            res.status(200).json(review);
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    }));

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(err.status || 500).json({ error: err.message });
    });
}

export default UsersRoutes;
