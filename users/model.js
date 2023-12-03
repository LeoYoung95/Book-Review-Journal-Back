import mongoose from "mongoose";
import schema from "./schema.js";
const UserModel = mongoose.model("User", schema);
export default UserModel;

