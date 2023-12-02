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
    enum: ['Author', 'Reader', 'ADMIN'], // Define roles as an enumeration
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
  profilePic: String // Use camelCase for JavaScript properties
}, { timestamps: true });

// Middleware to hash password before saving if it's been modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});


export default userSchema;