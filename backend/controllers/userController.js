const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  sendVerificationEmail,
  sendWelcomeEmail,
} = require("../mailtrap/emails");
const Person = require("../models/userModel");

// Generate Token Function (replaces generateTokenAndSetCookie)
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// User Signup
const signup = async (req, res) => {
  const { email, password, name, role } = req.body;

  try {
    // Validate required fields
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user already exists - use case-insensitive email check
    const existingUser = await Person.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Generate verification token
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Create user with trimmed email address to avoid whitespace issues
    const user = new Person({
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      name: name.trim(),
      role,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    await user.save();

    // Send verification email
    await sendVerificationEmail(user.email, verificationToken);

    // Generate JWT token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully. Please verify your email.",
      token,
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Verify Email
const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Verification code is required",
      });
    }

    const user = await Person.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    // Send welcome email
    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Email successfully verified",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login User
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Clean email input
    const cleanEmail = email.trim().toLowerCase();

    // Find user with case-insensitive email search
    const user = await Person.findOne({
      email: { $regex: new RegExp(`^${cleanEmail}$`, "i") },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Check password
    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email before logging in",
      });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Update last login timestamp
    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Logout User
const logout = (req, res) => {
  try {
    // No need to clear cookies, as we're using localStorage
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ success: false, message: "Failed to logout" });
  }
};

// Verify Token
const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        isValid: false,
        message: "No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await Person.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        isValid: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      isValid: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({
      isValid: false,
      message: "Invalid token",
    });
  }
};

// Get Current User
const getCurrentUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Person.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// NEW FUNCTIONS FOR USER MANAGEMENT

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Verify token and get user role
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await Person.findById(decoded.userId);

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if user is admin
    if (currentUser.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Permission denied. Admin access required.",
      });
    }

    // Get all users except password field
    const users = await Person.find().select("-password");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Verify token and get user role
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await Person.findById(decoded.userId);

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if user is admin
    if (currentUser.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Permission denied. Admin access required.",
      });
    }

    // Check if trying to delete self
    if (userId === currentUser._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete your own account",
      });
    }

    // Find and delete user
    const userToDelete = await Person.findById(userId);

    if (!userToDelete) {
      return res.status(404).json({
        success: false,
        message: "User to delete not found",
      });
    }

    await Person.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Export the functions
module.exports = {
  signup,
  verifyEmail,
  login,
  logout,
  verifyToken,
  getCurrentUser,
  getAllUsers,
  deleteUser,
};
