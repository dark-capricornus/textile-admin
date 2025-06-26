"use client";

import { ChevronLeft, Printer } from "lucide-react";

export default function Invoice({ order, onClose }) {
  // Function to calculate order total
  const calculateOrderTotal = (items) => {
    const subtotal = items.reduce((sum, item) => {
      const priceValue = parseInt(item.price.replace(/\D/g, ""));
      return isNaN(priceValue) ? sum : sum + priceValue;
    }, 0);
    
    const gst = Math.round(subtotal * 0.18);
    return {
      subtotal,
      gst,
      total: subtotal + gst
    };
  };

  const orderTotal = calculateOrderTotal(order.items);
  const invoiceDate = new Date().toLocaleDateString();
  const invoiceNumber = `INV-${order.id.toString().padStart(4, "0")}-${Math.floor(Math.random() * 1000)}`;

  const handlePrint = () => {
    window.print();
  };
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm max-w-5xl mx-auto">
      {/* Header with Invoice Number and Print Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-600">
          Invoice number : {`62786457345`}
        </h2>
        <button
          onClick={handlePrint}
          className="flex items-center border border-gray-300 rounded px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
        >
          <Printer className="mr-2 w-4 h-4" /> Print
        </button>
      </div>      {/* Company and Customer Information */}
      <div className="grid grid-cols-2 gap-8 mb-8 relative min-h-[300px]">
        {/* Company Information */}
        <div className="space-y-4 pr-4">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Company Name</p>
            <p className="text-sm">Shree Clothings</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Date of Dispatch</p>
            <p className="text-sm">07/12/2023</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Contact Number</p>
            <p className="text-sm">+91 99999 88888</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Email ID</p>
            <p className="text-sm">sutharanisets@gmail.com</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Company Address</p>
            <p className="text-sm">
              XYZ, ABCDE,<br />
              dgdgj, Thoothukudi,<br />
              Tamil Nadu<br />
              India<br />
              600 002
            </p>
          </div>        </div>        {/* Vertical Divider Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 transform -translate-x-1/2 z-10"></div>

        {/* Customer Information */}
        <div className="space-y-4 pl-4">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Customer Name</p>
            <p className="text-sm">{order.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Date of Order</p>
            <p className="text-sm">{order.date}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Contact Number</p>
            <p className="text-sm">
              {order.contact}<br />
              +91 99999 89898
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Email ID</p>
            <p className="text-sm">ramesh@gmail.com</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Billing Address</p>
            <p className="text-sm">
              XYZ, ABCDE,<br />
              Tambaram, Chennai,<br />
              Tamil Nadu<br />
              India<br />
              600 002
            </p>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Product Details</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="py-3 px-4 border-b text-left font-medium">Sl. no.</th>
                <th className="py-3 px-4 border-b text-left font-medium">Product Code</th>
                <th className="py-3 px-4 border-b text-left font-medium">Category</th>
                <th className="py-3 px-4 border-b text-left font-medium">Sub Category</th>
                <th className="py-3 px-4 border-b text-left font-medium">Product Name</th>
                <th className="py-3 px-4 border-b text-left font-medium">Size</th>
                <th className="py-3 px-4 border-b text-left font-medium">Colour</th>
                <th className="py-3 px-4 border-b text-left font-medium">Quantity</th>
                <th className="py-3 px-4 border-b text-left font-medium">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => {
                const priceValue = parseInt(item.price.replace(/\D/g, ""));
                return (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4">{(index + 1).toString().padStart(2, "0")}</td>
                    <td className="py-3 px-4">{item.code || (index === 0 ? "245" : "103")}</td>
                    <td className="py-3 px-4">{item.category}</td>
                    <td className="py-3 px-4">{item.subCategory}</td>
                    <td className="py-3 px-4">{item.products}</td>
                    <td className="py-3 px-4">{item.size || (index === 0 ? "M" : "34")}</td>
                    <td className="py-3 px-4">
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
                    <td className="py-3 px-4">{item.quantity}</td>
                    <td className="py-3 px-4">{item.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="mt-6 flex justify-end">
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal :</span>
              <span>Rs. {orderTotal.subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">GST (10%) :</span>
              <span>Rs. {Math.round(orderTotal.subtotal * 0.1)}</span>
            </div>
            <div className="flex justify-between text-sm font-semibold pt-2 border-t border-gray-300">
              <span>Total :</span>
              <span>Rs. {orderTotal.subtotal + Math.round(orderTotal.subtotal * 0.1)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Save Invoice Button */}
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="bg-[#005226] text-white px-6 py-2 rounded hover:bg-[#003917] transition"
        >
          Save Invoice
        </button>
      </div>
    </div>
  );
}