import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { blogEndpoints } from "../apis";

const {
  CREATE_BLOG_API,
  GET_ALL_BLOGS_API,
  GET_BLOG_API,
  DOWNVOTE_BLOG,
  UPVOTE_BLOG,
  UPDATE_BLOG_API,
  GET_ALL_MY_BLOGS_API,
  GET_ALL_RECENT_BLOGS,
  GET_ALL_CATEGORY_API,
  GET_ALL_UPVOTED_BLOGS,
  ADD_COMMENTS_API,
  GET_COMMENTS_BY_BLOG_ID,
  SEARCH_BLOG_API,
  ADD_MODERATOR_API,
  REMOVE_MODERATOR_API,
  DELETE_BLOG_API,
  DELETE_COMMENT_API,
  UPDATE_BLOGView_API,
  GET_USER_ANALYTICS,
} = blogEndpoints;

// create blog
export const createBlog = async (data, token) => {
  console.log("data in create blog", data);
  const response = await apiConnector("POST", CREATE_BLOG_API, data, {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  });
  try {
    console.log("response in create blog", response);
    const blogData = response;
    console.log("blogData", blogData);
    if (response) toast.success(blogData.data.message);
    if (!blogData?.data?.success) {
      throw new Error("Could Not Create Blog");
    }
    return blogData.data;
  } catch (error) {
    console.log("CREATE BLOG API ERROR............", error);
    toast.error(response.data.message);
    throw error;
  }
};

// get all category
export const getAllCategory = async () => {
  try {
    const response = await apiConnector("GET", GET_ALL_CATEGORY_API, null, {
      //   Authorization: `Bearer ${token}`,
    });
    console.log("GET ALL CATEGORY API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch All Category");
    }
    return response?.data;
  } catch (error) {
    console.log("GET ALL CATEGORY API ERROR............", error);
    throw error;
  }
};
// get all blogs
export const getAllBlogs = async () => {
  try {
    const response = await apiConnector("GET", GET_ALL_BLOGS_API, null, {
      //   Authorization: `Bearer ${token}`,
    });
    console.log("GET ALL BLOGS API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch All Blogs");
    }
    toast.success(response.data.message);
    return response?.data;
  } catch (error) {
    console.log("GET ALL BLOGS API ERROR............", error);
    throw error;
  }
};

// get single blog
export const getSingleBlog = async (id, token) => {
  try {
    const response = await apiConnector("GET", `${GET_BLOG_API}/${id}`, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("GET SINGLE BLOG API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Single Blog");
    }
    return response?.data;
  } catch (error) {
    console.log("GET SINGLE BLOG API ERROR............", error);
    throw error;
  }
};

