const { Schema, Model } = require("mongoose");
/* const { userSchema } = require("./User.model");
const { threadSchema } = require("./Thread.model");
 */
const commentSchema = new Schema(
  {
    threadId: {
      type: Schema.Types.ObjectId,
      ref: "Thread",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    description: String,
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
