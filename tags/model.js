import mongoose from "mongoose";
import schema from './schema.js';
const TagModel = mongoose.model('Tag', schema);
export default TagModel;