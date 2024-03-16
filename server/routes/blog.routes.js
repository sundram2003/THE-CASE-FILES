import express from 'express';
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
  updateBlog,
  upvoteBlog,
  addComment,
} from '../controllers/blog.controller.js';
import { auth } from '../middlewares/auth.js'
const router = express.Router();


router.post('/create', auth, createBlog);
router.get("/getBlogs/:id", getBlogById);
router.get('/getallblogs', getAllBlogs);
router.get('/getmyBlogs', auth, getMyBlogs);
router.get('/getBlogByCategory/:category', getBlogsByCategory);
router.get('/getBlogsByTags/:tags', getBlogsByTag);
router.put('/upvote', auth, upvoteBlog);
router.put('/downvote', auth, downvoteBlog);
router.delete('/delete', auth, deleteBlog);
router.put('/update/:blogId', auth, updateBlog);
router.get('/getBlogsByUpvote', getBlogsByUpvotes);
router.get('/addComment',auth,addComment);

export default router;