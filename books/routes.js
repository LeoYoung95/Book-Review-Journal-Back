import * as dao from './daos.js';

function BooksRoutes(app) {
    // Route to get all books
    app.get('/api/books', async (req, res) => {
        const books = await dao.findAllBooks();
        res.json(books);
    });

    // Route to get a book by its MongoDB ID
    app.get('/api/books/:id', async (req, res) => {
        const book = await dao.findBookByMongoId(req.params.id);
        res.json(book);
    });
    
    // Route to get a book by its Open Library ID
    app.get('/api/books/olid/:olid', async (req, res) => {
        const book = await dao.findBookByOpenLibraryId(req.params.olid);
        res.json(book);
    });

    // Route to add a new book by its Open Library ID, if the book does not exist, it will be created
    app.post('/api/books/olid/:olid', async (req, res) => {
        const response = await dao.addNewBookByOpenLibraryId(req.params.olid);
        res.json(response);
    });

    // Route to post a new review for a book by its Open Library ID, if the book does not exist, it will be created
    app.post('/api/books/olid/:olid/reviews', async (req, res) => {
        const response = await dao.createReviewByOpenLibraryId(req.params.olid, req.body.reviewID);
        res.json(response);
    });

    // Route to delete a book by its Open Library ID [Hard Delete]
    app.delete('/api/books/olid/:olid/reviews', async (req, res) => {
        const response = await dao.deleteBookByOpenLibraryId(req.params.olid, req.body.reviewID);
        res.json(response);
    });

    // Route to add a user to a book's liked users by ID
    app.post('/api/books/olid/:olid/liked_users', async (req, res) => {
        const response = await dao.addBookLikedUsersById(req.params.olid, req.body.userId);
        res.json(response);
    });

    // Route to delete a user from a book's liked users by ID
    app.delete('/api/books/olid/:olid/liked_users', async (req, res) => {
        const response = await dao.deleteBookLikedUsersById(req.params.olid, req.body.userId);
        res.json(response);
    });
}

export default BooksRoutes;
