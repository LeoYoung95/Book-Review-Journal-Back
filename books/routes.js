import * as dao from './daos.js';

function BooksRoutes(app) {
    // Get Book by Mongo Book ID
    const findBookByMongoId = async (req, res) => {
        const book = await dao.findBookByMongoId(req.params.mongo_id);
        res.json(book);
    };

    // Get Book by Open Library Book ID
    const findBookByOpenLibraryId = async (req, res) => {
        const book = await dao.findBookByOpenLibraryId(req.params.olid);
        res.json(book);
    };

    // Get Book's Reviews by Open Library Book ID
    const findBookReviewsByOpenLibraryId = async (req, res) => {
        const reviews = await dao.findBookReviewsByOpenLibraryId(req.params.olid);
        res.json(reviews);
    };

    // Get Book's Liked Users by Open Library Book ID
    const findBookLikedUsersByOpenLibraryId = async (req, res) => {
        const users = await dao.findBookLikedUsersByOpenLibraryId(req.params.olid);
        res.json(users);
    };

    // Define the routes
    app.get('/api/books/:mongo_id', findBookByMongoId);
    app.get('/api/books/olid/:olid', findBookByOpenLibraryId);
    app.get('/api/books/olid/:olid/reviews', findBookReviewsByOpenLibraryId);
    app.get('/api/books/olid/:olid/liked_users', findBookLikedUsersByOpenLibraryId);
}

export default BooksRoutes;
