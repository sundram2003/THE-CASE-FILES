const BASE_URL = "http://localhost:4000/api/v1";
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendOtp",
  SIGNUP_API: BASE_URL + "/auth/register",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
};

export const settingsEndpoints = {
  // CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword",
  DELETE_PROFILE_API: BASE_URL + "/auth/deleteAccount",
  GET_USER_DETAILS_API: BASE_URL + "/auth/getAllUserDetails",
  HANDLE_SEARCH_API: BASE_URL + "/profile/handleSearch",
  BLOCK_USER_API: BASE_URL + "/profile/blockUser",
  UNBLOCK_USER_API: BASE_URL + "/profile/unblockUser",
  GET_USER_BY_USERNAME_API: BASE_URL + "/auth/getUserByUsername",
  Follow_USER_API: BASE_URL + "/auth/followUser",
  UNFOLLOW_USER_API: BASE_URL + "/auth/unfollowUser",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword",
};

export const blogEndpoints = {
  CREATE_BLOG_API: BASE_URL + "/blog/create",
  GET_ALL_BLOGS_API: BASE_URL + "/blog/getallBlogs",
  GET_ALL_MY_BLOGS_API: BASE_URL + "/blog/getmyBlogs",
  GET_BLOG_API: BASE_URL + "/blog/getBlogs",
  UPVOTE_BLOG: BASE_URL + "/blog/upvote",
  DOWNVOTE_BLOG: BASE_URL + "/blog/downvote",
  GET_BLOG_COMMENTS: BASE_URL + "/blog/getBlogComments",
  // ADD_BLOG_COMMENT: BASE_URL + "/blog/addBlogComment",
  GET_ALL_UPVOTED_BLOGS: BASE_URL + "/blog/getBlogsByUpvote",
  GET_ALL_RECENT_BLOGS: BASE_URL + "/blog/getallBlogs",
  DELETE_BLOG_API: BASE_URL + "/blog/delete",
  UPDATE_BLOG_API: BASE_URL + "/blog/update",
  GET_ALL_CATEGORY_API: BASE_URL + "/category/getAllCategories",
  GET_COMMENTS_BY_BLOG_ID: BASE_URL + "/blog/getCommentsByBlogId",
  ADD_COMMENTS_API: BASE_URL + "/blog/addComment",
  SEARCH_BLOG_API: BASE_URL + "/blog/getBlogsByTitle",
  ADD_MODERATOR_API: BASE_URL + "/auth/addModerator",
  REMOVE_MODERATOR_API: BASE_URL + "/auth/removeModerator",
  DELETE_COMMENT_API: BASE_URL + "/blog/deleteComment",
  UPDATE_BLOGView_API: BASE_URL + "/blog/updateView",
  GET_USER_ANALYTICS: BASE_URL + "/auth/userAnalytics",
};
