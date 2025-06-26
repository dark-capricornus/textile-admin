"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import Invoice from "./Invoice";

export default function OrderDetail({ order }) {
  const [showInvoice, setShowInvoice] = useState(false);
  
  const subtotal = order.items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/\D/g, ""));
    return sum + (isNaN(price) ? 0 : price);
  }, 0);

  const gst = subtotal * 0.1;
  const total = subtotal + gst;

  // If invoice view is active, show the invoice component
  if (showInvoice) {
    return (
      <Invoice 
        order={order} 
        onClose={() => setShowInvoice(false)}
      />
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4 text-[#005226]">
          Customer Details
        </h2>
        <div className="grid grid-cols-2 gap-8 text-sm">
          <div className="space-y-2">
            <p>
              <span className="text-gray-600">Customer Name</span>
              <br />
              <span className="font-medium">{order.name}</span>
            </p>
            <p>
              <span className="text-gray-600">Date of Order</span>
              <br />
              <span className="font-medium">{order.date}</span>
            </p>
            <p>
              <span className="text-gray-600">Contact Number</span>
              <br />
              <span className="font-medium">{order.contact}</span>
            </p>
          </div>
          <div className="space-y-2">
            <p>
              <span className="text-gray-600">Email ID</span>
              <br />
              <span className="font-medium">ramesh@gmail.com</span>
            </p>
            <p>
              <span className="text-gray-600">Billing Address</span>
              <br />
              <span className="font-medium">
                XYZ, ABCDE,
                <br />
                Tambaram, Chennai,
                <br />
                Tamil Nadu
                <br />
                India
                <br />
                600 002
              </span>
            </p>
          </div>
        </div>
      </div>      <div>
        <h2 className="text-lg font-semibold mb-4 text-[#005226]">
          Product Details
        </h2>
        <div className="border border-blue-400 rounded-lg p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 px-2 text-left font-medium text-gray-600">Sl. no.</th>
                <th className="py-2 px-2 text-left font-medium text-gray-600">Product Code</th>
                <th className="py-2 px-2 text-left font-medium text-gray-600">Category</th>
                <th className="py-2 px-2 text-left font-medium text-gray-600">Sub Category</th>
                <th className="py-2 px-2 text-left font-medium text-gray-600">Product Name</th>
                <th className="py-2 px-2 text-left font-medium text-gray-600">Size</th>
                <th className="py-2 px-2 text-left font-medium text-gray-600">Colour</th>
                <th className="py-2 px-2 text-left font-medium text-gray-600">Quantity</th>
                <th className="py-2 px-2 text-left font-medium text-gray-600">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-2 px-2">
                    {(index + 1).toString().padStart(2, "0")}
                  </td>
                  <td className="py-2 px-2">
                    {item.code || (index === 0 ? "245" : "103")}
                  </td>
                  <td className="py-2 px-2">{item.category}</td>
                  <td className="py-2 px-2">{item.subCategory}</td>
                  <td className="py-2 px-2">{item.products}</td>
                  <td className="py-2 px-2">{item.size || (index === 0 ? "M" : "34")}</td>
                  <td className="py-2 px-2">
                    <div
                      className={`w-4 h-4 rounded-sm inline-block ${
                        item.color === "red" || index === 0
                          ? "bg-red-600"
                          : item.color === "blue" || index === 1
                          ? "bg-blue-600"
                          : "bg-gray-400"
                      }`}
                    ></div>
                  </td>
                  <td className="py-2 px-2">{item.quantity}</td>
                  <td className="py-2 px-2">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="mt-4 space-y-1">
            <div className="flex justify-end">
              <div className="text-right space-y-1">
                <div className="flex justify-between w-48">
                  <span className="text-gray-600">Subtotal :</span>
                  <span>Rs. {subtotal}</span>
                </div>
                <div className="flex justify-between w-48">
                  <span className="text-gray-600">Gst (10%) :</span>
                  <span>Rs. {gst.toFixed(0)}</span>
                </div>
                <div className="flex justify-between w-48 pt-1 border-t border-gray-300">
                  <span className="font-semibold">Total :</span>
                  <span className="font-semibold">Rs. {total.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>        <div className="mt-4 text-right">
          <Button 
            className="bg-[#005226] hover:bg-[#00401d] text-white"
            onClick={() => setShowInvoice(true)}
          >
            Generate Invoice
          </Button>
        </div>
      </div>
    </div>
  );
}
