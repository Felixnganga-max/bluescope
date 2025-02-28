import React, { useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AddProducts from "./components/AddProducts";
import AdminDashboard from "./pages/AdminDashboard";
import ProductManagement from "./components/ProductManagement";
import SalesManagement from "./components/SalesManagement";
import InventoryManagement from "./components/InventoryManagement";
import Users from "./components/Users";
import Settings from "./components/Settings";
import Profile from "./components/Profile";
import ProductDetails from "./pages/ProductDetails";
import Catalogue from "./pages/Catalogue";
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import AuthController from "./components/AuthController";

// Function to check if the user is authenticated
const isAuthenticated = () => {
  // Check localStorage first
  const token = localStorage.getItem("token");

  if (token) {
    console.log("Authentication confirmed via localStorage token");
    return true;
  }

  // If no token in localStorage, check cookies
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const cookieToken =
    getCookie("token") || getCookie("authToken") || getCookie("jwt");

  if (cookieToken) {
    console.log("Authentication confirmed via cookie token");
    // Store in localStorage for future checks
    localStorage.setItem("token", cookieToken);
    return true;
  }

  console.log("No authentication token found");
  return false;
};

// PrivateRoute component to protect admin routes
const PrivateRoute = ({ element }) => {
  const authenticated = isAuthenticated();
  console.log("PrivateRoute - Authentication status:", authenticated);

  if (!authenticated) {
    console.log("Not authenticated, redirecting to home page");
    return <Navigate to="/" />;
  }

  console.log("Authenticated, allowing access to protected route");
  return element;
};

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Debug auth status when component mounts or location changes
  useEffect(() => {
    console.log("Current path:", location.pathname);
    console.log("Is admin route:", isAdminRoute);
    if (isAdminRoute) {
      console.log("Auth status for admin route:", isAuthenticated());
    }
  }, [location.pathname, isAdminRoute]);

  return (
    <>
      {/* Show Navbar and AuthController only if not on an admin page */}
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <AuthController />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={<PrivateRoute element={<AdminDashboard />} />}
        >
          <Route
            path="add-products"
            element={<PrivateRoute element={<AddProducts />} />}
          />
          <Route
            path="product-management"
            element={<PrivateRoute element={<ProductManagement />} />}
          />
          <Route
            path="sales-management"
            element={<PrivateRoute element={<SalesManagement />} />}
          />
          <Route
            path="inventory-management"
            element={<PrivateRoute element={<InventoryManagement />} />}
          />
          <Route path="users" element={<PrivateRoute element={<Users />} />} />
          <Route
            path="settings"
            element={<PrivateRoute element={<Settings />} />}
          />
          <Route
            path="profile"
            element={<PrivateRoute element={<Profile />} />}
          />
        </Route>

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Show Footer only if not on an admin page */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
