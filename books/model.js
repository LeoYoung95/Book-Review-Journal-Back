import mongoose from "mongoose";
import schema from "./schema.js";
const BookModel = mongoose.model("Book", schema);
export default BookModel;

