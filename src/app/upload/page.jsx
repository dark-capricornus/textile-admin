"use client";

import { useState, useMemo } from "react";
import productsData from "../../../data/productsData.json";
import Pagination from "../../../components/ui/Pagination";
import ProductForm from "../../../components/ProductForm";

export default function UploadProductsPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("Active");
  const [showNewProduct, setShowNewProduct] = useState(false);
  const [products, setProducts] = useState(productsData);
  const itemsPerPage = 15;

  // Filter data based on search, category, and tab
  const filteredData = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch =
        item.product.toLowerCase().includes(search.toLowerCase()) ||
        item.productCode.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesTab = activeTab === "All" || item.status === activeTab;
      return matchesSearch && matchesCategory && matchesTab;
    });
  }, [search, selectedCategory, activeTab, products]);

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
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleNewProduct = (productData) => {
    // Add new product to the list
    const newProduct = {
      id: Math.max(...products.map((p) => p.id)) + 1,
      postedOn: new Date().toLocaleDateString("en-GB"),
      productCode: productData.code,
      category: productData.category,
      subCategory: productData.subCategory,
      product: productData.productName,
      price: productData.price,
      gst: productData.gst,
      status: productData.status,
    };

    setProducts([...products, newProduct]);
    setShowNewProduct(false);

    // Switch to the tab that matches the new product's status
    setActiveTab(productData.status);
  };
  if (showNewProduct) {
    return (
      <ProductForm
        onSubmit={handleNewProduct}
        onCancel={() => setShowNewProduct(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4] p-0">
      <div className="max-w-6xl mx-auto pt-8">
        {/* Header */}{" "}
        <div className="flex justify-between items-center mb-6 px-2">
          <h1 className="text-2xl font-semibold text-[#222] tracking-tight">
            Upload Products
          </h1>
          <div className="flex items-center gap-2">
            <button
              className="bg-[#005226] text-white text-sm font-medium px-3 py-1 rounded hover:bg-[#003b1c] flex items-center gap-1 h-8"
              onClick={() => setShowNewProduct(true)}
            >
              <span className="text-base">+</span>
              New Product
            </button>
          </div>
        </div>
        {/* Card */}
        <div className="bg-white rounded-2xl border border-[#E6F4ED] p-0">
          {/* Tabs and Filters */}
          <div className="flex items-center justify-between px-8 pt-6 pb-2 border-b border-[#E6F4ED]">
            <div className="flex items-center gap-8">
              {["Active", "Inactive", "Out of Stock"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-base font-medium pb-2 border-b-2 transition-colors ${
                    activeTab === tab
                      ? "text-[#005226] border-[#005226]"
                      : "text-gray-400 border-transparent hover:text-[#005226]"
                  }`}
                  style={{ minWidth: 120 }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search....."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-base w-56 pr-8 h-10 bg-[#F8FBF9] focus:outline-none focus:ring-2 focus:ring-[#005226]"
                />
                <svg
                  className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <span className="text-base text-gray-600">Category :</span>
              <select
                className="border border-gray-300 text-base px-3 py-2 rounded-lg bg-white text-gray-700 h-10"
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

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-base">
              {" "}
              <thead className="bg-[#F8FBF9]">
                <tr className="border-b border-[#E6F4ED]">
                  <th className="text-left py-4 px-6 font-medium text-gray-500">
                    Sl. no.
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-gray-500">
                    Posted on
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-gray-500">
                    Product code
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-gray-500">
                    Category
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-gray-500">
                    Sub Category
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-gray-500">
                    Product
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-gray-500">
                    Price
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-gray-500">
                    GST
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-gray-500">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b border-[#F4F4F4] hover:bg-[#F8FBF9]"
                    >
                      <td className="py-4 px-6 text-gray-800">
                        {String(startIndex + index + 1).padStart(2, "0")}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {item.postedOn}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {item.productCode}
                      </td>
                      <td className="py-4 px-6 text-gray-800">
                        {item.category}
                      </td>
                      <td className="py-4 px-6 text-gray-800">
                        {item.subCategory}
                      </td>
                      <td className="py-4 px-6 text-gray-800">
                        {item.product}
                      </td>
                      <td className="py-4 px-6 text-gray-800">{item.price}</td>
                      <td className="py-4 px-6 text-gray-800">{item.gst}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`text-sm font-medium ${
                            item.status === "Active"
                              ? "text-green-600"
                              : item.status === "Inactive"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            className="text-gray-400 hover:text-[#005226] transition-colors"
                            title="View Product"
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
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                          <button
                            className="text-gray-400 hover:text-[#005226] transition-colors"
                            title="Edit Product"
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
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="10"
                      className="py-12 px-6 text-center text-gray-400 text-lg"
                    >
                      No products found matching your search criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-8 pb-6 pt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
