import React, { useEffect, useState } from "react";
import { Plus, Package, PenSquare, Trash2, Image, X } from "lucide-react";
import AddProducts from "./AddProducts";
import EditProducts from "./EditProducts";
import toast, { Toaster } from "react-hot-toast";

const API_URL = "https://bluescope-k9yt.vercel.app/bluescope/products";

const ProductManagement = () => {
  const [isAddMode, setIsAddMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch products from API
  const fetchProducts = () => {
    setIsLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products", {
          position: "top-center",
        });
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = (id) => {
    // Confirm deletion
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Delete failed");
        }
        setProducts(products.filter((product) => product._id !== id));
        toast.success("Product deleted successfully", {
          position: "top-center",
        });
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product", {
          position: "top-center",
        });
      });
  };

  // Edit product handler
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditMode(true);
  };

  // Close edit modal and reset state
  const handleCloseEdit = () => {
    setIsEditMode(false);
    setSelectedProduct(null);
  };

  // Luxury Loading Animation Component
  const LuxuryLoader = () => {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="relative w-64 h-64">
          {/* Background radial gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-full opacity-90"></div>

          {/* Outer rotating ring - gold accent */}
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-400 border-r-amber-500 animate-spin"
            style={{ animationDuration: "3s" }}
          ></div>

          {/* Middle rotating ring - reverse */}
          <div
            className="absolute inset-4 rounded-full border-4 border-transparent border-b-gray-600 border-l-gray-700 animate-spin"
            style={{ animationDuration: "5s", animationDirection: "reverse" }}
          ></div>

          {/* Inner rotating ring - gold accent */}
          <div
            className="absolute inset-8 rounded-full border-4 border-transparent border-t-amber-300 animate-spin opacity-80"
            style={{ animationDuration: "2s" }}
          ></div>

          {/* Center static circle with pulsing effect */}
          <div
            className="absolute inset-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center animate-pulse"
            style={{ animationDuration: "2s" }}
          >
            <Package
              className="text-amber-400 w-12 h-12 animate-bounce"
              style={{ animationDuration: "2.5s" }}
            />
          </div>

          {/* Decorative particles - gold flecks */}
          <div
            className="absolute top-0 left-1/4 w-2 h-2 bg-amber-300 rounded-full animate-ping"
            style={{ animationDuration: "1.5s" }}
          ></div>
          <div
            className="absolute bottom-4 right-8 w-3 h-3 bg-amber-400 rounded-full animate-ping"
            style={{ animationDuration: "2.7s" }}
          ></div>
          <div
            className="absolute top-12 right-4 w-2 h-2 bg-amber-200 rounded-full animate-ping"
            style={{ animationDuration: "1.8s" }}
          ></div>
          <div
            className="absolute bottom-12 left-5 w-1 h-1 bg-amber-500 rounded-full animate-ping"
            style={{ animationDuration: "1.2s" }}
          ></div>

          {/* Orbiting circle - large */}
          <div
            className="absolute top-8 left-8 w-48 h-48 animate-orbit"
            style={{ animationDuration: "10s" }}
          >
            <div className="absolute -left-1 -top-1 w-2 h-2 bg-amber-400 rounded-full shadow-lg shadow-amber-200"></div>
          </div>

          {/* Orbiting circle - medium */}
          <div
            className="absolute top-16 left-16 w-32 h-32 animate-orbit"
            style={{ animationDuration: "7s", animationDirection: "reverse" }}
          >
            <div className="absolute -left-1 -top-1 w-2 h-2 bg-amber-300 rounded-full shadow-lg shadow-amber-200"></div>
          </div>

          {/* Orbiting circle - small */}
          <div
            className="absolute top-24 left-24 w-16 h-16 animate-orbit"
            style={{ animationDuration: "4s" }}
          >
            <div className="absolute -left-1 -top-1 w-2 h-2 bg-amber-200 rounded-full shadow-lg shadow-amber-100"></div>
          </div>
        </div>

        {/* Text below the loader */}
        <div className="absolute mt-64 text-center">
          <p className="text-gray-300 font-medium tracking-wider animate-pulse">
            LOADING PRODUCTS
          </p>
          <div className="flex justify-center space-x-2 mt-2">
            <div
              className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  // Render add product mode
  if (isAddMode) {
    return (
      <AddProducts
        onClose={() => setIsAddMode(false)}
        onProductAdded={fetchProducts}
      />
    );
  }

  // Render edit product mode
  if (isEditMode && selectedProduct) {
    return (
      <EditProducts
        product={selectedProduct}
        onClose={handleCloseEdit}
        onProductUpdated={fetchProducts}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Toast notifications */}
      <Toaster />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Package className="text-blue-600" size={32} />
          Product Management
        </h2>
        <button
          onClick={() => setIsAddMode(true)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          <Plus className="mr-2" size={20} />
          Add Product
        </button>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <LuxuryLoader />
      ) : products.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Image className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-xl text-gray-600">No products found</p>
          <p className="text-gray-500 mt-2">
            Click "Add Product" to get started
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <Image className="text-gray-400" size={48} />
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 truncate max-w-[200px]">
                      {product.name}
                    </h3>
                    <div className="text-sm text-gray-600 space-y-1 mt-1">
                      <p>
                        Price: $
                        {typeof product.price === "number"
                          ? product.price.toFixed(2)
                          : "N/A"}
                      </p>
                      <p>
                        Stock:{" "}
                        {product.stock ? product.stock.toFixed(0) : "N/A"} units
                      </p>
                      {product.category && <p>Category: {product.category}</p>}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                      title="Edit Product"
                    >
                      <PenSquare className="w-5 h-5 text-gray-600 hover:text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="p-2 bg-gray-100 hover:bg-red-100 rounded-md transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-5 h-5 text-gray-600 hover:text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Add custom animation keyframe for orbiting effect
// You'll need to add this to your global CSS or use a CSS-in-JS solution
// @keyframes orbit {
//   0% { transform: rotate(0deg) translateX(0) rotate(0deg); }
//   100% { transform: rotate(360deg) translateX(0) rotate(-360deg); }
// }

export default ProductManagement;
