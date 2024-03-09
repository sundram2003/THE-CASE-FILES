import { BlockedUsers } from '../models/blockedUsers.model.js';
import { Blog } from '../models/blogs.model.js';

export const createBlog = async (req, res) => {
  try {
    /*
    1.get users id from req.user
    2. check user is blocked or not
    3. get parameters from request body
    4. validate parameters
    5. creat a slug
    
    6. create blog
    7. return response
    */

    // 1.get users id from req.user
    const userId = req.user.id;
    // 2. check user is blocked or not
    const isBlockedUser = await BlockedUsers.findOne({ email: req.user.email });
    // 3. get parameters from request body
    const { title, content, status, category, tags } = req.body;
    const { coverImg } = req.file;
    // 4. validate parameters
    if (!title || !content || !status || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }
    let coverImgCloudinary;
    let imgUrl;
    if (coverImg) {
      coverImgCloudinary = await uploadImageToCloudinary(
        coverImg,
        process.env.FOLDER_NAME
      );
      console.log(complaintImgCloudinary);
      imgUrl = coverImgCloudinary.secure_url;
    } else {
      imgUrl = "";
    }

    // 5. creat a slug
    const slug = req.body.title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '');
    // 6. create blog
    const blog = await Blog.create({
      title,
      content,
      createdBy: userId,
      status,
      category,
      tags,
      coverImg: imgUrl,
      slug,
    });
    // 7. return response
    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in creating the blog",
      errorMessage: error.message,
    });
  }

}
export const getBlog = async (req, res) => {
  try {
    /*
    1. get slug from request params
    2. get blog by slug
    3. return response
    */
    // 1. get slug from request params
    const { slug } = req.params;
    // 2. get blog by slug
    const blog = await Blog.find({ slug }).populate("createdBy").populate("comments");
    // 3. return response
    return res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      data: blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in fetching the blog",
      errorMessage: error.message,
    });
  }
}
export const getAllBlogs = async (req, res) => {
  try {
    /*
    1. get all blogs
    2. return response
    */
    // 1. get all blogs
    const blogs = await Blog.find({}).populate("createdBy").populate("comments");
    // 2. return response
    return res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in fetching the blogs",
      errorMessage: error.message,
    });
  }
}
export const getBlogsByCategory = async (req, res) => {
  try {
    /*
    1. get category from request params
    2. get blogs by category
    3. return response
    */
    // 1. get category from request params
    const { category } = req.params;
    // 2. get blogs by category
    const blogs = await Blog.find({ category }).populate("createdBy").populate("comments");
    // 3. return response
    return res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in fetching the blogs",
      errorMessage: error.message,
    });
  }
}
export const getBlogsByTag = async (req, res) => {
  try {
    /*
    1. get tag from request params
    2. get blogs by tag
    3. return response
    */
    // 1. get tag from request params
    const { tag } = req.params;
    // 2. get blogs by tag
    const blogs = await Blog.find({ tags: tag }).populate("createdBy").populate("comments");
    // 3. return response
    return res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in fetching the blogs",
      errorMessage: error.message,
    });
  }
}
export const upvoteBlog = async (req, res) => {
  try {
    /*
    1. get blog id from request params
    2. get user id from req.user
    3. check if user has already upvoted
    4. if user has already upvoted, remove upvote
    5. if user has not upvoted, upvote
    6. return response
    */
    // 1. get blog id from request params
    const { blogId } = req.params;
    // 2. get user id from req.user
    const userId = req.user.id;
    // 3. check if user has already upvoted
    const blog = await Blog.findById(blogId);
    if (blog.upvotes.includes(userId)) {
      // 4. if user has already upvoted, remove upvote
      blog.upvotes.pull(userId);
      await blog.save();
      // 6. return response
      return res.status(200).json({
        success: true,
        message: "Upvote removed successfully",
      });
    } else {
      // 5. if user has not upvoted, upvote
      blog.upvotes.push(userId);
      await blog.save();
      // 6. return response
      return res.status(200).json({
        success: true,
        message: "Upvoted successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in upvoting the blog",
      errorMessage: error.message,
    });
  }
}
export const downvoteBlog = async (req, res) => {
  try {
    /*
    1. get blog id from request params
    2. get user id from req.user
    3. check if user has already downvoted
    4. if user has already downvoted, remove downvote
    5. if user has not downvoted, downvote
    6. return response
    */
    // 1. get blog id from request params
    const { blogId } = req.params;
    // 2. get user id from req.user
    const userId = req.user.id;
    // 3. check if user has already downvoted
    const blog = await Blog.findById(blogId);
    if (blog.downvotes.includes(userId)) {
      // 4. if user has already downvoted, remove downvote
      blog.downvotes.pull(userId);
      await blog.save();
      // 6. return response
      return res.status(200).json({
        success: true,
        message: "Downvote removed successfully",
      });
    } else {
      // 5. if user has not downvoted, downvote
      blog.downvotes.push(userId);
      await blog.save();
      // 6. return response
      return res.status(200).json({
        success: true,
        message: "Downvoted successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in downvoting the blog",
      errorMessage: error.message,
    });
  }
}
export const deleteBlog = async (req, res) => {
  try {
    /*
    1. get blog id from request params
    2. get blog by id
    3. check if user is authorized to delete the blog
    4. delete blog
    5. return response
    */
    // 1. get blog id from request params
    const { blogId } = req.params;
    // 2. get blog by id
    const blog = await Blog.findById(blogId);
    // 3. check if user is authorized to delete the blog
    if (blog.createdBy.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to delete this blog",
      });
    }
    // 4. delete blog
    await blog.remove();
    // 5. return response
    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in deleting the blog",
      errorMessage: error.message,
    });
  }
}
export const updateBlog = async (req, res) => {
  try {
    /*
    1. get blog id from request params
    2. get blog by id
    3. check if user is authorized to update the blog
    4. update blog
    5. return response
    */
    // 1. get blog id from request params
    const { blogId } = req.params;
    // 2. get blog by id
    const blog = await Blog.findById(blogId);
    // 3. check if user is authorized to update the blog
    if (blog.createdBy.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to update this blog",
      });
    }
    // 4. update blog
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, {
      new: true,
      runValidators: true,
    });
    // 5. return response
    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in updating the blog",
      errorMessage: error.message,
    });
  }
}
export const getBlogsByUser = async (req, res) => {
  try {
    /*
    1. get user id from request params
    2. get blogs by user
    3. return response
    */
    // 1. get user id from request params
    const { userId } = req.params;
    // 2. get blogs by user
    const blogs = await Blog.find({ createdBy: userId }).populate("createdBy").populate("comments");
    // 3. return response
    return res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in fetching the blogs",
      errorMessage: error.message,
    });
  }
}
export const getBlogsByStatus = async (req, res) => {
  try {
    /*
    1. get status from request params
    2. get blogs by status
    3. return response
    */
    // 1. get status from request params
    const { status } = req.params;
    // 2. get blogs by status
    const blogs = await Blog.find({ status }).populate("createdBy").populate("comments");
    // 3. return response
    return res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in fetching the blogs",
      errorMessage: error.message,
    });
  }
}
export const getBlogsByUpvotes = async (req, res) => {
  try {
    /*
    1. get blogs by upvotes
    2. return response
    */
    // 1. get blogs by upvotes
    const blogs = await Blog.find({}).sort({ upvotes: -1 }).populate("createdBy").populate("comments");
    // 2. return response
    return res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in fetching the blogs",
      errorMessage: error.message,
    });
  }
}
export const getBlogsByDate = async (req, res) => {
  try {
    /*
    1. get blogs by date
    2. return response
    */
    // 1. get blogs by date
    const blogs = await Blog.find({}).sort({ createdAt: -1 }).populate("createdBy").populate("comments");
    // 2. return response
    return res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in fetching the blogs",
      errorMessage: error.message,
    });
  }
}
export const myBlog = async (req, res) => {
  try {
    /*
    1. get user id from req.user
    2. get blogs by user
    3. return response
    */
    // 1. get user id from req.user
    const userId = req.user.id;
    // 2. get blogs by user
    const blogs = await Blog.find({ createdBy: userId }).populate("createdBy").populate("comments");
    // 3. return response
    return res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in fetching the blogs",
      errorMessage: error.message,
    });
  }
}
export const getBlogById = async (req, res) => {
  try {
    /*
    1. get blog id from request params
    2. get blog by id
    3. return response
    */
    // 1. get blog id from request params
    const { id } = req.params;
    // 2. get blog by id
    const blog = await Blog.findById(id).populate("createdBy").populate("comments");
    // 3. return response
    return res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      data: blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in fetching the blog",
      errorMessage: error.message,
    });
  }
}