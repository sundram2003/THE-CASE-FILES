import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cloudinaryConnect from './config/cloudinary.js';
import userRoutes from './routes/user.routes.js'
dotenv.config({
  path: '.env'
});


connectDB();
cloudinaryConnect();
const app = express();

//middleware
app.use(express.json());
app.use('/api/v1/auth', userRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});