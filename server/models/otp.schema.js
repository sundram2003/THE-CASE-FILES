import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60//5 minutes
  }

});
const OTP = mongoose.model("OTP", otpSchema);
export default OTP;