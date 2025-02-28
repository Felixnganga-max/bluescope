import React from "react";
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
  return localStorage.getItem("token") !== null; // Adjust based on how you store auth tokens
};

// PrivateRoute component to protect admin routes
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" />;
};

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

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
