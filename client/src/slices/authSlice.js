import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  signupData: null,
  loading: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      try {
        state.token = JSON.parse(value.payload);
      } catch (error) {
        console.error("Error parsing token:", error);
        state.token = null;
      }
    },
  },
});

export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;
