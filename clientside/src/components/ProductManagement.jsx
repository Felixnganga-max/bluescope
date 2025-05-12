import React, { useEffect, useState } from "react";
import {
  Plus,
  Package,
  PenSquare,
  Trash2,
  Image,
  X,
  Sparkles,
} from "lucide-react";
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
          style: {
            background: "#0a1929",
            color: "#f0d082",
            border: "1px solid #c8a951",
          },
          iconTheme: {
            primary: "#d4af37",
            secondary: "#0a1929",
          },
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
          style: {
            background: "#0a1929",
            color: "#f0d082",
            border: "1px solid #c8a951",
          },
          iconTheme: {
            primary: "#d4af37",
            secondary: "#0a1929",
          },
        });
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product", {
          position: "top-center",
          style: {
            background: "#0a1929",
            color: "#f0d082",
            border: "1px solid #c8a951",
          },
          iconTheme: {
            primary: "#d4af37",
            secondary: "#0a1929",
          },
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
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 rounded-full opacity-90"></div>

          {/* Outer rotating ring - gold accent */}
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-400 border-r-amber-500 animate-spin"
            style={{ animationDuration: "3s" }}
          ></div>

          {/* Middle rotating ring - reverse */}
          <div
            className="absolute inset-4 rounded-full border-4 border-transparent border-b-amber-700 border-l-amber-800 animate-spin"
            style={{ animationDuration: "5s", animationDirection: "reverse" }}
          ></div>

          {/* Inner rotating ring - gold accent */}
          <div
            className="absolute inset-8 rounded-full border-4 border-transparent border-t-amber-300 animate-spin opacity-80"
            style={{ animationDuration: "2s" }}
          ></div>

          {/* Center static circle with pulsing effect */}
          <div
            className="absolute inset-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center animate-pulse"
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
          <p className="text-amber-300 font-medium tracking-wider animate-pulse">
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

  // Custom animations
  const customAnimations = `
    @keyframes gradientAnimation {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes shimmer {
      0% { opacity: 0.5; }
      50% { opacity: 1; }
      100% { opacity: 0.5; }
    }
    
    @keyframes orbit {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .card-hover-effect:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(212, 175, 55, 0.2);
    }
    
    .product-header {
      background: linear-gradient(135deg, #0a1929 0%, #112240 50%, #0a192f 100%);
      background-size: 200% 200%;
      animation: gradientAnimation 15s ease infinite;
      box-shadow: 0 5px 15px rgba(10, 25, 47, 0.3);
    }
    
    .gold-accent {
      background: linear-gradient(90deg, #c8a951, #f0d082, #d4af37);
      background-size: 200% auto;
      animation: shimmer 3s infinite;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      text-shadow: 0px 0px 10px rgba(212, 175, 55, 0.3);
    }
  `;

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Custom CSS Animations */}
      <style jsx>{customAnimations}</style>

      {/* Toast notifications */}
      <Toaster />

      <div className="container mx-auto pl-[18%] py-8 space-y-6">
        {/* Header */}
        <div className="product-header flex justify-between items-center mb-6 p-6 rounded-xl">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Package className="text-amber-400" size={32} />
            <span className="gold-accent">Product Management</span>
          </h2>
          <button
            onClick={() => setIsAddMode(true)}
            className="flex items-center bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 px-6 py-3 rounded-lg hover:from-amber-500 hover:to-amber-700 transition-all shadow-lg shadow-amber-600/20"
          >
            <Plus className="mr-2" size={20} />
            <span className="font-semibold">Add Product</span>
          </button>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <LuxuryLoader />
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-slate-800/50 rounded-xl border border-amber-900/30 backdrop-blur-sm">
            <Package className="mx-auto mb-4 text-amber-400" size={64} />
            <p className="text-2xl text-amber-200 font-medium">
              No products found
            </p>
            <p className="text-amber-300/70 mt-2">
              Click "Add Product" to get started
            </p>
            <div className="mt-6">
              <button
                onClick={() => setIsAddMode(true)}
                className="flex items-center mx-auto bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 px-6 py-3 rounded-lg hover:from-amber-500 hover:to-amber-700 transition-all shadow-lg"
              >
                <Plus className="mr-2" size={20} />
                <span className="font-semibold">Add Your First Product</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-slate-800/70 border border-amber-900/30 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 card-hover-effect backdrop-blur-sm"
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
                    <div className="w-full h-full bg-slate-700/80 flex items-center justify-center">
                      <Package className="text-amber-400" size={48} />
                    </div>
                  )}

                  {/* Product tag */}
                  <div className="absolute top-3 right-3 bg-amber-500/90 text-slate-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    {product.category || "Product"}
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-xl text-amber-200 truncate max-w-[200px]">
                        {product.name}
                      </h3>
                      <div className="space-y-2 mt-3">
                        <p className="flex items-center text-amber-300">
                          <span className="inline-block w-20 text-amber-400/80">
                            Price:
                          </span>
                          <span className="font-semibold">
                            Ksh -
                            {typeof product.price === "number"
                              ? product.price.toFixed(2)
                              : "N/A"}
                          </span>
                        </p>
                        <p className="flex items-center text-amber-300">
                          <span className="inline-block w-20 text-amber-400/80">
                            Stock:
                          </span>
                          <span className="font-semibold">
                            {product.stock ? product.stock.toFixed(0) : "N/A"}{" "}
                            units
                          </span>
                        </p>
                        {product.category && (
                          <p className="flex items-center text-amber-300">
                            <span className="inline-block w-20 text-amber-400/80">
                              Category:
                            </span>
                            <span className="font-semibold">
                              {product.category}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex mt-4 space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-amber-300 font-medium flex items-center justify-center"
                      title="Edit Product"
                    >
                      <PenSquare className="w-5 h-5 mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex-1 py-2 bg-slate-700 hover:bg-red-900/50 rounded-lg transition-colors text-amber-300 hover:text-red-300 font-medium flex items-center justify-center"
                      title="Delete Product"
                    >
                      <Trash2 className="w-5 h-5 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;
