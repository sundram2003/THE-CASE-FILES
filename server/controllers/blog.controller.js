import { BlockedUsers } from "../models/blockedUsers.model.js";
import { Blog } from "../models/blogs.model.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";
import { Category } from "../models/category.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comments.model.js";

export const createBlog = async (req, res) => {
  try {
    /*
    1.get users id from req.user
    2. check user is blocked or not
    3. get parameters from request body
    4. validate parameters
    5. creat a slug
    
    6. create blog
    7. add this blog to user's blogs
    8. return response
    */

    // 1.get users id from req.user
    const userId = req.user.id;
    console.log(userId);
    // 2. check user is blocked or not
    const isBlockedUser = await BlockedUsers.findOne({ email: req.user.email });
    if (isBlockedUser) {
      return res.status(400).json({
        success: false,
        message: "You are blocked by admin",
      });
    }
    // 3. get parameters from request body
    let { title, content, status, category, tags } = req.body;
    if (!status || status === undefined) {
      status = "Draft";
    }
    const coverImg = req.files.coverImg;
    // 4. validate parameterscoverImg
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
      console.log(coverImgCloudinary);
      imgUrl = coverImgCloudinary.secure_url;
    } else {
      imgUrl = "";
    }

    // 5. creat a slug
    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");
    console.log("Slug for blog: ", slug);
    //find category id
    const categoryDetails = await Category.findOne({ name: category });
    if (!categoryDetails) {
      return res.status(400).json({
        success: false,
        message: "Category not found",
      });
    }

    // 6. create blog
    console.log("categoryDetails: ", categoryDetails);
    const blog = await Blog.create({
      title,
      content,
      createdBy: userId,
      status,
      category: categoryDetails._id, //this should be object id
      tags, //this should be an array of strings
      coverImg: imgUrl,
      slug,
    });
    categoryDetails.blogs.push(blog._id);
    await categoryDetails.save();
    // 7. add this blog to user's blogs
    const user = await User.findByIdAndUpdate(userId, {
      $push: { blogs: blog._id },
      $inc: { contributions: 5 },
    });
    // 8. return response
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
};
export const getAllBlogs = async (req, res) => {
  try {
    /*
    1. get all blogs
    2. return response
    */
    // 1. get all blogs
    const blogs = await Blog.aggregate([
      // Match only published blogs
      { $match: { status: "Published" } },

      // Lookup for User document to populate createdBy field
      {
        $lookup: {
          from: "users", // Assuming the collection name for User is "users"
          localField: "createdBy",
          foreignField: "_id",
          as: "createdBy",
        },
      },

      // Unwind createdBy array created by $lookup
      { $unwind: "$createdBy" },

      // Lookup for Comment documents to populate comments field
      {
        $lookup: {
          from: "comments", // Assuming the collection name for Comment is "comments"
          localField: "comments",
          foreignField: "_id",
          as: "comments",
        },
      },

      // Lookup for Category documents to populate category field
      {
        $lookup: {
          from: "categories", // Assuming the collection name for Category is "categories"
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },

      // Unwind category array created by $lookup
      { $unwind: "$category" },
    ]).sort({ createdAt: -1 });

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
};
export const getMyBlogs = async (req, res) => {
  try {
    /*
    1. get user id from req.user
    2. get blogs by user
    3. return response
    */
    // 1. get user id from req.user
    const userId = req.user.id;
    // 2. get blogs by user
    const userDetails = await User.findById(userId).populate("blogs").sort({ createdAt: -1 });
    // 3. return response
    return res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in fetching the blogs",
      errorMessage: error.message,
    });
  }
};
export const searchBlog = async (req, res) => {
  try {
    /*
    1. get slug from request params
    2. get blog by slug
    3. return response
    */
    // 1. get slug from request params
    const { title } = req.params;
    //create a slog from title
    let slug;
    slug = title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");
    // 2. get blog by slug
    const blogs = await Blog.find({ $text: { $search: slug } });
    // 3. return response
    return res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      data: blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in fetching the blog",
      errorMessage: error.message,
    });
  }
};

