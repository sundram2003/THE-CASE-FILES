import { BlockedUsers } from "../models/blockedUsers.model.js";
import { Blog } from "../models/blogs.model.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";
import { Category } from "../models/category.model.js";
import { User } from "../models/user.model.js";
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
    ]);

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
    const userDetails = await User.findById(userId).populate("blogs");
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
    const blogs = await Blog.aggregate([
      // Match only published blogs
      { $match: { slug: slug } },

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
    ]);
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
    }).populate("createdBy");

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
// export const getBlogsByTag = async (req, res) => {
//   try {
//     /*
//     1. get tag from request params
//     2. get blogs by tag
//     3. return response
//     */
//     // 1. get tag from request params
//     const { tag } = req.params;
//     // 2. get blogs by tag
//     const blogs = await Blog.find({ tags: tag }).populate("createdBy").populate("comments");
//     // 3. return response
//     return res.status(200).json({
//       success: true,
//       message: "Blogs fetched successfully",
//       data: blogs,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error in fetching the blogs",
//       errorMessage: error.message,
//     });
//   }
// }
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
    console.log("Printing blog", blog);
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
    4. delete blog
    5. return response
    */
    // 1. get blog id from request body
    const { blogId } = req.body;
    // 2. delete blogId from user's blogs
    const userId = req.user.id;
    const user = await User.findByIdAndUpdate(userId, {
      $pull: { blogs: blogId },
      $inc: { contributions: -5 },
    });
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
    const { title, content, status, prevCategory, category, tags } =
      req.body;
    // const coverImg = req.files.coverImg;
    let categoryDetails;
    let updateFields = {};
    if (prevCategory) {
      const prevCategoryDetails = await Category.findById(prevCategory);
      prevCategoryDetails.blogs.pull(blog._id);
      await prevCategoryDetails.save();
    }
    if (category) {//categoryName
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
