// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <ul className="space-y-2">
        <li>
          <Link
            to="/admin/product-management"
            className="block p-2 hover:bg-gray-700 rounded transition-all"
          >
            Product Management
          </Link>
        </li>
        <li>
          <Link
            to="/admin/sales-management"
            className="block p-2 hover:bg-gray-700 rounded transition-all"
          >
            Sales Management
          </Link>
        </li>
        <li>
          <Link
            to="/admin/inventory-management"
            className="block p-2 hover:bg-gray-700 rounded transition-all"
          >
            Inventory Management
          </Link>
        </li>
        <li>
          <Link
            to="/admin/users"
            className="block p-2 hover:bg-gray-700 rounded transition-all"
          >
            Users
          </Link>
        </li>
        <li>
          <Link
            to="/admin/settings"
            className="block p-2 hover:bg-gray-700 rounded transition-all"
          >
            Settings
          </Link>
        </li>
        <li>
          <Link
            to="/admin/profile"
            className="block p-2 hover:bg-gray-700 rounded transition-all"
          >
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
