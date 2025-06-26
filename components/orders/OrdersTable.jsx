"use client";

import { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  CalendarDays,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import orderData from "../../data/orderData.json";
import Link from "next/link";
import Pagination from "../ui/Pagination";

function Filters() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <button className="flex items-center border border-gray-300 rounded px-3 py-1 text-sm text-gray-600">
        <Filter className="w-4 h-4 mr-1" /> Filters
      </button>
      <select className="border border-gray-300 rounded px-3 py-1 text-sm">
        <option>Category : All</option>
        <option>Mens</option>
        <option>Womens</option>
        <option>Kids</option>
      </select>
      <select className="border border-gray-300 rounded px-3 py-1 text-sm">
        <option>Product : All</option>
        <option>Shirt</option>
        <option>Pant</option>
        <option>Tshirt</option>
        <option>Saree</option>
      </select>
    </div>
  );
}

function groupOrders(data) {
  const groups = {};
  data.forEach((item) => {
    if (!groups[item.id]) {
      groups[item.id] = {
        id: item.id,
        date: item.date,
        name: item.name,
        location: item.location,
        contact: item.contact,
        items: [],
      };
    }
    groups[item.id].items.push({
      category: item.category,
      subCategory: item.subCategory,
      products: item.products,
      quantity: item.quantity,
      price: item.price,
      status: item.status,
    });
  });
  return Object.values(groups).sort((a, b) => parseInt(a.id) - parseInt(b.id));
}

export default function OrdersTable() {
  const groupedOrders = useMemo(() => groupOrders(orderData), []);
  const [expandedOrders, setExpandedOrders] = useState(new Set());
  const [page, setPage] = useState(1);
  const itemsPerPage = 13;
  const totalPages = Math.ceil(groupedOrders.length / itemsPerPage);
  const paginatedOrders = groupedOrders.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const toggleOrder = (orderId) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const calculateOrderTotal = (items) => {
    return items.reduce((sum, item) => {
      const priceValue = parseInt(item.price.replace(/\D/g, ""));
      return isNaN(priceValue) ? sum : sum + priceValue;
    }, 0);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm w-full overflow-x-auto">
      <div className="flex justify-between items-start mb-4 p-4 flex-wrap gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <h2 className="text-xl font-semibold text-[#005226]">Orders</h2>
          <Filters />
        </div>
        <div className="flex flex-wrap gap-4 items-center justify-end">
          <button className="flex items-center border border-gray-300 rounded px-3 py-1 text-sm text-gray-600">
            <CalendarDays className="w-4 h-4 mr-1" /> Today
          </button>
          <input
            type="text"
            placeholder="Search....."
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          />
        </div>
      </div>

      <div className="min-w-[1024px]">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b text-[#005226]">
              <th className="py-3 px-4 w-8"></th>
              <th className="py-3 px-4">Sl. no.</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Contact Number</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Sub Category</th>
              <th className="py-3 px-4">Products</th>
              <th className="py-3 px-4">Qty.</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order, orderIndex) => {
              const isExpanded = expandedOrders.has(order.id);
              const firstItem = order.items[0];
              const totalPrice = calculateOrderTotal(order.items);

              const rows = [
                <tr
                  key={`order-${order.id}-${orderIndex}`}
                  className="border-b hover:bg-green-50 transition-colors"
                >
                  <td className="py-2 text-center">
                    {isExpanded ? (
                      <ChevronUp
                        className="w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={() => toggleOrder(order.id)}
                      />
                    ) : (
                      <ChevronDown
                        className="w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={() => toggleOrder(order.id)}
                      />
                    )}
                  </td>
                  <td className="py-2 font-semibold">
                    {order.id.toString().padStart(2, "0")}
                  </td>
                  <td>{order.date}</td>
                  <td className="font-medium">{order.name}</td>
                  <td>{order.location}</td>
                  <td>{order.contact}</td>
                  <td>{firstItem.category}</td>
                  <td>{firstItem.subCategory}</td>
                  <td>{firstItem.products}</td>
                  <td>{firstItem.quantity}</td>
                  <td>{firstItem.price}</td>
                  <td>
                    <span
                      className={`text-sm font-semibold ${
                        firstItem.status === "Dispatched"
                          ? "text-green-700"
                          : firstItem.status === "Cancelled"
                          ? "text-red-700"
                          : "text-gray-500"
                      }`}
                    >
                      {firstItem.status || "..."}
                    </span>
                  </td>
                  <td>
                    {" "}
                    <Link
                      href={`/orders/${order.id}`}
                      className="text-sm text-[#005226] underline hover:text-green-900 text-center items-center flex justify-center"
                    >
                      View
                    </Link>
                  </td>
                </tr>,
              ];

              if (isExpanded) {
                if (order.items.length > 1) {
                  order.items.slice(1).forEach((item, index) => {
                    rows.push(
                      <tr
                        key={`order-${order.id}-${orderIndex}-item-${
                          index + 1
                        }`}
                        className="border-b hover:bg-green-50 transition-colors"
                      >
                        <td></td>
                        <td colSpan={5}></td>
                        <td>{item.category}</td>
                        <td>{item.subCategory}</td>
                        <td>{item.products}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>{" "}
                        <td>
                          <span
                            className={`text-sm font-semibold ${
                              item.status === "Dispatched"
                                ? "text-green-700"
                                : item.status === "Cancelled"
                                ? "text-red-700"
                                : "text-gray-500"
                            }`}
                          >
                            {item.status || "..."}
                          </span>
                        </td>
                        <td></td>
                      </tr>
                    );
                  });
                }

                rows.push(
                  <tr
                    key={`order-${order.id}-${orderIndex}-total`}
                    className="border-b bg-green-50"
                  >
                    <td></td>{" "}
                    <td
                      colSpan={8}
                      className="text-right pr-4 py-2 font-semibold"
                    >
                      Total Price:
                    </td>
                    <td className="font-semibold py-2">Rs. {totalPrice}</td>
                    <td></td>
                    <td></td>
                  </tr>
                );
              }

              return rows;
            })}
          </tbody>
        </table>{" "}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
