import express from 'express';
import { createCategory } from '../controllers/category.controller.js';
import { auth, isAdmin } from '../middlewares/auth.js';
const router = express.Router();


router.post('/createcategory', auth, isAdmin, createCategory);

export default router;  