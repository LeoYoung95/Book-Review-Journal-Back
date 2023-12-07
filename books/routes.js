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
}

export default BooksRoutes;
