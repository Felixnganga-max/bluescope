const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Directly configured Cloudinary credentials
cloudinary.config({
  cloud_name: "dfuv6m4va",
  api_key: "528637913152672",
  api_secret: "kyLOb0R45nMaH-3c2AgxoDwRw1A",
});

// Multer storage configuration
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products", // Cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// Multer middleware for file uploads
const upload = multer({ storage });

// Function to upload files manually if needed
const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "products",
    });
    return result.secure_url; // Return Cloudinary image URL
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

// Export everything in CommonJS syntax
module.exports = { upload, uploadToCloudinary, cloudinary };
