import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaHeart,
  FaRegHeart,
  FaArrowRight,
  FaCompass,
  FaStar,
  FaTimes,
} from "react-icons/fa";

import { IoGrid, IoApps, IoInfinite } from "react-icons/io5";
import { HiOutlineSparkles } from "react-icons/hi";
import {
  MdExplore,
  MdOutlineExplore,
  MdFavorite,
  MdFavoriteBorder,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  // Add these state variables at the component level
  const [showCustomizationModal, setShowCustomizationModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedContactNumber, setSelectedContactNumber] = useState(null);
  const [customizationData, setCustomizationData] = useState({
    line1: "",
    line2: "",
    line3: "",
  });

  // Function to open the modal
  const openCustomizationModal = (product, contactNumberObj) => {
    setSelectedProduct(product);
    setSelectedContactNumber(contactNumberObj);
    setCustomizationData({
      line1: "",
      line2: "",
      line3: "",
    });
    setShowCustomizationModal(true);
  };

  // Function to close the modal
  const closeCustomizationModal = () => {
    setShowCustomizationModal(false);
  };

  // Function to handle input changes
  const handleCustomizationChange = (e) => {
    const { name, value } = e.target;
    setCustomizationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to submit and go to WhatsApp
  const submitCustomization = () => {
    if (!selectedProduct || !selectedContactNumber) return;

    const message = encodeURIComponent(
      `Hello, I'm interested in customizing the ${selectedProduct.name} with you!
    
${selectedContactNumber.name}: ${customizationData.line1}
Line 2: ${customizationData.line2}
Line 3: ${customizationData.line3}`
    );

    window.open(
      `https://wa.me/${selectedContactNumber.phoneNumber}?text=${message}`,
      "_blank"
    );
    closeCustomizationModal();
  };
  // Contact numbers for orders (shared across categories)
  const contactNumbers = [
    {
      name: "Line 1",
      phoneNumber: "+254714952506",
      department: "For quotes and general inquiries",
    },
    {
      name: "Line 2",
      phoneNumber: "+254732917203",
      department: "For existing orders and technical support",
    },
    {
      name: "Line 3",
      phoneNumber: "+254726705694",
      department: "For existing orders and technical support",
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://bluescope-eotl.vercel.app/bluescope/products/"
        );
        setProducts(response.data);

        // Extract all available categories from products
        const availableCategories = [
          ...new Set(response.data.map((product) => product.category)),
        ];

        // Randomize category order
        const shuffledCategories = shuffleArray(availableCategories);

        // Set first category as active
        if (shuffledCategories.length > 0) {
          setActiveCategory(shuffledCategories[0]);
        }

        // Load wishlist from localStorage if available
        const savedWishlist = localStorage.getItem("product_wishlist");
        if (savedWishlist) {
          setWishlist(JSON.parse(savedWishlist));
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const navigate = useNavigate(); // Get navigation function

  // Fisher-Yates shuffle algorithm for randomizing categories
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Toggle wishlist status
  const toggleWishlist = (productId) => {
    let newWishlist;
    if (wishlist.includes(productId)) {
      newWishlist = wishlist.filter((id) => id !== productId);
    } else {
      newWishlist = [...wishlist, productId];
    }
    setWishlist(newWishlist);
    localStorage.setItem("product_wishlist", JSON.stringify(newWishlist));
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <div className="relative">
          <div className="w-24 h-24 border-t-4 border-b-4 border-blue-400 rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <HiOutlineSparkles className="text-blue-300 text-xl animate-pulse" />
          </div>
        </div>
        <p className="mt-8 text-xl font-light text-blue-200">
          <span className="animate-pulse">Discovering</span> amazing products
          for you...
        </p>
        <div className="flex space-x-1 mt-4">
          {[0, 1, 2, 3, 4].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full"
              style={{
                animation: `pulse 1.5s infinite ease-in-out ${i * 0.2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <div className="bg-blue-900/40 backdrop-blur-sm p-8 rounded-xl border border-blue-700/50 max-w-md shadow-2xl shadow-blue-900/30">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-red-500/10 animate-ping"></div>
            <svg
              className="relative w-20 h-20 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              ></path>
            </svg>
          </div>
          <p className="text-lg text-center text-blue-200 mb-2">{error}</p>
          <p className="text-sm text-center text-blue-300/70 mb-6">
            Our system is taking a quick break. Let's try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
          >
            <div className="flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              </svg>
              Refresh Products
            </div>
          </button>
        </div>
      </div>
    );
  }

  // Get all available categories from products
  const allCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  // Limit to maximum 8 categories (already randomized during initial load)
  const displayedCategories = allCategories.slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 py-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float-reverse"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIHN0cm9rZT0iIzMzNjZGRiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIgY3g9IjkiIGN5PSI5IiByPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-200 to-indigo-300">
              Discover Our Collections
            </span>
          </h1>
          <p className="text-blue-200/80 max-w-2xl mx-auto text-lg">
            Premium customizable products crafted with precision and style.
          </p>
        </div>

        {/* Layout with Explore Section */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Main Products Area (5/6 width) */}
          <div className="lg:col-span-5">
            {/* Category Navigation */}
            <div className="relative mb-12">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 rounded-2xl blur-xl transform -translate-y-6 scale-y-50"></div>
              <div className="relative flex justify-start overflow-x-auto pb-4 px-4 gap-x-3 scrollbar-hide">
                <div className="flex space-x-4 py-2">
                  {displayedCategories.map((category, index) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      style={{ animationDelay: `${index * 0.1}s` }}
                      className={`
                        px-6 py-3 rounded-xl transition-all duration-300 text-sm font-medium whitespace-nowrap
                        transform hover:-translate-y-1 animate-fadeInUp flex items-center
                        ${
                          activeCategory === category
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20"
                            : "bg-blue-900/30 text-blue-200 backdrop-blur-sm hover:bg-blue-800/40 border border-blue-800/30"
                        }
                      `}
                    >
                      <span
                        className={`mr-2 ${
                          activeCategory === category
                            ? "text-blue-200"
                            : "text-blue-400"
                        }`}
                      >
                        {index % 3 === 0 && <IoGrid size={16} />}
                        {index % 3 === 1 && <IoApps size={16} />}
                        {index % 3 === 2 && <IoInfinite size={16} />}
                      </span>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Display */}
            {displayedCategories.map((category) => {
              const categoryProducts = products.filter(
                (product) => product.category === category
              );

              if (category !== activeCategory) return null;

              return (
                <div key={category} className="animate-fadeIn">
                  {/* Section Header */}
                  <div className="flex justify-between items-center mb-10">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300">
                          {category.toUpperCase()}
                        </span>
                      </h2>
                      <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="text-blue-300 px-3 py-1 bg-blue-900/30 rounded-lg text-sm backdrop-blur-sm border border-blue-800/30">
                        {categoryProducts.length} items
                      </div>
                    </div>
                  </div>

                  {/* Product Grid - 5 per row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {categoryProducts.map((product, index) => {
                      // Rotate through contact numbers for different products
                      const contactNumberObj =
                        contactNumbers[index % contactNumbers.length];
                      const whatsappNumber = contactNumberObj.phoneNumber;
                      const message = encodeURIComponent(
                        `Hello, I'm interested in customizing the ${product.name} with you!`
                      );
                      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

                      // Staggered animation delay
                      const animationDelay = `${index * 0.075}s`;
                      const isWishlisted = wishlist.includes(product._id);

                      return (
                        <div
                          key={product._id}
                          className="group relative bg-gradient-to-b from-blue-900/40 to-blue-950/70 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 backdrop-blur-sm border border-blue-800/20"
                          style={{
                            animationDelay,
                            animation: "fadeIn 0.6s ease-out forwards",
                          }}
                        >
                          {/* Glowing border effect on hover */}
                          <div className="absolute inset-0 rounded-xl border border-blue-400/0 group-hover:border-blue-400/30 transition-all duration-500 pointer-events-none"></div>

                          {/* Wishlist Button */}
                          <button
                            onClick={() => toggleWishlist(product._id)}
                            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 bg-blue-950/60 backdrop-blur-sm border border-blue-800/30 group-hover:bg-blue-900/70"
                          >
                            {isWishlisted ? (
                              <MdFavorite className="text-red-400 text-lg" />
                            ) : (
                              <MdFavoriteBorder className="text-blue-300 text-lg group-hover:text-red-300" />
                            )}
                          </button>

                          {/* Product Image */}
                          <div
                            className="relative h-52 overflow-hidden"
                            onClick={() => navigate(`/product/${product._id}`)} // Navigate to product details
                          >
                            {product.images && product.images.length > 0 ? (
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-blue-900/30 text-blue-300">
                                <svg
                                  className="w-12 h-12 opacity-30"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  ></path>
                                </svg>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/70 to-transparent opacity-0 group-hover:opacity-70 transition-all duration-300"></div>
                          </div>

                          {/* Product Details */}
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-lg font-medium text-blue-100 group-hover:text-blue-50 transition-colors duration-300 line-clamp-1">
                                {product.name}
                              </h3>
                            </div>

                            <p className="text-blue-300/70 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                              {product.description}
                            </p>

                            {/* Features & Material Tags */}
                            {(product.material || product.dimensions) && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {product.material && (
                                  <span className="text-xs px-2 py-1 rounded-full bg-blue-900/50 text-blue-300 border border-blue-800/30">
                                    {product.material}
                                  </span>
                                )}
                                {product.dimensions && (
                                  <span className="text-xs px-2 py-1 rounded-full bg-indigo-900/50 text-indigo-300 border border-indigo-800/30">
                                    {product.dimensions}
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Contact Button - changed to a button that opens the modal */}
                            <button
                              onClick={() =>
                                openCustomizationModal(
                                  product,
                                  contactNumberObj
                                )
                              }
                              className="group/button block w-full relative overflow-hidden"
                            >
                              <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-center text-blue-50 text-sm font-medium py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg flex items-center justify-center gap-2">
                                <span>Get Your Customize Design</span>
                                <FaArrowRight className="text-xs opacity-70 transition-transform duration-300 group-hover/button:translate-x-1" />
                              </div>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Customization Modal - Add this outside the map function */}
                  {showCustomizationModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/80 backdrop-blur-sm">
                      <div
                        className="bg-gradient-to-b from-blue-900 to-blue-950 rounded-xl p-6 w-full max-w-md mx-4 border border-blue-700/30 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-medium text-blue-100">
                            Customize {selectedProduct?.name}
                          </h3>
                          <button
                            onClick={closeCustomizationModal}
                            className="text-blue-400 hover:text-blue-200 transition-colors"
                          >
                            <FaTimes />
                          </button>
                        </div>

                        <div className="space-y-4 mb-6">
                          <div>
                            <label className="block text-blue-300 text-sm mb-1">
                              {selectedContactNumber?.name || "Line 1"}
                            </label>
                            <input
                              type="text"
                              name="line1"
                              value={customizationData.line1}
                              onChange={handleCustomizationChange}
                              className="w-full bg-blue-900/40 border border-blue-700/30 rounded-lg p-2 text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                              placeholder="Enter your text for Line 1"
                            />
                          </div>

                          <div>
                            <label className="block text-blue-300 text-sm mb-1">
                              Line 2
                            </label>
                            <input
                              type="text"
                              name="line2"
                              value={customizationData.line2}
                              onChange={handleCustomizationChange}
                              className="w-full bg-blue-900/40 border border-blue-700/30 rounded-lg p-2 text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                              placeholder="Enter your text for Line 2"
                            />
                          </div>

                          <div>
                            <label className="block text-blue-300 text-sm mb-1">
                              Line 3
                            </label>
                            <input
                              type="text"
                              name="line3"
                              value={customizationData.line3}
                              onChange={handleCustomizationChange}
                              className="w-full bg-blue-900/40 border border-blue-700/30 rounded-lg p-2 text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                              placeholder="Enter your text for Line 3"
                            />
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={closeCustomizationModal}
                            className="flex-1 border border-blue-600 text-blue-300 hover:text-blue-100 font-medium py-2 px-4 rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={submitCustomization}
                            className="flex-1 bg-[#25d366] hover:from-blue-500 hover:to-indigo-500 text-blue-50 font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <span>Continue to WhatsApp</span>
                            <FaArrowRight className="text-xs" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Empty State */}
                  {categoryProducts.length === 0 && (
                    <div className="bg-blue-900/20 rounded-xl backdrop-blur-sm border border-blue-800/20 p-12 text-center">
                      <div className="w-16 h-16 mx-auto bg-blue-900/40 rounded-full flex items-center justify-center mb-6">
                        <svg
                          className="w-8 h-8 text-blue-400/70"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                          ></path>
                        </svg>
                      </div>
                      <h3 className="text-xl font-medium text-blue-200 mb-2">
                        Collection Coming Soon
                      </h3>
                      <p className="text-blue-300/70 max-w-md mx-auto text-sm">
                        We're crafting an exceptional collection of{" "}
                        {category.toLowerCase()}. Check back soon for our latest
                        designs!
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Explore More Section (1/6 width) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-8">
              {/* Explore Section Header */}
              <div className="bg-gradient-to-b from-blue-600/20 to-indigo-900/20 rounded-xl p-5 backdrop-blur-sm border border-blue-700/20 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/10">
                    <MdExplore className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Explore More
                  </h3>
                </div>
                <p className="text-blue-200/70 text-sm mb-4">
                  Discover our complete range of customizable products in our
                  full catalog.
                </p>
                <a
                  href="/catalogue"
                  className="block w-full bg-blue-800/50 hover:bg-blue-700/50 text-blue-100 text-center py-2.5 rounded-lg transition-all duration-300 border border-blue-700/30 text-sm font-medium flex items-center justify-center gap-2"
                >
                  <span>View Full Catalog</span>
                  <FaCompass className="text-blue-300" />
                </a>
              </div>

              {/* Wishlist Summary */}
              <div className="bg-gradient-to-b from-indigo-900/20 to-purple-900/20 rounded-xl p-5 backdrop-blur-sm border border-indigo-700/20 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/10">
                    <FaHeart className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      Your Wishlist
                    </h3>
                    <p className="text-indigo-200/70 text-xs">
                      {wishlist.length} items saved
                    </p>
                  </div>
                </div>

                {wishlist.length > 0 ? (
                  <a
                    href="/wishlist"
                    className="block w-full bg-indigo-800/50 hover:bg-indigo-700/50 text-indigo-100 text-center py-2.5 rounded-lg transition-all duration-300 border border-indigo-700/30 text-sm font-medium"
                  >
                    View Wishlist
                  </a>
                ) : (
                  <p className="text-indigo-300/60 text-sm italic">
                    Save your favorite items by clicking the heart icon
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations CSS */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
          100% {
            transform: translateY(0px) translateX(0px);
          }
        }

        @keyframes float-delayed {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(20px) translateX(-10px);
          }
          100% {
            transform: translateY(0px) translateX(0px);
          }
        }

        @keyframes float-slow {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(15px) translateX(15px);
          }
          100% {
            transform: translateY(0px) translateX(0px);
          }
        }

        @keyframes float-reverse {
          0% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) translateX(-10px) rotate(5deg);
          }
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 12s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: float-reverse 10s ease-in-out infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out forwards;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ProductList;
