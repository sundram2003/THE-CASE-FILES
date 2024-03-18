import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    index: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  token: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,//used during password reset token
  },
  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdditionalDetails"
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User"
  },
  following: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User"
  },
  blogs: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Blog"
  },
  isModerator: {
    type: Boolean,
    default: false
  },
  contributions: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
