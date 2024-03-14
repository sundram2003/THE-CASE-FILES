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
} = blogEndpoints;

// create blog
export const createBlog = async (data, token) => {
  console.log("data in create blog", data);
  try {
    const response = await apiConnector("POST", CREATE_BLOG_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("response in create blog", response);
    const blogData = response;
    console.log("blogData", blogData);
    toast.success(blogData.data.message);
    if (!blogData?.data?.success) {
      throw new Error("Could Not Create Blog");
    }
    return blogData.data;
  } catch (error) {
    console.log("CREATE BLOG API ERROR............", error);
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
    result = response?.data;
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
    result = response?.data;
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
