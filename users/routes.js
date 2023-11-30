import * as dao from "./dao.js";

function UserRoutes(app) {
    // User Authentication
    const signin = async (req, res) => {
        const response = await dao.signin(req.body);
        res.json(response);
    };

    const signup = async (req, res) => {
        const response = await dao.signup(req.body);
        res.json(response);
    };

    const signout = async (req, res) => {
        const response = await dao.signout();
        res.json(response);
    };

    // Get User Info
    const findCurrentUser = async (req, res) => {
        const user = await dao.findCurrentUser();
        res.json(user);
    };

    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.id);
        res.json(user);
    };

    // Update User Profile
    const updateProfile = async (req, res) => {
        const user = await dao.updateProfile(req.params.id, req.body);
        res.json(user);
    };

    // Author Only: Get Written Reviews
    const findWrittenReviewsByUserId = async (req, res) => {
        const reviews = await dao.findWrittenReviewsByUserId(req.params.id);
        res.json(reviews);
    };

    // Reader Only: Get Liked Reviews
    const findLikedReviewsByUserId = async (req, res) => {
        const reviews = await dao.findLikedReviewsByUserId(req.params.id);
        res.json(reviews);
    };

    // Reader Only: Get Liked Books
    const findLikedBooksByUserId = async (req, res) => {
        const books = await dao.findLikedBooksByUserId(req.params.id);
        res.json(books);
    };

    // Admin Only: Get Deleted Reviews
    const findDeletedReviewsByUserId = async (req, res) => {
        const reviews = await dao.findDeletedReviewsByUserId(req.params.id);
        res.json(reviews);
    };

    // Reader Only: Add Liked Review
    const addLikedReview = async (req, res) => {
        const review = await dao.addLikedReview(req.params.id, req.body);
        res.json(review);
    };

    // Reader Only: Remove Liked Review
    const removeLikedReview = async (req, res) => {
        const review = await dao.removeLikedReview(req.params.id, req.body);
        res.json(review);
    };

    // Reader Only: Add Liked Book
    const addLikedBook = async (req, res) => {
        const book = await dao.addLikedBook(req.params.id, req.body);
        res.json(book);
    };

    // Reader Only: Remove Liked Book
    const removeLikedBook = async (req, res) => {
        const book = await dao.removeLikedBook(req.params.id, req.body);
        res.json(book);
    };

    // Author Only: Add Written Review
    const addWrittenReview = async (req, res) => {
        const review = await dao.addWrittenReview(req.params.id, req.body);
        res.json(review);
    };

    // Author & Admin Only: Remove Written Review
    const removeWrittenReview = async (req, res) => {
        const review = await dao.removeWrittenReview(req.params.id, req.body);
        res.json(review);
    };

    // Author Only: Edit Written Review
    const editWrittenReview = async (req, res) => {
        const review = await dao.editWrittenReview(req.params.id, req.body);
        res.json(review);
    };

    // Define the routes
    app.post('/api/users/signin', signin);
    app.post('/api/users/signup', signup);
    app.post('/api/users/signout', signout);
    app.get('/api/users/current', findCurrentUser);
    app.get('/api/users/:id', findUserById);
    app.put('/api/users/:id', updateProfile);
    app.get('/api/users/:id/written_reviews', findWrittenReviewsByUserId);
    app.get('/api/users/:id/liked_reviews', findLikedReviewsByUserId);
    app.get('/api/users/:id/liked_books', findLikedBooksByUserId);
    app.get('/api/users/:id/deleted_reviews', findDeletedReviewsByUserId);
    app.post('/api/users/:id/liked_reviews', addLikedReview);
    app.delete('/api/users/:id/liked_reviews', removeLikedReview);
    app.post('/api/users/:id/liked_books', addLikedBook);
    app.delete('/api/users/:id/liked_books', removeLikedBook);
    app.post('/api/users/:id/written_reviews', addWrittenReview);
    app.delete('/api/users/:id/written_reviews', removeWrittenReview);
    app.put('/api/users/:id/written_reviews', editWrittenReview);
}

export default UserRoutes;
