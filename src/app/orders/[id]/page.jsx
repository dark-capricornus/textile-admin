"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import OrderDetail from "../../../../components/orders/OrderDetails";
import orderData from "../../../../data/orderData.json";

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
      code: item.code,
      size: item.size,
      color: item.color,
    });
  });
  return Object.values(groups).sort((a, b) => parseInt(a.id) - parseInt(b.id));
}

export default function OrderDetailsPage({ params }) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const groupedOrders = groupOrders(orderData);
  const order = groupedOrders.find((o) => o.id === resolvedParams.id);

  if (!order) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-[#005226] hover:text-green-800"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Orders
          </button>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h1 className="text-xl font-semibold text-red-600">Order Not Found</h1>
          <p className="text-gray-600 mt-2">
            The order with ID "{resolvedParams.id}" could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-[#005226] hover:text-green-800"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Orders
        </button>
        <h1 className="text-2xl font-semibold text-[#005226]">
          Order Details - #{order.id.toString().padStart(2, "0")}
        </h1>
      </div>
      <OrderDetail order={order} />
    </div>
  );
}
