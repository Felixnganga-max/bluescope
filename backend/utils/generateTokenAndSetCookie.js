const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token expires in 7 days
  });

  res.cookie("token", token, {
    httpOnly: true, // Prevents XSS attacks
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "strict", // Protect against CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // Match JWT expiry (7 days)
  });

  return token;
};

module.exports = generateTokenAndSetCookie;
