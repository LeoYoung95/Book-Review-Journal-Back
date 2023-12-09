import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        },
    ],
}, { timestamps: true });

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;