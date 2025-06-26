"use client";

import { useState } from "react";

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    productCode: "254",
    category: "Mens",
    subCategory: "Shirt",
    productName: "Printed Formal Shirt",
    productType: "Western Wear",
    price: "Rs. 1,000",
    gst: "10%",
    colour: "#6B0000",
    size: "S",
    quantity: "10",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Uploading product:", formData);
  };

  return (
    <div className="p-8 bg-white rounded-xl shadow-md max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold mb-6 text-gray-700">Add Product</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Product Code */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Product Code</label>
          <input
            name="productCode"
            value={formData.productCode}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* Product Category */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Product Category</label>
          <div className="flex items-center justify-between">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option>Mens</option>
              <option>Womens</option>
              <option>Kids</option>
            </select>
            <span className="text-xs text-[#005226] ml-2 underline cursor-pointer whitespace-nowrap">Add New Category</span>
          </div>
        </div>

        {/* Sub Category */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Sub Category</label>
          <input
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Product name</label>
          <input
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* Product Type */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Product Type</label>
          <div className="flex items-center justify-between">
            <select
              name="productType"
              value={formData.productType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option>Western Wear</option>
              <option>Ethnic Wear</option>
              <option>Formal Wear</option>
            </select>
            <span className="text-xs text-[#005226] ml-2 underline cursor-pointer whitespace-nowrap">Add New Product Type</span>
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Price</label>
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* GST */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">GST</label>
          <input
            name="gst"
            value={formData.gst}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* Available Colours, Sizes, Quantity */}
        <div className="col-span-2 mt-2">
          <p className="font-medium text-sm text-gray-700 mb-2">Available Colours, Sizes & Quantity.</p>
          <div className="grid grid-cols-5 items-end gap-4">
            {/* Colour */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Colour</label>
              <input
                type="color"
                name="colour"
                value={formData.colour}
                onChange={handleChange}
                className="w-full h-10 border border-gray-300 rounded-md"
              />
            </div>
            {/* Size */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Size</label>
              <input
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-2 py-2 text-sm"
              />
            </div>
            {/* Quantity */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Add Quantity</label>
              <input
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-2 py-2 text-sm"
              />
            </div>
            {/* Upload */}
            <div className="col-span-2">
              <button
                type="button"
                className="border border-[#005226] w-full py-2 rounded-md text-sm text-[#005226] hover:bg-[#005226] hover:text-white"
              >
                Upload Image
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="col-span-2 flex justify-end gap-4 mt-6">
          <button
            type="button"
            className="text-red-600 text-sm font-medium hover:underline"
          >
            Discard
          </button>
          <button
            type="submit"
            className="bg-[#005226] text-white text-sm font-medium px-6 py-2 rounded-md hover:bg-[#003d1d]"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}
