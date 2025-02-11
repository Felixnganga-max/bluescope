import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddProducts from "./components/AddProducts";
import AdminDashboard from "./pages/AdminDashboard"; // New Admin Dashboard
import ProductManagement from "./components/ProductManagement";
import SalesManagement from "./components/SalesManagement";
import InventoryManagement from "./components/InventoryManagement";
import Users from "./components/Users";
import Settings from "./components/Settings";
import Profile from "./components/Profile";

function App() {
  return (
    <div>
      <Routes>
        {/* Existing Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddProducts />} />

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
      </Routes>
    </div>
  );
}

export default App;
