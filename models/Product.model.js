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
      enum: [
        "Mobile, Computers & Devices",
        "Consoles & Videogames",
        "Fashion",
        "Sports & Outdoors",
        "Home & Garden",
        "Health & Beauty",
        "Cinema, Books & Music",
        "Vehicles & Motor",
        "Art & Collectibles",
        "Toys & Kids",
      ],
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
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
