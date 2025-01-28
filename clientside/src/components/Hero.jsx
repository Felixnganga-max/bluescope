import React, { useState, useEffect } from "react";
import images from "../assets/assets";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const slides = [
    { id: 1, url: images.slider2, title: "Slider 2" },
    { id: 2, url: images.slider1, title: "Slider 1" },
    { id: 2, url: images.Slider4, title: "Slider 4" },
    { id: 2, url: images.Slider3, title: "Slider 3" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((current) => (current + 1) % slides.length);
          return 0;
        }
        return prev + 1;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  return (
    <div className="relative w-full flex justify-center items-center py-2 md:py-8">
      <div className="relative w-[99%] h-[60vh] mt-[-25px] overflow-hidden">
        {/* Navigation Dots Container */}
        <div className="absolute top-2 md:top-4 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`group relative h-2 md:h-3 overflow-hidden rounded-full transition-all duration-300
                ${
                  currentSlide === index
                    ? "w-12 md:w-16 bg-black/20"
                    : "w-2 md:w-3 bg-white/50"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {currentSlide === index && (
                <div
                  className="absolute left-0 top-0 h-full bg-white transition-all duration-200"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              )}
              <div
                className={`absolute left-0 top-0 h-full w-full bg-white/50 transform origin-left scale-x-0 
                  group-hover:scale-x-100 transition-transform duration-200
                  ${currentSlide === index ? "opacity-0" : "opacity-100"}`}
              />
            </button>
          ))}
        </div>

        {/* Slides */}
        <div
          className="flex transition-transform duration-700 ease-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="min-w-full h-full">
              <img
                src={slide.url}
                alt={slide.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error(`Error loading image: ${slide.title}`);
                  e.target.src =
                    "https://via.placeholder.com/800x450?text=Image+Not+Found";
                }}
              />
            </div>
          ))}
        </div>

        {/* Previous/Next Buttons */}
        <button
          onClick={() =>
            goToSlide((currentSlide - 1 + slides.length) % slides.length)
          }
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 md:p-2 rounded-full transition-colors duration-200"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 md:w-6 md:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <button
          onClick={() => goToSlide((currentSlide + 1) % slides.length)}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 md:p-2 rounded-full transition-colors duration-200"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 md:w-6 md:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Hero;
