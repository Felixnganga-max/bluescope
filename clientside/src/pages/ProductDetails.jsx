import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mainImage, setMainImage] = useState(""); // Track main image
  const productRef = useRef(null); // Reference for scrolling

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/bluescope/products"
        );
        setProducts(response.data);

        // Find the product matching the URL ID
        const product = response.data.find((p) => p._id === id);
        if (product) {
          setSelectedProduct(product);
          setMainImage(product.images[0]); // Set first image as default

          // Scroll to product section smoothly
          setTimeout(() => {
            productRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 10); // Delay to ensure the page is rendered first
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [id]);

  if (!selectedProduct) {
    return (
      <div className="text-center text-blue-600 text-lg mt-10">Loading...</div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Product Section */}
      <div
        ref={productRef}
        className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6 transition-all duration-300 ease-in-out"
      >
        {/* Left Section - Images */}
        <div className="w-full md:w-2/5">
          <img
            className="w-full h-96 object-cover rounded-lg shadow-md transition-transform duration-500 hover:scale-105"
            src={mainImage}
            alt={selectedProduct.name}
          />
          {/* Thumbnails */}
          <div className="flex gap-3 mt-4">
            {selectedProduct.images.map((img, index) => (
              <img
                key={index}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-transform duration-300 
                  ${
                    mainImage === img
                      ? "border-2 border-blue-500 scale-110"
                      : "hover:scale-105"
                  }`}
                src={img}
                alt={`Thumb ${index}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right Section - Product Details */}
        <div className="w-full md:w-3/5">
          <h1 className="text-3xl font-bold text-blue-700">
            {selectedProduct.name}
          </h1>
          <p className="text-gray-600 mt-2">{selectedProduct.description}</p>

          <p className="text-lg font-semibold mt-4">
            <span className="text-blue-700">Category:</span>{" "}
            {selectedProduct.category}
          </p>
          <p className="text-lg font-semibold mt-2">
            <span className="text-blue-700">Dimensions:</span>{" "}
            {selectedProduct.dimensions || "Standard size"}
          </p>
          <p className="text-lg font-semibold mt-2">
            <span className="text-blue-700">Material:</span>{" "}
            {selectedProduct.material || "High-quality composite"}
          </p>

          {/* Animated "Add to Cart" Button */}
          <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-transform hover:scale-105">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-blue-700 text-center">
          Related Products
        </h2>
        <div className="flex overflow-x-auto gap-6 p-4 scrollbar-hide">
          {products
            .filter((product) => product._id !== selectedProduct._id) // Exclude current product
            .slice(0, 5)
            .map((product) => (
              <div
                key={product._id}
                className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => {
                  setSelectedProduct(product);
                  setMainImage(product.images[0]); // Update main image
                }}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-700 mt-2">{product.name}</p>
              </div>
            ))}
        </div>

        {/* Explore More Button */}
        <button className="block mx-auto mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-transform hover:scale-105">
          Explore More
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
