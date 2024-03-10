import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import { combineReducers } from "@reduxjs/toolkit";
const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
});
export default rootReducer;
