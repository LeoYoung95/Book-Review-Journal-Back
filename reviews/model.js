import mongoose from "mongoose";
import schema from "./schema.js";
const ReviewModel = mongoose.model("Review", schema);
export default ReviewModel;

