import React from "react";
import images from "../assets/assets";

const Navbar = () => {
  return (
    <nav className="bg-[#fff] sticky p-4 flex items-center h-12 justify-between mt-2 mb-1">
      <div className="flex items-center gap-2">
        {/* Logo */}
        <div className="">
          {/* LOGO IMAGE */}
          <img className="h-12 w-12" src={images.logo} />
        </div>
        <div className="text-white">
          <p className="font-bold text-xl text-center font-3xl tracking-wider text-[#0000ff]">
            BLUESCOPE
          </p>
          <p className="text-lg text-[#3fa9f5] font-bold tracking-tight">
            SUPPLIES LIMITED
          </p>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative w-1/2">
        <input
          type="text"
          placeholder="Get everything at Bluescope online and in store"
          className="h-12 w-full p-2 pl-4 pr-10 rounded-full bg-[#80C4E9] text-sm focus:outline-none"
        />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#80C4E9] cursor-pointer text-white p-2 rounded-full">
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

      {/* Account and cart */}
      <div className="flex items-center gap-6 text-white">
        <div className="text-center px-4">
          <p className="font-bold text-lg text-[#80C4E9] ">Place Order</p>
        </div>
        <div className="text-center px-4">
          <p className="text-sm text-[#80C4E9]">Contact Us</p>
          <p className="font-bold text-[#80C4E9]">0732 917 203</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
