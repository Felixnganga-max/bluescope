const express = require("express");
const {
  signup,
  login,
  logout,
  getCurrentUser,
  verifyEmail,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController.js");

const router = express.Router();

// Auth Routes
router.post("/sign-up", signup); // ✅ Ensure this line is present
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.get("/current-user", getCurrentUser);

router.get("/all-users", getAllUsers);
router.delete("/users/:userId", deleteUser);

module.exports = router;
