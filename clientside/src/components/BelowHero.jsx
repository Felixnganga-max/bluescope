import {
  FaShippingFast,
  FaRedo,
  FaUser,
  FaThumbsUp,
  FaAward,
  FaChevronRight,
} from "react-icons/fa";
import React, { useState, useEffect } from "react";

export default function BelowHero() {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      const element = document.getElementById("below-hero-section");
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <FaShippingFast size={32} />,
      title: "Affordable & Reliable Delivery",
      desc: "Fast and cost-effective delivery across Kenya",
      color: "bg-blue-500",
      gradientFrom: "from-blue-500",
      gradientTo: "to-blue-600",
      details:
        "We ensure your custom prints reach you on time, anywhere in Kenya, at affordable rates.",
    },
    {
      icon: <FaRedo size={32} />,
      title: "Quality Services",
      desc: "Top-notch printing tailored to your needs",
      color: "bg-green-500",
      gradientFrom: "from-green-500",
      gradientTo: "to-green-600",
      details:
        "We provide premium printing solutions with high-quality materials and attention to detail.",
    },
    {
      icon: <FaUser size={32} />,
      title: "24/7 Support",
      desc: "Always available for your printing needs",
      color: "bg-purple-500",
      gradientFrom: "from-purple-500",
      gradientTo: "to-purple-600",
      details:
        "Our customer support team is ready 24/7 to assist you with orders, design modifications, and inquiries.",
    },
    {
      icon: <FaThumbsUp size={32} />,
      title: "Secure Payment",
      desc: "Safe and flexible payment options",
      color: "bg-red-500",
      gradientFrom: "from-red-500",
      gradientTo: "to-red-600",
      details:
        "We support MPesa, credit cards, and other secure payment methods for seamless transactions.",
    },
    {
      icon: <FaAward size={32} />,
      title: "Discounts for Returning Clients",
      desc: "Save more when you print with us again",
      color: "bg-amber-500",
      gradientFrom: "from-amber-500",
      gradientTo: "to-amber-600",
      details:
        "Returning clients enjoy special discounts on bulk orders and repeat purchases.",
    },
  ];

  return (
    <div
      id="below-hero-section"
      className={`relative py-8 px-4 transition-all duration-1000 ${
        isVisible
          ? "opacity-100 transform translate-y-0"
          : "opacity-0 transform translate-y-10"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 opacity-70 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="h-1 w-full bg-gradient-to-r from-purple-600 via-blue-500 to-green-400"></div>

        <div className="flex flex-col md:flex-row justify-between items-stretch p-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative flex flex-col items-center text-center py-6 px-4 rounded-xl transition-all duration-300 group cursor-pointer
                ${
                  index < features.length - 1
                    ? "mb-4 md:mb-0 md:border-r md:border-gray-100"
                    : ""
                }
                ${
                  hoveredFeature === index
                    ? "transform scale-105 z-10"
                    : "hover:bg-gray-50"
                }`}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className="relative mb-4">
                <div
                  className={`absolute inset-0 ${feature.color} opacity-10 rounded-full transform scale-150 group-hover:scale-175 transition-transform duration-500`}
                ></div>
                <div
                  className={`relative flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br ${feature.gradientFrom} ${feature.gradientTo} text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}
                >
                  {feature.icon}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                    <div className="absolute inset-0 rounded-full animate-ping bg-white opacity-10"></div>
                  </div>
                </div>
              </div>

              <h4 className="text-lg font-bold text-gray-800 mb-2 relative">
                {feature.title}
                <div
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-0 group-hover:w-full ${feature.color} transition-all duration-300 rounded-full`}
                ></div>
              </h4>

              <p className="text-sm text-gray-600 mb-4 max-w-xs">
                {feature.desc}
              </p>

              <div
                className={`overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-24 opacity-0 group-hover:opacity-100`}
              >
                <p className="text-xs text-gray-500 italic px-2 mt-2">
                  {feature.details}
                </p>
              </div>

              <div className="mt-auto pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  className={`flex items-center text-xs ${feature.gradientFrom.replace(
                    "from-",
                    "text-"
                  )} font-medium`}
                >
                  <FaChevronRight
                    size={10}
                    className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 border-t border-gray-100 p-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-gray-600 mb-3 sm:mb-0">
            <span className="font-medium">Trusted by</span> over 2,000+ clients
            across Kenya
          </div>
          <div className="flex space-x-4">
            <img
              src="/api/placeholder/100/30"
              alt="Trusted Partner Logo"
              className="h-6 opacity-60 hover:opacity-100 transition-opacity duration-300"
            />
            <img
              src="/api/placeholder/100/30"
              alt="Trusted Partner Logo"
              className="h-6 opacity-60 hover:opacity-100 transition-opacity duration-300"
            />
            <img
              src="/api/placeholder/100/30"
              alt="Trusted Partner Logo"
              className="h-6 opacity-60 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              rgba(0, 0, 0, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}
