// src/pages/stocks/StocksPage.jsx
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import stocksData from "../../../data/stocksData.json";
import Pagination from "../../../components/ui/Pagination";

export default function StocksPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Filter data based on search and category
  const filteredData = useMemo(() => {
    return stocksData.filter((item) => {
      const matchesSearch =
        item.product.toLowerCase().includes(search.toLowerCase()) ||
        item.code.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header with all controls in same line */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-800">Stocks</h1>
          <button className="border border-gray-300 text-gray-600 text-sm px-3 py-1 rounded flex items-center gap-2 h-8">
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters
          </button>
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-600">Category :</span>
            <select
              className="border border-gray-300 text-sm px-2 py-1 rounded bg-white text-gray-700 h-8"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search....."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm w-[180px] pr-8 h-8"
            />
            <svg
              className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              /></svg>
          </div>
          <button
            className="bg-[#005226] text-white text-sm font-medium px-3 py-1 rounded hover:bg-[#003b1c] flex items-center gap-1 h-8"
            onClick={() => router.push("/stocks/add-product")}
          >
            <span className="text-base">+</span>
            New Product
          </button>
        </div>
      </div>
      {/* Table */}
      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200">
              <th className="text-left py-2.5 px-4 font-normal text-gray-600 text-sm">
                Sl. no.
              </th>
              <th className="text-left py-2.5 px-4 font-normal text-gray-600 text-sm">
                Product code
              </th>
              <th className="text-left py-2.5 px-4 font-normal text-gray-600 text-sm">
                Category
              </th>
              <th className="text-left py-2.5 px-4 font-normal text-gray-600 text-sm">
                Sub Category
              </th>
              <th className="text-left py-2.5 px-4 font-normal text-gray-600 text-sm">
                Product
              </th>              <th className="text-left py-2.5 px-4 font-normal text-gray-600 text-sm">
                Updated On
              </th><th className="text-left py-2.5 px-4 font-normal text-gray-600 text-sm">
                Available Qty.
              </th>
              <th className="text-left py-2.5 px-4 font-normal text-gray-600 text-sm"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-2.5 px-4 text-gray-800">
                    {String(startIndex + index + 1).padStart(2, "0")}
                  </td>
                  <td className="py-2.5 px-4 text-gray-600">{item.code}</td>
                  <td className="py-2.5 px-4 text-gray-800">{item.category}</td>
                  <td className="py-2.5 px-4 text-gray-800">
                    {item.subCategory}
                  </td>
                  <td className="py-2.5 px-4 text-gray-800">{item.product}</td>
                  <td className="py-2.5 px-4 text-gray-800">
                    {item.updatedOn}
                  </td>
                  <td className="py-2.5 px-4 text-gray-800">{item.qty}</td>
                  <td className="py-2.5 px-4">
                    <button className="text-[#005226] border border-[#005226] px-3 py-1 text-xs rounded hover:bg-[#005226] hover:text-white transition-colors">
                      Add More
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-8 px-4 text-center text-gray-500">
                  No products found matching your search criteria
                </td>              </tr>
            )}
          </tbody></table>
      </div>
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
