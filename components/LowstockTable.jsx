"use client";

export default function LowStockTable() {
  const lowStock = [
    { code: "26767", product: "Saree", quantity: 9 },
    { code: "26767", product: "Leggins", quantity: 10 },
    { code: "26767", product: "T-shirt", quantity: 12 },
    { code: "26767", product: "Hand kerchief", quantity: 13 },
    { code: "26767", product: "Nighty", quantity: 18 },
  ];

  return (
    <div className="bg-white rounded-xl border border-green-800 p-2 w-full max-w-md">
      <h2 className="text-lg font-semibold text-[#005226] m-2">Low Stock</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-[#005226] font-semibold border-b">
              <th className="p-2 border-b border-gray-200">Code</th>
              <th className="p-2 border-b border-gray-200">Product</th>
              <th className="p-2 border-b border-gray-200">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {lowStock.map((item, index) => (
              <tr key={index} className="border border-b hover:bg-green-50">
                <td className="p-2 border-b border-gray-200">{item.code}</td>
                <td className="p-2 border-b border-gray-200">{item.product}</td>
                <td className="p-2 text-red-600 font-semibold border-b border-gray-200">
                  {item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
