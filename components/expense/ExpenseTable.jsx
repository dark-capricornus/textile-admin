"use client";

export default function ExpenseTable({ expenses, onAddExpense }) {
  // Calculate totals
  const paidExpenses = expenses.filter(exp => exp.status === "Paid");
  const unpaidExpenses = expenses.filter(exp => exp.status === "Unpaid");
  
  const paidAmount = paidExpenses.reduce((total, exp) => {
    return total + parseFloat(exp.amount.replace(/,/g, ""));
  }, 0);
  
  const unpaidAmount = unpaidExpenses.reduce((total, exp) => {
    return total + parseFloat(exp.amount.replace(/,/g, ""));
  }, 0);
  
  const totalAmount = paidAmount + unpaidAmount;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-semibold text-[#005226]">Expense</h1>
          
          {/* Date filters */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Date:</span>
              <input 
                type="date" 
                defaultValue="2023-11-15"
                className="border border-gray-300 rounded px-2 py-1 text-sm w-32"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">From:</span>
              <input 
                type="date" 
                defaultValue="2023-11-11"
                className="border border-gray-300 rounded px-2 py-1 text-sm w-32"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">To:</span>
              <input 
                type="date" 
                defaultValue="2023-11-15"
                className="border border-gray-300 rounded px-2 py-1 text-sm w-32"
              />
            </div>          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search...."
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-48 pr-10"
            />
            <svg 
              className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <button
            onClick={onAddExpense}
            className="bg-[#005226] text-white px-4 py-2 rounded-lg hover:bg-[#003917] transition-colors text-sm font-medium flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>            Add Expense
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Sl. no.</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Sub Category</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Description</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={expense.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{expense.id}</td>
                <td className="py-3 px-4">{expense.date}</td>
                <td className="py-3 px-4">{expense.category}</td>
                <td className="py-3 px-4">{expense.subCategory}</td>
                <td className="py-3 px-4 max-w-xs">
                  <div className="truncate" title={expense.description}>
                    {expense.description}
                  </div>
                </td>
                <td className="py-3 px-4">₹ {expense.amount}</td>
                <td className="py-3 px-4">
                  <span 
                    className={`text-sm font-medium ${
                      expense.status === "Paid" 
                        ? "text-green-600" 
                        : "text-red-600"
                    }`}
                  >
                    {expense.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-12 text-xl">
            <div>
              <span className="text-gray-700 font-medium">Paid Amount: </span>
              <span className="font-bold text-orange-500">₹{paidAmount.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-gray-700 font-medium">Unpaid Amount: </span>
              <span className="font-bold text-red-500">₹{unpaidAmount.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-gray-700 font-medium">Total Amount: </span>
              <span className="font-bold text-green-600">₹{totalAmount.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="border border-[#005226] text-[#005226] px-6 py-2 rounded-lg hover:bg-[#005226] hover:text-white transition-colors text-sm font-medium">
              Print
            </button>
            <button className="bg-[#005226] text-white px-6 py-2 rounded-lg hover:bg-[#003917] transition-colors text-sm font-medium">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
