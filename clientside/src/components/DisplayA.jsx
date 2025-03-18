import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, ArrowRight, Heart } from "lucide-react";
import axios from "axios";

const DisplayA = () => {
  const [randomItems, setRandomItems] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://bluescope-k9yt.vercel.app/bluescope/products"
        );
        const shuffledItems = response.data.sort(() => Math.random() - 0.5);

        // Initialize with random image for each product
        const initialActiveImages = {};
        shuffledItems.slice(0, 10).forEach((item) => {
          if (item.images && item.images.length > 0) {
            // Pick a random image index from available images
            const randomIndex = Math.floor(Math.random() * item.images.length);
            initialActiveImages[item._id] = randomIndex;
          } else {
            initialActiveImages[item._id] = 0;
          }
        });

        setActiveImageIndex(initialActiveImages);
        setRandomItems(shuffledItems.slice(0, 10));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleImageNavigation = (e, productId, direction) => {
    e.stopPropagation();

    setActiveImageIndex((prev) => {
      const product = randomItems.find((item) => item._id === productId);
      if (!product?.images?.length) return prev;

      const currentIndex = prev[productId] || 0;
      const totalImages = product.images.length;

      let newIndex;
      if (direction === "next") {
        newIndex = (currentIndex + 1) % totalImages;
      } else {
        newIndex = (currentIndex - 1 + totalImages) % totalImages;
      }

      return { ...prev, [productId]: newIndex };
    });
  };

  const toggleFavorite = (e, productId) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Elegant Header with Animation */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 relative inline-block">
          Featured Products
          <div className="absolute h-1.5 w-28 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bottom-0 left-0 rounded-full animate-pulse"></div>
        </h2>
        <button
          onClick={() => navigate("/products")}
          className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-300 group bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-full shadow-sm"
        >
          <span className="mr-1 font-medium group-hover:mr-2 transition-all duration-300">
            Explore All
          </span>
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </button>
      </div>

      {/* Product Grid with 5 per row on larger screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-4 gap-y-8">
        {randomItems.map((item) => (
          <div
            key={item._id}
            className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 group border border-gray-100"
            onClick={() => navigate(`/product/${item._id}`)}
          >
            {/* Image Container */}
            <div className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100">
              {item.images && item.images.length > 0 ? (
                <img
                  src={item.images[activeImageIndex[item._id] || 0]}
                  alt={item.name}
                  className="w-full h-48 object-cover transition-all duration-700 ease-in-out hover:scale-105"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}

              {/* Navigation Arrows - Visible by default on mobile, hidden until hover on desktop */}
              {item.images && item.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => handleImageNavigation(e, item._id, "prev")}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/25 backdrop-blur-sm hover:bg-black/40 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 focus:outline-none shadow-md"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={16} className="text-white" />
                  </button>
                  <button
                    onClick={(e) => handleImageNavigation(e, item._id, "next")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/25 backdrop-blur-sm hover:bg-black/40 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 focus:outline-none shadow-md"
                    aria-label="Next image"
                  >
                    <ChevronRight size={16} className="text-white" />
                  </button>
                </>
              )}

              {/* Image Counter Badge */}
              {item.images && item.images.length > 1 && (
                <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                  {activeImageIndex[item._id] + 1}/{item.images.length}
                </div>
              )}

              {/* Category Tag with improved design */}
              <div className="absolute top-2 left-2">
                <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-blue-600/90 text-white backdrop-blur-sm shadow-sm">
                  {item.category}
                </span>
              </div>

              {/* Favorite Button */}
              <button
                onClick={(e) => toggleFavorite(e, item._id)}
                className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-sm"
                aria-label="Add to favorites"
              >
                <Heart
                  size={14}
                  className={`${
                    favorites.includes(item._id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-500"
                  } transition-colors duration-300`}
                />
              </button>
            </div>

            {/* Content with improved typography and layout */}
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 text-sm truncate">
                {item.name}
              </h3>
              <p className="mt-1 text-xs text-gray-600 line-clamp-2 h-8">
                {item.description}
              </p>

              {/* Price and details divider with enhanced styling */}
              <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                <div className="font-bold text-gray-900 flex items-end">
                  {item.price ? (
                    <>
                      <span className="text-sm">
                        KSh {item.price.toLocaleString()}
                      </span>
                    </>
                  ) : (
                    "Price on request"
                  )}
                </div>
                <div className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full hover:bg-blue-100 transition-colors duration-300">
                  Details
                </div>
              </div>
            </div>

            {/* Animated bottom accent bar - unique color based on product index */}
            <div
              className={`h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayA;
