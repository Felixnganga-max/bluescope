import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  X,
  Loader2,
  CheckCircle,
  Package,
  ChevronDown,
  ChevronRight,
  Image as ImageIcon,
  AlertCircle,
  Plus,
  Type,
  Bold,
  Heading1,
  Heading2,
  List,
  ListOrdered,
} from "lucide-react";

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

  // Step states
  const [currentStep, setCurrentStep] = useState(1);
  const [stepsCompleted, setStepsCompleted] = useState({
    1: false, // Product Name
    2: false, // Description
    3: false, // Category
    4: false, // Optional details
    5: false, // Images
  });

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
  const [showTextFormatting, setShowTextFormatting] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const descriptionRef = useRef(null);

  // Sweet loading messages for each stage
  const loadingMessages = [
    "Preparing your amazing product...",
    "Packaging your creativity...",
    "Adding a sprinkle of magic...",
    "Almost there! Putting a bow on it...",
    "Success! Your product is ready to shine!",
  ];

  // Clear notifications after delay
  useEffect(() => {
    let timer;
    if (error || success) {
      timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [error, success]);

  // Validate steps and advance
  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (product.name.trim().length > 0) {
          setStepsCompleted((prev) => ({ ...prev, 1: true }));
          return true;
        }
        setError("Please enter a product name");
        return false;
      case 2:
        if (product.description.trim().length > 0) {
          setStepsCompleted((prev) => ({ ...prev, 2: true }));
          return true;
        }
        setError("Please enter a product description");
        return false;
      case 3:
        if (product.category.trim().length > 0) {
          setStepsCompleted((prev) => ({ ...prev, 3: true }));
          return true;
        }
        setError("Please select a product category");
        return false;
      case 4:
        setStepsCompleted((prev) => ({ ...prev, 4: true }));
        return true;
      case 5:
        setStepsCompleted((prev) => ({ ...prev, 5: true }));
        return true;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setError("");
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

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
      images: [...prev.images, ...files],
    }));
  };

  const insertFormatting = (tag) => {
    if (!descriptionRef.current) return;

    const textarea = descriptionRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    let formattedText = "";
    if (tag === "h1") {
      formattedText = `<h1>${selectedText}</h1>`;
    } else if (tag === "h2") {
      formattedText = `<h2>${selectedText}</h2>`;
    } else if (tag === "strong") {
      formattedText = `<strong>${selectedText}</strong>`;
    } else if (tag === "ul") {
      formattedText = `<ul>\n<li>${selectedText}</li>\n</ul>`;
    } else if (tag === "ol") {
      formattedText = `<ol>\n<li>${selectedText}</li>\n</ol>`;
    }

    const newValue =
      textarea.value.substring(0, start) +
      formattedText +
      textarea.value.substring(end);

    setProduct((prev) => ({
      ...prev,
      description: newValue,
    }));

    // Set focus back to textarea after insertion
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + formattedText.length;
      textarea.selectionEnd = start + formattedText.length;
    }, 0);
  };

  const handleExit = () => {
    if (
      window.confirm(
        "Are you sure you want to exit? Any unsaved changes will be lost."
      )
    ) {
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
      setCurrentStep(1);
      setStepsCompleted({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
      });
    }
  };

  const removeImage = (index) => {
    const newImages = [...product.images];
    newImages.splice(index, 1);
    setProduct((prev) => ({ ...prev, images: newImages }));
  };

  const addNewCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setProduct((prev) => ({ ...prev, category: newCategory }));
      setNewCategory("");
      setShowCategories(false);
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
      await new Promise((resolve) => setTimeout(resolve, 800));
      setLoadingStage(1);

      await new Promise((resolve) => setTimeout(resolve, 800));
      setLoadingStage(2);

      const res = await axios.post(
        "https://bluescope-eotl.vercel.app/bluescope/products/create-new",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      await new Promise((resolve) => setTimeout(resolve, 600));
      setLoadingStage(3);

      await new Promise((resolve) => setTimeout(resolve, 600));
      setLoadingStage(4);

      setSuccess("Product added successfully!");
      setError("");

      // Reset form
      setTimeout(() => {
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
        setCurrentStep(1);
        setStepsCompleted({
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
        });
        setLoading(false);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setSuccess("");
      setLoading(false);
    }
  };

  // Render step indicators
  const renderStepIndicator = () => {
    return (
      <div className="w-full py-4">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-1 
                ${
                  currentStep === step
                    ? "bg-gradient-to-br from-amber-500 to-yellow-500 text-white shadow-md"
                    : stepsCompleted[step]
                    ? "bg-gradient-to-br from-green-500 to-emerald-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {stepsCompleted[step] ? "✓" : step}
              </div>
              <span className="text-xs text-gray-500">
                {step === 1
                  ? "Name"
                  : step === 2
                  ? "Description"
                  : step === 3
                  ? "Category"
                  : step === 4
                  ? "Details"
                  : "Images"}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute h-1 w-full bg-gray-200 rounded"></div>
          <div
            className="absolute h-1 rounded transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / 4) * 100}%`,
              background: "linear-gradient(to right, #d4af37, #f2d675)",
            }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1929] to-[#112240] py-8 px-4 sm:px-6 lg:px-8 relative">
      {/* Exit Button */}
      <button
        onClick={handleExit}
        className="absolute top-6 right-6 md:top-10 md:right-10 bg-gradient-to-br from-amber-500 to-yellow-500 text-white p-2 rounded-full hover:shadow-lg transition-all shadow-md z-10 hover:from-amber-600 hover:to-yellow-600"
        aria-label="Exit"
      >
        <X size={24} />
      </button>

      {/* Success/Error Notification */}
      {(error || success) && (
        <div
          className={`fixed top-6 right-6 md:top-10 left-6 md:left-auto md:right-20 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 transform ${
            error || success
              ? "translate-y-0 opacity-100"
              : "-translate-y-10 opacity-0"
          } ${
            error
              ? "bg-red-50 border-l-4 border-red-500"
              : "bg-green-50 border-l-4 border-green-500"
          }`}
        >
          <div className="flex items-center">
            {error ? (
              <AlertCircle
                className="text-red-500 mr-3 flex-shrink-0"
                size={20}
              />
            ) : (
              <CheckCircle
                className="text-green-500 mr-3 flex-shrink-0"
                size={20}
              />
            )}
            <p
              className={`text-sm ${error ? "text-red-700" : "text-green-700"}`}
            >
              {error || success}
            </p>
            <button
              onClick={() => (error ? setError("") : setSuccess(""))}
              className="ml-auto text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-[#0a192f] to-[#112240] rounded-xl p-8 max-w-md w-full shadow-2xl transform transition-all animate-fade-in border border-amber-500/20">
            <div className="text-center">
              {loadingStage < 4 ? (
                <div className="inline-flex items-center justify-center w-24 h-24 mb-6 relative">
                  <div className="absolute inset-0 rounded-full border-4 border-t-amber-500 border-r-amber-400 border-b-yellow-500 border-l-yellow-400 opacity-30"></div>
                  <div className="absolute inset-1 rounded-full border-4 border-t-yellow-500 border-r-amber-500 border-b-yellow-400 border-l-amber-400 animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Package size={24} className="text-amber-300" />
                  </div>
                </div>
              ) : (
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-green-100/10 animate-pulse"></div>
                  <CheckCircle
                    size={72}
                    className="text-green-400 absolute inset-0 m-auto animate-bounce"
                  />
                </div>
              )}

              <h3 className="text-xl font-bold text-amber-100 mb-2">
                {loadingMessages[loadingStage]}
              </h3>

              <div className="w-full bg-gray-700 rounded-full h-2 mb-6 mt-6">
                <div
                  className="h-2 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${(loadingStage + 1) * 20}%`,
                    background: "linear-gradient(to right, #d4af37, #f2d675)",
                  }}
                ></div>
              </div>

              <p className="text-gray-300 text-sm">
                {loadingStage < 4
                  ? "Please wait while we process your product..."
                  : "Your product has been added successfully!"}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-gradient-to-b from-[#0a192f] to-[#112240] rounded-lg shadow-2xl p-6 border border-amber-500/20">
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-useramber-300 via-yellow-400 to-amber-400 text-transparent bg-clip-text">
            <h2 className="text-3xl font-bold">Add Product</h2>
          </div>
          <p className="text-gray-300 mt-2">
            Fill in the details below to add a new product to your catalog
          </p>
        </div>

        {renderStepIndicator()}

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Step 1: Product Name */}
          <div
            className={`transition-all duration-300 ${
              currentStep === 1 ? "opacity-100" : "hidden opacity-0"
            }`}
          >
            <div className="bg-gradient-to-b from-[#0a192f] to-[#112240] p-6 rounded-lg border border-amber-500/20">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-white font-bold mr-3">
                  1
                </div>
                <h3 className="text-xl font-semibold text-amber-200">
                  Product Name
                </h3>
              </div>
              <p className="text-gray-300 mb-4">
                Enter a clear, concise name for your product that customers will
                easily understand.
              </p>
              <div>
                <label className="block text-sm font-medium text-amber-100 mb-1">
                  Product Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                  className="w-full p-3 bg-[#0a192f] border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-white placeholder-gray-500"
                />
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 rounded-lg text-white font-medium flex items-center transition-all bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 shadow-md"
                >
                  Next Step <ChevronRight className="ml-2" size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Step 2: Description */}
          <div
            className={`transition-all duration-300 ${
              currentStep === 2 ? "opacity-100" : "hidden opacity-0"
            }`}
          >
            <div className="bg-gradient-to-b from-[#0a192f] to-[#112240] p-6 rounded-lg border border-amber-500/20">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-white font-bold mr-3">
                  2
                </div>
                <h3 className="text-xl font-semibold text-amber-200">
                  Product Description
                </h3>
              </div>
              <p className="text-gray-300 mb-4">
                Describe your product in detail. You can use formatting options
                to structure your description.
              </p>

              {/* Formatting options */}
              <div className="mb-3">
                <button
                  type="button"
                  onClick={() => setShowTextFormatting(!showTextFormatting)}
                  className="flex items-center text-sm font-medium text-amber-300 hover:text-amber-200"
                >
                  {showTextFormatting ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                  <span className="ml-1">Formatting Options</span>
                </button>

                {showTextFormatting && (
                  <div className="mt-2 p-3 bg-[#112240] rounded-md border border-gray-700">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => insertFormatting("h1")}
                        className="px-3 py-1 text-xs bg-[#0a192f] hover:bg-[#112240] rounded border border-gray-700 text-amber-200 flex items-center"
                      >
                        <Heading1 size={14} className="mr-1" /> Main Heading
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting("h2")}
                        className="px-3 py-1 text-xs bg-[#0a192f] hover:bg-[#112240] rounded border border-gray-700 text-amber-200 flex items-center"
                      >
                        <Heading2 size={14} className="mr-1" /> Sub Heading
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting("strong")}
                        className="px-3 py-1 text-xs bg-[#0a192f] hover:bg-[#112240] rounded border border-gray-700 text-amber-200 flex items-center font-bold"
                      >
                        <Bold size={14} className="mr-1" /> Bold Text
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting("ul")}
                        className="px-3 py-1 text-xs bg-[#0a192f] hover:bg-[#112240] rounded border border-gray-700 text-amber-200 flex items-center"
                      >
                        <List size={14} className="mr-1" /> Bullet List
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting("ol")}
                        className="px-3 py-1 text-xs bg-[#0a192f] hover:bg-[#112240] rounded border border-gray-700 text-amber-200 flex items-center"
                      >
                        <ListOrdered size={14} className="mr-1" /> Numbered List
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-gray-400">
                      Select text and click a formatting option, or use tags
                      directly: &lt;h1&gt;, &lt;h2&gt;, &lt;strong&gt;,
                      &lt;ul&gt;, &lt;ol&gt;
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-100 mb-1">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  ref={descriptionRef}
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  placeholder="Enter product description"
                  rows="6"
                  required
                  className="w-full p-3 bg-[#0a192f] border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-white placeholder-gray-500"
                ></textarea>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 rounded-lg border border-gray-700 text-gray-300 font-medium flex items-center hover:bg-[#112240] transition-all"
                >
                  <ChevronRight
                    className="mr-2 transform rotate-180"
                    size={18}
                  />{" "}
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 rounded-lg text-white font-medium flex items-center transition-all bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 shadow-md"
                >
                  Next Step <ChevronRight className="ml-2" size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Step 3: Category */}
          <div
            className={`transition-all duration-300 ${
              currentStep === 3 ? "opacity-100" : "hidden opacity-0"
            }`}
          >
            <div className="bg-gradient-to-b from-[#0a192f] to-[#112240] p-6 rounded-lg border border-amber-500/20">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-white font-bold mr-3">
                  3
                </div>
                <h3 className="text-xl font-semibold text-amber-200">
                  Product Category
                </h3>
              </div>
              <p className="text-gray-300 mb-4">
                Select a category that best describes your product and add a
                subcategory if needed.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-amber-100 mb-1">
                    Category <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div
                      className="w-full p-3 bg-[#0a192f] border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-white cursor-pointer flex justify-between items-center"
                      onClick={() => setShowCategories(!showCategories)}
                    >
                      <span>{product.category || "Select a Category"}</span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${
                          showCategories ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    {showCategories && (
                      <div className="absolute z-10 mt-1 w-full bg-[#112240] border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
                        <div className="p-2 border-b border-gray-700">
                          <div className="flex">
                            <input
                              type="text"
                              value={newCategory}
                              onChange={(e) => setNewCategory(e.target.value)}
                              placeholder="Add new category"
                              className="flex-1 p-2 bg-[#0a192f] border border-gray-700 rounded-l text-white text-sm"
                            />
                            <button
                              onClick={addNewCategory}
                              className="px-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-r flex items-center"
                            >
                              <Plus size={18} />
                            </button>
                          </div>
                        </div>
                        {categories.map((cat) => (
                          <div
                            key={cat}
                            className={`p-3 hover:bg-[#0a192f] cursor-pointer ${
                              product.category === cat
                                ? "bg-[#0a192f] text-amber-300"
                                : "text-gray-300"
                            }`}
                            onClick={() => {
                              setProduct((prev) => ({
                                ...prev,
                                category: cat,
                              }));
                              setShowCategories(false);
                            }}
                          >
                            {cat}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-100 mb-1">
                    Subcategory (Optional)
                  </label>
                  <input
                    type="text"
                    name="subcategory"
                    value={product.subcategory}
                    onChange={handleChange}
                    placeholder="Enter subcategory"
                    className="w-full p-3 bg-[#0a192f] border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-white placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 rounded-lg border border-gray-700 text-gray-300 font-medium flex items-center hover:bg-[#112240] transition-all"
                >
                  <ChevronRight
                    className="mr-2 transform rotate-180"
                    size={18}
                  />{" "}
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 rounded-lg text-white font-medium flex items-center transition-all bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 shadow-md"
                >
                  Next Step <ChevronRight className="ml-2" size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Step 4: Optional Details */}
          <div
            className={`transition-all duration-300 ${
              currentStep === 4 ? "opacity-100" : "hidden opacity-0"
            }`}
          >
            <div className="bg-gradient-to-b from-[#0a192f] to-[#112240] p-6 rounded-lg border border-amber-500/20">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-white font-bold mr-3">
                  4
                </div>
                <h3 className="text-xl font-semibold text-amber-200">
                  Product Details
                </h3>
              </div>
              <p className="text-gray-300 mb-4">
                Add additional information about your product. These fields are
                optional.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label className="block text-sm font-medium text-amber-100 mb-1">
                    Price (Optional)
                  </label>
                  <input
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    className="w-full p-3 bg-[#0a192f] border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-white placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-100 mb-1">
                    Stock (Optional)
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    placeholder="Enter stock"
                    className="w-full p-3 bg-[#0a192f] border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-white placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-100 mb-1">
                    Dimensions (Optional)
                  </label>
                  <input
                    type="text"
                    name="dimensions"
                    value={product.dimensions}
                    onChange={handleChange}
                    placeholder="Enter dimensions"
                    className="w-full p-3 bg-[#0a192f] border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-white placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-100 mb-1">
                    Material (Optional)
                  </label>
                  <input
                    type="text"
                    name="material"
                    value={product.material}
                    onChange={handleChange}
                    placeholder="Enter material"
                    className="w-full p-3 bg-[#0a192f] border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-white placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-100 mb-1">
                    Turnaround Time (Optional)
                  </label>
                  <input
                    type="text"
                    name="turnaround_time"
                    value={product.turnaround_time}
                    onChange={handleChange}
                    placeholder="Enter turnaround time"
                    className="w-full p-3 bg-[#0a192f] border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-white placeholder-gray-500"
                  />
                </div>

                <div className="flex items-center">
                  <label className="flex items-center space-x-2 cursor-pointer mt-6">
                    <input
                      type="checkbox"
                      name="customizable"
                      checked={product.customizable}
                      onChange={handleChange}
                      className="form-checkbox h-5 w-5 text-amber-500 rounded focus:ring-amber-500 bg-[#0a192f] border-gray-700"
                    />
                    <span className="text-sm text-gray-300">Customizable</span>
                  </label>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 rounded-lg border border-gray-700 text-gray-300 font-medium flex items-center hover:bg-[#112240] transition-all"
                >
                  <ChevronRight
                    className="mr-2 transform rotate-180"
                    size={18}
                  />{" "}
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 rounded-lg text-white font-medium flex items-center transition-all bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 shadow-md"
                >
                  Next Step <ChevronRight className="ml-2" size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Step 5: Image Upload */}
          <div
            className={`transition-all duration-300 ${
              currentStep === 5 ? "opacity-100" : "hidden opacity-0"
            }`}
          >
            <div className="bg-gradient-to-b from-[#0a192f] to-[#112240] p-6 rounded-lg border border-amber-500/20">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-white font-bold mr-3">
                  5
                </div>
                <h3 className="text-xl font-semibold text-amber-200">
                  Product Images
                </h3>
              </div>
              <p className="text-gray-300 mb-4">
                Upload images of your product. High-quality images help
                customers make better decisions.
              </p>

              <div>
                <label className="block text-sm font-medium text-amber-100 mb-1">
                  Upload Images (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-amber-500 transition-all cursor-pointer bg-[#0a192f]">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="space-y-3">
                      <ImageIcon className="h-12 w-12 mx-auto text-gray-500" />
                      <div className="text-gray-300 font-medium">
                        Drag and drop or click to upload
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Preview images */}
              {product.images.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-amber-100 mb-2">
                    Preview Images
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {product.images.map((image, index) => (
                      <div
                        key={index}
                        className="relative rounded-md overflow-hidden h-24 bg-gray-800"
                      >
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-gray-900/80 rounded-full p-1 shadow-md hover:bg-gray-800"
                        >
                          <X size={14} className="text-gray-300" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 rounded-lg border border-gray-700 text-gray-300 font-medium flex items-center hover:bg-[#112240] transition-all"
                >
                  <ChevronRight
                    className="mr-2 transform rotate-180"
                    size={18}
                  />{" "}
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg text-white font-medium flex items-center transition-all bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 shadow-md hover:shadow-lg"
                >
                  Submit Product
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Steps summary */}
        <div className="mt-8 px-4 py-6 bg-[#112240] rounded-lg border border-gray-700">
          <div className="flex items-center mb-3">
            <Package size={20} className="text-amber-400 mr-2" />
            <h3 className="text-md font-semibold text-amber-200">
              Product Summary
            </h3>
          </div>

          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-3 gap-2">
              <span className="text-gray-400">Name:</span>
              <span className="col-span-2 font-medium text-gray-200 truncate">
                {product.name || "Not set"}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-gray-400">Category:</span>
              <span className="col-span-2 font-medium text-gray-200">
                {product.category || "Not set"}
                {product.subcategory && ` > ${product.subcategory}`}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-gray-400">Price:</span>
              <span className="col-span-2 font-medium text-gray-200">
                {product.price || "Not set"}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-gray-400">Images:</span>
              <span className="col-span-2 font-medium text-gray-200">
                {product.images.length > 0
                  ? `${product.images.length} image(s) added`
                  : "No images added"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Support Info */}
      <div className="max-w-4xl mx-auto mt-8 text-center text-gray-400 text-sm">
        <p>
          Need help? Contact support at{" "}
          <a
            href="mailto:support@bluescope.com"
            className="text-amber-400 hover:underline"
          >
            support@bluescope.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default AddProducts;
