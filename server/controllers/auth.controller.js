// Desc: Auth Controller
import otpGenerator from "otp-generator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { OTP } from '../models/otp.model.js';
import { AdditionalDetails } from '../models/additionalDetails.model.js';
export const sendOtp = async (req, res) => {
  try {
    //fetch user's email from req.body
    //check whether email is present or not
    //create otp
    //save in db
    //return response

    //fetch user's email from req.body
    const { email } = req.body;
    //check whether email is present or not
    const checkUserPresent = await User.findOne({ email: email });
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already exists. Please Login",
      });
    }
    //create otp -> only 6 digit number
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,//only numbers
    });
    const result = await OTP.findOne({ otp: otp });
    //check whether otp is unqiue or not -> brute force
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    //save in db
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log("OTP Saved in DB", otpBody);
    //return response
    return res.status(201).json({
      success: true,
      message: "OTP sent successfully",
      otp: otp,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errorMessage: error.message,
    });
  }
};
export const registerController = async (req, res) => {
  try {
    /*1. Fetch data from req.body
    2. Perform Validation -> all fields filled
    3. check password and confirm password matches?
    4. Check user Already Exit?
    5 . find most recent otp from the database
    6. Validate OTP
    7. hash the password
    8. create user and additionalDetails entry in db
    9. return response
    */
    //1. Fetch data from req.body
    const { username, email, password, confirmPassword, firstName, lastName, otp } = req.body;
    //2. Perform Validation -> all fields filled
    if (!email || !password || !confirmPassword || !firstName || !lastName || !otp) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }
    //3. check password and confirm password matches?
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password does not match",
      });
    }
    //4. Check user Already Exit?
    const checkUserPresent = await User.findOne({ email: email });
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already exists. Please Login",
      });
    }
    //5 . find most recent otp from the database
    const recentOtp = await OTP.findOne({ email: email })
      .sort({ createdAt: -1 })
      .limit(1);
    //6. Validate OTP
    if (recentOtp.otp == null || recentOtp.size == 0) {
      return res.status(404).json({
        success: false,
        message: "OTP NOT FOUND IN DB",
      });
    }
    if (recentOtp.otp !== otp) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    //7. hash the password
    const saltRound = 10;
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, saltRound);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error in hashig the password",
        errorMessage: error.message,
      });
    }
    //8. create user and additionalDetails entry in db
    const additionalDetails = await AdditionalDetails.create({
      dob: null,
      about: "",
      contributions: 0,
      profileImg: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
      contactNumber: null,
      gender: null,
    });
    const userPayload = {
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      additionalDetails: additionalDetails._id,
    };
    const user = await User.create(userPayload);
    //9. return response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in hashig the password",
      errorMessage: error.message,
    });
  }
};
export const loginController = async (req, res) => {
  try {
    //Steps ->
    /*
      1. fetch data from req.body
      2. perform validation
      3. check user registered or not
      4. generate JWT tokens after password matching
      5. create Cookie and send Response
    */
    //1. fetch data from req.body
    const { loginCred, password } = req.body;
    //2. perform validation
    if (!loginCred || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }
    //3. check user registered or not
    //assume it's email first
    let userDetails;
    userDetails = await User.findOne({ email: loginCred }).populate("additionalDetails");
    if (!userDetails) {
      //if not email then username
      userDetails = await User.findOne({ username: loginCred }).populate("additionalDetails");
    }
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not registered",
      });
    }
    //4. generate JWT tokens after password matching
    const isPasswordValid = await bcrypt.compare(password, userDetails.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }
    //5. create Cookie and send Response
    const payload = {
      userId: userDetails._id,
      role: userDetails.role,
      username: userDetails.username,
      email: userDetails.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token);
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: userDetails,
    });
  } catch (error) {
    console.log('Error in loginController: ', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      errorMessage: error.message
    });
  }
}


