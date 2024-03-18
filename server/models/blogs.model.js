import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  content: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  views: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  status: {
    type: String,
    enum: ["Draft", "Published"],
    default: "Draft",
    required: true
  },
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: []
  }],
  downvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: []
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  coverImg: {
    type: String,
  },
  tags: [{
    type: String,
  }],
  slug: {
    type: String,
    required: true,
    text: true,
    index: true,
  }
}, { timestamps: true });

blogSchema.index({ slug: "text" });

export const Blog = mongoose.model("Blog", blogSchema);
