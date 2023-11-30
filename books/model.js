import mongoose from "mongoose";
import schema from "./schema.js";
const BookModel = mongoose.model("books", schema);
export default BookModel;

