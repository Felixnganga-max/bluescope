import React from "react";
import images from "../assets/assets";

const Navbar = () => {
  return (
    <nav className="bg-white sticky p-4 flex flex-col sm:flex-row items-center sm:justify-between sm:h-2 shadow-md">
      {/* Top Row (Logo + Search) */}
      <div className="flex items-center w-full sm:w-1/2 gap-2">
        {/* Logo */}
        <img className="h-8 w-8 md:h-12 md:w-12" src={images.logo} alt="Logo" />
        <div className="text-black">
          <p className="font-bold text-lg md:text-xl tracking-wider text-blue-600">
            BLUESCOPE
          </p>
          <p className="text-xs md:text-lg text-blue-400 font-bold tracking-tight">
            SUPPLIES LIMITED
          </p>
        </div>

        {/* Search Bar */}
        <div className="mr-6 relative w-full">
          <input
            type="text"
            placeholder="Get everything at Bluescope online and in store"
            className="h-12 md:w-full p-2 pl-4 pr-10 rounded-full bg-blue-300 text-sm focus:outline-none"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-300 text-white p-2 rounded-full">
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
      </div>

      {/* Bottom Row (Order & Contact) */}
      <div className="flex sm:flex-row items-center justify-between w-full sm:w-auto mt-2 sm:mt-0 gap-2 sm:gap-6 text-center">
        <div>
          <p className="font-bold text-lg text-blue-400">Place Order</p>
        </div>
        <div>
          <p className="text-sm text-blue-400">Contact Us</p>
          <p className="font-bold text-blue-400">0732 917 203</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
