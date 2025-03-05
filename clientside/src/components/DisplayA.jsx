import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import axios from "axios"; // ✅ Import Axios for API calls

const DisplayA = () => {
  const [randomItems, setRandomItems] = useState([]);
  const navigate = useNavigate(); // ✅ Initialize navigation

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://bluescope-k9yt.vercel.app/bluescope/products"
        );
        const shuffledItems = response.data.sort(() => Math.random() - 0.5);
        setRandomItems(shuffledItems.slice(0, 10)); // ✅ Limit to 10 products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-[90%] mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Featured Products
        </h1>
        <button className="text-indigo-600 hover:text-indigo-800 transition-colors font-medium text-sm">
          See More →
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {randomItems.map((item) => (
          <div
            key={item._id}
            className="relative rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
            onClick={() => navigate(`/product/${item._id}`)} // ✅ Navigate to details page
          >
            {/* Image with Gradient Overlay */}
            <div className="relative w-full h-40 overflow-hidden">
              <img
                src={item.images[0]}
                alt={item.name}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                {item.name}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                {item.description}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">
                  {item.category}
                </span>
                <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayA;
