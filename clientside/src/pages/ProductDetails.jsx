import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const productRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://bluescope-eotl.vercel.app/bluescope/products"
        );
        setProducts(response.data);

        const product = response.data.find((p) => p._id === id);
        if (product) {
          setSelectedProduct(product);
          setMainImage(product.images[0]);

          setTimeout(() => {
            productRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 10);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [id]);

  if (!selectedProduct) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 mt-20 min-h-screen py-12 px-4 sm:px-6">
      {/* Product Section */}
      <div
        ref={productRef}
        className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div className="flex flex-col md:flex-row">
          {/* Left Section - Images */}
          <div className="w-full md:w-1/2 relative">
            {/* Main Image Container with Gold Border */}
            <div className="p-1 border-4 border-amber-300 m-4 rounded-lg shadow-lg">
              <img
                className="w-full h-96 object-cover rounded-lg transition-all duration-500 hover:scale-105"
                src={mainImage}
                alt={selectedProduct.name}
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 justify-center mt-4 mb-6 px-4">
              {selectedProduct.images.map((img, index) => (
                <div
                  key={index}
                  className={`p-0.5 rounded-md transition-all duration-300 ${
                    mainImage === img
                      ? "border-2 border-amber-400 shadow-md"
                      : ""
                  }`}
                >
                  <img
                    className="w-16 h-16 object-cover rounded-md cursor-pointer hover:opacity-90"
                    src={img}
                    alt={`Thumbnail ${index}`}
                    onClick={() => setMainImage(img)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Product Details */}
          <div className="w-full md:w-1/2 p-8 bg-gray-50">
            {/* Gold Line Decoration */}
            <div className="w-16 h-1 bg-amber-400 mb-6"></div>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {selectedProduct.name}
            </h1>

            {/* Elegant Description Box */}
            <div className="bg-white p-4 rounded-lg shadow-inner border border-gray-200 mt-4 mb-6">
              <p className="text-gray-700 italic leading-relaxed">
                {selectedProduct.description}
              </p>
            </div>

            {/* Specifications with Elegant Gold Accents */}
            <div className="space-y-4 mt-8">
              <div className="flex items-center">
                <span className="text-amber-500 mr-2">●</span>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">Category:</span>{" "}
                  {selectedProduct.category}
                </p>
              </div>

              <div className="flex items-center">
                <span className="text-amber-500 mr-2">●</span>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">
                    Dimensions:
                  </span>{" "}
                  {selectedProduct.dimensions || "Standard size"}
                </p>
              </div>

              <div className="flex items-center">
                <span className="text-amber-500 mr-2">●</span>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">Material:</span>{" "}
                  {selectedProduct.material || "High-quality composite"}
                </p>
              </div>
            </div>

            {/* Add to Cart Button - Blue for CTA */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 flex-1 text-lg font-medium">
                Add to Cart
              </button>

              <button className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg shadow hover:bg-gray-300 transition-all duration-300 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section with Gold Accent */}
      <div className="mt-16 max-w-6xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <div className="h-0.5 bg-amber-400 w-12 mr-4"></div>
          <h2 className="text-2xl font-bold text-gray-800">Related Products</h2>
          <div className="h-0.5 bg-amber-400 w-12 ml-4"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products
            .filter((product) => product._id !== selectedProduct._id)
            .slice(0, 5)
            .map((product) => (
              <div
                key={product._id}
                className="group"
                onClick={() => {
                  setSelectedProduct(product);
                  setMainImage(product.images[0]);
                  productRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group-hover:scale-105">
                  <div className="relative">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-gray-800 font-medium text-sm truncate">
                      {product.name}
                    </h3>
                    <div className="w-8 h-0.5 bg-amber-400 mt-2"></div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Explore More Button - Blue CTA */}
        <div className="text-center mt-10">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center">
            <span>Explore More</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
