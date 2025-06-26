"use client";

export default function ExpenseTable() {
  const expenses = [
    {
      id: "exp-01",
      date: "10/11/2023",
      category: "Plumbing",
      subCategory: "Taps, Pipes, Joints",
      amount: "1,000",
      status: "Paid",
    },
    {
      id: "exp-02",
      date: "12/11/2023",
      category: "Painting",
      subCategory: "Paint brush",
      amount: "450",
      status: "Unpaid",
    },
    {
      id: "exp-03",
      date: "12/11/2023",
      category: "Carpentry",
      subCategory: "Wood",
      amount: "6,000",
      status: "Paid",
    },
    {
      id: "exp-04",
      date: "11/11/2023",
      category: "Transport",
      subCategory: "Diesel",
      amount: "600",
      status: "Unpaid",
    },    {
      id: "exp-05",
      date: "11/11/2023",
      category: "Electrical",
      subCategory: "wires",
      amount: "1,300",
      status: "Paid",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-green-800 p-4 w-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-[#005226]">Expense</h2>
        <button className="text-sm text-[#005226] border border-[#005226] hover:bg-[#005226] hover:text-white px-3 py-1 rounded-md">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="text-[#005226] font-semibold border-b">
              <th className="p-2">Sl. no.</th>
              <th className="p-2">Date</th>
              <th className="p-2">Category</th>
              <th className="p-2">Sub Category</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((item) => (
              <tr
                key={item.id}
                className={`hover:bg-green-50 ${
                  item.id !== "exp-05" ? "border-b" : ""
                }`}
              >
                <td className="p-2 font-semibold">{item.id.replace('exp-', '')}</td>
                <td className="p-2">{item.date}</td>
                <td className="p-2">{item.category}</td>
                <td className="p-2">{item.subCategory}</td>
                <td className="p-2">Rs.{item.amount}</td>
                <td
                  className={`p-2 font-medium ${
                    item.status === "Paid" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
