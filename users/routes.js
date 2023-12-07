import * as dao from "./daos.js";

function UsersRoutes(app) {
    // Error handling wrapper
    const wrapAsync = (fn) => (req, res, next) => {
        fn(req, res, next).catch(next);
    };

    // User Authentication
    app.post('/api/users/signin', wrapAsync(async (req, res) => {
        const user = await dao.signIn(req.body);
        req.session.user = user; // Store user in session
        res.status(200).json(user);
    }));

    app.post('/api/users/signup', wrapAsync(async (req, res, next) => {
        try {
            const newUser = await dao.signUp(req.body);
            req.session.user = newUser; // Store new user in session
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }));

    app.post('/api/users/signout', wrapAsync(async (req, res) => {
        req.session.destroy((err) => { // Destroy the session
            if (err) {
                res.status(500).json({ error: 'Error signing out' });
            } else {
                res.status(200).json({ message: 'Signed out successfully' });
            }
        });
    }));

    // Get Current User Info
    app.get('/api/users/current', wrapAsync(async (req, res) => {
        if (!req.session.user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        const user = await dao.findUserById(req.session.user.id);
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


    // Reader Only: Add Liked Review
    app.post('/api/users/:id/liked_reviews', wrapAsync(async (req, res) => {
        const review = await dao.addLikedReview(req.params.id, req.body.reviewId);
        res.status(201).json(review);
    }));

    // Reader Only: Remove Liked Review
    app.delete('/api/users/:id/liked_reviews', wrapAsync(async (req, res) => {
        const response = await dao.removeLikedReview(req.params.id, req.body.reviewId);
        res.status(200).json(response);
    }));


    // Author Only: Add Written Review
    app.post('/api/users/:id/written_reviews', wrapAsync(async (req, res) => {
        const review = await dao.addWrittenReview(req.params.id, req.body.reviewId);
        res.status(201).json(review);
    }));

    // Admin Only: Remove Written Review [Hard Delete]
    app.delete('/api/users/:id/written_reviews', wrapAsync(async (req, res) => {
        const response = await dao.removeWrittenReview(req.params.id, req.body.reviewId);
        res.status(200).json(response);
    }));


    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error(err.stack);
        // If the error is an instance of Error, send its message. Otherwise, send a generic message
        const message = err instanceof Error ? err.message : 'Internal Server Error';
        res.status(err.status || 500).json({ error: message });
    });
}

export default UsersRoutes;