// like blog
export const likeBlog = async (blogId, token) => {
  const toastId = toast.loading("Loading...");
  let success = false;
  let result = null;
  try {
    const response = await apiConnector(
      "PUT",
      UPVOTE_BLOG,
      { blogId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("Like Blog API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Like Blog");
    }

    toast.success(response.data.message);
    success = true;
    result = response;
  } catch (error) {
    success = false;
    console.log("Like Blog API ERROR............", error);
    toast.error(error.message);
    return success;
  }
  toast.dismiss(toastId);
  return result;
};

// dislike blog
export const dislikeBlog = async (blogId, token) => {
  const toastId = toast.loading("Loading...");
  let success = false;
  let result = null;
  try {
    const response = await apiConnector(
      "PUT",
      DOWNVOTE_BLOG,
      { blogId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("Dislike Blog API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Dislike Blog");
    }

    toast.success(response.data.message);
    success = true;
    result = response;
  } catch (error) {
    success = false;
    console.log("Dislike Blog API ERROR............", error);
    toast.error(error.message);
    return success;
  }

  toast.dismiss(toastId);
  return result;
};

// get all my blogs
export const getMyBlogs = async (token) => {
  try {
    const response = await apiConnector("GET", GET_ALL_MY_BLOGS_API, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("GET ALL MY BLOGS API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch All My Blogs");
    }
    return response?.data;
  } catch (error) {
    console.log("GET ALL MY BLOGS API ERROR............", error);
    throw error;
  }
};

// update blog
// update blog
export const updateBlog = async (
  blogId,
  title,
  content,
  status,
  category,
  prevCategory,
  tags,
  coverImg,
  token
) => {
  try {
    console.log("coverImg", coverImg);
    const response = await apiConnector(
      "PUT",
      `${UPDATE_BLOG_API}/${blogId}`,
      {
        title,
        content,
        status,
        category,
        prevCategory,
        tags,
        coverImg,
      },
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("UPDATE BLOG API RESPONSE............", response);
    if (!response?.data?.success) {
      toast.success(response.data.message);
      throw new Error("Could Not Update Blog");
    }
    return response?.data;
  } catch (error) {
    console.log("UPDATE BLOG API ERROR............", error);
    throw error;
  }
};

export const fetchMostRecentBlogs = async (token) => {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_RECENT_BLOGS, // Replace with your API endpoint for fetching recent blogs
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("Getting fetchMostRecentBlogs API", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Most Recent Blogs");
    }

    result = response?.data?.mostRecentBlogs;
  } catch (error) {
    console.log("GET_MOST_RECENT_BLOGS_API API ERROR............", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

export const fetchMostVotedBlogs = async (token) => {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_UPVOTED_BLOGS, // Replace with your API endpoint for fetching most voted blogs
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("Getting fetchMostVotedBlogs API", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Most Voted Blogs");
    }

    result = response?.data?.mostVotedBlogs;
  } catch (error) {
    console.log("GET_MOST_VOTED_BLOGS_API API ERROR............", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

export const getCommentsByBlogId = async (id, token) => {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const response = await apiConnector(
      "GET",
      `${GET_COMMENTS_BY_BLOG_ID}/${id}`, // Replace with your API endpoint for fetching comments by blog ID
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("Getting getCommentsByBlogId API", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Comments by Blog ID");
    }

    result = response?.data?.comments;
  } catch (error) {
    console.log("GET_COMMENTS_BY_BLOG_ID_API API ERROR............", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

//add comments
export const addComments = async (blogId, content, token) => {
  const toastId = toast.loading("Loading...");
  let success = false;
  let result = null;
  try {
    const response = await apiConnector(
      "PUT",
      `${ADD_COMMENTS_API}/${blogId}`,
      { content },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("Add Comments API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Add Comments");
    }

    toast.success(response.data.message);
    success = true;
    return (result = response);
  } catch (error) {
    success = false;
    console.log("Add Comments API ERROR............", error);
    toast.error(error.message);
    return success;
  }

  toast.dismiss(toastId);
  return result;
};

export const getBlogbyTitle = async (title, token) => {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const response = await apiConnector(
      "GET",
      `${SEARCH_BLOG_API}/${title}`, // Replace with your API endpoint for fetching most voted blogs
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("Getting getBlogbyTitle API", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Blog by Title");
    }

    result = response?.data;
  } catch (error) {
    console.log("GET_BLOG_BY_TITLE_API API ERROR............", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

//delete blog
export const deleteBlog = async (blogId, token) => {
  let success = false;

  try {
    const response = await apiConnector(
      "DELETE",
      DELETE_BLOG_API,
      { blogId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("Delete Blog API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Delete Blog");
    }

    toast.success(response.data.message);
    success = true;
    return response;
  } catch (error) {
    success = false;
    console.log("Delete Blog API ERROR............", error);
    toast.error(error.message);
    return success;
  }
};

//delete comment
export const deleteComment = async (commentId, token) => {
  let success = false;

  try {
    const response = await apiConnector(
      "DELETE",
      DELETE_COMMENT_API,
      { commentId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("Delete Comment API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Delete Comment");
    }

    toast.success(response.data.message);
    success = true;
    return response;
  } catch (error) {
    success = false;
    console.log("Delete Comment API ERROR............", error);
    toast.error(error.message);
    return success;
  }
};

//adding moderator
export const addModeratorAPI = async (username, token) => {
  let success = false;
  let result = null;
  try {
    const response = await apiConnector(
      "PUT",
      ADD_MODERATOR_API,
      { username },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("Add Moderator API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Add Moderator");
    }

    toast.success(response.data.message);
    success = true;
    return response;
  } catch (error) {
    success = false;
    console.log("Add Moderator API ERROR............", error);
    toast.error(error.message);
    return success;
  }
};

//removeing from moderator
export const removeModeratorAPI = async (username, token) => {
  // const toastId = toast.loading("Loading...");
  let success = false;
  let result = null;
  try {
    const response = await apiConnector(
      "PUT",
      REMOVE_MODERATOR_API,
      { username },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("Remove Moderator API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Remove Moderator");
    }

    toast.success(response.data.message);
    success = true;
    return response;
  } catch (error) {
    success = false;
    console.log("Remove Moderator API ERROR............", error);
    toast.error(error.message);
    return success;
  }
};

//update view
export const updateView = async (blogId, token) => {
  let success = false;

  try {
    const response = await apiConnector(
      "PUT",
      UPDATE_BLOGView_API,
      { blogId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("Update View API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Update View");
    }

    toast.success(response.data.message);
    success = true;
    return response;
  } catch (error) {
    success = false;
    console.log("Update View API ERROR............", error);
    toast.error(error.message);
    return success;
  }
};

//user analytic
export const userAnalytic = async (token) => {
  try {
    const response = await apiConnector("GET", GET_USER_ANALYTICS, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("GET USER ANALYTICS API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch All Blogs");
    }
    return response;
  } catch (error) {
    console.log("GET USER ANALYTICS API ERROR............", error);
    throw error;
  }
};
