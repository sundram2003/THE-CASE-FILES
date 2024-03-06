import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
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
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
    required: true
  },
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: 0
  }],
  downvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: 0
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }],
  category: {
    type: String,
    enum: ["technology", "lifestyle", "food", "travel", "fashion", "fitness", "health"],
    required: true
  },
  coverImg: {
    type: String,
  },
  tags: {
    type: [String],
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;