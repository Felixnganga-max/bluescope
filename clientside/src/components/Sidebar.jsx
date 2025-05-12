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
          <stop offset="0%" stopColor="#c8a951" />
          <stop offset="50%" stopColor="#f0d082" />
          <stop offset="100%" stopColor="#d4af37" />
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
      console.log("🔍 Starting to fetch user data");
      try {
        const token = localStorage.getItem("token");
        console.log(
          "📝 Token retrieved:",
          token ? "Token exists" : "No token found"
        );

        if (!token) {
          console.log("⚠️ No token found in localStorage");
          setUserData({
            name: "Not Logged In",
            role: "Guest",
          });
          return;
        }

        try {
          console.log("🔄 Making API request to fetch current user");
          console.log(
            "🌐 API URL:",
            "https://bluescope-eotl.vercel.app/bluescope/auth/current-user"
          );

          const response = await axios.get(
            "https://bluescope-eotl.vercel.app/bluescope/auth/current-user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              timeout: 5000, // 5 second timeout
            }
          );

          console.log("✅ API Response received:", response);
          console.log("📊 Response data:", response.data);
          console.log("🔑 Success flag:", response.data.success);
          console.log("👤 User data:", response.data.user);

          if (response.data.success && response.data.user) {
            const user = response.data.user;
            console.log("💾 Setting user data with:", {
              name: user.name || "Unknown User",
              role: user.role || "Unknown Role",
            });

            setUserData({
              name: user.name || "Unknown User",
              role: user.role || "Unknown Role",
            });
          } else {
            console.log("❌ Invalid response format or unsuccessful response");
            setUserData({
              name: "Invalid Token",
              role: "Access Denied",
            });
          }
        } catch (error) {
          console.error("❗ API Error:", error);

          if (error.response) {
            // The request was made and the server responded with a status code
            console.error(
              "📡 Server responded with status:",
              error.response.status
            );
            console.error("📡 Response data:", error.response.data);
            console.error("📡 Response headers:", error.response.headers);

            setUserData({
              name: "Server Error",
              role: error.response.status.toString(),
            });
          } else if (error.request) {
            // The request was made but no response was received
            console.error("📡 No response received:", error.request);

            setUserData({
              name: "No Server Response",
              role: "Check backend server",
            });
          } else if (error.code === "ECONNABORTED") {
            console.error("⏱️ Request timeout:", error.message);

            setUserData({
              name: "Connection Timeout",
              role: "Check server connection",
            });
          } else {
            // Something happened in setting up the request
            console.error("🔌 Network Error:", error.message);

            setUserData({
              name: "Network Error",
              role: "Unable to connect",
            });
          }
        }
      } catch (error) {
        console.error("🔒 Token handling error:", error);
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
    console.log("🚪 Logout clicked, removing token");
    // Implement logout functionality
    localStorage.removeItem("token");
    console.log("🔑 Token removed from localStorage");
    // Redirect to login page or home
    console.log("🔄 Redirecting to home page");
    window.location.href = "/";
  };

  const menuItems = [
    {
      path: "/admin/product-management",
      label: "Product Management",
      icon: <Icons.ProductIcon />,
      color: "from-amber-400 to-yellow-600",
    },
    {
      path: "#",
      label: "Sales Management",
      icon: <Icons.SalesIcon />,
      color: "from-amber-300 to-yellow-500",
    },
    {
      path: "#",
      label: "Inventory Management",
      icon: <Icons.InventoryIcon />,
      color: "from-amber-400 to-yellow-600",
    },
    {
      path: "/admin/users",
      label: "Users",
      icon: <Icons.UsersIcon />,
      color: "from-amber-300 to-yellow-500",
    },
    {
      path: "#",
      label: "User Interface",
      icon: <Icons.UIIcon />,
      color: "from-amber-400 to-yellow-600",
    },
    {
      path: "/admin/settings",
      label: "Settings",
      icon: <Icons.SettingsIcon />,
      color: "from-amber-300 to-yellow-500",
    },
    {
      path: "#",
      label: "Profile",
      icon: <Icons.ProfileIcon />,
      color: "from-amber-400 to-yellow-600",
    },
  ];

  const isActive = (path) => {
    const active = location.pathname === path;
    console.log(`📍 Menu item ${path}: ${active ? "active" : "inactive"}`);
    return active;
  };

  console.log("🖥️ Rendering Sidebar with user:", userData);
  console.log("📊 Current window width:", windowWidth);
  console.log("🔍 Sidebar collapsed:", collapsed);

  return (
    <div
      className={`fixed top-0 left-0 h-screen transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-64"
      } shadow-2xl overflow-hidden z-50`}
      style={{
        background:
          "linear-gradient(135deg, #0a1929 0%, #112240 50%, #0a192f 100%)",
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

        @keyframes glowAnimation {
          0% {
            box-shadow: 0 0 5px rgba(212, 175, 55, 0.3);
          }
          50% {
            box-shadow: 0 0 15px rgba(212, 175, 55, 0.5),
              0 0 30px rgba(212, 175, 55, 0.3);
          }
          100% {
            box-shadow: 0 0 5px rgba(212, 175, 55, 0.3);
          }
        }
      `}</style>

      {/* Collapse button - only show on larger screens */}
      {windowWidth >= 768 && (
        <button
          onClick={() => {
            console.log("🔄 Toggling sidebar collapse state");
            setCollapsed(!collapsed);
          }}
          className="absolute -right-3 top-32 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full p-1 shadow-lg hover:from-amber-600 hover:to-yellow-600 transition-all z-50"
          style={{
            boxShadow:
              "0 0 10px rgba(212, 175, 55, 0.5), 0 0 20px rgba(212, 175, 55, 0.3)",
            animation: "glowAnimation 3s infinite ease-in-out",
          }}
        >
          <Icons.CollapseIcon collapsed={collapsed} />
        </button>
      )}

      {/* User section at the top */}
      <div className="backdrop-blur-sm bg-white/5 p-4 border-b border-amber-900/30">
        {!collapsed ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-600">
                <div className="bg-slate-900 p-1 rounded-full">
                  <Icons.AvatarIcon />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-lg font-medium text-white">
                  {userData.name}
                </p>
                <p className="text-sm text-amber-300">
                  {userData.role.charAt(0).toUpperCase() +
                    userData.role.slice(1)}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-gray-800/50 text-amber-300 hover:text-amber-500 transition-colors"
              title="Logout"
            >
              <Icons.LogoutIcon />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="p-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-600 mb-2">
              <div className="bg-slate-900 p-1 rounded-full">
                <Icons.AvatarIcon />
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1 rounded-lg hover:bg-gray-800/50 text-amber-300 hover:text-amber-500 transition-colors"
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
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-full blur-xl -z-10"></div>
          </div>

          {!collapsed && (
            <div className="ml-3">
              <h2 className="text-xl font-bold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-400 text-transparent bg-clip-text tracking-tight">
                ADMIN PORTAL
              </h2>
              <p className="text-xs text-amber-400/80">Enterprise Dashboard</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div
        className={`px-3 ${
          collapsed ? "px-2" : "px-4"
        } overflow-y-auto h-full pb-20`}
      >
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={item.path} style={{ animationDelay: `${index * 0.1}s` }}>
              <Link
                to={item.path}
                className={`flex items-center rounded-xl transition-all duration-300 overflow-hidden group ${
                  isActive(item.path)
                    ? "bg-gradient-to-r from-slate-800/90 to-slate-900/90 text-white shadow-lg border-l-4 border-l-amber-500"
                    : "hover:bg-slate-800/40 text-gray-300"
                } ${collapsed ? "justify-center p-3" : "p-3"}`}
                onClick={() => {
                  console.log(
                    `🔗 Clicked menu item: ${item.label}, path: ${item.path}`
                  );
                }}
              >
                <div
                  className={`relative flex-shrink-0 p-1 rounded-lg ${
                    isActive(item.path)
                      ? `bg-gradient-to-br ${item.color} shadow-md`
                      : "bg-slate-800/30 group-hover:bg-gradient-to-br group-hover:from-amber-700/30 group-hover:to-amber-800/30"
                  }`}
                >
                  {item.icon}
                </div>

                {!collapsed && (
                  <div className="ml-3 overflow-hidden">
                    <span
                      className={`font-medium transition-all ${
                        isActive(item.path)
                          ? "text-amber-200"
                          : "text-gray-300 group-hover:text-amber-200"
                      }`}
                    >
                      {item.label}
                    </span>

                    {isActive(item.path) && (
                      <div className="w-full h-0.5 mt-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 rounded-full"></div>
                    )}
                  </div>
                )}

                {/* Show tooltip on hover when collapsed */}
                {collapsed && (
                  <div className="absolute left-full ml-6 px-3 py-1 bg-slate-900 text-amber-200 text-sm rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none shadow-lg border border-amber-700/30">
                    {item.label}
                    <div className="absolute w-2 h-2 bg-slate-900 transform rotate-45 -left-1 top-1/2 -translate-y-1/2 border-l border-t border-amber-700/30"></div>
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
              <div className="h-2 w-2 rounded-full bg-amber-400 mr-2 animate-pulse"></div>
              <span className="text-amber-300">Online</span>
            </div>
            <span className="text-amber-500/70">v3.5.2</span>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
