const { Schema, model } = require("mongoose");
/* const { schema } = require("./User.model");
 */
const threadSchema = new Schema(
  {
    title: String,
    description: String,
    categories: {
      type: String,
      enmu: ["Tech", "Gaming"],
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
