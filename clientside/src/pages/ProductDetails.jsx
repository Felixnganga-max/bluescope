import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [whatsappNumbers, setWhatsappNumbers] = useState([
    "+254726705694", // Default numbers - you can change these
    "+254732917203",
    "+254714952506",
  ]);
  const [showNumbersEditor, setShowNumbersEditor] = useState(false);
  const [tempNumbers, setTempNumbers] = useState([...whatsappNumbers]);
  const productRef = useRef(null);
  const topRef = useRef(null);

  // ScrollToTop when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

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
            if (productRef.current) {
              productRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }, 100);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [id]);

  const handleWhatsappRequest = (number) => {
    const message = encodeURIComponent(
      `Hello! I'm interested in getting a quote for the product: ${selectedProduct.name}`
    );
    window.open(`https://wa.me/${number}?text=${message}`, "_blank");
  };

  const saveWhatsappNumbers = () => {
    setWhatsappNumbers([...tempNumbers]);
    setShowNumbersEditor(false);
  };

  const handleNumberChange = (index, value) => {
    const newNumbers = [...tempNumbers];
    newNumbers[index] = value;
    setTempNumbers(newNumbers);
  };

  // Loading animation
  if (!selectedProduct) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 border-t-4 border-b-4 border-blue-400 rounded-full animate-spin"></div>
          <p className="mt-4 text-blue-400 text-xl font-light">
            Loading amazing products...
          </p>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div
      ref={topRef}
      className="bg-gray-900 mt-16 min-h-screen py-12 px-4 sm:px-6 text-gray-100"
    >
      {/* Animated Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl mx-auto mb-12"
      >
        <div className="relative rounded-2xl overflow-hidden h-64 md:h-96">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-gray-900 opacity-70"></div>
          <img
            src={mainImage}
            alt="Hero banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
              >
                {selectedProduct.name}
              </motion.h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "200px" }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="h-1 bg-blue-400 mx-auto"
              ></motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Product Section */}
      <motion.div
        ref={productRef}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700"
      >
        <div className="flex flex-col md:flex-row">
          {/* Left Section - Images */}
          <motion.div
            variants={itemVariants}
            className="w-full md:w-1/2 relative p-6"
          >
            {/* Main Image Container with Glowing Border */}
            <div className="p-1 border-4 border-blue-500 rounded-lg shadow-lg overflow-hidden relative">
              <div className="absolute inset-0 bg-blue-500 opacity-20 animate-pulse"></div>
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="w-full h-96 object-cover rounded-lg relative z-10"
                src={mainImage}
                alt={selectedProduct.name}
              />
            </div>

            {/* Thumbnails */}
            <motion.div
              variants={containerVariants}
              className="flex gap-2 justify-center mt-6 mb-6 px-4 overflow-x-auto py-2"
            >
              {selectedProduct.images.map((img, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-1 rounded-md transition-all duration-300 ${
                    mainImage === img
                      ? "border-2 border-blue-400 shadow-lg shadow-blue-400/30"
                      : "border-2 border-gray-700"
                  }`}
                >
                  <img
                    className="w-16 h-16 object-cover rounded-md cursor-pointer hover:opacity-90"
                    src={img}
                    alt={`Thumbnail ${index}`}
                    onClick={() => setMainImage(img)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Section - Product Details */}
          <motion.div
            variants={itemVariants}
            className="w-full md:w-1/2 p-8 bg-gray-800 border-l border-gray-700"
          >
            {/* Blue Line Decoration */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ duration: 0.8 }}
              className="h-1 bg-blue-500 mb-6"
            ></motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl font-bold text-blue-100 mb-2"
            >
              {selectedProduct.name}
            </motion.h1>

            {/* Elegant Description Box */}
            <motion.div
              variants={itemVariants}
              className="bg-gray-900 p-6 rounded-lg shadow-inner border border-gray-700 mt-6 mb-6"
            >
              <p className="text-gray-300 leading-relaxed">
                {selectedProduct.description}
              </p>
            </motion.div>

            {/* Specifications with Elegant Blue Accents */}
            <motion.div variants={containerVariants} className="space-y-4 mt-8">
              <motion.div variants={itemVariants} className="flex items-center">
                <span className="text-blue-400 mr-2">●</span>
                <p className="text-gray-300">
                  <span className="font-semibold text-blue-200">Category:</span>{" "}
                  {selectedProduct.category}
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center">
                <span className="text-blue-400 mr-2">●</span>
                <p className="text-gray-300">
                  <span className="font-semibold text-blue-200">
                    Dimensions:
                  </span>{" "}
                  {selectedProduct.dimensions || "Standard size"}
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center">
                <span className="text-blue-400 mr-2">●</span>
                <p className="text-gray-300">
                  <span className="font-semibold text-blue-200">Material:</span>{" "}
                  {selectedProduct.material || "High-quality composite"}
                </p>
              </motion.div>
            </motion.div>

            {/* WhatsApp Quote Request Section */}
            <motion.div variants={itemVariants} className="mt-10 space-y-4">
              <h3 className="text-xl font-semibold text-blue-200 mb-4">
                Request Quote on WhatsApp
              </h3>

              <div className="space-y-3">
                {whatsappNumbers.map((number, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.03, backgroundColor: "#10B981" }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-green-600 text-white w-full px-6 py-3 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                    onClick={() => handleWhatsappRequest(number)}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>
                      WhatsApp {index + 1}: {number}
                    </span>
                  </motion.button>
                ))}

                {showNumbersEditor ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 bg-gray-900 p-4 rounded-lg border border-gray-700"
                  >
                    <h4 className="text-lg font-medium text-blue-200 mb-3">
                      Edit WhatsApp Numbers
                    </h4>
                    {tempNumbers.map((number, index) => (
                      <div key={index} className="flex mb-2">
                        <input
                          type="text"
                          value={number}
                          onChange={(e) =>
                            handleNumberChange(index, e.target.value)
                          }
                          className="flex-grow px-4 py-2 bg-gray-800 border border-gray-600 rounded-l-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={`WhatsApp number ${index + 1}`}
                        />
                      </div>
                    ))}
                    <div className="flex justify-end space-x-2 mt-4">
                      <button
                        onClick={() => setShowNumbersEditor(false)}
                        className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveWhatsappNumbers}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                      >
                        Save Numbers
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowNumbersEditor(true)}
                    className="text-blue-400 mt-2 flex items-center hover:text-blue-300"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                    Edit WhatsApp Numbers
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Related Products Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-24 max-w-6xl mx-auto"
      >
        <div className="flex items-center justify-center mb-12">
          <div className="h-0.5 bg-blue-500 w-12 mr-4"></div>
          <h2 className="text-2xl font-bold text-blue-200">Related Products</h2>
          <div className="h-0.5 bg-blue-500 w-12 ml-4"></div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          {products
            .filter((product) => product._id !== selectedProduct._id)
            .slice(0, 5)
            .map((product, index) => (
              <motion.div
                key={product._id}
                variants={itemVariants}
                custom={index}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group cursor-pointer"
                onClick={() => {
                  setSelectedProduct(product);
                  setMainImage(product.images[0]);
                  if (productRef.current) {
                    productRef.current.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
              >
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 h-full">
                  <div className="relative">
                    <div className="overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-blue-100 font-medium text-sm truncate">
                      {product.name}
                    </h3>
                    <div className="w-8 h-0.5 bg-blue-500 mt-2 transform origin-left transition-all duration-300 group-hover:w-full"></div>
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>

        {/* Explore More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-300 inline-flex items-center"
          >
            <span>Explore All Products</span>
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
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: "smooth" });
          }
        }}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-500 z-50"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </div>
  );
};

export default ProductDetails;
