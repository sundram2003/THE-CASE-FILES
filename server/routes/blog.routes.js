import express from "express";
import {
  createBlog,
  deleteBlog,
  downvoteBlog,
  getAllBlogs,
  getBlogById,
  getBlogsByCategory,
  getBlogsByTag,
  getBlogsByUpvotes,
  getMyBlogs,
  searchBlog,
  updateBlog,
  upvoteBlog,
  addComment,
  deleteComment,
  getCommentDetails,
  updateView,
} from "../controllers/blog.controller.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();

router.post("/create", auth, createBlog);
router.get("/getBlogs/:id", getBlogById);
router.get("/getallblogs", getAllBlogs);
router.get("/getmyBlogs", auth, getMyBlogs);
router.get("/getBlogByCategory/:category", getBlogsByCategory);
router.get("/getBlogsByTags/:tags", getBlogsByTag);
router.get("/getBlogsByTitle/:title", searchBlog);
router.put("/upvote", auth, upvoteBlog);
router.put("/downvote", auth, downvoteBlog);
router.delete("/delete", auth, deleteBlog);
router.put("/update/:blogId", auth, updateBlog);
router.get("/getBlogsByUpvote", getBlogsByUpvotes);
router.put("/updateView", auth, updateView);
router.put("/addComment/:blogId", auth, addComment);
//https:localhost:4000/api/v1/blog/addComment/124dfnqr23r2
router.delete("/deleteComment", auth, deleteComment);
router.get('/getCommentsById/:commentId', getCommentDetails);
export default router;
