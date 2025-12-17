import mongoose from "mongoose";

const UserAccessSchema = new mongoose.Schema(
  {
    user: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      email: {
        type: String,
        required: true
      }
    },
    refreshToken: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true } // otomatis menambahkan createdAt & updatedAt
);

const UserAccess = mongoose.model("UserAccess", UserAccessSchema);

export default UserAccess;