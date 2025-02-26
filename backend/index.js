const express = require("express");
const { connectDB } = require("./db/db");
const cors = require("cors");
const productRoutes = require("./routers/productRoutes");
const authRoutes = require("./routers/authRoutes"); // ✅ Corrected

const app = express();
const PORT = 3000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend requests
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get("/", (req, res) => {
  res.send("This is the backend service for Bluescope");
});

// ✅ Correct Route Registration
app.use("/bluescope/products", productRoutes);
app.use("/bluescope/auth", authRoutes); // ✅ This should be correct

// Connect to the database
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
