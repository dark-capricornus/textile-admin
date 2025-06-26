"use client";

import { useState, useEffect } from "react";

export default function AddExpenseForm({ onSave, onDiscard }) {
  const [formData, setFormData] = useState({
    date: "2023-11-15",
    category: "Electricity",
    subCategory: "Lorem ipsum dolor",
    amount: "13000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dictum erat ac risus imperdiet",
    status: "Paid",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = (status) => {
    setFormData((prev) => ({
      ...prev,
      status,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleDiscard = () => {
    onDiscard();
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onDiscard();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onDiscard]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onDiscard();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl border border-gray-200 w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 shadow-md">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white rounded-lg"
        >
          <div className="grid grid-cols-2 gap-4">
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>

            {/* Sub Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sub Category
              </label>
              <input
                type="text"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <input
                type="text"
                name="amount"
                value={`₹ ${parseInt(formData.amount).toLocaleString()}`}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^\d]/g, "");
                  setFormData((prev) => ({
                    ...prev,
                    amount: raw,
                  }));
                }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none"
            />
          </div>

          {/* Status - label and radio options inline */}
          <div className="flex items-center gap-[64px]">
            <label className="text-sm font-medium text-gray-700 min-w-[60px]">
              Status
            </label>
            <div className="flex items-center gap-[64px]">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="Paid"
                  checked={formData.status === "Paid"}
                  onChange={() => handleStatusChange("Paid")}
                  className="w-4 h-4 accent-green-600"
                />
                <span className="ml-2 text-sm text-green-600 font-medium">
                  Paid
                </span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="Unpaid"
                  checked={formData.status === "Unpaid"}
                  onChange={() => handleStatusChange("Unpaid")}
                  className="w-4 h-4 accent-red-600"
                />
                <span className="ml-2 text-sm text-red-600 font-medium">
                  Unpaid
                </span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-3 border-t border-gray-200">
            <button
              type="button"
              onClick={handleDiscard}
              className="border border-[#005226] text-[#005226] px-6 py-2 rounded-lg hover:bg-[#005226] hover:text-white transition-colors text-sm font-medium"
            >
              Discard
            </button>
            <button
              type="submit"
              className="bg-[#005226] text-white px-6 py-2 rounded-lg hover:bg-[#003917] transition-colors text-sm font-medium"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
