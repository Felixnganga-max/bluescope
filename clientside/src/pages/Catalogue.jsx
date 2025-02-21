import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, ShoppingBag, ChevronRight } from "lucide-react";

const Catalogue = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/bluescope/products"
        );
        const formattedProducts = response.data.map((item) => ({
          ...item,
          image:
            item.image?.url || item.image || "https://via.placeholder.com/150",
        }));

        const uniqueCategories = [
          ...new Set(formattedProducts.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      (!selectedCategory || product.category === selectedCategory) &&
      (!searchTerm ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const categoryProducts = (category) => {
    return products
      .filter((product) => product.category === category)
      .slice(0, 5);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header with search */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-6">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">
              <span className="inline-block">Bluescope</span>
              <span className="text-indigo-200 ml-2">Collection</span>
            </h1>
            
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 px-4 pl-10 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* Mobile filter button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm w-full"
          >
            <Filter size={18} />
            <span>{isFilterOpen ? "Hide Filters" : "Show Filters"}</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar for Categories */}
          <div className={`md:w-64 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Categories</h2>
              <ul className="space-y-2">
                <li
                  className={`cursor-pointer p-3 rounded-lg transition-all ${
                    !selectedCategory
                      ? "bg-indigo-100 text-indigo-700 font-medium"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  All Products
                </li>
                {categories.map((category) => (
                  <li
                    key={category}
                    className={`cursor-pointer p-3 rounded-lg transition-all ${
                      selectedCategory === category
                        ? "bg-indigo-100 text-indigo-700 font-medium"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm p-4 animate-pulse">
                    <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : selectedCategory ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ staggerChildren: 0.1 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedCategory}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((item) => (
                    <ProductCard key={item._id} item={item} navigate={navigate} />
                  ))}
                </div>
              </motion.div>
            ) : (
              <>
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Collections</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.slice(0, 3).map((category) => (
                      <div
                        key={category}
                        className="relative h-48 rounded-xl overflow-hidden group cursor-pointer"
                        onClick={() => setSelectedCategory(category)}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 z-10"></div>
                        <img
                          src={categoryProducts(category)[0]?.images[0] || "https://via.placeholder.com/400x300"}
                          alt={category}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                          <h3 className="text-xl font-bold text-white mb-1">{category}</h3>
                          <p className="text-gray-200 text-sm mb-3">{categoryProducts(category).length} products</p>
                          <div className="flex items-center text-indigo-300 text-sm font-medium group-hover:text-white transition-colors">
                            <span>Explore Collection</span>
                            <ChevronRight size={16} className="ml-1 group-hover:ml-2 transition-all" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {categories.map((category) => {
                  const categoryProducts = products
                    .filter((product) => product.category === category)
                    .slice(0, 4);
                  
                  return categoryProducts.length > 0 ? (
                    <motion.div
                      key={category}
                      initial="hidden"
                      animate="visible"
                      variants={fadeInUp}
                      className="mb-12"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">{category}</h2>
                        <button
                          className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                          onClick={() => setSelectedCategory(category)}
                        >
                          <span>View All</span>
                          <ChevronRight size={18} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categoryProducts.map((item) => (
                          <ProductCard key={item._id} item={item} navigate={navigate} />
                        ))}
                      </div>
                    </motion.div>
                  ) : null;
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ item, navigate }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300"
      onClick={() => navigate(`/product/${item._id}`)}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => (e.target.src = "https://via.placeholder.com/300x200")}
        />
        <div className="absolute top-3 right-3 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm cursor-pointer hover:bg-indigo-50">
          <ShoppingBag size={18} className="text-indigo-600" />
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-3">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="text-indigo-600 font-bold">
            ${item.price ? item.price.toFixed(2) : "TBD"}
          </div>
          <div className="text-sm text-gray-500">{item.category}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default Catalogue;