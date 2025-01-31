import React, { useState, useEffect } from "react";
import images from "../assets/assets";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const slides = [
    {
      id: 1,
      url: images.pens,
      title: "Premium Writing Tools",
      text: "Discover our collection of high-quality pens for professionals and creatives.",
      buttonText: "Shop Now",
    },
    {
      id: 2,
      url: images.pen,
      title: "Elegance in Every Stroke",
      text: "Experience the smoothest writing experience with our exclusive selection.",
      buttonText: "Explore Collection",
    },
    {
      id: 3,
      url: images.pens2,
      title: "Designed for Excellence",
      text: "Upgrade your stationery with our finely crafted writing instruments.",
      buttonText: "Get Yours Today",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((current) => (current + 1) % slides.length);
          return 0;
        }
        return prev + 2;
      });
    }, 100); // Adjust speed if necessary

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[65vh] md:h-[90vh] flex justify-center items-center text-white overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${slides[currentSlide].url})` }}
      ></div>

      {/* Bluish Overlay */}
      <div className="absolute inset-0 bg-blue-900 opacity-50"></div>

      {/* Content with Animation */}
      <div className="relative text-center px-6 md:px-12">
        <h2
          key={currentSlide} // Forces animation on slide change
          className="text-3xl md:text-5xl font-bold mb-4 opacity-0 animate-fadeInUp"
          style={{ animationDelay: "0.5s" }}
        >
          {slides[currentSlide].title}
        </h2>
        <p
          key={`text-${currentSlide}`}
          className="max-w-2xl mx-auto mb-6 text-lg opacity-0 animate-fadeInUp"
          style={{ animationDelay: "3s" }}
        >
          {slides[currentSlide].text}
        </p>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-lg mb-20 md:hidden block">
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

        <button
          key={`button-${currentSlide}`}
          className="bg-orange-400 px-6 py-3 rounded-lg text-lg hover:bg-orange-500 transition duration-300 opacity-0 animate-fadeInUp"
          style={{ animationDelay: "1.5s" }}
        >
          {slides[currentSlide].buttonText}
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-white w-6" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Keyframe Animations (TailwindCSS) */}
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp {
            animation: fadeInUp 1s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Hero;