export const getBlogsByCategory = async (req, res) => {
  try {
    /*
    1. get category from request params
    2. get blogs by category
    3. return response
    */
    // 1. get category from request params
    console.log("printing req.params", req.params.category);
    const { category } = req.params;
    // 2. get blogs by category
    const categoryDetails = await Category.find({ name: category });
    console.log("printing category details", categoryDetails);
    const blogs = await Blog.find({
      category: categoryDetails[0]._id,
    })
      .populate({
        path: "createdBy",
        select:
          "-blogs -password -followers -following -token -resetPasswordExpires",
      })
      .exec();

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
};
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
    const blogs = await Blog.find({ tags: { $in: [tag] } })
      .populate("createdBy")
      .populate("comments");
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
};
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
    const { blogId } = req.body;
    // 2. get user id from req.user
    const userId = req.user.id;
    // 3. check if user has already upvoted
    const blog = await Blog.findById(blogId);
    if (blog.downvotes.includes(userId)) {
      blog.downvotes.pull(userId);
      await blog.save();
    }
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
};
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
    const { blogId } = req.body;
    // 2. get user id from req.user
    const userId = req.user.id;
    // 3. check if user has already downvoted
    let blog = await Blog.findById(blogId);
    // console.log("Printing blog", blog);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    if (blog.upvotes.includes(userId)) {
      blog.upvotes.pull(userId);
      await blog.save();
    }
    if (blog?.downvotes.includes(userId)) {
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
};
export const deleteBlog = async (req, res) => {
  try {
    /*
    1. get blog id from request body
    2. get blog by id
    3. check if user is authorized to delete the blog
    //delete all comments of that blog
    4. delete blog
    5. return response
    */
    // 1. get blog id from request body
    const { blogId } = req.body;
    const blogDetails = await Blog.findById(blogId);
    // 2. delete blogId from user's blogs
    const userId = blogDetails.createdBy;
    const user = await User.findByIdAndUpdate(userId, {
      $pull: { blogs: blogId },
      $inc: { contributions: -5 },
    });
    const deleteComment = await Comment.deleteMany({ blogId: blogId });
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    // 5. return response
    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      deletedBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in deleting the blog",
      errorMessage: error.message,
    });
  }
};
export const updateBlog = async (req, res) => {
  try {
    /*
    1. get blog id from request body
    2. get blog by id
    3. check if user is authorized to update the blog
    4. update blog
    5. return response
    */
    // 1. get blog id from request body
    // console.log("print req.body", req.body);
    const { blogId } = req.params;
    // 2. get blog by id
    const blog = await Blog.findById(blogId);
    //status must be draft
    if (blog.status === "Published") {
      return res.status(400).json({
        success: false,
        message: "Blog is already published, you can't update it",
      });
    }
    // 4. update blog
    const { title, content, status, prevCategory, category, tags } = req.body;
    const coverImg = req.files.coverImg;
    let categoryDetails;
    let updateFields = {};
    if (prevCategory) {
      const prevCategoryDetails = await Category.findById(prevCategory);
      prevCategoryDetails.blogs.pull(blog._id);
      await prevCategoryDetails.save();
    }
    if (category) {
      //categoryName
      categoryDetails = await Category.findOne({ name: category });
      if (!categoryDetails) {
        return res.status(400).json({
          success: false,
          message: "Category not found",
        });
      }
      categoryDetails.blogs.push(blog._id);
      updateFields.category = categoryDetails._id;
    }
    let slug;
    if (title !== undefined && title !== "") {
      updateFields.title = title;
      slug = title
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, "");
      updateFields.slug = slug;
    }
    if (content !== undefined && content !== "") {
      updateFields.content = content;
    }
    if (status !== undefined && status !== "") {
      updateFields.status = status;
    }
    if (tags !== undefined && Array.isArray(tags) && tags.length > 0) {
      updateFields.tags = tags;
    }

    if (coverImg !== undefined && coverImg !== "") {
      const coverImgCloudinary = await uploadImageToCloudinary(
        coverImg,
        process.env.FOLDER_NAME
      );
      console.log(coverImgCloudinary.secure_url);
      updateFields.coverImg = coverImgCloudinary.secure_url;
    }
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateFields, {
      new: true,
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
};
export const getBlogsByUpvotes = async (req, res) => {
  try {
    /*
    1. get blogs by upvotes
    2. return response
    */
    // 1. get blogs by upvotes
    const blogs = await Blog.find({})
      .sort({ upvotes: -1 })
      .populate("createdBy");
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
};

export const getBlogById = async (req, res) => {
  try {
    /*
    1. get blog id from request param
    2. get blog by id
    3. return response
    */
    // 1. get blog id from request param
    const { id } = req.params;
    console.log(req.params);
    // 2. get blog by id
    const blog = await Blog.findById(id).populate("createdBy");
    if (blog.comments.length > 0) {
      blog.comments = await Comment.find({
        _id: { $in: blog.comments },
      }).populate("createdBy");
    }
    console.log("printing blog", blog);
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
};
export const addComment = async (req, res) => {
  try {
    /*
    1. Extract necessary data from the request
    2. Validate the data
    3. Create a new comment
    4. Add the comment to the corresponding blog
    5. Emit a Socket.IO event to notify clients
    6. Return response
    */
    const { blogId } = req.params;
    // 1. Extract necessary data from the request
    const { content } = req.body;
    const userId = req.user.id;

    // 2. Validate the data
    if (!blogId || !content) {
      return res.status(400).json({
        success: false,
        message: "Blog ID and content are required for adding a comment.",
      });
    }

    // 3. Create a new comment
    const newComment = new Comment({
      content,
      createdBy: userId,
      blogId,
    });

    // Save the comment to the database
    await newComment.save();

    // 4. Add the comment to the corresponding blog
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { comments: newComment._id },
      },
      { new: true }
    ).populate({
      path: "comments",
      populate: {
        path: "createdBy",
        select: "firstName lastName email username profilePic role",
        sort: { createdAt: 1 },
      },
    });
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    // 5. Emit a Socket.IO event to notify clients
    // io.emit('newComment', newComment); // Emitting 'newComment' event with the new comment data

    // get all comment on that blog
    // const allComments = await Comment.find({ blogId });
    // 6. Return response
    return res.status(201).json({
      success: true,
      message: "Comment added successfully.",
      data: blog,
      data: blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in adding the comment.",
      errorMessage: error.message,
    });
  }
};
export const deleteComment = async (req, res) => {
  try {
    /*
    1. get comment id from request params
    2. check if user is authorized to delete the comment
    3. delete comment
    4. return response
    */
    // 1. get comment id from request params
    const { commentId } = req.body;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }
    // 2. check if user is authorized to delete the comment
    if (!(comment.createdBy == req.user.id || req.user.role == "admin" || req.user.isModerator == true)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this comment",
      });
    }
    //remove this comment from blog
    const blog = await Blog.findByIdAndUpdate(comment.blogId,
      { $pull: { comments: commentId } },
      { new: true }
    ).populate({
      path: "comments",
      populate: {
        path: "createdBy",
        select: "firstName lastName email username profilePic role",
        sort: { createdAt: 1 },
      },
    });
    // 3. delete comment
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    // 4. return response
    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      deletedComment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in deleting the comment",
      errorMessage: error.message,
    });
  }
}
export const getCommentDetails = async (req, res) => {
  try {
    /*
    1. get comment id from request params
    2. get comment by id
    3. return response
    */
    // 1. get comment id from request params
    const { commentId } = req.params;
    // 2. get comment by id
    const comment = await Comment.findById(commentId);
    // 3. return response
    return res.status(200).json({
      success: true,
      message: "Comment fetched successfully",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in fetching the comment",
      errorMessage: error.message,
    });
  }
}
export const updateView = async (req, res) => {

  try {
    /*
    1. get blog id from request params
    2. get blog by id
    3. update view
    4. return response
    */
    // 1. get blog id from request params
    const { blogId } = req.body;
    const id = req.user.id;
    // 2. get blog by id
    const blog = await Blog.findById(blogId);
    const userId = blog.createdBy;
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    // 3. update view
    console.log(blog);
    if (blog.views == undefined) {
      blog.views = [];
    }
    const blogView = blog.views.length;
    console.log(blogView);
    if (blog.views.length == 0) {
      blog.views.push(id);
      await blog.save();
      return res.status(200).json({
        success: true,
        message: "View updated successfully",
        noOfViews: blog.views.length,
      });
    }
    if (blogView == 99) {
      const user = await User.findByIdAndUpdate(userId, {
        $inc: { contributions: 100 },
      });
    }
    if (blog.views.includes(id)) {
      return res.status(200).json({
        sucess: true,
        blog,
      });
    }
    else {
      blog.views.push(id);
      await blog.save();
      // 4. return response
      return res.status(200).json({
        success: true,
        message: "View updated successfully",
        noOfViews: blog.views.length,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in updating the view",
      errorMessage: error.message,
    });
  }
}


