import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import fileUpload from 'express-fileupload';
import cloudinaryConnect from './config/cloudinary.js';
import userRoutes from './routes/user.routes.js';
import blogRoutes from './routes/blog.routes.js';
import categoryRoutes from './routes/category.routes.js';
import cors from 'cors';
dotenv.config({
  path: '.env'
});


connectDB();
cloudinaryConnect();
const app = express();

//middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  useTempFiles: true,
  path: '/tmp/',
}));
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/blog', blogRoutes);
app.use('/api/v1/category', categoryRoutes);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});