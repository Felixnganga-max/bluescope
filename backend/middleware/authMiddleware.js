import jwt from "jsonwebtoken";
import person from "../models/auth.models.js";
import asyncHandler from "express-async-handler";

// 🔐 Protect routes: Validates JWT and attaches user to req
export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token; // Get token from cookie

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await person.findById(decoded.userId).select("-password"); // Attach user info

    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
});

// 🔐 Admin-only middleware
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ success: false, message: "Access denied" });
  }
};

// 🔐 Reception-only middleware
export const receptionOnly = (req, res, next) => {
  if (req.user && req.user.role === "reception") {
    next();
  } else {
    res.status(403).json({ success: false, message: "Access denied" });
  }
};
