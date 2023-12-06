import BookModel from './model.js'; // Assuming your book model is in 'model.js'

const findBookByMongoId = async (mongoId) => {
    // Fetch a book by its MongoDB ID
    const book = await BookModel.findById(mongoId);
    return book;
};

const findBookByOpenLibraryId = async (olid) => {
    // Fetch a book by its Open Library ID
    const book = await BookModel.findOne({olid: olid}); // Updated to match the schema field name
    return book;
};

const findBookReviewsByOpenLibraryId = async (olid) => {
    // Fetch reviews for a book by its Open Library ID
    const book = await BookModel.findOne({olid: olid}).populate('reviews'); // Updated to match the schema field name
    return book ? book.reviews : [];
};


const createReviewByOpenLibraryId = async (olid, reviewId) => {
    // Add a review to a book by its Open Library ID, if the book does not exist, it will be created
    const book = await BookModel.findOne({olid: olid}); // Updated to match the schema field name
    if (book) {
        book.reviews.push(reviewId);
        await book.save();
    } else {
        const newBook = new BookModel({olid: olid, reviews: [reviewId]}); // Updated to match the schema field name
        await newBook.save();
    }
    return book;
}

const addNewBookByOpenLibraryId = async (olid) => {
    // Add a new book by its Open Library ID, if the book does not exist, it will be created
    const book = await BookModel.findOne({olid: olid});
    if (book) {
        return book;
    } else {
        const newBook = new BookModel({olid: olid}); // Updated to match the schema field name
        await newBook.save();
        return newBook;
    }
}

export {
    findBookByMongoId,
    findBookByOpenLibraryId,
    findBookReviewsByOpenLibraryId,
    createReviewByOpenLibraryId,
    addNewBookByOpenLibraryId
};





