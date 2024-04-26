import mongoose from "mongoose";

//defining Schema

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
});

// Model
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
