import React, { useState, useEffect, useRef } from "react";
import images from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactMenuOpen, setIsContactMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const contactRef = useRef(null);
  const navigate = useNavigate();

  // Printing-related search suggestions
  const printingSearchSuggestions = [
    "Notebooks",
    "Large Format Printing",
    "Printed T-shirts",
    "Roll Ups",
    "Business Cards",
    "Brochures",
    "Posters",
    "Banners",
  ];

  // Contact phone numbers with labels
  const contactNumbers = [
    { number: "0726 705 694", label: "Sales" },
    { number: "0732 917 203", label: "Customer Support" },
    { number: "0714 952 506", label: "Inquiries" },
  ];

  // Handle clicks outside of search component
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchVisible(false);
      }
      if (contactRef.current && !contactRef.current.contains(event.target)) {
        setIsContactMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Detect scroll to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Navigate to search results page with query
      // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setSearchVisible(false);
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isSearchVisible && !isMobileMenuOpen) {
      setSearchVisible(false);
    }
    if (isContactMenuOpen) {
      setIsContactMenuOpen(false);
    }
  };

  // Toggle contact menu
  const toggleContactMenu = (e) => {
    e.preventDefault();
    setIsContactMenuOpen(!isContactMenuOpen);
  };

  // Handle initiating a WhatsApp chat
  const handleWhatsAppChat = (phoneNumber) => {
    // Remove any non-digit characters
    const formattedNumber = phoneNumber.replace(/\D/g, "");
    window.open(`https://wa.me/254${formattedNumber}`, "_blank");
  };

  // Handle initiating a phone call
  const handlePhoneCall = (phoneNumber) => {
    window.location.href = `tel:+254${phoneNumber.replace(/\D/g, "")}`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-2 bg-white shadow-lg"
          : "py-4 bg-gradient-to-r from-gray-50 to-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main navbar section */}
        <div className="flex cursor-pointer justify-between items-center">
          {/* Logo - On all screens */}
          <div
            className="flex items-center space-x-3 md:space-x-3"
            onClick={() => navigate("/")}
            role="button"
          >
            <img
              className={`transition-all duration-300 ${
                isScrolled ? "h-10 w-10" : "h-12 w-12"
              }`}
              src={images.logo}
              alt="BlueScope Logo"
            />
            <div className="flex flex-col">
              <h1 className="font-bold tracking-tight md:tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-gray-800 text-xl md:text-2xl">
                BLUESCOPE
              </h1>
              <p className="text-xs font-medium text-gray-500 tracking-wide md:tracking-widest">
                SUPPLIES LIMITED
              </p>
            </div>
          </div>

          {/* Contact Number - Center on mobile, right on desktop */}
          <div className="md:hidden flex flex-col items-center">
            <p className="text-sm text-gray-600">Contact Us</p>
            <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-gray-900">
              0732 917 203
            </p>
          </div>

          <nav className="hidden md:flex items-center">
            <ul className="flex space-x-8">
              {["Catalogue", "Services", "About Us"].map((item, index) => (
                <li key={index}>
                  <a
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const route = `/${item
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`;

                      if (item === "Services") navigate("/services");
                      else if (item === "Catalogue") navigate("/catalogue");
                      else if (item === "About Us") navigate("/about-us");
                      else navigate(route);

                      setIsMobileMenuOpen(false);
                    }}
                    className="relative font-medium text-gray-700 hover:text-blue-700 transition-colors duration-200 group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
              {/* Contact Us with popup */}
              <li ref={contactRef} className="relative">
                <a
                  href="#contact"
                  onClick={toggleContactMenu}
                  className={`relative font-medium ${
                    isContactMenuOpen
                      ? "text-blue-700"
                      : "text-gray-700 hover:text-blue-700"
                  } transition-colors duration-200 group`}
                >
                  Contact Us
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                      isContactMenuOpen ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </a>

                {/* Animated Contact Popup */}
                {isContactMenuOpen && (
                  <div className="absolute right-0 mt-4 w-72 transform transition-all duration-300 origin-top-right animate-fadeIn">
                    <div className="bg-white rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
                        <h3 className="text-white font-semibold text-lg flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          Get in Touch
                        </h3>
                        <p className="text-blue-100 text-sm">
                          Reach out to us directly
                        </p>
                      </div>

                      <div className="p-4">
                        {contactNumbers.map((contact, index) => (
                          <div key={index} className="mb-4 last:mb-0">
                            <p className="text-sm text-gray-500 font-medium">
                              {contact.label}
                            </p>
                            <div className="flex items-center justify-between mt-1">
                              <p className="font-bold text-gray-800">
                                {contact.number}
                              </p>
                              <div className="flex space-x-2">
                                {/* WhatsApp Button */}
                                <button
                                  onClick={() =>
                                    handleWhatsAppChat(contact.number)
                                  }
                                  className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200"
                                  title="Chat on WhatsApp"
                                >
                                  <svg
                                    className="h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-4-10.5-6.6z"
                                    />
                                  </svg>
                                </button>

                                {/* Call Button */}
                                <button
                                  onClick={() =>
                                    handlePhoneCall(contact.number)
                                  }
                                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
                                  title="Make a call"
                                >
                                  <svg
                                    className="h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-gray-50 p-4 flex justify-between items-center">
                        <a
                          href="/contact-us"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/contact-us");
                            setIsContactMenuOpen(false);
                          }}
                          className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          <span>View all contact options</span>
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
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </a>
                        <button
                          onClick={() => setIsContactMenuOpen(false)}
                          className="text-gray-500 hover:text-gray-700"
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
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Button - Desktop */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setSearchVisible(!isSearchVisible)}
                className="group flex items-center"
                aria-label="Search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600 group-hover:text-blue-700 transition-colors duration-200"
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
                <span className="ml-2 font-medium text-gray-700 group-hover:text-blue-700 transition-colors duration-200">
                  Search
                </span>
              </button>

              {/* Fancy Search Panel - Desktop */}
              {isSearchVisible && (
                <div className="absolute right-0 mt-4 w-screen max-w-md transform transition-all duration-300 origin-top-right">
                  <div className="bg-white rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <form onSubmit={handleSearchSubmit} className="relative">
                      <div className="flex items-center px-6 py-4 border-b border-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-400"
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
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={handleSearchChange}
                          placeholder="Find products, services, and more..."
                          className="w-full pl-3 pr-10 py-2 text-gray-700 bg-transparent border-none focus:outline-none focus:ring-0"
                          autoFocus
                        />
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="text-gray-400 hover:text-gray-600"
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
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        )}
                      </div>

                      {/* Quick search suggestions */}
                      <div className="py-4 px-6">
                        <p className="text-xs uppercase font-semibold text-gray-500 mb-3">
                          Printing Solutions
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {printingSearchSuggestions.map((item, index) => (
                            <button
                              key={index}
                              type="button"
                              className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-full hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                              onClick={() => {
                                setSearchQuery(item);
                              }}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Search footer */}
                      <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-4 flex justify-between items-center">
                        <p className="text-xs text-gray-500">
                          Press Enter to search
                        </p>
                        <button
                          type="submit"
                          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                          Search
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>

            {/* Login Button - Desktop */}
            <a href="#login" className="flex items-center group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600 group-hover:text-blue-700 transition-colors duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="ml-2 font-medium text-gray-700 group-hover:text-blue-700 transition-colors duration-200">
                Login
              </span>
            </a>

            {/* Contact Info - Desktop */}
            <div className="hidden lg:flex flex-col items-end">
              <p className="text-sm text-gray-600">Contact Us</p>
              <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-gray-900">
                0732 917 203
              </p>
            </div>
          </div>

          {/* Mobile Menu Button - Only on mobile */}
          <button
            className="md:hidden text-gray-700 mr-8 hover:text-blue-700 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
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
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Secondary Bar with Search and Login - Only shows on mobile */}
        <div className="md:hidden mt-4 w-80 flex justify-between items-center">
          {/* Search Bar - Mobile */}
          <div className="relative w-3/4" ref={searchRef}>
            <button
              onClick={() => setSearchVisible(!isSearchVisible)}
              className="group flex items-center w-full px-4 py-2 bg-gray-50 rounded-lg text-gray-600 hover:bg-gray-100"
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
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
              <span className="ml-2 text-sm">Search printing solutions...</span>
            </button>
          </div>

          {/* Login Button - Mobile */}
          <a
            href="#login"
            className="flex items-center mr-5 justify-center group"
          >
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600 group-hover:text-blue-700 transition-colors duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700 transition-colors duration-200">
                Login
              </span>
            </div>
          </a>
        </div>

        {/* Mobile Search Panel - Appears when search is active on mobile */}
        {isSearchVisible && (
          <div className="md:hidden mt-2 pb-4">
            <div className="bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="flex items-center px-4 py-3 border-b border-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
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
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Find printing solutions..."
                    className="w-full pl-3 pr-10 py-2 text-gray-700 bg-transparent border-none focus:outline-none focus:ring-0"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="text-gray-400 hover:text-gray-600"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Printing-specific suggestions for mobile */}
                <div className="py-3 px-4">
                  <p className="text-xs uppercase font-semibold text-gray-500 mb-2">
                    Printing Solutions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {printingSearchSuggestions
                      .slice(0, 6)
                      .map((item, index) => (
                        <button
                          key={index}
                          type="button"
                          className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-full hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                          onClick={() => {
                            setSearchQuery(item);
                          }}
                        >
                          {item}
                        </button>
                      ))}
                  </div>
                </div>

                {/* Search button */}
                <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-3 flex justify-end">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Mobile Menu - Shows when hamburger is clicked */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 bg-white rounded-xl shadow-lg overflow-hidden">
            <nav className="py-2">
              <ul className="flex flex-col">
                {["Catalogue", "Services", "About Us"].map((item, index) => (
                  <li key={index}>
                    <a
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (item === "Services") navigate("/services");
                        else if (item === "Catalogue") navigate("/catalogue");
                        else if (item === "About Us") navigate("/about-us");
                        else
                          navigate(
                            `/#${item.toLowerCase().replace(/\s+/g, "-")}`
                          );
                        setIsMobileMenuOpen(false);
                      }}
                      className="block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}

                {/* Contact Us with dropdown in mobile */}
                <li className="relative">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsContactMenuOpen(!isContactMenuOpen);
                    }}
                    className={`block px-6 py-3 ${
                      isContactMenuOpen
                        ? "text-blue-700 bg-blue-50"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                    } transition-colors duration-200 flex justify-between items-center`}
                  >
                    Contact Us
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 transform transition-transform duration-200 ${
                        isContactMenuOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </a>

                  {/* Mobile Contact Dropdown */}
                  {isContactMenuOpen && (
                    <div className="bg-gray-50 px-6 py-3 space-y-4">
                      {contactNumbers.map((contact, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <p className="text-xs text-gray-500">
                              {contact.label}
                            </p>
                            <p className="font-medium text-gray-800">
                              {contact.number}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleWhatsAppChat(contact.number)}
                              className="p-1.5 bg-green-500 text-white rounded-full hover:bg-green-600"
                              title="Chat on WhatsApp"
                            >
                              <svg
                                className="h-3 w-3"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                              >
                                <path
                                  fill="currentColor"
                                  d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-4-10.5-6.6z"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => handlePhoneCall(contact.number)}
                              className="p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                              title="Make a call"
                            >
                              <svg
                                className="h-3 w-3"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                      <a
                        href="/contact-us"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/contact-us");
                          setIsMobileMenuOpen(false);
                        }}
                        className="block text-center text-blue-600 hover:text-blue-800 text-sm mt-3 pt-3 border-t border-gray-200"
                      >
                        View all contact options
                      </a>
                    </div>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
