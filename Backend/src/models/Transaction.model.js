import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    createdBy: {
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
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    note: {
      type: String,
      default: "",
      trim: true
    },
    paymentDate: {
      type: Date,
      required: true
    },
    categorySnapshot: {
      type: String,
      default: null,
      trim: true
    },
    accountSnapshot: {
      type: String,
      default: null,
      trim: true
    }
  },
  { timestamps: true } // otomatis menambahkan createdAt & updatedAt
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;