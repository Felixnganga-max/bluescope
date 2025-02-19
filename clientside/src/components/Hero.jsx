import React, { useState } from "react";
import assets from "../assets/assets.js";

export default function Hero() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-100">
      {/* Sidebar */}
      <div
        className={`w-full lg:w-1/6 bg-white p-4 rounded-lg shadow-md transition-all duration-300 ${
          isSidebarOpen ? "block" : "hidden lg:block"
        }`}
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">SHOP BY DEPARTMENT</h3>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden text-gray-600 hover:text-blue-500"
          >
            {isSidebarOpen ? "✕" : "☰"}
          </button>
        </div>
        <ul className="space-y-2 text-gray-700">
          <li className="font-medium cursor-pointer hover:text-blue-500">
            All Categories
          </li>
          <li className="text-red-500 font-medium cursor-pointer hover:text-red-700">
            Best Seller Products
          </li>
          <li className="text-green-500 font-medium cursor-pointer hover:text-green-700">
            Top 10 Offers
          </li>
          <li className="cursor-pointer hover:text-blue-500">New Arrivals</li>
          <li className="cursor-pointer hover:text-blue-500">
            Phones & Tablets
          </li>
          <li className="cursor-pointer hover:text-blue-500">
            Electronics & Digital
          </li>
          <li className="cursor-pointer hover:text-blue-500">
            Fashion & Clothing
          </li>
          <li className="cursor-pointer hover:text-blue-500">
            Security & Hardware
          </li>
          <li className="cursor-pointer hover:text-blue-500">
            Health & Beauty
          </li>
          <li className="cursor-pointer hover:text-blue-500">TV & Audio</li>
        </ul>
      </div>

      {/* Main Banner */}
      <div className="w-full lg:w-4/6 bg-white rounded-lg shadow-md flex flex-col justify-center items-start relative">
        <div className="w-full h-full relative">
          <img
            src={assets.banner}
            alt="Main Banner"
            className="w-full h-full object-cover rounded-lg"
          />
          <button className="absolute bottom-20 left-20 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-800 z-10">
            Engage Us
          </button>
        </div>
      </div>

      {/* Promotions with Repeating Banner */}
      <div className="w-full lg:w-2/6 flex flex-col gap-4">
        <div
          className="bg-cover bg-center text-white p-4 rounded-lg h-40"
          style={{ backgroundImage: `url(${assets.notebook})` }}
        >
          <h4 className="text-lg font-bold">Big Sale</h4>
          <p className="text-sm">New Love Edition</p>
          <p className="font-bold">Price: $99</p>
        </div>
        <div
          className="bg-cover bg-center text-white p-4 rounded-lg h-40"
          style={{ backgroundImage: `url(${assets.pen})` }}
        >
          <h4 className="text-lg font-bold">Best Selling</h4>
          <p className="text-sm">Premium Sneakers</p>
          <p className="font-bold">Price: $79</p>
        </div>
        <div
          className="bg-cover bg-center text-white p-4 rounded-lg h-40"
          style={{ backgroundImage: `url(${assets.carier})` }}
        >
          <h4 className="text-lg font-bold">New Arrivals</h4>
          <p className="text-sm">Sport White Spot</p>
          <p className="font-bold">Price: $99</p>
        </div>
      </div>
    </div>
  );
}
