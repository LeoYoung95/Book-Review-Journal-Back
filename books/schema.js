import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  olid: { 
    type: String,
    required: true,
    unique: true
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
}, { timestamps: true });

export default bookSchema;

