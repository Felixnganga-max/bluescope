import React, { useState } from "react";
import images from "../assets/assets";

const Navbar = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isAccountDropdownVisible, setAccountDropdownVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
    setAccountDropdownVisible(false);
  };

  const toggleAccountDropdown = () => {
    setAccountDropdownVisible(!isAccountDropdownVisible);
    setSearchVisible(false);
  };

  return (
    <nav className="bg-blue-50 h-20 sticky top-0 z-50 p-5 flex items-center justify-between shadow-lg">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <img
          className="h-12 w-12 md:h-16 md:w-16"
          src={images.logo}
          alt="Logo"
        />
        <div className="text-black">
          <p className="font-bold text-lg md:text-3xl tracking-wider text-blue-700">
            BLUESCOPE
          </p>
          <p className="text-sm md:text-lg text-blue-500 font-semibold tracking-tight">
            SUPPLIES LIMITED
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-10 text-lg">
        <a href="#about" className="text-gray-800 hover:text-blue-700">
          About Us
        </a>
        <a href="#services" className="text-gray-800 hover:text-blue-700">
          Services
        </a>
        <a href="#catalogue" className="text-gray-800 hover:text-blue-700">
          Catalogue
        </a>
        <a href="#contact" className="text-gray-800 hover:text-blue-700">
          Contact Us
        </a>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-6">
        <div className="relative">
          {isSearchVisible && (
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-[80vw] bg-white p-4 shadow-lg rounded-lg">
              <input
                type="text"
                placeholder="Find everything at Bluescope online & in-store"
                className="h-12 w-full px-5 rounded-full bg-blue-100 text-lg focus:outline-none placeholder-gray-700"
              />
              <button
                onClick={toggleSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          )}
          <button
            onClick={toggleSearch}
            className="text-gray-800 hover:text-blue-700 text-lg font-semibold"
          >
            Search
          </button>
        </div>

        {/* Account Dropdown */}
        <div className="relative">
          <button
            onClick={toggleAccountDropdown}
            className="text-gray-800 hover:text-blue-700 text-lg font-semibold"
          >
            Account
          </button>
          {isAccountDropdownVisible && (
            <div className="absolute right-0 top-16 bg-white p-4 shadow-lg rounded-lg">
              <a
                href="#login"
                className="block text-gray-800 hover:text-blue-700 font-semibold"
              >
                Login
              </a>
              <a
                href="#signup"
                className="block text-gray-800 hover:text-blue-700 mt-2 font-semibold"
              >
                Sign Up
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Contact Info */}
      <div className="hidden sm:flex flex-row items-center gap-6 text-center">
        <p className="font-bold text-lg text-white bg-blue-600 px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition">
          Place Order
        </p>
        <div>
          <p className="text-lg text-gray-900 font-semibold">Contact Us</p>
          <p className="font-bold text-blue-800 text-lg">0732 917 203</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
