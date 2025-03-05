const express = require("express");
const {
  signup,
  login,
  logout,
  getCurrentUser,
  verifyEmail,
} = require("../controllers/userController.js");

const router = express.Router();

// Auth Routes
router.post("/sign-up", signup); // ✅ Ensure this line is present
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.get("/current-user", getCurrentUser);

module.exports = router;
