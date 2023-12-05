import UserModel from './model.js';
import bcrypt from 'bcryptjs';

const signIn = async (credentials) => {
    const user = await UserModel.findOne({ email: credentials.email });
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(credentials.password, user.password);
    console.log("credentials.password (Unhashed): " + credentials.password);
    console.log("user.password: " + user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    return user;
};

const signUp = async (credentials) => {
    const existingUser = await UserModel.findOne({ email: credentials.email });
    if (existingUser) {
        throw new Error('Email already in use');
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(credentials.password, 10); // 10 is the number of salt rounds
    credentials.password = hashedPassword;

    const newUser = new UserModel(credentials);
    await newUser.save();
    return newUser;
};

const signOut = async () => {
    // SignOut logic (Note: Usually handled on the client/session side)
    return { message: 'Signout successful' };
};

const findCurrentUser = async (sessionToken) => {
    // Replace with your session management logic
    const currentUser = await UserModel.findOne({ sessionToken });
    if (!currentUser) {
        throw new Error('Current user not found');
    }

    return currentUser;
};

const findUserById = async (userId) => {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    return user;
};

const updateProfile = async (userId, userUpdates) => {
    if (userUpdates.password) {
        throw new Error('Cannot update password directly');
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, userUpdates, { new: true });
    if (!updatedUser) {
        throw new Error('User not found');
    }

    return updatedUser;
};

const findWrittenReviewsByUserId = async (userId) => {
    // Assuming reviews are stored within the user document
    const user = await UserModel.findById(userId);
    return user.writtenReviews;
};

const findLikedReviewsByUserId = async (userId) => {
    // Fetch liked reviews of the user
    const user = await UserModel.findById(userId);
    return user.likedReviews;
};

const findLikedBooksByUserId = async (userId) => {
    // Fetch liked books of the user
    const user = await UserModel.findById(userId);
    return user.likedBooks;
};

const findDeletedReviewsByUserId = async (userId) => {
    // Fetch deleted reviews of the user, assuming there's a field for it
    const user = await UserModel.findById(userId);
    return user.deletedReviews; // Modify based on actual field name
};

const addLikedReview = async (userId, review) => {
    // Add a review to the user's liked reviews
    const user = await UserModel.findById(userId);
    user.likedReviews.push(review); // Adjust based on actual schema structure
    await user.save();
    return review;
};

const removeLikedReview = async (userId, reviewId) => {
    // Remove a review from the user's liked reviews
    const user = await UserModel.findById(userId);
    user.likedReviews = user.likedReviews.filter(r => r._id !== reviewId); // Adjust based on actual schema structure
    await user.save();
    return { message: 'Review removed successfully' };
};

const addLikedBook = async (userId, book) => {
    // Add a book to the user's liked books
    const user = await UserModel.findById(userId);
    user.likedBooks.push(book); // Adjust based on actual schema structure
    await user.save();
    return book;
};

const removeLikedBook = async (userId, bookId) => {
    // Remove a book from the user's liked books
    const user = await UserModel.findById(userId);
    user.likedBooks = user.likedBooks.filter(b => b._id !== bookId); // Adjust based on actual schema structure
    await user.save();
    return { message: 'Book removed successfully' };
};

const addWrittenReview = async (userId, review) => {
    // Add a written review to the user's profile
    const user = await UserModel.findById(userId);
    user.writtenReviews.push(review); // Adjust based on actual schema structure
    await user.save();
    return review;
};

const removeWrittenReview = async (userId, reviewId) => {
    // Remove a written review from the user's profile
    const user = await UserModel.findById(userId);
    user.writtenReviews = user.writtenReviews.filter(r => r._id !== reviewId); // Adjust based on actual schema structure
    await user.save();
    return { message: 'Review removed successfully' };
};

const editWrittenReview = async (userId, reviewId, reviewUpdates) => {
    // Edit a written review in the user's profile
    const user = await UserModel.findById(userId);
    const index = user.writtenReviews.findIndex(r => r._id === reviewId);
    if (index !== -1) {
        user.writtenReviews[index] = { ...user.writtenReviews[index], ...reviewUpdates };
        await user.save();
        return user.writtenReviews[index];
    } else {
        return null;
    }
};

export {
    signIn,
    signUp,
    signOut,
    findCurrentUser,
    findUserById,
    updateProfile,
    findWrittenReviewsByUserId,
    findLikedReviewsByUserId,
    findLikedBooksByUserId,
    findDeletedReviewsByUserId,
    addLikedReview,
    removeLikedReview,
    addLikedBook,
    removeLikedBook,
    addWrittenReview,
    removeWrittenReview,
    editWrittenReview,
};
