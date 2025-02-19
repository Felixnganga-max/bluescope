import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = ["mugs", "stationery", "bags"];
  const whatsappNumbers = {
    mugs: "+254714952506",
    stationery: "+254714952506",
    bags: "+254714952506",
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/bluescope/products"
        );
        setProducts(response.data);
        
        // Set first category with products as active
        const firstCategoryWithProducts = categories.find(category => 
          response.data.some(product => product.category === category)
        );
        setActiveCategory(firstCategoryWithProducts || categories[0]);
        
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700">
        <div className="w-16 h-16 border-t-4 border-b-4 border-yellow-400 rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-gray-200">Loading our amazing products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700">
        <div className="bg-red-900/30 p-8 rounded-xl border border-red-800 max-w-md">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p className="text-lg text-center text-red-300">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 w-full bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Filter categories that have products
  const availableCategories = categories.filter(category => 
    products.some(product => product.category === category)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Category Navigation */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2">
          <div className="flex space-x-2 md:space-x-6">
            {availableCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full transition-all duration-300 text-lg font-medium ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white shadow-lg transform scale-105"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Product Display */}
        {availableCategories.map((category) => {
          const categoryProducts = products.filter(
            (product) => product.category === category
          );
          const whatsappNumber = whatsappNumbers[category] || "";

          if (category !== activeCategory) return null;

          return (
            <div 
              key={category}
              className="animate-fadeIn"
            >
              {/* Section Header */}
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-100 mb-3 relative inline-block">
                  <span className="relative z-10">
                    {category.toUpperCase()}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 opacity-70"></span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Discover our premium range of customizable {category.toLowerCase()}. Perfect for personal use or corporate gifts.
                </p>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {categoryProducts.map((product, index) => {
                  const message = encodeURIComponent(
                    `Hello, I'm interested in customizing the ${product.name} with you!`
                  );
                  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;
                  
                  // Staggered animation delay
                  const animationDelay = `${index * 0.1}s`;

                  return (
                    <div
                      key={product._id}
                      className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl group transform hover:-translate-y-2"
                      style={{ animationDelay }}
                    >
                      {/* Product Image */}
                      <div className="relative h-64 overflow-hidden">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-400">
                            <svg className="w-16 h-16 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                      </div>

                      {/* Product Details */}
                      <div className="p-6 text-white">
                        <h3 className="text-2xl font-semibold mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                          {product.name}
                        </h3>
                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>

                        {/* Price */}
                        <div className="flex items-center mb-4">
                          <span className="text-lg font-bold text-yellow-400">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>

                        {/* Additional Details (Only displayed if available) */}
                        <div className="text-sm space-y-1 mb-4">
                          {product.material && (
                            <p className="flex items-center">
                              <span className="w-4 h-4 mr-2 opacity-70">
                                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.888A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.57-2.3-2.656-1.067-3.888L4.2 15.3"></path>
                                </svg>
                              </span>
                              <span className="font-medium text-gray-400">Material:</span>{" "}
                              <span className="text-gray-300 ml-1">{product.material}</span>
                            </p>
                          )}
                          {product.dimensions && (
                            <p className="flex items-center">
                              <span className="w-4 h-4 mr-2 opacity-70">
                                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"></path>
                                </svg>
                              </span>
                              <span className="font-medium text-gray-400">Dimensions:</span>{" "}
                              <span className="text-gray-300 ml-1">{product.dimensions}</span>
                            </p>
                          )}
                        </div>

                        {/* WhatsApp Button */}
                        <a
                          href={whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full mt-4 bg-gradient-to-r from-green-600 to-green-500 text-center text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:from-green-500 hover:to-green-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
                        >
                          <div className="flex items-center justify-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411"></path>
                            </svg>
                            Customize Your Own Design
                          </div>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;

// Add this to your CSS or tailwind.config.js
// @keyframes fadeIn {
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// }
// .animate-fadeIn {
//   animation: fadeIn 0.5s ease-out forwards;
// }