import mongoose from "mongoose";
import schema from "./schema.js";
const UserModel = mongoose.model("users", schema);
export default UserModel;

