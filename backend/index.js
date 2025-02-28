const express = require("express");
const { connectDB } = require("./db/db");
const cors = require("cors");
const productRoutes = require("./routers/productRoutes");
const authRoutes = require("./routers/authRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Proper CORS Configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "https://bluescope-tau.vercel.app"], // Allow frontend requests
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies if using authentication
  })
);

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("This is the backend service for Bluescope");
});

// ✅ API Routes
app.use("/bluescope/products", productRoutes);
app.use("/bluescope/auth", authRoutes);

// ✅ Connect to the Database
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });
