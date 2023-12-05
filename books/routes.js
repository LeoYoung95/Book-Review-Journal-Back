import * as dao from './daos.js';

function BooksRoutes(app) {
    // Route to get a book by its MongoDB ID
    app.get('/api/books/:mongo_id', async (req, res) => {
        const book = await dao.findBookByMongoId(req.params.mongo_id);
        res.json(book);
    });

    // Route to get a book by its Open Library ID
    app.get('/api/books/olid/:olid', async (req, res) => {
        const book = await dao.findBookByOpenLibraryId(req.params.olid);
        res.json(book);
    });

    // Route to get the reviews of a book by its Open Library ID
    app.get('/api/books/olid/:olid/reviews', async (req, res) => {
        const reviews = await dao.findBookReviewsByOpenLibraryId(req.params.olid);
        res.json(reviews);
    });

    // Route to get the users who liked a book by its Open Library ID
    app.get('/api/books/olid/:olid/liked_users', async (req, res) => {
        const users = await dao.findBookLikedUsersByOpenLibraryId(req.params.olid);
        res.json(users);
    });

    // Route to post a new review for a book by its Open Library ID
    app.post('/api/books/olid/:olid/reviews', async (req, res) => {
        const response = await dao.createReviewByOpenLibraryId(req.params.olid, req.body.reviewID);
        res.json(response);
    });
}

export default BooksRoutes;
