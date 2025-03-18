import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

// Icon components remain unchanged
const Icons = {
  ProductIcon: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  SalesIcon: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  InventoryIcon: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <line x1="12" y1="22" x2="12" y2="12" />
    </svg>
  ),
  UsersIcon: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  UIIcon: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  ),
  SettingsIcon: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  ProfileIcon: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  LogoIcon: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        stroke="url(#logoGradient)"
      />
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#9ca3af" />
        </linearGradient>
      </defs>
    </svg>
  ),
  CollapseIcon: ({ collapsed }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-6 h-6 transition-transform ${
        collapsed ? "rotate-180" : ""
      }`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  LogoutIcon: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  AvatarIcon: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [userData, setUserData] = useState({
    name: "Loading...",
    role: "Loading...",
  });
  const location = useLocation();

  useEffect(() => {
    const getUserDataFromToken = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setUserData({
            name: "Not Logged In",
            role: "Guest",
          });
          return;
        }

        try {
          const response = await axios.get(
            "https://bluescope-eotl.vercel.app/auth/current-user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              timeout: 5000, // 5 second timeout
            }
          );

          console.log("Current User Response:", response.data);

          if (response.data.success && response.data.user) {
            const user = response.data.user;
            setUserData({
              name: user.name || "Unknown User",
              role: user.role || "Unknown Role",
            });
          } else {
            setUserData({
              name: "Invalid Token",
              role: "Access Denied",
            });
          }
        } catch (error) {
          console.error("Detailed Error:", error);

          if (error.code === "ECONNABORTED") {
            setUserData({
              name: "Connection Timeout",
              role: "Check server connection",
            });
          } else if (error.response) {
            // The request was made and the server responded with a status code
            setUserData({
              name: "Server Error",
              role: error.response.status.toString(),
            });
          } else if (error.request) {
            // The request was made but no response was received
            setUserData({
              name: "No Server Response",
              role: "Check backend server",
            });
          } else {
            // Something happened in setting up the request
            setUserData({
              name: "Network Error",
              role: "Unable to connect",
            });
          }
        }
      } catch (error) {
        console.error("Token Error:", error);
        setUserData({
          name: "Authentication Error",
          role: "Please log in again",
        });
      }
    };

    getUserDataFromToken();
  }, []);

  // Auto-collapse on small screens
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    // Implement logout functionality
    localStorage.removeItem("token");
    // Redirect to login page or home
    window.location.href = "/";
  };

  const menuItems = [
    {
      path: "/admin/product-management",
      label: "Product Management",
      icon: <Icons.ProductIcon />,
      color: "from-red-400 to-red-600",
    },
    {
      path: "/admin/sales-management",
      label: "Sales Management",
      icon: <Icons.SalesIcon />,
      color: "from-blue-400 to-blue-600",
    },
    {
      path: "/admin/inventory-management",
      label: "Inventory Management",
      icon: <Icons.InventoryIcon />,
      color: "from-gray-400 to-gray-600",
    },
    {
      path: "/admin/users",
      label: "Users",
      icon: <Icons.UsersIcon />,
      color: "from-red-400 to-red-600",
    },
    {
      path: "/admin/ui",
      label: "User Interface",
      icon: <Icons.UIIcon />,
      color: "from-purple-400 to-purple-600",
    },
    {
      path: "/admin/settings",
      label: "Settings",
      icon: <Icons.SettingsIcon />,
      color: "from-blue-400 to-blue-600",
    },
    {
      path: "/admin/profile",
      label: "Profile",
      icon: <Icons.ProfileIcon />,
      color: "from-gray-400 to-gray-600",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`relative min-h-screen transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-64"
      } shadow-2xl overflow-hidden`}
      style={{
        background:
          "linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e293b 100%)",
        backgroundSize: "200% 200%",
        animation: "gradientAnimation 15s ease infinite",
      }}
    >
      {/* Custom CSS Animation */}
      <style jsx>{`
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes pulseAnimation {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>

      {/* Collapse button - only show on larger screens */}
      {windowWidth >= 768 && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-32 bg-gradient-to-r from-red-500 to-blue-500 rounded-full p-1 shadow-lg hover:from-red-600 hover:to-blue-600 transition-all z-50"
          style={{
            boxShadow:
              "0 0 10px rgba(219, 39, 119, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)",
          }}
        >
          <Icons.CollapseIcon collapsed={collapsed} />
        </button>
      )}

      {/* User section at the top */}
      <div className="backdrop-blur-sm bg-white/5 p-4 border-b border-gray-800/50">
        {!collapsed ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                <div className="bg-slate-800 p-1 rounded-full">
                  <Icons.AvatarIcon />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-lg font-medium text-white">
                  {userData.name}
                </p>
                <p className="text-sm text-gray-400">
                  {userData.role.charAt(0).toUpperCase() +
                    userData.role.slice(1)}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
              title="Logout"
            >
              <Icons.LogoutIcon />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-2">
              <div className="bg-slate-800 p-1 rounded-full">
                <Icons.AvatarIcon />
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1 rounded-lg hover:bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
              title="Logout"
            >
              <Icons.LogoutIcon />
            </button>
          </div>
        )}
      </div>

      {/* Top glass effect panel with logo */}
      <div
        className={`relative backdrop-blur-sm bg-white/5 rounded-b-2xl p-4 mb-6 ${
          collapsed ? "text-center" : ""
        }`}
      >
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "justify-start"
          } py-2`}
        >
          <div
            className="relative"
            style={{ animation: "pulseAnimation 3s infinite ease-in-out" }}
          >
            <Icons.LogoIcon />
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-blue-500/20 rounded-full blur-xl -z-10"></div>
          </div>

          {!collapsed && (
            <div className="ml-3">
              <h2 className="text-xl font-bold bg-gradient-to-r from-red-300 via-blue-300 to-gray-300 text-transparent bg-clip-text tracking-tight">
                ADMIN PORTAL
              </h2>
              <p className="text-xs text-gray-400">Enterprise Dashboard</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className={`px-3 ${collapsed ? "px-2" : "px-4"}`}>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={item.path} style={{ animationDelay: `${index * 0.1}s` }}>
              <Link
                to={item.path}
                className={`flex items-center rounded-xl transition-all duration-300 overflow-hidden group ${
                  isActive(item.path)
                    ? "bg-gradient-to-r from-gray-800/90 to-gray-900/90 text-white shadow-lg border-l-4 border-l-red-500"
                    : "hover:bg-gray-800/40 text-gray-300"
                } ${collapsed ? "justify-center p-3" : "p-3"}`}
              >
                <div
                  className={`relative flex-shrink-0 p-1 rounded-lg ${
                    isActive(item.path)
                      ? `bg-gradient-to-br ${item.color} shadow-md`
                      : "bg-gray-800/30 group-hover:bg-gradient-to-br group-hover:from-gray-700 group-hover:to-gray-800"
                  }`}
                >
                  {item.icon}
                </div>

                {!collapsed && (
                  <div className="ml-3 overflow-hidden">
                    <span
                      className={`font-medium transition-all ${
                        isActive(item.path)
                          ? "text-gray-100"
                          : "text-gray-300 group-hover:text-white"
                      }`}
                    >
                      {item.label}
                    </span>

                    {isActive(item.path) && (
                      <div className="w-full h-0.5 mt-1 bg-gradient-to-r from-red-500 via-blue-500 to-gray-500 rounded-full"></div>
                    )}
                  </div>
                )}

                {/* Show tooltip on hover when collapsed */}
                {collapsed && (
                  <div className="absolute left-full ml-6 px-3 py-1 bg-gray-900 text-white text-sm rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none shadow-lg">
                    {item.label}
                    <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 -left-1 top-1/2 -translate-y-1/2"></div>
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div
        className={`absolute bottom-0 left-0 right-0 backdrop-blur-sm bg-black/20 pt-3 pb-4 px-4 ${
          collapsed ? "text-center" : ""
        }`}
      >
        {!collapsed ? (
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
              <span className="text-gray-400">Online</span>
            </div>
            <span className="text-gray-500">v3.5.2</span>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
