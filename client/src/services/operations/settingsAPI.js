import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiConnector } from "../apiconnector";
import { logout } from "./authAPI";
// import { setLoading } from "../slices/authSlice";
import { toast } from "react-hot-toast";
import { settingsEndpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";

const {
  GET_USER_DETAILS_API,
  UPDATE_PROFILE_API,
  DELETE_PROFILE_API,
  GET_USER_BY_USERNAME_API,
  Follow_USER_API,
  UNFOLLOW_USER_API,
  CHANGE_PASSWORD_API,
} = settingsEndpoints;

// getting all userDetails
export const fetchUserDetails = async (token) => {
  try {
    const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    console.log("fetching user details api", response);
    return response.data;
  } catch (error) {
    console.log("fetching user details api", error);

    throw error.response ? error.response.data : error.message;
  }
};

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

// GetUser By username
export const getUserByUsername = async (username, token) => {
  try {
    const response = await apiConnector(
      "GET",
      `${GET_USER_BY_USERNAME_API}/${username}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("User by Username API RESPONSE: ", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch User by Username");
    }

    const user = response?.data;
    return user;
  } catch (error) {
    console.error("Error fetching user by username:", error);
    throw error;
  }
};

// follow user
export const followUser = async (username, token) => {
  const toastId = toast.loading("Loading...");
  let success = false;
  let result = null;
  console.log("iinside follow user");
  try {
    const response = await apiConnector(
      "PUT",
      Follow_USER_API,
      { username },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("Follow User API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Follow User");
    }

    toast.success(response.data.message);
    success = true;
    result = response;
  } catch (error) {
    success = false;
    console.log("Follow User API ERROR............", error);
    toast.error(error.message);
    return success;
  }
  toast.dismiss(toastId);
  return result;
};

//unfollow user
export const unfollowUser = async (username, token) => {
  const toastId = toast.loading("Loading...");
  let success = false;
  let result = null;
  try {
    const response = await apiConnector(
      "PUT",
      UNFOLLOW_USER_API,
      { username },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("Unfollow User API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Unfollow User");
    }

    toast.success(response.data.message);
    success = true;
    result = response;
  } catch (error) {
    success = false;
    console.log("Unfollow User API ERROR............", error);
    toast.error(error.message);
    return success;
  }
  toast.dismiss(toastId);
  return result;
};

export async function changePassword(token, formData) {
  console.log("formdata", formData);
  const toastId = toast.loading("Loading...");
  // const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
  //   Authorization: `Bearer ${token}`,
  // });
  // console.log("CHANGE_PASSWORD_API API RESPONSE............", response);
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success(response.data.message);
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
}
