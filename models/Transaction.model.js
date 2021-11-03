const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    price: Number,
    sellerLocation: String,
    buyerLocation: String,
  },
  {
    timestamps: true,
  }
);

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;
