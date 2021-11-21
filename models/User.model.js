const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    password: String,
    profilePic: {
      type: String,
      default: "https://bootdey.com/img/Content/avatar/avatar7.png",
    },
    email: {
      type: String,
      unique: true,
    },
    city: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
