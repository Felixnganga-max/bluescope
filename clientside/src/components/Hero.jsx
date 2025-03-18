import React, { useState, useEffect, useRef } from "react";
import assets from "../assets/assets.js";

export default function Hero() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  // WhatsApp contact details
  const whatsAppContacts = [
    {
      name: "Line 1",
      phoneNumber: "+254714952506",
      department: "For quotes and general inquiries",
    },
    {
      name: "Line 2",
      phoneNumber: "+254732917203",
      department: "For existing orders and technical support",
    },
    {
      name: "Line 3",
      phoneNumber: "+254726705694",
      department: "For existing orders and technical support",
    },
  ];

  // Banner data from database simulation
  const bannerData = [
    {
      id: 1,
      image: assets.sign1 || assets.banner, // Prioritizing signs, roll-ups, and banners
      title: "Make a Bold Statement with Custom Signs!",
      subtitle: "Eye-Catching Banners & Roll-Ups",
      cta: "Explore Options",
    },
    {
      id: 2,
      image: assets.banner,
      title: "Maximize Your Brand’s Visibility!",
      subtitle: "High-Quality Prints for Maximum Impact",
      cta: "Get Started",
    },
    {
      id: 3,
      image: assets.displayBanner || assets.banner, // Hoodies & apparel printing
      title: "Wear Your Brand with Confidence!",
      subtitle: "Custom-Printed Hoodies & Apparel",
      cta: "Shop Now",
    },
    {
      id: 4,
      image: assets.gift || assets.banner, // Gifts & promotional items
      title: "Personalized Gifts That Leave an Impression",
      subtitle: "Unique & Custom-Printed Merchandise",
      cta: "Discover More",
    },
    {
      id: 5,
      image: assets.cups, // Mugs & cups
      title: "Sip in Style with Custom Mugs!",
      subtitle: "Professional-Quality Print on Drinkware",
      cta: "Start Customizing",
    },
    {
      id: 6,
      image: assets.mockup || assets.banner, // Stationery, books, pens
      title: "Elevate Your Brand with Custom Stationery",
      subtitle: "Personalized Notebooks, Pens & More",
      cta: "Design Yours",
    },
  ];

  // Promotional cards data from database simulation
  const promotionalCardsData = [
    {
      id: 1,
      image: assets.notebook,
      title: "Custom Notebooks",
      subtitle: "Premium Collection",
      badgeText: "Advance your Branding",
      badgeColor: "bg-red-500",
      cta: "Request Sample",
    },
    {
      id: 2,
      image: assets.pen,
      title: "Custom Printed Pens",
      subtitle: "Corporate Branding",
      badgeText: "Brand with every written word",
      badgeColor: "bg-blue-500",
      cta: "Contact Us",
    },
    {
      id: 3,
      image: assets.carier,
      title: "Gift materials",
      subtitle: "Trade Show Ready",
      badgeText: "You don't just gift, you attach your brand with it",
      badgeColor: "bg-green-500",
      cta: "Get Quote",
    },
  ];

  // Animation effect on component mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Function to handle WhatsApp click - now opens a modal
  const handleWhatsAppClick = () => {
    setShowWhatsAppModal(true);
  };

  // Function to send message to specific WhatsApp number
  const sendWhatsAppMessage = (phoneNumber) => {
    const message =
      "Hello, I would be excited to get a quote for your printing services.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
    setShowWhatsAppModal(false);
  };

  // Function to send message to all WhatsApp numbers
  const sendToAllWhatsApp = () => {
    whatsAppContacts.forEach((contact) => {
      const message =
        "Hello, I would like to get a quote for your printing services.";
      const url = `https://wa.me/${
        contact.phoneNumber
      }?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    });
    setShowWhatsAppModal(false);
  };

  // Function to handle Call click
  const handleCallClick = () => {
    const phoneNumber = "1234567890"; // Phone number
    window.location.href = `tel:${phoneNumber}`;
  };

  // Function to handle Get to Know Us click
  const handleGetToKnowUsClick = () => {
    // Chatbot functionality
    alert("Chatbot will be attached here.");
  };

  // Function to navigate banner slides
  const navigateBanner = (direction) => {
    if (direction === "next") {
      setCurrentBannerIndex((prev) => (prev + 1) % bannerData.length);
    } else {
      setCurrentBannerIndex(
        (prev) => (prev - 1 + bannerData.length) % bannerData.length
      );
    }
  };

  // Function to get a random banner index
  const getRandomBannerIndex = () => {
    return Math.floor(Math.random() * bannerData.length);
  };

  // Set up interval to change banner every 3 hours
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex(getRandomBannerIndex());
    }, 10000); // 1 hours in milliseconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [bannerData.length]);

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

  const handleCategoryClick = (index) => {
    // On mobile, toggle the active category
    if (window.innerWidth < 1024) {
      setActiveCategory(activeCategory === index ? null : index);
    }
  };

  const handleCategoryHover = (index) => {
    // Only handle hover on desktop
    if (window.innerWidth >= 1024) {
      setActiveCategory(index);
    }
  };

  const handleCategoryLeave = () => {
    // Only handle hover on desktop
    if (window.innerWidth >= 1024) {
      setActiveCategory(null);
    }
  };
  return (
    <div
      className={`flex flex-col mt-30 md:mt-18 lg:flex-row gap-6 p-6 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen transition-opacity duration-1000 ${
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
                onClick={() => handleCategoryClick(index)}
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

                {/* Subcategories dropdown - Desktop (right side) and Mobile (overlay) */}
                {activeCategory === index && (
                  <ul
                    className={`lg:absolute lg:left-full lg:top-0 lg:ml-4 w-56 bg-white shadow-2xl rounded-lg border border-gray-200 z-50 py-3 animate-fadeIn ${
                      window.innerWidth < 1024 ? "mt-2" : ""
                    }`}
                    style={{
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                  >
                    <div className="lg:absolute lg:left-0 lg:top-4 lg:transform lg:-translate-x-2 lg:w-3 lg:h-3 lg:rotate-45 lg:bg-white lg:border-l lg:border-t lg:border-gray-200"></div>
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
                      <button
                        className="text-blue-600 text-sm hover:text-blue-800 transition-colors"
                        onClick={handleWhatsAppClick}
                      >
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
            <button
              className="mt-2 w-full bg-white text-purple-700 py-2 rounded-md shadow-sm text-sm font-medium hover:shadow-md transition-shadow duration-300"
              onClick={handleWhatsAppClick}
            >
              Chat with Us
            </button>
          </div>
        </div>
      </div>

      {/* Main Banner with Slider Navigation */}
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
            src={bannerData[currentBannerIndex].image}
            alt="Main Banner"
            className="h-180 w-full md:h-[700px] object-cover rounded-lg transition-transform duration-700 group-hover:scale-105"
            style={{ objectPosition: "center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 via-purple-800/60 to-transparent rounded-lg"></div>

          {/* Banner content with enhanced styling */}
          <div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-16 z-20 transition-all duration-500 transform group-hover:translate-y-[-8px]">
            <div className="bg-purple-600/30 text-white text-xs uppercase tracking-widest py-1 px-3 rounded-full mb-4 backdrop-blur-sm">
              {bannerData[currentBannerIndex].subtitle}
            </div>
            <h2 className="text-white text-xl md:text-4xl font-bold mb-4 drop-shadow-lg">
              {bannerData[currentBannerIndex].title} <br />
              <span className="text-blue-500">Visibility?</span>
            </h2>
            <div className="text-white text-xl font-bold mb-6 max-w-md drop-shadow-md">
              <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-5 border border-blue-500/30">
                <p className="uppercase flex items-center mb-3">
                  <span className="text-blue-500 mr-2 text-xl">✓</span>
                  We{" "}
                  <span className="text-blue-500 ml-2 font-extrabold">
                    DESIGN
                  </span>
                </p>
                <p className="uppercase flex items-center mb-3">
                  <span className="text-blue-500 mr-2 text-xl">✓</span>
                  We{" "}
                  <span className="text-blue-500 ml-2 font-extrabold">
                    PRINT
                  </span>
                </p>
                <p className="uppercase flex items-center">
                  <span className="text-blue-500 mr-2 text-xl">✓</span>
                  We{" "}
                  <span className="text-blue-500 ml-2 font-extrabold">
                    BRAND
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="bg-purple-600 text-white py-3 px-8 rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group"
                onClick={handleWhatsAppClick}
              >
                <span>{bannerData[currentBannerIndex].cta}</span>
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
              <button
                className="bg-white/20 backdrop-blur-sm text-white border border-white/40 py-3 px-8 rounded-lg hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={handleWhatsAppClick}
              >
                Request Sample
              </button>
            </div>

            {/* Trust indicators */}
            <div className="absolute bottom-6 left-8 md:left-16 right-8 md:right-16">
              <div className="flex flex-wrap items-center gap-4">
                <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                  <span className="text-white text-xs">🔒 Secure Ordering</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                  <span className="text-white text-xs">🚚 Fast Delivery</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                  <span className="text-white text-xs">🔄 24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Banner Navigation Arrows */}
          <button
            onClick={() => navigateBanner("prev")}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white rounded-full p-3 shadow-lg transition-all duration-300 z-30"
            aria-label="Previous banner"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-9 w-9"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => navigateBanner("next")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white rounded-full p-3 shadow-lg transition-all duration-300 z-30"
            aria-label="Next banner"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-9 w-9"
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

          {/* Dots for banner navigation */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
            {bannerData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBannerIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentBannerIndex === index
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Promotions with Enhanced Styling - Now using data from database simulation */}
      <div
        className="w-full lg:w-2/6 flex flex-col gap-4 z-10"
        style={{ minHeight: "32rem" }}
      >
        {/* Map through promotional cards data */}
        {promotionalCardsData.map((card, index) => (
          <div
            key={card.id}
            className="bg-cover bg-center text-white rounded-xl relative overflow-hidden group shadow-xl transition-transform duration-300 hover:-translate-y-1 flex-1"
            style={{
              backgroundImage: `url(${card.image})`,
              height: "calc(33.333% - 0.667rem)",
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 group-hover:from-black/20 group-hover:to-black/50 transition-all duration-300"></div>
            <div
              className={`absolute top-0 right-0 ${card.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-20`}
            >
              {card.badgeText}
            </div>
            <div className="relative z-10 p-6 flex flex-col h-full justify-between transition-all duration-300 transform group-hover:translate-y-[-4px]">
              <div>
                <div className="text-xs uppercase tracking-wider mb-1 opacity-75">
                  {card.subtitle}
                </div>
                <h4 className="text-2xl font-bold mb-1">{card.title}</h4>
              </div>
              <div>
                <button
                  className="bg-white/20 backdrop-blur-sm text-white border border-white/40 py-2 px-4 rounded-lg hover:bg-white/30 transition-all duration-300 text-sm flex items-center gap-2 group/btn"
                  onClick={handleWhatsAppClick}
                >
                  <span>{card.cta}</span>
                  <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* WhatsApp Contact Modal */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 m-4 max-w-md w-full animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-xl text-gray-800">Contact Us</h3>
              <button
                onClick={() => setShowWhatsAppModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Choose which department you'd like to contact:
            </p>

            <div className="space-y-4">
              {whatsAppContacts.map((contact, index) => (
                <button
                  key={index}
                  onClick={() => sendWhatsAppMessage(contact.phoneNumber)}
                  className="flex items-center justify-between w-full bg-green-50 hover:bg-green-100 text-green-800 py-3 px-4 rounded-lg transition-colors duration-300 border border-green-200"
                >
                  <div className="flex items-center">
                    <div className="bg-green-500 rounded-full p-2 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-xs text-gray-500">
                        {contact.department}
                      </div>
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              ))}

              <button
                onClick={sendToAllWhatsApp}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Contact Both Departments
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Call-to-Action Button (visible on scroll) */}
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
