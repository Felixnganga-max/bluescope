import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  ShoppingBag,
  ChevronRight,
  X,
  Star,
  Sparkles,
} from "lucide-react";

const Catalogue = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [featuredItems, setFeaturedItems] = useState([]);
  const navigate = useNavigate();

  // Format category name to capitalize first letter
  const formatCategoryName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://bluescope-eotl.vercel.app/bluescope/products/"
        );

        // Format all products and ensure category names are capitalized
        const formattedProducts = response.data.map((item) => ({
          ...item,
          category: formatCategoryName(item.category),
          image:
            item.image?.url || item.image || "https://via.placeholder.com/150",
          images: item.images || [
            item.image?.url || item.image || "https://via.placeholder.com/150",
          ],
        }));

        // Get unique categories and ensure they're capitalized
        const uniqueCategories = [
          ...new Set(formattedProducts.map((product) => product.category)),
        ];

        setCategories(uniqueCategories);
        setProducts(formattedProducts);

        // Set featured items (random selection of 3-6 products)
        const featuredCount = Math.min(
          6,
          Math.floor(formattedProducts.length / 3)
        );
        const randomFeatured = [...formattedProducts]
          .sort(() => 0.5 - Math.random())
          .slice(0, featuredCount);
        setFeaturedItems(randomFeatured);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Memoized filtered products for better performance
  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        (!selectedCategory || product.category === selectedCategory) &&
        (!searchTerm ||
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [products, selectedCategory, searchTerm]);

  // Get products for a specific category, limited to count
  const getCategoryProducts = (category, count = 5) => {
    return products
      .filter((product) => product.category === category)
      .slice(0, count);
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Clear search and filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Header with search */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-4 md:mb-0"
            >
              <span className="inline-block">Bluescope</span>
              <span className="text-indigo-200 ml-2">Collection</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-full md:w-96"
            >
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-3 px-4 pl-12 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                className="absolute left-4 top-3.5 text-gray-500"
                size={20}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* Active filters display */}
        {(searchTerm || selectedCategory) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-4 mb-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Active filters:</span>
              {selectedCategory && (
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="ml-2 text-indigo-500 hover:text-indigo-700"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              {searchTerm && (
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-2 text-purple-500 hover:text-purple-700"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
            </div>
            <button
              onClick={clearFilters}
              className="text-gray-500 hover:text-gray-700 text-sm font-medium"
            >
              Clear all filters
            </button>
          </motion.div>
        )}

        {/* Mobile filter button */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center justify-center space-x-2 bg-white p-4 rounded-xl shadow-sm w-full border border-gray-200 hover:bg-gray-50 transition-all"
          >
            <Filter size={18} className="text-indigo-600" />
            <span className="font-medium">
              {isFilterOpen ? "Hide Filters" : "Show Filters"}
            </span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar for Categories */}
          <AnimatePresence>
            {(isFilterOpen || window.innerWidth >= 768) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="md:w-72 flex-shrink-0"
              >
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8 border border-gray-100">
                  <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
                    <Filter size={20} className="mr-2 text-indigo-600" />
                    Categories
                  </h2>
                  <ul className="space-y-2">
                    <li
                      className={`cursor-pointer p-3 rounded-lg transition-all ${
                        !selectedCategory
                          ? "bg-indigo-100 text-indigo-700 font-medium shadow-sm"
                          : "hover:bg-gray-50"
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
                            ? "bg-indigo-100 text-indigo-700 font-medium shadow-sm"
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content Area */}
          <div className="flex-1">
            {isLoading ? (
              <LoadingSkeletons />
            ) : selectedCategory ? (
              <CategoryView
                category={selectedCategory}
                products={filteredProducts}
                navigate={navigate}
                fadeInUp={fadeInUp}
              />
            ) : (
              <BrowseView
                categories={categories}
                getCategoryProducts={getCategoryProducts}
                setSelectedCategory={setSelectedCategory}
                products={products}
                featuredItems={featuredItems}
                navigate={navigate}
                fadeInUp={fadeInUp}
              />
            )}

            {/* Show when no results */}
            {!isLoading && filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-sm p-8 text-center"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={24} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 mb-4">
                  We couldn't find any products matching your criteria.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading skeletons component
const LoadingSkeletons = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
      <div key={i} className="bg-white rounded-xl shadow-sm p-4 animate-pulse">
        <div className="w-full h-56 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div className="flex justify-between">
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    ))}
  </div>
);

// Category view component
const CategoryView = ({ category, products, navigate, fadeInUp }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={fadeInUp}
    transition={{ staggerChildren: 0.1 }}
  >
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center">
        <span>{category}</span>
        <span className="ml-3 bg-indigo-100 text-indigo-700 text-sm py-1 px-3 rounded-full">
          {products.length} products
        </span>
      </h2>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((item) => (
        <ProductCard key={item._id} item={item} navigate={navigate} />
      ))}
    </div>
  </motion.div>
);

// Browse view with featured items and categories
const BrowseView = ({
  categories,
  getCategoryProducts,
  setSelectedCategory,
  products,
  featuredItems,
  navigate,
  fadeInUp,
}) => (
  <>
    {/* Featured section */}
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="mb-12"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Sparkles size={22} className="mr-2 text-amber-500" />
          Featured Items
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {featuredItems.map((item) => (
          <FeaturedProductCard key={item._id} item={item} navigate={navigate} />
        ))}
      </div>
    </motion.div>

    {/* Collections section */}
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Star size={22} className="mr-2 text-purple-600" />
        Collections
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.slice(0, 3).map((category) => {
          const categoryProds = getCategoryProducts(category, 1);
          return categoryProds.length > 0 ? (
            <div
              key={category}
              className="relative h-56 rounded-xl overflow-hidden group cursor-pointer shadow-sm"
              onClick={() => setSelectedCategory(category)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10"></div>
              <img
                src={
                  categoryProds[0]?.images[0] ||
                  "https://via.placeholder.com/400x300"
                }
                alt={category}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {category}
                </h3>
                <p className="text-gray-200 text-sm mb-3">
                  {products.filter((p) => p.category === category).length}{" "}
                  products
                </p>
                <div className="flex items-center text-indigo-300 text-sm font-medium group-hover:text-white transition-colors">
                  <span>Explore Collection</span>
                  <ChevronRight
                    size={16}
                    className="ml-1 group-hover:ml-2 transition-all"
                  />
                </div>
              </div>
            </div>
          ) : null;
        })}
      </div>
    </div>

    {/* Categories sections */}
    {categories.map((category) => {
      const categoryProducts = getCategoryProducts(category, 4);

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
              className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors"
              onClick={() => setSelectedCategory(category)}
            >
              <span>View All</span>
              <ChevronRight size={18} className="ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((item) => (
              <ProductCard key={item._id} item={item} navigate={navigate} />
            ))}
          </div>
        </motion.div>
      ) : null;
    })}
  </>
);

// Enhanced product card
const ProductCard = ({ item, navigate }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300 border border-gray-100"
      onClick={() => navigate(`/product/${item._id}`)}
    >
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) =>
            (e.target.src = "https://via.placeholder.com/300x200")
          }
        />
        <div className="absolute top-3 right-3 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm cursor-pointer hover:bg-indigo-50 z-10">
          <ShoppingBag size={18} className="text-indigo-600" />
        </div>
        {item.isNew && (
          <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            NEW
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center text-amber-400 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              fill={
                i < Math.round(item.rating || 4.5) ? "currentColor" : "none"
              }
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">
            {item.numReviews || Math.floor(Math.random() * 50) + 10} reviews
          </span>
        </div>
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
          <div className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
            {item.category}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Featured product card with slightly different styling
const FeaturedProductCard = ({ item, navigate }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-white to-indigo-50 rounded-xl shadow-md overflow-hidden group transition-all duration-300 border border-indigo-100"
      onClick={() => navigate(`/product/${item._id}`)}
    >
      <div className="relative h-64 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-indigo-900/20 to-transparent z-10"></div>
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) =>
            (e.target.src = "https://via.placeholder.com/300x200")
          }
        />
        <div className="absolute top-3 right-3 bg-white rounded-full p-3 shadow-md cursor-pointer hover:bg-indigo-50 z-20 group-hover:scale-110 transition-all">
          <ShoppingBag size={20} className="text-indigo-600" />
        </div>
        <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full z-20">
          FEATURED
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-amber-400 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              fill={
                i < Math.round(item.rating || 4.8) ? "currentColor" : "none"
              }
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">
            {item.numReviews || Math.floor(Math.random() * 100) + 50} reviews
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="text-indigo-700 font-bold text-lg">
            ${item.price ? item.price.toFixed(2) : "TBD"}
          </div>
          <div className="text-xs px-3 py-1 bg-indigo-100 rounded-full text-indigo-700 font-medium">
            {item.category}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Catalogue;
