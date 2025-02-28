import React, { useEffect, useState } from "react";
import { Plus, Package, PenSquare, Trash2 } from "lucide-react";
import AddProducts from "./AddProducts";
import toast, { Toaster } from "react-hot-toast";

const API_URL = "http://localhost:3000/bluescope/products";

const ProductManagement = () => {
  const [isAddMode, setIsAddMode] = useState(false);
  const [products, setProducts] = useState([]);

  // Fetch products from API
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Delete product
  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
        toast.success("Product deleted successfully", {
          position: "top-center",
        });
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  // Add mode content
  if (isAddMode) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-white z-50 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add New Product</h2>
          <button
            onClick={() => setIsAddMode(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <AddProducts isOpen={true} onClose={() => setIsAddMode(false)} />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Toast notifications */}
      <Toaster />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Package size={24} /> Product Management
        </h2>
        <button
          onClick={() => setIsAddMode(true)}
          className="px-4 py-2 rounded-md flex items-center bg-blue-500 text-white hover:bg-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm">
            {/* Show first image if available */}
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                No Image
              </div>
            )}

            <div className="flex justify-between items-start mt-2">
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">Price: ${product.price}</p>
                <p className="text-sm text-gray-600">
                  Stock: {product.stock} units
                </p>
              </div>
              <div className="space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-md">
                  <PenSquare className="w-4 h-4" />
                </button>
                <button
                  className="p-2 hover:bg-gray-100 rounded-md"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
