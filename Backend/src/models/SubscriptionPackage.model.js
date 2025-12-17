import mongoose from "mongoose";

const SubscriptionPackageSchema = new mongoose.Schema(
  {
    package: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: Number,
      required: true
    },
    account: {
      type: Number,
      required: true
    },
    incomes: {
      type: Number,
      required: true
    },
    expenses: {
      type: Number,
      required: true
    },
    operation: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  { timestamps: true } // otomatis menambahkan createdAt & updatedAt
);

const SubscriptionPackage = mongoose.model("SubscriptionPackage", SubscriptionPackageSchema);

export default SubscriptionPackage;
