import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Config/db.js';
import cloudinaryConnect from './config/cloudinary.js';
dotenv.config({
  path: '.env'
});

connectDB();
cloudinaryConnect();
const app = express();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});