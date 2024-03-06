import { v2 as cloudinary } from "cloudinary";

const cloudinaryConnect = () => {
  try {
    cloudinary.config({
      //!    ########   Configuring the Cloudinary to Upload MEDIA ########
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
      timeout: 60000,
    });
    console.log("Cloudinary Connected Successfully");
  } catch (error) {
    console.log(error);
  }
};
export default cloudinaryConnect;
