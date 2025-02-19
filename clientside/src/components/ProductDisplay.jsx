import React, { useState, useEffect } from "react";
import {
  MoreHorizontal,
  Pause,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { printItems } from "../assets/assets";

const ProductDisplay = () => {
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(0.1);
  const items = Array.isArray(printItems)
    ? printItems
    : Object.values(printItems);
  const duplicatedItems = [...items, ...items];

  const handleManualScroll = (direction) => {
    setScrollSpeed(direction === "left" ? -2 : 2);
    setIsAutoScroll(false);
    setTimeout(() => {
      setScrollSpeed(0.1);
      setIsAutoScroll(true);
    }, 5000);
  };

  const handleProductClick = (e) => {
    e.stopPropagation();
    setIsAutoScroll((prevState) => !prevState);
  };

  useEffect(() => {
    let animationFrame;
    const animate = () => {
      if (isAutoScroll) {
        setScrollPosition((prev) => (prev + scrollSpeed) % 100);
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isAutoScroll, scrollSpeed]);

  return (
    <div className="w-[90%] mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 flex-wrap">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Product Display
          </h1>
          <button
            onClick={() => setIsAutoScroll(!isAutoScroll)}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition"
          >
            {isAutoScroll ? (
              <>
                <Pause className="w-4 h-4" /> Stop Autoscroll
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Start Autoscroll
              </>
            )}
          </button>
        </div>
        <button className="text-indigo-600 hover:text-indigo-800 transition-colors font-medium text-sm">
          View all →
        </button>
      </div>

      {/* Scrollable Product Section */}
      <div className="relative overflow-hidden group">
        <button
          onClick={() => handleManualScroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-2 shadow-md hover:bg-white transition-opacity opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        <div
          className="flex transition-transform duration-0 whitespace-nowrap"
          style={{ transform: `translateX(-${scrollPosition}%)` }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={index}
              className="min-w-[16.666%] px-2 flex-shrink-0"
              onClick={handleProductClick}
            >
              <div className="relative group rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-3 flex flex-col hover:-translate-y-1 cursor-pointer h-56 bg-white">
                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 hover:bg-gray-100 rounded-full">
                    <MoreHorizontal className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Image Section */}
                <div className="w-full h-24 flex items-center justify-center mb-2 overflow-hidden rounded-md bg-gray-50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-contain w-full h-full p-1 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Product Info */}
                <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-xs mb-2 line-clamp-2 flex-grow">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => handleManualScroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-2 shadow-md hover:bg-white transition-opacity opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ProductDisplay;
