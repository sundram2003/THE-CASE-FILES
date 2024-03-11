import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: 0
  }],
  downvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: 0
  }],
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog"
  },
  reply: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }],
}, { timestamps: true });

export const Comment = mongoose.model("Comment", commentSchema);
