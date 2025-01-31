import React from "react";
import images from "../assets/assets";

const Navbar = () => {
  return (
    <nav className="bg-white h-16 sticky top-0 z-50 p-4 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img
          className="h-10 w-10 md:h-14 md:w-14"
          src={images.logo}
          alt="Logo"
        />
        <div className="text-black">
          <p className="font-bold text-sm md:text-2xl tracking-wider text-blue-600">
            BLUESCOPE
          </p>
          <p className="text-xs md:text-base text-blue-400 font-bold tracking-tight">
            SUPPLIES LIMITED
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="hidden md:block relative flex-1 max-w-lg">
        <input
          type="text"
          placeholder="Find everything at Bluescope online & in-store"
          className="h-10 md:h-12 w-full px-4 pr-10 rounded-full bg-blue-200 text-sm focus:outline-none placeholder-gray-700"
        />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {/* Contact Info */}
      <div className="flex flex-row sm:flex-row items-center gap-3 sm:gap-6 text-center">
        <p className="font-semibold text-xs md:text-lg text-gray-950 cursor-pointer bg-linear-to-r from-blue-400 to-blue-700 p-1 md:p-2 rounded-md">
          Place Order
        </p>
        <div>
          <p className="text-sm text-black font-bold">Contact Us</p>
          <p className="font-semibold text-gray-900 text-sm md:text-lg">
            0732 917 203
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
