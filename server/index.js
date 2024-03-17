import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import fileUpload from "express-fileupload";
import cloudinaryConnect from "./config/cloudinary.js";
import userRoutes from "./routes/user.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
dotenv.config({
  path: ".env",
});

connectDB();
cloudinaryConnect();
const app = express();
// adding socket io configuration
const server = http.createServer(app);
const io = new Server(server);
//middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/category", categoryRoutes);
const PORT = process.env.PORT || 8000;

io.on("connection", (socket) => {
  console.log("A user connected", socket);

  // Handle real-time events here
  socket.on("comment", (msg) => {
    console.log("new comment recieved", msg);
  });
  //   // Broadcast the comment to all connected clients
  //   io.emit('newComment', data);
  // });

  // Handle disconnection
  // socket.on('disconnect', () => {
  //   console.log('User disconnected');
  // });
});
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
