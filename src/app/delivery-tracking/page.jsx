"use client";

import { useState } from "react";
import deliveryData from "../../../data/deliveryData.json";
import Pagination from "../../../components/ui/Pagination";

export default function DeliveryTrackingPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [editingTrack, setEditingTrack] = useState(null);
  const [trackData, setTrackData] = useState({
    trackNumber: "",
    deliveryPartner: "",
    trackLink: "",
  });
  const itemsPerPage = 15;

  // Filter data based on search
  const filteredData = deliveryData.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLower) ||
      item.invoiceNumber.toLowerCase().includes(searchLower) ||
      item.location.toLowerCase().includes(searchLower) ||
      item.trackingId.toLowerCase().includes(searchLower)
    );
  });

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

  const handleTrackClick = (delivery) => {
    setSelectedDelivery(delivery);
    setEditingTrack(delivery);
    setTrackData({
      trackNumber: delivery.trackingId,
      deliveryPartner: "Professional Couriers",
      trackLink: "https://trackcourier.io/track-and-trace/professi.....",
    });
  };

  const handleSaveTrack = () => {
    // Here you would typically save the tracking data to your backend
    console.log("Saving track data:", trackData);
    setEditingTrack(null);
    setSelectedDelivery(null);
  };

  const handleDiscardTrack = () => {
    setEditingTrack(null);
    setSelectedDelivery(null);
    setTrackData({
      trackNumber: "",
      deliveryPartner: "",
      trackLink: "",
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {" "}
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Delivery Tracking
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="border border-gray-300 text-gray-600 text-sm px-3 py-1 rounded flex items-center gap-2 h-8">
            <span>Today</span>
          </button>
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </button>
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
              />
            </svg>
          </div>
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
                Date
              </th>
              <th className="text-left py-2.5 px-4 font-normal text-gray-600 text-sm">
                Invoice number
              </th>
              <th className="text-left py-2.5 px-4 font-normal text-gray-600 text-sm">
                Name
              </th>
              <th className="text-left py-2.5 px-4 font-normal text-gray-600 text-sm">
                Location
              </th>
              <th className="text-left py-2.5 px-4 font-normal text-gray-600 text-sm">
                Contact Number
              </th>
              <th className="text-left py-2.5 px-4 font-normal text-gray-600 text-sm">
                Products
              </th>
              <th className="text-left py-2.5 px-4 font-normal text-gray-600 text-sm">
                Price
              </th>
              <th className="text-left py-2.5 px-4 font-normal text-gray-600 text-sm">
                Tracking ID
              </th>
            </tr>{" "}
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
                  <td className="py-2.5 px-4 text-gray-600">{item.date}</td>
                  <td className="py-2.5 px-4 text-gray-600">
                    {item.invoiceNumber}
                  </td>{" "}
                  <td className="py-2.5 px-4 text-gray-800">{item.name}</td>
                  <td className="py-2.5 px-4 text-gray-800">{item.location}</td>
                  <td className="py-2.5 px-4 text-gray-800">
                    {item.contactNumber}
                  </td>
                  <td className="py-2.5 px-4 text-gray-800">{item.products}</td>
                  <td className="py-2.5 px-4 text-gray-800">{item.price}</td>
                  <td className="py-2.5 px-4">
                    <button
                      onClick={() => handleTrackClick(item)}
                      className={`text-sm hover:underline ${
                        item.trackingId === "Enter Track Id"
                          ? "text-[#005226]"
                          : "text-gray-800"
                      }`}
                    >
                      {item.trackingId}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="py-8 px-4 text-center text-gray-500">
                  No delivery records found matching your search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}{" "}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {/* Track Edit Modal */}
      {editingTrack && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-gray-800">
                    Invoice Number: {editingTrack.invoiceNumber}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Customer Name: {editingTrack.name}
                  </p>
                </div>
              </div>
            </div>{" "}
            {/* Modal Body */}
            <div className="px-6 py-6">
              <div className="space-y-4">
                {/* Top Row - Track Number and Delivery Partner */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Track Number
                    </label>
                    <input
                      type="text"
                      value={trackData.trackNumber}
                      onChange={(e) =>
                        setTrackData({
                          ...trackData,
                          trackNumber: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#005226] focus:border-[#005226]"
                      placeholder="BLR515063421"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Partner
                    </label>
                    <input
                      type="text"
                      value={trackData.deliveryPartner}
                      onChange={(e) =>
                        setTrackData({
                          ...trackData,
                          deliveryPartner: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#005226] focus:border-[#005226]"
                      placeholder="Professional Couriers"
                    />
                  </div>
                </div>

                {/* Bottom Row - Track Link (Full Width) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Track link
                  </label>
                  <input
                    type="text"
                    value={trackData.trackLink}
                    onChange={(e) =>
                      setTrackData({ ...trackData, trackLink: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#005226] focus:border-[#005226]"
                    placeholder="https://trackcourier.io/track-and-trace/professi....."
                  />
                </div>
              </div>
            </div>
            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={handleDiscardTrack}
                className="text-gray-600 hover:text-gray-800 px-4 py-2 text-sm font-medium"
              >
                Discard
              </button>
              <button
                onClick={handleSaveTrack}
                className="bg-[#005226] text-white px-6 py-2 rounded-md hover:bg-[#003b1c] transition-colors text-sm font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
