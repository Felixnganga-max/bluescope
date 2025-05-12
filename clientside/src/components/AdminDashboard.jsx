import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Listen for sidebar collapse state changes
  useEffect(() => {
    const handleSidebarState = (e) => {
      if (e.detail && typeof e.detail.collapsed === "boolean") {
        setSidebarCollapsed(e.detail.collapsed);
      }
    };

    window.addEventListener("sidebarStateChange", handleSidebarState);
    return () =>
      window.removeEventListener("sidebarStateChange", handleSidebarState);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Container */}
      <div className="w-1/4 max-w-xs">
        <Sidebar
          onCollapse={(collapsed) => {
            // Custom event to notify other components about sidebar state
            window.dispatchEvent(
              new CustomEvent("sidebarStateChange", {
                detail: { collapsed },
              })
            );
            setSidebarCollapsed(collapsed);
          }}
        />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 p-6 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <Outlet /> {/* This will render the nested routes */}
      </div>
    </div>
  );
};

export default AdminDashboard;
