import UserModel from './model.js';
import bcrypt from 'bcryptjs';

const signIn = async (credentials) => {
    const user = await UserModel.findOne({ email: credentials.email });
    if (!user) {
        throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(credentials.password, user.password);
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

const addLikedReview = async (userId, reviewId) => {
    // Add a review to the user's liked reviews
    const user = await UserModel.findById(userId);
    user.likedReviews.push(reviewId); // Adjust based on actual schema structure
    await user.save();
    return { message: 'LikedReview Added Successfully' };
};

const removeLikedReview = async (userId, reviewId) => {
    // Remove a review from the user's liked reviews
    const user = await UserModel.findById(userId);
    user.likedReviews = user.likedReviews.filter(r => r.toString() !== reviewId);
    await user.save();
    return { message: 'LikedReview Removed Successfully' };
};

const addLikedBook = async (userId, bookId) => {
    // Add a book to the user's liked books
    const user = await UserModel.findById(userId);
    user.likedBooks.push(bookId);
    await user.save();
    return { message: 'LikedBook Added Successfully' };

}

const removeLikedBook = async (userId, bookId) => {
    // Remove a book from the user's liked books
    const user = await UserModel.findById(userId);
    user.likedBooks = user.likedBooks.filter(b => b.toString() !== bookId);
    await user.save();
    return { message: 'LikedBook Removed Successfully' };

}

const addWrittenReview = async (userId, reviewId) => {
    // Add a written review to the user's profile
    const user = await UserModel.findById(userId);
    user.writtenReviews.push(reviewId); // Adjust based on actual schema structure
    await user.save();
    return { message: ' New Written review posted successfully' };
};


const removeWrittenReview = async (userId, reviewId) => {

    const user = await UserModel.findById(userId);

    // Convert each ObjectId in writtenReviews to a string for comparison
    user.writtenReviews = user.writtenReviews.filter(r => r.toString() !== reviewId);
    await user.save();

    return { message: 'Review removed successfully' };
};

const addDeletedReview = async (userId, reviewId) => {
    // Add a deleted review to the admin's profile
    const user = await UserModel.findById(userId);
    user.deletedReviews.push(reviewId); // Adjust based on actual schema structure
    await user.save();
    return { message: 'Deleted review added successfully' };
}

const removeDeletedReview = async (userId, reviewId) => {
    // Remove a deleted review from the admin's profile
    const user = await UserModel.findById(userId);
    user.deletedReviews = user.deletedReviews.filter(r => r.toString() !== reviewId);
    await user.save();
    return { message: 'Deleted review removed successfully' };
}



export {
    signIn,
    signUp,
    findUserById,
    updateProfile,
    addLikedReview,
    removeLikedReview,
    addLikedBook,
    removeLikedBook,
    addWrittenReview,
    removeWrittenReview,
    addDeletedReview,
    removeDeletedReview
};
