import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"; // ✅ Import Navbar
import Footer from "./components/Footer"; // ✅ Import Footer
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
import AuthController from "./components/AuthController"; // ✅ Import AuthController

function App() {
  return (
    <div>
      {/* ✅ Navbar always stays at the top */}
      <Navbar />

      {/* ✅ Auth Controller to handle login/signup/verify popups */}
      <AuthController />

      <Routes>
        {/* Existing Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddProducts />} />

        {/* ✅ New Route for Product Details */}
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Admin Dashboard Route */}
        <Route path="/admin/*" element={<AdminDashboard />}>
          <Route path="product-management" element={<ProductManagement />} />
          <Route path="sales-management" element={<SalesManagement />} />
          <Route
            path="inventory-management"
            element={<InventoryManagement />}
          />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>

      {/* ✅ Footer always stays at the bottom */}
      <Footer />
    </div>
  );
}

export default App;
