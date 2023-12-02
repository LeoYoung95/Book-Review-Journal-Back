import BookModel from './model.js'; // Assuming your book model is in 'model.js'

const findBookByMongoId = async (mongoId) => {
    // Fetch a book by its MongoDB ID
    const book = await BookModel.findById(mongoId);
    return book;
};

const findBookByOpenLibraryId = async (olid) => {
    // Fetch a book by its Open Library ID
    const book = await BookModel.findOne({ olid: olid }); // Updated to match the schema field name
    return book;
};

const findBookReviewsByOpenLibraryId = async (olid) => {
    // Fetch reviews for a book by its Open Library ID
    const book = await BookModel.findOne({ olid: olid }).populate('reviews'); // Updated to match the schema field name
    return book ? book.reviews : [];
};

const findBookLikedUsersByOpenLibraryId = async (olid) => {
    // Fetch users who liked a book by its Open Library ID
    const book = await BookModel.findOne({ olid: olid }).populate('likedUsers'); // Updated to match the schema field name
    return book ? book.likedUsers : [];
};

export {
    findBookByMongoId,
    findBookByOpenLibraryId,
    findBookReviewsByOpenLibraryId,
    findBookLikedUsersByOpenLibraryId
};
