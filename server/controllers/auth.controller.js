// Desc: Auth Controller
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { OTP } from "../models/otp.model.js";
import { AdditionalDetails } from "../models/additionalDetails.schema.js";
import { cryptoRandomStringAsync } from "crypto-random-string";
import { mailSender } from "../utils/mailSender.js";
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
      specialChars: false, //only numbers
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
    const {
      username,
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      otp,
    } = req.body;
    //2. Perform Validation -> all fields filled
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !firstName ||
      !lastName ||
      !otp
    ) {
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
  } catch (error) {
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
    userDetails = await User.findOne({ email: loginCred }).populate(
      "additionalDetails"
    );
    if (!userDetails) {
      //if not email then username
      userDetails = await User.findOne({ username: loginCred }).populate(
        "additionalDetails"
      );
    }
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not registered",
      });
    }
    //4. generate JWT tokens after password matching
    const isPasswordValid = await bcrypt.compare(
      password,
      userDetails.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }
    //5. create Cookie and send Response
    const payload = {
      id: userDetails._id,
      role: userDetails.role,
      username: userDetails.username,
      email: userDetails.email,
      contributions: userDetails.contributions,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    userDetails.token = token;
    userDetails.password = undefined;

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expiresIn: new Date(Date.now() + 2 * 60 * 60 * 1000), //2 hours
    });
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      data: userDetails,
    });
  } catch (error) {
    console.log("Error in loginController: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errorMessage: error.message,
    });
  }
};

export const getAllUserDeatils = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findById(userId)
      .populate("additionalDetails")
      .populate("followers")
      .populate("following")
      .populate("blogs")
      .exec();
    return res.status(200).json({
      success: true,
      message: "All Users fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    console.log("Error in getAllUserDeatils: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errorMessage: error.message,
    });
  }
};

//resetPassword
export const resetPassword = async (req, res) => {
  try {
    //fetch data
    //validation
    //get user details
    //if no entry -> invalid token
    //token time check
    //hash password
    //password update
    //return response

    //fetch data
    const { password, confirmPassword, token } = req.body; //token is inserted in body by frontend
    //validation
    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Password and Confrim Password Doesn't match ",
      });
    }
    console.log("token is : ", token);
    //get user details
    const userDetails = await User.findOne({ token: token });
    //if no entry -> invalid token
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is invalid",
      });
    }
    //token time check
    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.status(403).json({
        success: false,
        message: `Token is Expired, Please Regenerate Your Token`,
      });
    }
    //hash password
    const encryptedPassword = await bcrypt.hash(password, 10);
    //password update
    await User.findOneAndUpdate(
      { token: token },
      { password: encryptedPassword },
      { new: true }
    ); //with this new:true -> updated data is returned

    //return response
    return res.status(200).json({
      success: true,
      message: "Password reset Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Some Error in Updating the Password`,
    });
  }
};
// //change password
export const changePassword = async (req, res) => {
  //steps->>>
  //1.get data from req.body
  //2.get oldPassword , newpassword , confirmNewPassword
  //3. perfom validation
  //4. update password in DB
  //5. send Mail -> changed password
  //6. return response
  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id);

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    console.log(userDetails);
    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    console.log(isPasswordMatch);
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res.status(401).json({
        success: false,
        message: "The password is incorrect",
      });
    }

    //Match new password and confirm new password
    if (newPassword !== confirmNewPassword) {
      // If new password and confirm new password do not match, return a 400 (Bad Request) error
      return res.status(400).json({
        success: false,
        message: "The password and confirm password does not match",
      });
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password Changed",
        `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}
        </br>For email: ${updatedUserDetails.email}`
      );
      console.log("Email sent successfully:", emailResponse.response);
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};

// resetPasswordToken
export const resetPasswordToken = async (req, res) => {
  //get email from bdoy
  //check usr for this email , email validation
  //generate token
  //update user by adding token and expiration time
  //create url
  //send mail containing url
  //return response

  try {
    //get email from bdoy
    const { email } = req.body;
    console.log(email);
    //check usr for this email , email validation
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      return res.json({
        success: false,
        message: "User is not Registered with this email",
      });
    }
    //generate token -> this token will be inserted in DB and then using this token
    //we will get the user and then reset the password
    const token = await cryptoRandomStringAsync({
      length: 20,
      type: "url-safe",
    });
    //converts hexadecimal to string
    //for example "36b8f84d-df4e-4d49-b662-bcde71a8764f"
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000, //5 min
      },
      { new: true }
    ); //with this new:true -> updated data is returned

    // we are running our frontend on port 3000 so we use 3000 in url
    const frontend = process.env.FRONTEND_LINK;
    console.log("DETAILS", updatedDetails);
    //create url
    const url = `${frontend}/update-password/${token}`;

    //send mail containing url
    await mailSender(
      email,
      "Password Reset",
      `Your Link for email verification is ${url}. Please click this url to reset your password.`
    );

    //return response
    return res.status(200).json({
      success: true,
      message:
        "Email sent successfully . Please check Email and Change password",
      token,
    });
  } catch (error) {
    console.log("Error in ResetPassword Token : ", error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went Wrong in ResetPasswordToken",
    });
  }
};
