import React, { useState } from "react";
import { Plus, Package, PenSquare, Trash2 } from "lucide-react";
import AddProducts from "./AddProducts";

const ProductManagement = () => {
  const [isAddMode, setIsAddMode] = useState(false);
  const [message, setMessage] = useState("");

  const [products, setProducts] = useState([
    { id: 1, name: "Sample Product", price: 99.99, stock: 50 },
    { id: 2, name: "Another Product", price: 149.99, stock: 30 },
  ]);

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    showMessage("Product deleted successfully");
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

  // Normal mode content
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <button
          onClick={() => setIsAddMode(true)}
          className="px-4 py-2 rounded-md flex items-center bg-blue-500 text-white hover:bg-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </button>
      </div>

      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {message}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">Price: ${product.price}</p>
                <p className="text-sm text-gray-600">
                  Stock: {product.stock} units
                </p>
              </div>
              <div className="space-x-2">
                <button
                  className="p-2 hover:bg-gray-100 rounded-md"
                  onClick={() => {
                    /* Handle edit */
                  }}
                >
                  <PenSquare className="w-4 h-4" />
                </button>
                <button
                  className="p-2 hover:bg-gray-100 rounded-md"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 className="w-4 h-4" />
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
