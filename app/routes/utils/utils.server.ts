import cloudinary from 'cloudinary'
import type { Stream } from 'stream'

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

async function uploadImage(fileStream: Stream) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        folder: "twitter_clone",
      },
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );
    fileStream.pipe(uploadStream);
  });
}

// console.log("configs", cloudinary.v2.config());
export { uploadImage };
