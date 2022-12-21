const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
    },
    username: {
      type: String,
      min: 3,
      max: 20,
      unique: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
