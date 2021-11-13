const { Schema, model } = require("mongoose");
/* const { schema } = require("./User.model");
 */
const threadSchema = new Schema(
  {
    title: String,
    description: String,
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
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },

  {
    timeStamps: true,
  }
);

const Thread = model("Thread", threadSchema);

module.exports = Thread;
