import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

const uploadOnCloudinary = async (file) => {
  if (!file) return null;

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "intellicampus/tickets",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          console.log("uploadOnCloudinary error", error);
          return reject(error);
        }

        console.log("Upload Success:");
        resolve(result);
      },
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

export default uploadOnCloudinary;
