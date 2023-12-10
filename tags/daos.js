import TagModel from './model.js';

const findTagById = async (tagId) => {
    const tag = await TagModel.findById(tagId);
    if (!tag) {
        throw new Error('Tag not found');
    }
    return tag;
}
const findAllTags = async () => {
    return TagModel.find();
};

const createTag = async (tag) => {
    // check if tag already exists
    const ifExist = await TagModel.findOne({label: tag.label});
    if (ifExist) {
        throw new Error('Tag already exists');
    }
    return TagModel.create(tag);
}

const addReviewToTag = async (tagId, reviewId) => {
    const tag = await findTagById(tagId);
    // check if review already exists
    const ifExist = tag.reviews.find(id => id.toString() === reviewId);
    if (ifExist) {
        throw new Error('Review already exists');
    }
    tag.reviews.push(reviewId);
    return tag.save();
}

const removeReviewFromTag = async (tagId, reviewId) => {
    const tag = await findTagById(tagId);
    tag.reviews = tag.reviews.filter(id => id !== null && id.toString() !== reviewId);
    return tag.save();
}

export {
    findTagById,
    findAllTags,
    addReviewToTag,
    createTag,
    removeReviewFromTag
};
