import mongoose from "mongoose";

const additionalDetailsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  dob: {
    type: Date,
  },
  about: {
    type: String,
    trim: true
  },
  contributions: {
    type: Number,
    default: 0
  },
  profileImg: {
    type: String,
  },
  contactNumber: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ["Male,Female,Other"],
  }
}, { timestamps: true });

const additionalDetails = mongoose.model("AdditionalDetails", additionalDetailsSchema);
export default additionalDetails;