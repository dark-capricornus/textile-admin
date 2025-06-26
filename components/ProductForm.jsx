"use client";

import { useState } from "react";

export default function ProductForm({
  onSubmit,
  onCancel,
  initialData = null,
}) {
  const [form, setForm] = useState({
    code: initialData?.code || "",
    subCategory: initialData?.subCategory || "",
    productType: initialData?.productType || "",
    gst: initialData?.gst || "",
    category: initialData?.category || "",
    productName: initialData?.productName || "",
    price: initialData?.price || "",
    colours: initialData?.colours || [
      { color: "#8B0000", size: "S", quantity: "" },
    ],
    status: initialData?.status || "Active",
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleColorChange = (index, field, value) => {
    const newColours = [...form.colours];
    newColours[index][field] = value;
    setForm({ ...form, colours: newColours });
  };

  const addColorSize = () => {
    setForm({
      ...form,
      colours: [...form.colours, { color: "#8B0000", size: "", quantity: "" }],
    });
  };

  const removeColorSize = (index) => {
    const newColours = form.colours.filter((_, i) => i !== index);
    setForm({ ...form, colours: newColours });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.code || !form.productName || !form.category || !form.price) {
      alert("Please fill in all required fields");
      return;
    }

    // Check if at least one color/size/quantity is complete
    const hasCompleteColorEntry = form.colours.some(
      (item) => item.color && item.size && item.quantity
    );

    if (!hasCompleteColorEntry) {
      alert("Please complete at least one color, size, and quantity entry");
      return;
    }

    // Show confirmation page
    setShowConfirmation(true);
  };

  const handleFinalSubmit = () => {
    // Submit the form
    onSubmit({
      ...form,
      images: selectedImages,
      totalColors: form.colours.length,
      totalImages: selectedImages.length,
    });
    setShowConfirmation(false);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedImages([...selectedImages, ...imageUrls]);
    setShowImageModal(false);
  };

  const removeImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(newImages);
  };
  const ColorPicker = ({ selectedColor, onColorSelect, onClose }) => (
    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg p-4 z-50 w-80">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium">Select Color</span>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>{" "}
      <div className="grid grid-cols-8 gap-2">
        {[
          "#000000",
          "#333333",
          "#666666",
          "#999999",
          "#CCCCCC",
          "#FFFFFF",
          "#FF0000",
          "#FF4500",
          "#FFA500",
          "#FFFF00",
          "#00FF00",
          "#00FFFF",
          "#0000FF",
          "#4B0082",
          "#8B00FF",
          "#FF69B4",
          "#8B4513",
          "#A52A2A",
          "#DC143C",
          "#FF1493",
          "#00CED1",
          "#32CD32",
          "#FFD700",
          "#FF6347",
        ].map((color) => (
          <button
            key={color}
            className={`w-6 h-6 rounded border-2 transition-all ${
              selectedColor === color
                ? "border-gray-600 scale-110"
                : "border-gray-300 hover:border-gray-400"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onColorSelect(color)}
          />
        ))}
      </div>
    </div>
  );
  const ImageUploadModal = () => (
    <div className="fixed inset-0 bg-[#222]/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-xl mx-4 border border-[#E6F4ED]">
        <div className="p-10">
          <div className="flex flex-col items-center">
            <div className="border-2 border-dashed border-[#005226] rounded-xl p-16 w-full max-w-md text-center cursor-pointer transition-colors bg-[#F8FBF9]">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="imageUploadModal"
                multiple
                onChange={handleImageUpload}
              />
              <label
                htmlFor="imageUploadModal"
                className="cursor-pointer block"
              >
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-[#005226] rounded-lg flex items-center justify-center mb-4">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="text-gray-700 text-lg mb-2 font-medium">
                    Drop your images here, or{" "}
                    <span className="text-[#005226] underline cursor-pointer">
                      browse
                    </span>
                  </div>
                  <div className="text-gray-400 text-sm">
                    Upload up to 5 images (JPG, PNG, max 5MB each)
                  </div>
                </div>
              </label>
            </div>
            {/* Show selected images */}
            {selectedImages.length > 0 && (
              <div className="mt-8 w-full max-w-md">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Selected Images ({selectedImages.length})
                </h3>
                <div className="grid grid-cols-5 gap-3">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-full h-20 object-cover rounded border border-[#E6F4ED]"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-10 flex justify-end gap-4 w-full max-w-md">
              <button
                onClick={() => setShowImageModal(false)}
                className="text-gray-600 font-medium hover:text-gray-800 px-6 py-2 rounded-lg border border-gray-300 bg-white"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowImageModal(false)}
                className="bg-[#005226] text-white px-8 py-2 rounded-lg hover:bg-[#003b1c] transition-colors font-medium"
              >
                Add Images
              </button>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
  const ConfirmationPage = () => (
    <div className="min-h-screen bg-[#F4F4F4] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              New Product
            </h1>
            <button
              onClick={() => setShowConfirmation(false)}
              className="flex items-center gap-2 text-[#005226] hover:text-[#003b1c] transition-colors font-medium text-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>
          </div>

          <div className="max-w-3xl">
            <div className="space-y-8">
              {/* Basic Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Product Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="text-gray-600 text-sm font-medium">
                      Product Code
                    </span>
                    <p className="text-gray-900 font-semibold text-xl mt-1">
                      {form.code}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm font-medium">
                      Product Name
                    </span>
                    <p className="text-gray-900 font-medium mt-1">
                      {form.productName}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm font-medium">
                      Category
                    </span>
                    <p className="text-gray-900 font-medium mt-1">
                      {form.category}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm font-medium">
                      Sub Category
                    </span>
                    <p className="text-gray-900 font-medium mt-1">
                      {form.subCategory}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm font-medium">
                      Product Type
                    </span>
                    <p className="text-gray-900 font-medium mt-1">
                      {form.productType}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm font-medium">
                      Price
                    </span>
                    <p className="text-gray-900 font-semibold text-lg mt-1">
                      {form.price}
                    </p>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Product Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="text-gray-600 text-sm font-medium block mb-3">
                      Available Colors
                    </span>
                    <div className="flex gap-2">
                      {form.colours.map((item, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-md border-2 border-white shadow-md"
                          style={{ backgroundColor: item.color }}
                          title={item.color}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm font-medium block mb-3">
                      Available Sizes
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {form.colours
                        .map((c) => c.size)
                        .filter((s) => s)
                        .map((size, index) => (
                          <span
                            key={index}
                            className="bg-white px-3 py-1 rounded-md text-sm font-medium border"
                          >
                            {size}
                          </span>
                        ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm font-medium block mb-3">
                      GST
                    </span>
                    <p className="text-gray-900 font-medium">{form.gst}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm font-medium block mb-3">
                      Status
                    </span>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          form.status === "Active"
                            ? "bg-green-500"
                            : form.status === "Inactive"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      <span
                        className={`font-medium text-sm ${
                          form.status === "Active"
                            ? "text-green-600"
                            : form.status === "Inactive"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {form.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Images */}
              {selectedImages.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Product Images ({selectedImages.length})
                  </h2>
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                    {selectedImages.slice(0, 12).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg border shadow-sm"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
            <button
              onClick={handleFinalSubmit}
              className="bg-[#005226] text-white px-8 py-3 rounded-lg hover:bg-[#003b1c] transition-colors font-medium"
            >
              Upload Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (showConfirmation) {
    return <ConfirmationPage />;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Code
              </label>
              <input
                type="text"
                name="code"
                value={form.code}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#005226] focus:border-[#005226]"
                placeholder="254"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sub Category
              </label>
              <input
                type="text"
                name="subCategory"
                value={form.subCategory}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#005226] focus:border-[#005226]"
                placeholder="Shirt"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Type{" "}
                <span className="text-[#005226] text-xs ml-2 cursor-pointer hover:underline">
                  Add New Product Type
                </span>
              </label>
              <div className="relative">
                <select
                  name="productType"
                  value={form.productType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#005226] focus:border-[#005226] appearance-none bg-white"
                >
                  <option value="">Select Product Type</option>
                  <option value="Western Wear">Western Wear</option>
                  <option value="Ethnic Wear">Ethnic Wear</option>
                </select>
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GST
              </label>
              <input
                type="text"
                name="gst"
                value={form.gst}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#005226] focus:border-[#005226]"
                placeholder="10%"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Category{" "}
                <span className="text-[#005226] text-xs ml-2 cursor-pointer hover:underline">
                  Add New Category
                </span>
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#005226] focus:border-[#005226] appearance-none bg-white"
                >
                  <option value="">Select Category</option>
                  <option value="Mens">Mens</option>
                  <option value="Womens">Womens</option>
                  <option value="Kids">Kids</option>
                  <option value="Accessories">Accessories</option>
                </select>
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product name
              </label>
              <input
                type="text"
                name="productName"
                value={form.productName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#005226] focus:border-[#005226]"
                placeholder="Printed Formal Shirt"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                type="text"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#005226] focus:border-[#005226]"
                placeholder="Rs. 1,000"
              />
            </div>
          </div>
        </div>

        {/* Available Colours, Sizes & Quantity Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-700">
              Available Colours, Sizes & Quantity.
            </h3>
            <button
              type="button"
              onClick={addColorSize}
              className="text-[#005226] text-sm hover:underline"
            >
              Add More
            </button>
          </div>

          {form.colours.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 items-end"
            >
              {/* Colour */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Colour
                </label>
                <div className="relative">
                  {" "}
                  <div
                    className="w-full h-12 border border-gray-300 rounded-md cursor-pointer"
                    style={{ backgroundColor: item.color }}
                    onClick={() =>
                      setShowColorPicker(
                        showColorPicker === index ? null : index
                      )
                    }
                  ></div>
                  {showColorPicker === index && (
                    <ColorPicker
                      selectedColor={item.color}
                      onColorSelect={(color) =>
                        handleColorChange(index, "color", color)
                      }
                      onClose={() => setShowColorPicker(null)}
                    />
                  )}
                </div>
              </div>
              {/* Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size
                </label>
                <div className="relative">
                  {" "}
                  <select
                    value={item.size}
                    onChange={(e) =>
                      handleColorChange(index, "size", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#005226] focus:border-[#005226] appearance-none bg-white"
                  >
                    <option value="">Select Size</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                    <option value="XXXL">XXXL</option>
                    <option value="Free Size">Free Size</option>
                  </select>
                  <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleColorChange(index, "quantity", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#005226] focus:border-[#005226]"
                  placeholder="10"
                  min="0"
                />
              </div>{" "}
              {/* Images */}
              <div>
                {index === 0 && (
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Images ({selectedImages.length}/5)
                  </label>
                )}
                <div className="flex gap-2 flex-wrap">
                  {selectedImages.slice(0, 5).map((image, imgIndex) => (
                    <div key={imgIndex} className="relative">
                      <img
                        src={image}
                        alt={`Product ${imgIndex + 1}`}
                        className="w-12 h-12 object-cover rounded border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(imgIndex)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {selectedImages.length < 5 && (
                    <button
                      type="button"
                      onClick={() => setShowImageModal(true)}
                      className="w-12 h-12 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 hover:border-[#005226] hover:text-[#005226] transition-colors text-lg"
                    >
                      +
                    </button>
                  )}
                </div>
              </div>
              {/* Delete Button */}
              <div className="flex items-end">
                {form.colours.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeColorSize(index)}
                    className="text-red-500 text-sm hover:underline mb-2"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Upload Images Button */}
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setShowImageModal(true)}
              className="border-2 border-dashed border-gray-300 rounded-md px-4 py-2 text-sm text-[#005226] hover:border-[#005226] transition-colors"
            >
              Upload Image
            </button>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="text-red-500 font-medium hover:text-red-600 px-4 py-2"
          >
            Discard
          </button>
          <button
            type="submit"
            className="bg-[#005226] text-white px-6 py-2 rounded-md hover:bg-[#003b1c] transition-colors font-medium"
          >
            Continue
          </button>
        </div>
      </form>

      {showImageModal && <ImageUploadModal />}
    </>
  );
}
