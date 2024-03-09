import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog"
  }]
}, { timestamps: true });

export const Category = mongoose.model("Category", categorySchema);