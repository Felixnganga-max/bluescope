import React, { useState, useEffect, useRef } from "react";
import images from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);
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

  // Handle clicks outside of search component
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchVisible(false);
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

          {/* Navigation - Desktop Only */}
          <nav className="hidden md:flex items-center">
            <ul className="flex space-x-8">
              {["Catalogue", "Services", "About Us", "Contact Us"].map(
                (item, index) => (
                  <li key={index}>
                    <a
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (item === "Services") navigate("/services");
                        else if (item === "Catalogue") navigate("/catalogue");
                        else
                          navigate(
                            `/#${item.toLowerCase().replace(/\s+/g, "-")}`
                          );
                        setIsMobileMenuOpen(false);
                      }}
                      className="relative font-medium text-gray-700 hover:text-blue-700 transition-colors duration-200 group"
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>
                )
              )}
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
            className="md:hidden text-gray-700 hover:text-blue-700 focus:outline-none"
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
        <div className="md:hidden mt-4 flex justify-between items-center">
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
          <a href="#login" className="flex items-center justify-center group">
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
                {["Catalogue", "Services", "About Us", "Contact Us"].map(
                  (item, index) => (
                    <li key={index}>
                      <a
                        href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={(e) => {
                          e.preventDefault();
                          if (item === "Services") navigate("/services");
                          else if (item === "Catalogue") navigate("/catalogue");
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
                  )
                )}
                {/* Place Order Button in Mobile Menu */}
                <li className="px-6 py-3">
                  <a
                    href="#place-order"
                    className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Place Order
                  </a>
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
