import BookModel from './model.js'; // Assuming your book model is in 'model.js'

const findBookByMongoId = async (mongoId) => {
    // Fetch a book by its MongoDB ID
    const book = await BookModel.findById(mongoId);
    return book;
};

const findBookByOpenLibraryId = async (olid) => {
    // Fetch a book by its Open Library ID
    // Assuming 'openLibraryId' is a field in your book schema
    const book = await BookModel.findOne({ openLibraryId: olid });
    return book;
};

const findBookReviewsByOpenLibraryId = async (olid) => {
    // Fetch reviews for a book by its Open Library ID
    // This assumes that reviews are either embedded in the book document or referenced
    const book = await BookModel.findOne({ openLibraryId: olid }).populate('reviews'); // Adjust field name as per your schema
    return book ? book.reviews : [];
};

const findBookLikedUsersByOpenLibraryId = async (olid) => {
    // Fetch users who liked a book by its Open Library ID
    // Assuming there's an array of user references/IDs in the book document
    const book = await BookModel.findOne({ openLibraryId: olid }).populate('likedUsers'); // Adjust field name as per your schema
    return book ? book.likedUsers : [];
};

export {
    findBookByMongoId,
    findBookByOpenLibraryId,
    findBookReviewsByOpenLibraryId,
    findBookLikedUsersByOpenLibraryId
};
