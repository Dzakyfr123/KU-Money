import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["free", "pro", "unlimited"],
      default: "free",
    },
    password: {
      type: String,
      required: false,
      default: null, // bisa kosong untuk user login via Google
    },
    verified: {
      type: Boolean,
      default: false,
    },
    lastVerificationEmailSent: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true } // otomatis menambahkan createdAt & updatedAt
);

const User = mongoose.model("User", userSchema);

export default User;