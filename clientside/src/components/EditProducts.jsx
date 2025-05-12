import React, { useState, useEffect } from "react";
import axios from "axios";
import { X, Save, Loader2, ShoppingBag, Check } from "lucide-react";

const EditProducts = ({ product, onClose, onProductUpdated }) => {
  const [editedProduct, setEditedProduct] = useState({
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
  const [existingImages, setExistingImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  // Loading messages array
  const loadingMessages = [
    "Polishing your product details...",
    "Adding that special shine to your inventory...",
    "Preparing your product for the spotlight...",
    "Making your product look its best...",
    "Updating your amazing product...",
    "Refreshing your inventory with style...",
  ];

  // Populate form with existing product data when component mounts
  useEffect(() => {
    if (product) {
      setEditedProduct({
        name: product.name || "",
        description: product.description || "",
        category: product.category || "",
        subcategory: product.subcategory || "",
        price: product.price ? product.price.toString() : "",
        stock: product.stock ? product.stock.toString() : "",
        dimensions: product.dimensions || "",
        material: product.material || "",
        customizable: product.customizable || false,
        turnaround_time: product.turnaround_time || "",
      });
      // Ensure images is an array before setting
      setExistingImages(Array.isArray(product.images) ? product.images : []);
    }
  }, [product]);

  // Cycle through loading messages during submission
  useEffect(() => {
    let messageInterval;
    if (isSubmitting) {
      let index = 0;
      setLoadingMessage(loadingMessages[0]);
      messageInterval = setInterval(() => {
        index = (index + 1) % loadingMessages.length;
        setLoadingMessage(loadingMessages[index]);
      }, 2000);
    }
    return () => clearInterval(messageInterval);
  }, [isSubmitting]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setEditedProduct((prev) => ({
      ...prev,
      images: files,
    }));
  };

  const removeImage = (index, isExisting = false) => {
    if (isExisting) {
      const newExistingImages = [...existingImages];
      newExistingImages.splice(index, 1);
      setExistingImages(newExistingImages);
    } else {
      const newImages = [...(editedProduct.images || [])];
      newImages.splice(index, 1);
      setEditedProduct((prev) => ({ ...prev, images: newImages }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!editedProduct.name || !editedProduct.stock) {
      setError("Name and stock are required.");
      return;
    }

    if (isNaN(editedProduct.price) || editedProduct.price <= 0) {
      setError("Price must be a valid positive number.");
      return;
    }

    if (isNaN(editedProduct.stock) || editedProduct.stock < 0) {
      setError("Stock must be a valid non-negative number.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      Object.keys(editedProduct).forEach((key) => {
        if (key === "images") {
          (editedProduct.images || []).forEach((image) =>
            formData.append("images", image)
          );
        } else {
          formData.append(key, editedProduct[key]);
        }
      });

      // Append existing image URLs
      (existingImages || []).forEach((imageUrl) =>
        formData.append("existingImages", imageUrl)
      );

      // Simulate a longer process to show the loading animation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const res = await axios.put(
        `https://bluescope-eotl.vercel.app/bluescope/products/${product._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setSuccess("Product updated successfully!");

      // Show success for a brief moment before closing
      setTimeout(() => {
        setIsSubmitting(false);
        onProductUpdated();
        onClose();
      }, 1500);
    } catch (err) {
      setIsSubmitting(false);
      setError(err.response?.data?.message || "Something went wrong");
      setSuccess("");
    }
  };

  // Loading overlay
  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-[#0a1929]/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#112240] border border-amber-500/30 p-8 rounded-xl shadow-2xl shadow-amber-500/20 flex flex-col items-center max-w-md w-full">
        <div className="mb-6 relative">
          <div className="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-amber-400/40 opacity-75"></div>
          <ShoppingBag className="relative text-amber-300 animate-bounce h-16 w-16" />
        </div>
        <h3 className="text-xl font-bold text-amber-200 mb-2">
          {success ? "Success!" : loadingMessage}
        </h3>
        {success ? (
          <div className="flex items-center text-amber-300">
            <Check className="mr-2" />
            <span>{success}</span>
          </div>
        ) : (
          <div className="flex items-center mt-2">
            <Loader2 className="animate-spin mr-2 text-amber-400" />
            <span className="text-gray-300">Please wait a moment...</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1929] to-[#112240] py-8 px-4 sm:px-6 lg:px-8">
      {isSubmitting && <LoadingOverlay />}

      <div className="max-w-4xl mx-auto bg-[#0a192f] rounded-lg shadow-lg shadow-amber-600/10 border border-amber-700/30 p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-400 text-transparent bg-clip-text">
            Edit Product
          </h2>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-amber-300 bg-[#112240] hover:bg-[#0a1929] rounded-full p-2 transition-all duration-300 border border-transparent hover:border-amber-500/30"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <p className="text-red-400 bg-red-900/30 border border-red-800/50 p-3 rounded-lg mb-6">
            {error}
          </p>
        )}
        {success && !isSubmitting && (
          <p className="text-green-400 bg-green-900/30 border border-green-800/50 p-3 rounded-lg mb-6">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-amber-300 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editedProduct.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                  className="w-full p-3 bg-[#112240] border border-amber-700/30 text-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editedProduct.description}
                  onChange={handleChange}
                  placeholder="Enter product description"
                  rows="4"
                  className="w-full p-3 bg-[#112240] border border-amber-700/30 text-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-300 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={editedProduct.category}
                  onChange={handleChange}
                  placeholder="Enter category"
                  className="w-full p-3 bg-[#112240] border border-amber-700/30 text-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-300 mb-1">
                  Subcategory
                </label>
                <input
                  type="text"
                  name="subcategory"
                  value={editedProduct.subcategory}
                  onChange={handleChange}
                  placeholder="Enter subcategory"
                  className="w-full p-3 bg-[#112240] border border-amber-700/30 text-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-amber-300 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={editedProduct.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  required
                  className="w-full p-3 bg-[#112240] border border-amber-700/30 text-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-300 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={editedProduct.stock}
                  onChange={handleChange}
                  placeholder="Enter stock"
                  required
                  className="w-full p-3 bg-[#112240] border border-amber-700/30 text-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-300 mb-1">
                  Dimensions
                </label>
                <input
                  type="text"
                  name="dimensions"
                  value={editedProduct.dimensions}
                  onChange={handleChange}
                  placeholder="Enter dimensions"
                  className="w-full p-3 bg-[#112240] border border-amber-700/30 text-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-300 mb-1">
                  Material
                </label>
                <input
                  type="text"
                  name="material"
                  value={editedProduct.material}
                  onChange={handleChange}
                  placeholder="Enter material"
                  className="w-full p-3 bg-[#112240] border border-amber-700/30 text-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="customizable"
                    checked={editedProduct.customizable}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5 text-amber-500 rounded focus:ring-amber-400 focus:ring-offset-[#0a192f]"
                  />
                  <span className="text-sm text-amber-200">Customizable</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-300 mb-1">
                  Turnaround Time
                </label>
                <input
                  type="text"
                  name="turnaround_time"
                  value={editedProduct.turnaround_time}
                  onChange={handleChange}
                  placeholder="Enter turnaround time"
                  className="w-full p-3 bg-[#112240] border border-amber-700/30 text-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="bg-[#0a1929] p-4 rounded-lg border border-amber-700/20">
            <label className="block text-sm font-medium text-amber-300 mb-2">
              Upload Images
            </label>
            <div className="relative group">
              <input
                type="file"
                multiple
                onChange={handleImageUpload}
                className="w-full p-3 bg-[#112240] border border-amber-700/30 text-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-amber-400 file:to-yellow-500 file:text-[#0a192f] file:cursor-pointer hover:file:opacity-90"
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500/20 to-yellow-500/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300"></div>
            </div>

            {/* Existing Images */}
            {existingImages && existingImages.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {existingImages.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="relative group overflow-hidden rounded-lg border border-amber-700/30"
                  >
                    <img
                      src={imageUrl}
                      alt={`Existing ${index}`}
                      className="w-full h-24 object-cover rounded-lg transform group-hover:scale-105 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1929]/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    <button
                      type="button"
                      onClick={() => removeImage(index, true)}
                      className="absolute bottom-2 right-2 bg-red-500/80 text-white p-1 rounded-full hover:bg-red-600 transition-all transform translate-y-8 group-hover:translate-y-0 duration-300"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* New Uploaded Images */}
            {editedProduct.images && editedProduct.images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {editedProduct.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative group overflow-hidden rounded-lg border border-amber-700/30"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Uploaded ${index}`}
                      className="w-full h-24 object-cover rounded-lg transform group-hover:scale-105 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1929]/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute bottom-2 right-2 bg-red-500/80 text-white p-1 rounded-full hover:bg-red-600 transition-all transform translate-y-8 group-hover:translate-y-0 duration-300"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-[#0a1929] font-semibold rounded-lg hover:from-amber-400 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-[#0a192f] transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 group"
            >
              <span className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 opacity-0 group-hover:opacity-30 blur-md transition-all duration-500"></span>
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-5 w-5" />
                  Update Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProducts;
