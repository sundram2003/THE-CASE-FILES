import express from 'express';
import {
  createBlog,
  deleteBlog,
  downvoteBlog,
  getAllBlogs,
  getBlogById,
  getBlogsByCategory,
  getBlogsByUpvotes,
  getMyBlogs,
  updateBlog,
  upvoteBlog
} from '../controllers/blog.controller.js';
import { auth } from '../middlewares/auth.js'
const router = express.Router();


router.post('/create', auth, createBlog);
router.get("/getBlogs/:id", getBlogById);
router.get('/getallblogs', getAllBlogs);
router.get('/getmyBlogs', auth, getMyBlogs);
router.get('/getBlogByCategory/:category', getBlogsByCategory);
router.put('/upvote', auth, upvoteBlog);
router.put('/downvote', auth, downvoteBlog);
router.delete('/delete', auth, deleteBlog);
router.put('/update/:blogId', auth, updateBlog);
router.get('/getBlogsByUpvote', getBlogsByUpvotes);


export default router;