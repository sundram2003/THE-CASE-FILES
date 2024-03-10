import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  userDetails: null,
  loading: false,
  error: null,
  searchResult: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setUserDetails(state, action) {
      state.userDetails = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    setSearchResult(state, action) {
      state.searchResult = action.payload;
    },
  },
});
export const {
  setUser,
  setUserDetails,
  setLoading,
  setError,
  clearError,
  setSearchResult,
} = profileSlice.actions;
export default profileSlice.reducer;
