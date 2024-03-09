import express from 'express';
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogById,
  getBlogsByUpvotes,
  downvoteBlog,
  getAllBlogs,
  getBlogsByUser,
  updateBlog,
  upvoteBlog,
  getBlogsByCategory
} from '../controllers/blog.controller.js';
const router = express.Router();


router.post('/createblog', createBlog);
router.get('/getblog', getBlog);
router.get('/getallblogs', getAllBlogs);
router.put('/upvote/:id', upvoteBlog);
router.put('/downvote/:id', downvoteBlog);
router.get('/getblogsbyupvotes', getBlogsByUpvotes);
router.get('/getblog/:id', getBlogById);
router.put('/updateblog/:id', updateBlog);
router.delete('/deleteblog/:id', deleteBlog);
router.get('/getblogbycategory/:category', getBlogsByCategory);
router.get('/getblogbyuser/:user', getBlogsByUser);

export default router;