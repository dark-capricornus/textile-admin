"use client";

import orderData from "../data/orderData.json";

export default function OrdersTable() {
  return (
    <div className="bg-white rounded-xl border border-green-800 p-4 w-full">
      {/* Header with title + View All button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#005226]">Recent Orders</h2>
        <button className="text-sm text-[#005226] border border-[#005226] px-3 py-1 rounded-md hover:bg-[#e6f6ee] transition">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="text-[#005226] font-semibold border-b border-gray-200">
              <th className="p-2">Sl no.</th>
              <th className="p-2">Name</th>
              <th className="p-2">Location</th>
              <th className="p-2">Mobile Number</th>
              <th className="p-2">Products</th>
            </tr>
          </thead>
          <tbody>
            {orderData.slice(0, 5).map((order, index) => (
              <tr
                key={`order-${index}-${order.id}`}
                className="hover:bg-gray-50 border-b last:border-b-0 border-gray-200 transition"
              >
                <td className="p-3 font-medium text-gray-700">{order.id}</td>
                <td className="p-3">{order.name}</td>
                <td className="p-3">{order.location}</td>
                <td className="p-3 whitespace-nowrap">{order.contact}</td>
                <td className="p-3">
                  <span className="p-2 py-1 rounded-full text-xs font-medium">
                    {order.products}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
