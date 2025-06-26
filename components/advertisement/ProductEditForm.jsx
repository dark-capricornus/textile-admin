"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";

export default function ProductEditForm({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    productNo: product?.productNo || "",
    category: product?.category || "Mens",
    heading: product?.heading || "",
    content: product?.content || "",
    images: product?.images || []
  });

  const [uploadedImages, setUploadedImages] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // In a real app, you'd upload these to a server
    const newImages = files.map((file, index) => ({
      id: `${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    setUploadedImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (imageId) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...product,
      ...formData,
      images: uploadedImages
    };
    onSave(updatedProduct);
  };

  const handleDiscard = () => {
    setFormData({
      productNo: product?.productNo || "",
      category: product?.category || "Mens",
      heading: product?.heading || "",
      content: product?.content || "",
      images: product?.images || []
    });
    setUploadedImages([]);
    onCancel();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Number */}
        <div>
          <label className="block text-base font-medium text-[#005226] mb-2">
            Product No. : {formData.productNo}
          </label>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Product Category */}
            <div>
              <label className="block text-base font-medium text-[#005226] mb-3">
                Product Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-[#005226] focus:border-[#005226] appearance-none"
                >
                  <option value="Mens">Mens</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                  <option value="Others">Others</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Heading */}
            <div>
              <label className="block text-base font-medium text-[#005226] mb-3">
                Heading
              </label>
              <input
                type="text"
                name="heading"
                value={formData.heading}
                onChange={handleInputChange}
                placeholder="Relaxed Fit Hoodie"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-[#005226] focus:border-[#005226]"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-base font-medium text-[#005226] mb-3">
                Content
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Sit Cras Duis Ac Fermentum At Urna, Dictumst Ultricies Tortor. Adipiscing Sed Urna, Neque Posuere Aliquam Porttitor At."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-[#005226] focus:border-[#005226] resize-none"
              />
            </div>
          </div>

          {/* Right Column */}
          <div>
            <label className="block text-base font-medium text-[#005226] mb-3">
              Product Images
            </label>
            
            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#005226] transition-colors">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <p className="text-[#005226] font-medium underline">Upload Image</p>
              </label>
            </div>

            {/* Uploaded Images */}
            {uploadedImages.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-gray-700">Uploaded Images:</p>
                <div className="space-y-2">
                  {uploadedImages.map((image) => (
                    <div key={image.id} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                      <span className="text-sm text-gray-700 truncate">{image.name}</span>
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={handleDiscard}
            className="px-6 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            Discard
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#005226] text-white rounded-lg hover:bg-[#003917] transition-colors"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}
