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
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
        </div>
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

export default ProductManagement;
