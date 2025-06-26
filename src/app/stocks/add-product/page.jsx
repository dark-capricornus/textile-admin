"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    code: "",
    subCategory: "",
    productType: "",
    gst: "",
    category: "",
    productName: "",
    price: "",
    colour: "",
    size: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Product data:", form);
    // Navigate back to stocks page after saving
    router.push("/stocks");
  };

  const handleGoBack = () => {
    router.push("/stocks");
  };

  return (    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header with Go Back button */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg
            className="w-5 h-5"
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
          Go Back
        </button>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-lg font-medium text-gray-800 mb-6">Add Product</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Code</label>
                <input
                  type="text"
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#005226] focus:border-[#005226]"
                  placeholder="254"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sub Category</label>
                <input
                  type="text"
                  name="subCategory"
                  value={form.subCategory}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#005226] focus:border-[#005226]"
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
                    className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#005226] focus:border-[#005226] appearance-none bg-white"
                  >
                    <option value="">Select Product Type</option>
                    <option value="Western Wear">Western Wear</option>
                    <option value="Ethnic Wear">Ethnic Wear</option>
                  </select>
                  <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GST</label>
                <input
                  type="text"
                  name="gst"
                  value={form.gst}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#005226] focus:border-[#005226]"
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
                    className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#005226] focus:border-[#005226] appearance-none bg-white"
                  >
                    <option value="">Select Category</option>
                    <option value="Men">Mens</option>
                    <option value="Women">Womens</option>
                    <option value="Kids">Kids</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                  <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product name</label>
                <input
                  type="text"
                  name="productName"
                  value={form.productName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#005226] focus:border-[#005226]"
                  placeholder="Printed Formal Shirt"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <input
                  type="text"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#005226] focus:border-[#005226]"
                  placeholder="Rs. 1,000"
                />
              </div>
            </div>
          </div>

          {/* Available Colours, Sizes & Quantity Section */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Available Colours, Sizes & Quantity.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Colour */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Colour</label>
                <div className="w-full h-12 border border-gray-300 rounded-md overflow-hidden">
                  <input
                    type="color"
                    name="colour"
                    value={form.colour || "#8B0000"}
                    onChange={handleChange}
                    className="w-full h-full border-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                <input
                  type="text"
                  name="size"
                  value={form.size}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#005226] focus:border-[#005226]"
                  placeholder="S"
                />
              </div>

              {/* Add Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Add Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#005226] focus:border-[#005226]"
                  placeholder="10"
                  min="0"
                />
              </div>

              {/* Upload Image */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                  <button
                    type="button"
                    className="text-[#005226] text-xs hover:underline"
                  >
                    Add More
                  </button>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-[#005226] transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="imageUpload"
                    multiple
                  />
                  <label htmlFor="imageUpload" className="cursor-pointer block">
                    <div className="text-[#005226] text-sm font-medium">Upload Image</div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={handleGoBack}
              className="text-red-500 font-medium hover:text-red-600 px-4 py-2"
            >
              Discard
            </button>
            <button
              type="submit"
              className="bg-[#005226] text-white px-6 py-2 rounded-md hover:bg-[#003b1c] transition-colors font-medium"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
