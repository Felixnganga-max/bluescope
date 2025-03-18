import React, { useState } from "react";
import axios from "axios";
import { X, Loader2, CheckCircle, Package } from "lucide-react";

const AddProducts = () => {
  // Comprehensive list of printing and related categories
  const categories = [
    "Stationery",
    "Clothes",
    "Signs",
    "Promotional Items",
    "Gifts",
    "Large Format Printing",
    "Business Cards",
    "Brochures",
    "Banners",
    "Posters",
    "Flyers",
    "Calendars",
    "Notebooks",
    "Packaging",
    "Stickers",
    "Custom Printing",
    "Exhibition Materials",
    "Marketing Collateral",
  ];

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    subcategory: "",
    images: [],
    price: "",
    stock: "",
    dimensions: "",
    material: "",
    customizable: false,
    turnaround_time: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);

  // Sweet loading messages for each stage
  const loadingMessages = [
    "Preparing your amazing product...",
    "Packaging your creativity...",
    "Adding a sprinkle of magic...",
    "Almost there! Putting a bow on it...",
    "Success! Your product is ready to shine!",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProduct((prev) => ({
      ...prev,
      images: files,
    }));
  };

  const handleExit = () => {
    // You can add navigation here if needed
    // For now, we'll just show a confirmation dialog
    if (
      window.confirm(
        "Are you sure you want to exit? Any unsaved changes will be lost."
      )
    ) {
      // Navigate away or reset the form
      setProduct({
        name: "",
        description: "",
        category: "",
        subcategory: "",
        images: [],
        price: "",
        stock: "",
        dimensions: "",
        material: "",
        customizable: false,
        turnaround_time: "",
      });

      // You can add navigation here if needed
      // Example: window.location.href = "/products";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!product.name || !product.description || !product.category) {
      setError("Name, description, and category are required.");
      return;
    }

    try {
      setLoading(true);
      setLoadingStage(0);

      const formData = new FormData();
      Object.keys(product).forEach((key) => {
        if (key === "images") {
          product.images.forEach((image) => formData.append("images", image));
        } else {
          formData.append(key, product[key]);
        }
      });

      // Simulating multistage loading for a better user experience
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoadingStage(1);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoadingStage(2);

      const res = await axios.post(
        "https://bluescope-eotl.vercel.app/products/create-new",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      await new Promise((resolve) => setTimeout(resolve, 800));
      setLoadingStage(3);

      await new Promise((resolve) => setTimeout(resolve, 800));
      setLoadingStage(4);

      setSuccess("Product added successfully!");
      setError("");
      setProduct({
        name: "",
        description: "",
        category: "",
        subcategory: "",
        images: [],
        price: "",
        stock: "",
        dimensions: "",
        material: "",
        customizable: false,
        turnaround_time: "",
      });

      // Reset loading after showing success
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setSuccess("");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 relative">
      {/* Exit Button */}
      <button
        onClick={handleExit}
        className="absolute top-6 right-6 md:top-10 md:right-10 bg-white text-gray-600 p-2 rounded-full hover:bg-gray-200 transition-all shadow-md z-10"
        aria-label="Exit"
      >
        <X size={24} />
      </button>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl transform transition-all animate-fade-in">
            <div className="text-center">
              {loadingStage < 4 ? (
                <div className="inline-flex items-center justify-center w-20 h-20 mb-6 relative">
                  <Loader2 size={48} className="text-blue-600 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Package size={20} className="text-blue-800" />
                  </div>
                </div>
              ) : (
                <CheckCircle
                  size={72}
                  className="text-green-500 mx-auto mb-6 animate-bounce"
                />
              )}

              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {loadingMessages[loadingStage]}
              </h3>

              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6 mt-6">
                <div
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(loadingStage + 1) * 20}%` }}
                ></div>
              </div>

              <p className="text-gray-500 text-sm">
                {loadingStage < 4
                  ? "Please wait while we process your product..."
                  : "Your product has been added successfully!"}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Add Product
        </h2>
        {error && (
          <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-6">{error}</p>
        )}
        {success && (
          <p className="text-green-500 bg-green-100 p-3 rounded-lg mb-6">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  placeholder="Enter product description"
                  rows="4"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="">Select a Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subcategory
                </label>
                <input
                  type="text"
                  name="subcategory"
                  value={product.subcategory}
                  onChange={handleChange}
                  placeholder="Enter subcategory"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  placeholder="Enter stock"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dimensions
                </label>
                <input
                  type="text"
                  name="dimensions"
                  value={product.dimensions}
                  onChange={handleChange}
                  placeholder="Enter dimensions"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Material
                </label>
                <input
                  type="text"
                  name="material"
                  value={product.material}
                  onChange={handleChange}
                  placeholder="Enter material"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="customizable"
                    checked={product.customizable}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Customizable</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Turnaround Time
                </label>
                <input
                  type="text"
                  name="turnaround_time"
                  value={product.turnaround_time}
                  onChange={handleChange}
                  placeholder="Enter turnaround time"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Images
            </label>
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-lg"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    className="w-full h-24 object-cover rounded-lg transform group-hover:scale-105 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = [...product.images];
                      newImages.splice(index, 1);
                      setProduct((prev) => ({ ...prev, images: newImages }));
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-all"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center justify-center ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin mr-2" />
                Processing...
              </>
            ) : (
              "Add Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
