import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        bio: String,
        role: {
            type: String,
            enum: ['Author', 'Reader', 'Admin'], // Define roles as an enumeration
            required: true
        },
        likedReviews: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }],
        likedBooks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }],
        profilePicId: [{
            type: String,
            required: false,
            enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        }],
    },

    {timestamps: true});


export default userSchema;
