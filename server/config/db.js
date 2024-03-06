import mongoose from "mongoose";


const DB_NAME = process.env.DB_NAME || "testDB";
const connectDB = async () => {
  try {
    console.log(`DB URL :${process.env.MONGODB_URL}/${DB_NAME}`);
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1)
  }
}

export default connectDB;