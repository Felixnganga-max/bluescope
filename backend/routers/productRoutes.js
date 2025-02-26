const express = require("express");
const { upload } = require("../db/claudinary.js"); // Use Multer Cloudinary storage
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const AuthRouter = express.Router();

AuthRouter.get("/", getAllProducts);
AuthRouter.get("/:id", getProductById);
AuthRouter.post("/create-new", upload.array("images", 5), createProduct); // Supports multiple images
AuthRouter.put("/:id", upload.array("images", 5), updateProduct); // Allows adding new images
AuthRouter.delete("/:id", deleteProduct);

module.exports = AuthRouter;
