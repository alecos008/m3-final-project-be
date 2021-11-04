const { Schema, model } = require("mongoose");
/* const { schema } = require("./User.model");
 */

const productSchema = new Schema(
  {
    name: String,
    image: String,
    description: String,
    price: Number,
    category: {
      type: String,
      enum: ["Tech", "Gaming"],
    },
    stock: {
      type: Number,
      min: 1,
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },

  {
    timeStamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
