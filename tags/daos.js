import TagModel from './model.js';

const findUserById = async (tagId) => {
  const tag = await TagModel.findById(tagId);
  if (!tag) {
    throw new Error('Tag not found');
  }
  return tag;
}

export { findUserById };
