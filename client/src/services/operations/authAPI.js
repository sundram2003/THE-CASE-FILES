import React from "react";
import { endpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { toast } from "react-hot-toast";
import { setUser } from "../../slices/profileSlice";
import { setLoading, setToken } from "../../slices/authSlice";
const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSWORD_API,
  RESETPASSTOKEN_API,
} = endpoints;
export function sendOtp(email, navigate) {
  console.log("sendOtp", email);
  return async (dispatch) => {
    const toastId = toast.loading("loading...");
    console.log("loading...");
    dispatch(setLoading(true));
    console.log("after loading...", email);
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });
      console.log("Send otp api response", response);
      if (!response.data.success) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }
      console.log("otp sent successfully", response.data);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signup(
  firstName,
  lastName,
  email,
  password,
  username,
  confirmPassword,
  otp,
  navigate
) {
  console.log("signup", email, password);
  return async (dispatch) => {
    const toastId = toast.loading("loading...");
    console.log("loading...");
    dispatch(setLoading(true));
    console.log("after loading...", email, password);
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        username,
        confirmPassword,
        otp,
      });
      console.log("Signup api response", response);
      if (!response.data.success) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }
      console.log("signup successful", response.data);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      console.log("SignUp API error", error);
      toast.error(error.response?.data?.message || "Something went wrong");
      navigate("/register");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

//make the login api cll
export function login(loginCred, password, navigate) {
  console.log("inside login", loginCred, password);
  return async (dispatch) => {
    const toastId = toast.loading("loading...");
    console.log("loading...");
    dispatch(setLoading(true));
    console.log("after loading...", loginCred, password);
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        loginCred,
        password,
      });
      console.log("Login api response", response);
      if (!response.data.success) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }
      console.log("login successful", response.data);
      toast.success(response.data.message);
      dispatch(setToken(response.data.token));
      const userImage = response.data.data.additionalDetails.profileImg
        ? response.data.data.additionalDetails.profileImg
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;
      dispatch(setUser({ ...response.data.user, img: userImage }));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.data));
      console.log("user", response.data.data);
      navigate("/dashboard/my-profile");
      toast.success(response.data.message);
    } catch (error) {
      console.log("Login API error", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };
}

export function getPasswordResetToken(email, setEmailSent) {
  console.log("inside reset passwordToken api");
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      // const hardcodedApiUrl = "https://api.example.com/resetPasswordToken";
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });
      console.log("API response ", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Email sent succesfully");
      setEmailSent(true);
    } catch (error) {
      console.log("error in resetPassword", error);
      toast.error("Failed to sent otp");
    }
    dispatch(setLoading(false));
  };
}
export function resetPassword(password, confirmPassword, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });

      console.log("RESET Password RESPONSE ... ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
    } catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
    }
    dispatch(setLoading(false));
  };
}
