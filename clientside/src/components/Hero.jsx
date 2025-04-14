import React, { useState, useEffect, useRef } from "react";
import assets from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredPromo, setHoveredPromo] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);

  const navigate = useNavigate();

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
      image: assets.sign1 || assets.banner,
      title: "Make a Bold Statement with Custom Signs!",
      subtitle: "Eye-Catching Banners & Roll-Ups",
      cta: "Explore Options",
      color: "from-purple-600 to-indigo-800",
      categoryLink: "signs",
    },
    {
      id: 2,
      image: assets.banner,
      title: "Maximize Your Brand's Visibility!",
      subtitle: "High-Quality Prints for Maximum Impact",
      cta: "Get Started",
      color: "from-blue-600 to-cyan-600",
      categoryLink: "large-format-printing",
    },
    {
      id: 3,
      image: assets.displayBanner || assets.banner,
      title: "Wear Your Brand with Confidence!",
      subtitle: "Custom-Printed Hoodies & Apparel",
      cta: "Shop Now",
      color: "from-teal-500 to-emerald-600",
      categoryLink: "apparel",
    },
    {
      id: 4,
      image: assets.gift || assets.banner,
      title: "Personalized Gifts That Leave an Impression",
      subtitle: "Unique & Custom-Printed Merchandise",
      cta: "Discover More",
      color: "from-orange-500 to-amber-600",
      categoryLink: "gifts",
    },
    {
      id: 5,
      image: assets.cups,
      title: "Sip in Style with Custom Mugs!",
      subtitle: "Professional-Quality Print on Drinkware",
      cta: "Start Customizing",
      color: "from-red-500 to-pink-600",
      categoryLink: "promotional-items",
    },
    {
      id: 6,
      image: assets.mockup || assets.banner,
      title: "Elevate Your Brand with Custom Stationery",
      subtitle: "Personalized Notebooks, Pens & More",
      cta: "Design Yours",
      color: "from-violet-600 to-purple-700",
      categoryLink: "stationery",
    },
  ];

  // Promotional cards data from database simulation
  const promotionalCardsData = [
    {
      id: 1,
      image: assets.notebook,
      title: "Custom Notebooks",
      subtitle: "Premium Collection",
      description:
        "Professional notebooks with your logo embossed or printed for a sophisticated brand impression",
      badgeText: "Advance your Branding",
      badgeColor: "bg-gradient-to-r from-red-500 to-rose-700",
      cta: "Request Sample",
      categoryLink: "stationery",
      icon: "📘",
    },
    {
      id: 2,
      image: assets.pen,
      title: "Custom Printed Pens",
      subtitle: "Corporate Branding",
      description:
        "High-quality pens customized with your company details, perfect for daily use and gifting",
      badgeText: "Brand with every written word",
      badgeColor: "bg-gradient-to-r from-blue-500 to-sky-700",
      cta: "Contact Us",
      categoryLink: "stationery",
      icon: "✒️",
    },
    {
      id: 3,
      image: assets.carier,
      title: "Gift Materials",
      subtitle: "Trade Show Ready",
      description:
        "Branded gift bags, boxes and packaging that make a lasting impression for any occasion",
      badgeText: "Link your brand to every gift",
      badgeColor: "bg-gradient-to-r from-green-500 to-emerald-700",
      cta: "Get Quote",
      categoryLink: "gifts",
      icon: "🎁",
    },
  ];

  // Print shop categories data structure
  const categories = [
    {
      name: "Stationery",
      icon: "📝",
      color: "border-purple-400 bg-purple-50",
      hoverColor: "hover:bg-purple-100 hover:border-purple-500",
      textColor: "text-purple-800",
      subcategories: [
        "Books",
        "Notebooks",
        "Pens",
        "Pencils",
        "Binders",
        "Calendars",
      ],
      categoryLink: "stationery",
    },
    {
      name: "Apparel",
      icon: "👕",
      color: "border-blue-400 bg-blue-50",
      hoverColor: "hover:bg-blue-100 hover:border-blue-500",
      textColor: "text-blue-800",
      subcategories: [
        "T-shirts",
        "Hoodies",
        "Polos",
        "Tracksuits",
        "Caps",
        "Uniforms",
      ],
      categoryLink: "apparel",
    },
    {
      name: "Signs",
      icon: "🚧",
      color: "border-orange-400 bg-orange-50",
      hoverColor: "hover:bg-orange-100 hover:border-orange-500",
      textColor: "text-orange-800",
      subcategories: [
        "Outdoor Signs",
        "Indoor Signs",
        "2D Signs",
        "3D Signs",
        "Banners",
        "Vehicle Graphics",
      ],
      categoryLink: "signs",
    },
    {
      name: "Promotional Items",
      icon: "🎁",
      color: "border-red-400 bg-red-50",
      hoverColor: "hover:bg-red-100 hover:border-red-500",
      textColor: "text-red-800",
      subcategories: [
        "Business Cards",
        "Brochures",
        "Flyers",
        "Keychains",
        "Mugs",
        "Tote Bags",
      ],
      categoryLink: "promotional-items",
    },
    {
      name: "Gifts",
      icon: "🎀",
      color: "border-pink-400 bg-pink-50",
      hoverColor: "hover:bg-pink-100 hover:border-pink-500",
      textColor: "text-pink-800",
      subcategories: [
        "Custom Frames",
        "Photo Books",
        "Engraved Items",
        "Gift Cards",
        "Corporate Gifts",
        "Personalized Stationery",
      ],
      categoryLink: "gifts",
    },
    {
      name: "Large Format Printing",
      icon: "🖼️",
      color: "border-teal-400 bg-teal-50",
      hoverColor: "hover:bg-teal-100 hover:border-teal-500",
      textColor: "text-teal-800",
      subcategories: [
        "Posters",
        "Banners",
        "Canvas Prints",
        "Backdrops",
        "Trade Show Displays",
        "Window Graphics",
      ],
      categoryLink: "large-format-printing",
    },
  ];

  // Category highlights data
  const categoryHighlights = [
    {
      id: 1,
      name: "Business Cards",
      image: assets.businessCard,
      link: "promotional-items/business-cards",
    },
    {
      id: 2,
      name: "T-Shirts",
      image: assets.tshirt,
      link: "apparel/t-shirts",
    },
    {
      id: 3,
      name: "Banners",
      image: assets.banner,
      link: "large-format-printing/banners",
    },
    {
      id: 4,
      name: "Mugs",
      image: assets.cups,
      link: "promotional-items/mugs",
    },
  ];

  // Animation effect on component mount
  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect clicks outside search box
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchRef]);

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
    const phoneNumber = "1234567890";
    window.location.href = `tel:${phoneNumber}`;
  };

  // Function to handle Get to Know Us click
  const handleGetToKnowUsClick = () => {
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

  // Set up interval to change banner every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % bannerData.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [bannerData.length]);

  // Navigate to specific category in catalogue
  const navigateToCategory = (category) => {
    navigate(`/catalogue?category=${category}`);
  };

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

  // Function to handle search action
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalogue?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen overflow-hidden">
      {/* Preloader Animation - Shows only on initial load */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 bg-white z-50 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              PrintMaster
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-24"
          >
            <motion.div
              ref={searchRef}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <form onSubmit={handleSearch} className="flex items-center p-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for print products..."
                  className="w-full py-3 px-4 bg-gray-100 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-purple-600 text-white py-3 px-6 rounded-r-lg hover:bg-purple-700 transition-colors"
                >
                  Search
                </button>
              </form>
              <div className="p-4 border-t border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Popular searches:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Business cards",
                    "T-shirts",
                    "Mugs",
                    "Banners",
                    "Notebooks",
                    "Flyers",
                  ].map((term, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSearchQuery(term);
                        navigate(
                          `/catalogue?search=${encodeURIComponent(term)}`
                        );
                        setShowSearch(false);
                      }}
                      className="px-3 py-1 bg-gray-100 hover:bg-purple-100 rounded-full text-sm text-gray-600 hover:text-purple-700 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Modal */}
      <AnimatePresence>
        {showWhatsAppModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    Contact Us via WhatsApp
                  </h3>
                  <button
                    onClick={() => setShowWhatsAppModal(false)}
                    className="text-gray-400 hover:text-gray-600"
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
                  Choose a contact line to get assistance with your printing
                  needs:
                </p>

                <div className="space-y-3 mb-6">
                  {whatsAppContacts.map((contact, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {contact.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {contact.department}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            sendWhatsAppMessage(contact.phoneNumber)
                          }
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm flex items-center"
                        >
                          <span className="mr-1">💬</span> Chat
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={sendToAllWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <span className="mr-2">💬</span> Message All Contacts
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative pt-20 md:pt-24 lg:pt-28 px-4 sm:px-6 lg:px-8 max-w-8xl mx-auto">
        {/* Quick Action Bar - Fixed on Scroll */}
        <motion.div
          className="fixed top-0 left-0 right-0 z-30 bg-white shadow-md"
          initial={{ y: -100 }}
          animate={{ y: scrollPosition > 50 ? 0 : -100 }}
          transition={{ duration: 0.3 }}
        >
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                  PrintMaster
                </span>
              </div>

              <div className="hidden md:flex space-x-2">
                {categories.slice(0, 4).map((category, idx) => (
                  <button
                    key={idx}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border ${category.color} ${category.hoverColor} ${category.textColor}`}
                    onClick={() => navigateToCategory(category.categoryLink)}
                  >
                    <span className="mr-1">{category.icon}</span>{" "}
                    {category.name}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-2 rounded-full text-gray-600 hover:text-purple-600 hover:bg-purple-100 transition-colors"
                  aria-label="Search"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleWhatsAppClick}
                  className="hidden md:flex items-center px-4 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm font-medium transition-all duration-300"
                >
                  <span className="mr-1">💬</span> Chat with Us
                </button>
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-full text-gray-600 hover:text-purple-600 hover:bg-purple-100 transition-colors"
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
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero Section Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 mt-4">
          {/* Sidebar - Mobile Drawer / Desktop Column */}
          <AnimatePresence>
            {(isSidebarOpen || window.innerWidth >= 1024) && (
              <motion.div
                className={`${
                  isSidebarOpen
                    ? "fixed inset-y-0 left-0 z-40 w-full md:w-80 lg:static"
                    : "hidden lg:block"
                } lg:col-span-3`}
                initial={{
                  x: isSidebarOpen ? -300 : 0,
                  opacity: isSidebarOpen ? 0 : 1,
                }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <div className="h-full bg-white rounded-2xl shadow-xl overflow-hidden lg:max-h-[800px]">
                  {/* Sidebar Header */}
                  <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-800 text-lg inline-flex items-center">
                      <span className="bg-gradient-to-r from-purple-600 to-blue-500 h-6 w-1.5 rounded-full mr-2"></span>
                      PRINT CATEGORIES
                    </h3>
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="lg:hidden text-gray-400 hover:text-gray-600 transition-colors p-1"
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

                  {/* Categories List with Animation */}
                  <div className="p-3 overflow-y-auto max-h-[calc(100vh-120px)] lg:max-h-[740px]">
                    <motion.ul
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ staggerChildren: 0.05, delayChildren: 0.1 }}
                    >
                      {/* Special Categories */}
                      <motion.li
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl overflow-hidden shadow-sm"
                      >
                        <button
                          className="w-full p-4 flex items-center justify-between font-medium text-blue-800 hover:text-blue-900 transition-colors duration-200"
                          onClick={() => navigate("/catalogue")}
                        >
                          <div className="flex items-center">
                            <div className="bg-blue-100 rounded-lg p-2 mr-3">
                              <span className="text-lg">🔍</span>
                            </div>
                            <span>All Print Products</span>
                          </div>
                          <span className="text-blue-500">→</span>
                        </button>
                      </motion.li>

                      <motion.li
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl overflow-hidden shadow-sm"
                      >
                        <button
                          className="w-full p-4 flex items-center justify-between font-medium text-red-800 hover:text-red-900 transition-colors duration-200"
                          onClick={() =>
                            navigate("/catalogue?featured=bestselling")
                          }
                        >
                          <div className="flex items-center">
                            <div className="bg-red-100 rounded-lg p-2 mr-3">
                              <span className="text-lg">🔥</span>
                            </div>
                            <span>Best Selling Items</span>
                          </div>
                          <span className="text-red-500">→</span>
                        </button>
                      </motion.li>

                      <motion.li
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl overflow-hidden shadow-sm"
                      >
                        <button
                          className="w-full p-4 flex items-center justify-between font-medium text-green-800 hover:text-green-900 transition-colors duration-200"
                          onClick={() =>
                            navigate("/catalogue?featured=weekly-specials")
                          }
                        >
                          <div className="flex items-center">
                            <div className="bg-green-100 rounded-lg p-2 mr-3">
                              <span className="text-lg">💰</span>
                            </div>
                            <span>Weekly Specials</span>
                          </div>
                          <span className="text-green-500">→</span>
                        </button>
                      </motion.li>

                      {/* Divider */}
                      <div className="my-4 flex items-center">
                        <div className="flex-grow h-px bg-gray-200"></div>
                        <span className="px-3 text-xs font-medium text-gray-500 uppercase">
                          Main Categories
                        </span>
                        <div className="flex-grow h-px bg-gray-200"></div>
                      </div>

                      {/* Dynamic Product Categories */}
                      {categories.map((category, index) => (
                        <motion.li
                          key={index}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          whileHover={{ scale: 1.02 }}
                          className="relative"
                        >
                          <div
                            className={`p-3 cursor-pointer rounded-xl ${category.color} ${category.hoverColor} transition-all duration-300 border-2`}
                            onMouseEnter={() => handleCategoryHover(index)}
                            onMouseLeave={handleCategoryLeave}
                            onClick={() => {
                              if (window.innerWidth < 1024) {
                                handleCategoryClick(index);
                              } else {
                                navigateToCategory(category.categoryLink);
                              }
                            }}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="bg-white/70 backdrop-blur-sm rounded-lg p-2 mr-3">
                                  <span className="text-lg">
                                    {category.icon}
                                  </span>
                                </div>
                                <span
                                  className={`font-medium ${category.textColor}`}
                                >
                                  {category.name}
                                </span>
                              </div>
                              <motion.span
                                className={`${category.textColor} text-sm`}
                                animate={{
                                  rotate: activeCategory === index ? 90 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                →
                              </motion.span>
                            </div>
                          </div>

                          {/* Subcategories with animation */}
                          <AnimatePresence>
                            {activeCategory === index && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="lg:absolute lg:left-full lg:top-0 lg:ml-2 mt-2 lg:mt-0 w-full lg:w-64 bg-white shadow-2xl rounded-xl border border-gray-200 z-50 overflow-hidden"
                              >
                                <div className="py-3">
                                  <div className="px-4 mb-2 text-sm font-semibold text-gray-500 border-b pb-2 flex items-center">
                                    <span className="mr-2">
                                      {category.icon}
                                    </span>
                                    {category.name}
                                  </div>
                                  {category.subcategories.map(
                                    (subcat, subIndex) => (
                                      <motion.div
                                        key={subIndex}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: subIndex * 0.05 }}
                                      >
                                        <button
                                          className="w-full px-4 py-2.5 hover:bg-gray-50 hover:text-blue-600 transition-all duration-200 flex items-center text-left"
                                          onClick={() =>
                                            navigateToCategory(
                                              `${category.categoryLink}/${subcat
                                                .toLowerCase()
                                                .replace(/ /g, "-")}`
                                            )
                                          }
                                        >
                                          <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-2.5"></span>
                                          {subcat}
                                        </button>
                                      </motion.div>
                                    )
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.li>
                      ))}
                    </motion.ul>

                    {/* Help Card */}
                    <motion.div
                      className="mt-6 p-5 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl shadow-sm border border-purple-200"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{
                        y: -5,
                        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                      }}
                    >
                      <p className="text-gray-700 font-medium mb-1">
                        Need Help?
                      </p>
                      <p className="text-gray-600 text-sm mb-3">
                        Our print experts are ready to assist you
                      </p>
                      <motion.button
                        className="w-full bg-white text-purple-700 py-2.5 px-4 rounded-lg shadow-sm text-sm font-medium transition-all duration-300 flex items-center justify-center"
                        onClick={handleWhatsAppClick}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <span className="mr-2">💬</span>
                        Chat with Us
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content Grid */}
          <div className="lg:col-span-9 space-y-6">
            {/* Dynamic Banner Carousel */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl bg-white">
              <div className="relative w-full h-96 md:h-[450px]">
                {bannerData.map((banner, idx) => (
                  <motion.div
                    key={banner.id}
                    className="absolute inset-0 w-full h-full flex flex-col md:flex-row items-center"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{
                      opacity: currentBannerIndex === idx ? 1 : 0,
                      x: currentBannerIndex === idx ? 0 : 100,
                      zIndex: currentBannerIndex === idx ? 10 : 0,
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
                      <motion.h2
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{
                          y: currentBannerIndex === idx ? 0 : 20,
                          opacity: currentBannerIndex === idx ? 1 : 0,
                        }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                      >
                        {banner.title}
                      </motion.h2>
                      <motion.p
                        className="text-lg md:text-xl text-gray-600 mb-6"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{
                          y: currentBannerIndex === idx ? 0 : 20,
                          opacity: currentBannerIndex === idx ? 1 : 0,
                        }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                      >
                        {banner.subtitle}
                      </motion.p>
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{
                          y: currentBannerIndex === idx ? 0 : 20,
                          opacity: currentBannerIndex === idx ? 1 : 0,
                        }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                      >
                        <button
                          onClick={() =>
                            navigateToCategory(banner.categoryLink)
                          }
                          className={`px-6 py-3 rounded-full text-white bg-gradient-to-r ${banner.color} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                        >
                          {banner.cta}
                        </button>
                      </motion.div>
                    </div>
                    <div className="w-full md:w-1/2 h-64 md:h-full relative">
                      <img
                        src={banner.image}
                        alt={banner.title}
                        className="w-full h-full object-contain md:object-cover rounded-b-xl md:rounded-r-xl md:rounded-l-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent md:bg-gradient-to-r md:from-transparent md:to-white/20 pointer-events-none"></div>
                    </div>
                  </motion.div>
                ))}

                {/* Banner Navigation Controls */}
                <div className="absolute bottom-4 right-4 z-20 flex space-x-2">
                  <button
                    onClick={() => navigateBanner("prev")}
                    className="p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-colors duration-200"
                    aria-label="Previous banner"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-700"
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
                    className="p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-colors duration-200"
                    aria-label="Next banner"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-700"
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
                </div>

                {/* Banner Indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20">
                  <div className="flex space-x-2">
                    {bannerData.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentBannerIndex(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          currentBannerIndex === idx
                            ? "bg-blue-600 w-6"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`Go to banner ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Access Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {categoryHighlights.map((highlight) => (
                <motion.div
                  key={highlight.id}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                  }}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/catalogue/${highlight.link}`)}
                >
                  <div className="h-24 sm:h-32 relative">
                    <img
                      src={highlight.image}
                      alt={highlight.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white font-medium text-sm md:text-base">
                        {highlight.name}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Promotional Cards Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                  Featured Products
                </h2>
                <button
                  onClick={() => navigate("/catalogue?featured=true")}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                >
                  View all
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {promotionalCardsData.map((promo) => (
                  <motion.div
                    key={promo.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
                    whileHover={{
                      y: -8,
                      boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                    }}
                    onMouseEnter={() => setHoveredPromo(promo.id)}
                    onMouseLeave={() => setHoveredPromo(null)}
                  >
                    <div className="relative">
                      <img
                        src={promo.image}
                        alt={promo.title}
                        className="w-full h-48 object-cover"
                      />
                      <div
                        className={`absolute top-3 left-3 ${promo.badgeColor} px-3 py-1 rounded-full text-white text-xs font-medium`}
                      >
                        {promo.badgeText}
                      </div>
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-lg">
                        {promo.icon}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-gray-800 mb-1">
                        {promo.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">
                        {promo.subtitle}
                      </p>
                      <p className="text-gray-600 mb-4">{promo.description}</p>
                      <button
                        className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-medium"
                        onClick={() =>
                          navigate(`/catalogue/${promo.categoryLink}`)
                        }
                      >
                        {promo.cta}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Call to Action Section */}
            <motion.div
              className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden relative"
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 opacity-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                >
                  <defs>
                    <pattern
                      id="pattern"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path d="M0 0L10 0L10 10L0 10Z" fill="white"></path>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#pattern)"></rect>
                </svg>
              </div>
              <div className="p-6 md:p-8 flex flex-col md:flex-row items-center md:justify-between relative z-10">
                <div className="mb-4 md:mb-0 md:mr-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Ready to Get Started?
                  </h3>
                  <p className="text-purple-200">
                    Get personalized quotes for your printing needs today!
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleWhatsAppClick}
                    className="bg-white text-purple-700 px-5 py-3 rounded-lg shadow-lg hover:bg-purple-50 transition-colors duration-300 font-medium flex items-center justify-center"
                  >
                    <span className="mr-2">💬</span>
                    Chat on WhatsApp
                  </button>
                  <button
                    onClick={handleCallClick}
                    className="bg-purple-800 text-white px-5 py-3 rounded-lg shadow-lg hover:bg-purple-900 transition-colors duration-300 font-medium flex items-center justify-center"
                  >
                    <span className="mr-2">📞</span>
                    Call Us
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
