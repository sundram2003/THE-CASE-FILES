import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiConnector } from "../apiconnector";
import { logout } from "./authAPI";
// import { setLoading } from "../slices/authSlice";
import { toast } from "react-hot-toast";
import { settingsEndpoints } from "../apis";

const { GET_USER_DETAILS_API, UPDATE_PROFILE_API, DELETE_PROFILE_API } =
  settingsEndpoints;

// getting all userDetails
export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (token) => {
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      console.log("fetching user details api", response);
      return response.data.user;
    } catch (error) {
      console.log("fetching user details api", error);

      throw error.response ? error.response.data : error.message;
    }
  }
);

// update user details
export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      });
      console.log("UPDATE_PROFILE_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      // const userImage = response.data.updatedUserDetails.image
      //   ? response.data.updatedUserDetails.image
      //   : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`;
      // dispatch(setUser({ ...response.data.updatedUserDetails ,image:userImage}));
      toast.success(response.data.message);
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error);
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
  };
}

// DELETE PROFILE
export function deleteAccount(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log("DELETE_PROFILE_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success(response.data.message);
      dispatch(logout(navigate));
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error);
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
  };
}
