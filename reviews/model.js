import mongoose from "mongoose";
import schema from "./schema.js";
const ReviewModel = mongoose.model("reviews", schema);
export default ReviewModel;

