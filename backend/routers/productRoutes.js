const express = require("express");
const { upload } = require("../db/claudinary.js"); // Use Multer Cloudinary storage
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/create-new", upload.array("images", 5), createProduct); // Supports multiple images
router.put("/:id", upload.array("images", 5), updateProduct); // Allows adding new images
router.delete("/:id", deleteProduct);

module.exports = router;
