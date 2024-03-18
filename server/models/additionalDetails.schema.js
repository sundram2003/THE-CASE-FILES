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
  profileImg: {
    type: String,
  },
  contactNumber: {
    type: Number,
  },
  gender: {
    type: String,
  }
}, { timestamps: true });

export const AdditionalDetails = mongoose.model("AdditionalDetails", additionalDetailsSchema);
