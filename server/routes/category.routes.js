import express from 'express';
import { createCategory, getAllCategories } from '../controllers/category.controller.js';
import { auth, isAdmin } from '../middlewares/auth.js';
const router = express.Router();


router.post('/createcategory', auth, isAdmin, createCategory);
router.get('/getAllCategories', getAllCategories);
export default router;  