import React, { useState, useEffect } from "react";
import assets from "../assets/assets.js";

export default function Hero() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  // Animation effect on component mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Function to handle WhatsApp click
  const handleWhatsAppClick = () => {
    const phoneNumber = "1234567890"; // Replace with your WhatsApp number
    const message = "Hello, I would like to get a quick quote."; // Replace with your message
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  // Function to handle Call click
  const handleCallClick = () => {
    const phoneNumber = "1234567890"; // Replace with your phone number
    window.location.href = `tel:${phoneNumber}`;
  };

  // Function to handle Get to Know Us click
  const handleGetToKnowUsClick = () => {
    // You can attach your chatbot functionality here
    alert("Chatbot will be attached here.");
  };

  // Print shop categories data structure
  const categories = [
    {
      name: "Stationery",
      icon: "📝",
      subcategories: [
        "Books",
        "Notebooks",
        "Pens",
        "Pencils",
        "Binders",
        "Calendars",
      ],
    },
    {
      name: "Apparel",
      icon: "👕",
      subcategories: [
        "T-shirts",
        "Hoodies",
        "Polos",
        "Tracksuits",
        "Caps",
        "Uniforms",
      ],
    },
    {
      name: "Signs",
      icon: "🚧",
      subcategories: [
        "Outdoor Signs",
        "Indoor Signs",
        "2D Signs",
        "3D Signs",
        "Banners",
        "Vehicle Graphics",
      ],
    },
    {
      name: "Promotional Items",
      icon: "🎁",
      subcategories: [
        "Business Cards",
        "Brochures",
        "Flyers",
        "Keychains",
        "Mugs",
        "Tote Bags",
      ],
    },
    {
      name: "Gifts",
      icon: "🎀",
      subcategories: [
        "Custom Frames",
        "Photo Books",
        "Engraved Items",
        "Gift Cards",
        "Corporate Gifts",
        "Personalized Stationery",
      ],
    },
    {
      name: "Large Format Printing",
      icon: "🖼️",
      subcategories: [
        "Posters",
        "Banners",
        "Canvas Prints",
        "Backdrops",
        "Trade Show Displays",
        "Window Graphics",
      ],
    },
  ];

  const handleCategoryHover = (index) => {
    setActiveCategory(index);
  };

  const handleCategoryLeave = () => {
    setActiveCategory(null);
  };

  return (
    <div
      className={`flex flex-col mt-18 lg:flex-row gap-6 p-6 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen transition-opacity duration-1000 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden text-gray-600 hover:text-blue-500 bg-white rounded-lg p-3 shadow-md mb-4 transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2 z-50"
      >
        <span className="text-lg">{isSidebarOpen ? "✕" : "☰"}</span>
        <span>{isSidebarOpen ? "Close Menu" : "Browse Categories"}</span>
      </button>

      {/* Sidebar - Fixed position on mobile, normal flow on desktop */}
      <div
        className={`w-full lg:w-1/6 bg-white rounded-lg shadow-xl transition-all duration-500 transform z-40
          ${
            isSidebarOpen
              ? "fixed top-20 left-6 right-6 lg:static lg:transform-none"
              : "lg:opacity-100 lg:scale-100 lg:h-auto opacity-0 scale-95 h-0 lg:static absolute"
          }`}
        style={{
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div className="p-4 h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800 text-lg border-b-2 border-purple-500 pb-1">
              PRINT CATEGORIES
            </h3>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-gray-600 hover:text-red-500 transition-colors duration-300"
            >
              <span className="text-lg">✕</span>
            </button>
          </div>
          <ul className="space-y-1">
            <li className="font-medium cursor-pointer hover:text-blue-600 transition-colors duration-200 py-3 px-2 border-b border-gray-100 flex items-center rounded-lg hover:bg-blue-50">
              <span className="mr-2 text-blue-500">🔍</span>
              All Print Products
            </li>
            <li className="text-red-500 font-medium cursor-pointer hover:text-red-700 transition-colors duration-200 py-3 px-2 border-b border-gray-100 flex items-center rounded-lg hover:bg-red-50">
              <span className="mr-2">🔥</span>
              Best Selling Items
            </li>
            <li className="text-green-600 font-medium cursor-pointer hover:text-green-800 transition-colors duration-200 py-3 px-2 border-b border-gray-100 flex items-center rounded-lg hover:bg-green-50">
              <span className="mr-2">💰</span>
              Weekly Specials
            </li>

            {/* Dynamic Categories */}
            {categories.map((category, index) => (
              <li
                key={index}
                className="relative py-3 px-2 border-b border-gray-100 cursor-pointer hover:bg-gray-50 rounded-lg transition-all duration-200"
                onMouseEnter={() => handleCategoryHover(index)}
                onMouseLeave={handleCategoryLeave}
              >
                <div className="flex justify-between items-center hover:text-blue-600 transition-colors duration-200">
                  <span className="flex items-center">
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </span>
                  <span
                    className={`text-xs transition-transform duration-300 transform ${
                      activeCategory === index ? "rotate-90" : ""
                    }`}
                  >
                    →
                  </span>
                </div>

                {/* Subcategories dropdown */}
                {activeCategory === index && (
                  <ul
                    className="absolute left-full top-0 ml-4 w-56 bg-white shadow-2xl rounded-lg border border-gray-200 z-50 py-3 animate-fadeIn"
                    style={{
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                  >
                    <div className="absolute left-0 top-4 transform -translate-x-2 w-3 h-3 rotate-45 bg-white border-l border-t border-gray-200"></div>
                    <div className="px-3 mb-2 text-sm font-semibold text-gray-500 border-b pb-2">
                      {category.name}
                    </div>
                    {category.subcategories.map((subcat, subIndex) => (
                      <li
                        key={subIndex}
                        className="px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 flex items-center"
                      >
                        <span className="w-1 h-1 bg-gray-300 rounded-full mr-2"></span>
                        {subcat}
                      </li>
                    ))}
                    <div className="mt-2 px-4 pt-2 border-t">
                      <button className="text-blue-600 text-sm hover:text-blue-800 transition-colors">
                        View All {category.name} →
                      </button>
                    </div>
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
            <p className="text-gray-700 text-sm font-medium">Need Help?</p>
            <p className="text-gray-600 text-xs mt-1">
              Contact our print experts
            </p>
            <button className="mt-2 w-full bg-white text-purple-700 py-2 rounded-md shadow-sm text-sm font-medium hover:shadow-md transition-shadow duration-300">
              Chat with Us
            </button>
          </div>
        </div>
      </div>

      {/* Main Banner - Make taller to match the left sidebar */}
      <div
        className="w-full lg:w-4/6 bg-white rounded-lg shadow-xl flex flex-col justify-center items-start relative overflow-hidden group h-full z-10"
        style={{
          minHeight: "32rem",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div className="w-full h-full relative">
          <img
            src={assets.banner}
            alt="Main Banner"
            className="w-full h-full object-cover rounded-lg transition-transform duration-700 group-hover:scale-105"
            style={{ objectPosition: "center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 via-purple-800/40 to-transparent rounded-lg"></div>

          {/* Banner content with enhanced styling */}
          <div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-16 z-20 transition-all duration-500 transform group-hover:translate-y-[-8px]">
            <div className="bg-purple-600/20 text-white text-xs uppercase tracking-widest py-1 px-3 rounded-full mb-4 backdrop-blur-sm">
              Professional Quality
            </div>
            <h2 className="text-white text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              Does Your Brand Need More <br />
              <span className="text-blue-500">Visibility?</span>
            </h2>
            <p className="text-white text-xl uppercase font-bolder outline-1 rounded-3xl p-5 md:text-2xl mb-6 max-w-md drop-shadow-md leading-relaxed">
              We <span className="text-blue-500">Design</span>
              <br />
              We <span className="text-blue-500">Print</span>
              <br />
              We <span className="text-blue-500">Brand</span>
              <br />
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-purple-600 text-white py-3 px-8 rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group">
                <span>Get Started</span>
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white border border-white/40 py-3 px-8 rounded-lg hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl">
                View Samples
              </button>
            </div>

            {/* Trust indicators */}
            <div className="absolute bottom-6 left-8 md:left-16 right-8 md:right-16">
              <div className="flex flex-wrap items-center gap-4">
                <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                  <span className="text-yellow-300 mr-1">★★★★★</span>
                  <span className="text-white text-xs">
                    4.9/5 (2000+ Reviews)
                  </span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                  <span className="text-white text-xs">🔒 Secure Ordering</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                  <span className="text-white text-xs">🚚 Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promotions with Enhanced Styling */}
      <div
        className="w-full lg:w-2/6 flex flex-col gap-4 z-10"
        style={{ minHeight: "32rem" }}
      >
        {/* First promotional card */}
        <div
          className="bg-cover bg-center text-white rounded-xl relative overflow-hidden group shadow-xl transition-transform duration-300 hover:-translate-y-1 flex-1"
          style={{
            backgroundImage: `url(${assets.notebook})`,
            height: "calc(33.333% - 0.667rem)",
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 group-hover:from-black/30 group-hover:to-black/70 transition-all duration-300"></div>
          <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-20">
            20% OFF
          </div>
          <div className="relative z-10 p-6 flex flex-col h-full justify-between transition-all duration-300 transform group-hover:translate-y-[-4px]">
            <div>
              <div className="text-xs uppercase tracking-wider mb-1 opacity-75">
                Premium Collection
              </div>
              <h4 className="text-2xl font-bold mb-1">Custom Notebooks</h4>
              <p className="text-sm mb-3 max-w-xs opacity-90">
                Perfect for corporate gifts and daily use
              </p>
            </div>
            <div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-sm line-through opacity-70">$16.99</span>
                <span className="font-bold text-lg">$12.99</span>
              </div>
              <button className="bg-white/20 backdrop-blur-sm text-white border border-white/40 py-2 px-4 rounded-lg hover:bg-white/30 transition-all duration-300 text-sm flex items-center gap-2 group/btn">
                <span>Shop Now</span>
                <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Second promotional card */}
        <div
          className="bg-cover bg-center text-white rounded-xl relative overflow-hidden group shadow-xl transition-transform duration-300 hover:-translate-y-1 flex-1"
          style={{
            backgroundImage: `url(${assets.pen})`,
            height: "calc(33.333% - 0.667rem)",
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 group-hover:from-black/30 group-hover:to-black/70 transition-all duration-300"></div>
          <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-20">
            NEW ARRIVAL
          </div>
          <div className="relative z-10 p-6 flex flex-col h-full justify-between transition-all duration-300 transform group-hover:translate-y-[-4px]">
            <div>
              <div className="text-xs uppercase tracking-wider mb-1 opacity-75">
                Corporate Branding
              </div>
              <h4 className="text-2xl font-bold mb-1">Custom Apparel</h4>
              <p className="text-sm mb-3 max-w-xs opacity-90">
                High-quality custom printed t-shirts & polos
              </p>
            </div>
            <div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-bold text-lg">From $18.99/item</span>
              </div>
              <button className="bg-white/20 backdrop-blur-sm text-white border border-white/40 py-2 px-4 rounded-lg hover:bg-white/30 transition-all duration-300 text-sm flex items-center gap-2 group/btn">
                <span>Bulk Pricing</span>
                <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Third promotional card */}
        <div
          className="bg-cover bg-center text-white rounded-xl relative overflow-hidden group shadow-xl transition-transform duration-300 hover:-translate-y-1 flex-1"
          style={{
            backgroundImage: `url(${assets.carier})`,
            height: "calc(33.333% - 0.667rem)",
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 group-hover:from-black/30 group-hover:to-black/70 transition-all duration-300"></div>
          <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-20">
            FAST TURNAROUND
          </div>
          <div className="relative z-10 p-6 flex flex-col h-full justify-between transition-all duration-300 transform group-hover:translate-y-[-4px]">
            <div>
              <div className="text-xs uppercase tracking-wider mb-1 opacity-75">
                Trade Show Ready
              </div>
              <h4 className="text-2xl font-bold mb-1">Large Format</h4>
              <p className="text-sm mb-3 max-w-xs opacity-90">
                Banners, displays, and promotional materials
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs">
                  48hr Rush Available
                </span>
              </div>
              <button className="bg-white/20 backdrop-blur-sm text-white border border-white/40 py-2 px-4 rounded-lg hover:bg-white/30 transition-all duration-300 text-sm flex items-center gap-2 group/btn">
                <span>Request Quote</span>
                <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Floating Call-to-Action Button (visible on scroll) */}
      <div className="fixed bottom-6 right-6 z-50 hidden md:block">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
        >
          <span className="sr-only">Quick Quote</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <span className="absolute -top-10 right-0 bg-white text-purple-700 px-3 py-1 rounded-lg shadow-md text-sm font-medium whitespace-nowrap">
          Get Quick Quote
        </span>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg w-48 z-50">
            <ul className="py-2">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleWhatsAppClick}
              >
                Chat on WhatsApp
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleCallClick}
              >
                Call Us
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleGetToKnowUsClick}
              >
                Get to Know Us
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
