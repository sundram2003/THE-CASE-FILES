import mongoose from "mongoose";
import { mailSender } from '../utils/mailSender.js';
import { generateOTPTemplate } from "../mail/templates/otpVerification.js";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: false,
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
// Define a function to send emails
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email CredLock_Homes",
      generateOTPTemplate(otp),
    )
      .then((result) => console.log('Email sent...', result))
      .catch((error) => console.log(error.message));
    console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

otpSchema.pre('save', async function (next) {
  console.log("New document saved to the database");
  // Only send an email when a new document is created
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
    console.log("Email: ", this.email)
  }
  next();
});

export const OTP = mongoose.model("OTP", otpSchema);