// app/dashboard/page.jsx
"use client";

import SummaryCards from "../../../components/SummaryCard";
import SalesGraph from "../../../components/SalesGraph";
import RevenueChart from "../../../components/RevenueChart";
import OrdersTable from "../../../components/OrdersTable";
import LowStockTable from "../../../components/LowstockTable";
import ExpenseTable from "../../../components/ExpenseTable";

export default function Dashboard() {
  return (
    <div className="px-6 py-4 space-y-6 w-full overflow-hidden bg-[#BFFFEA]/30">
      {/* Top Summary Cards */}
      <SummaryCards />

      {/* Graphs */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <SalesGraph />
        </div>
        <div className="w-full md:w-1/2">
          <RevenueChart />
        </div>
      </div>

      {/* Orders and Low Stock */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <OrdersTable />
        </div>
        <LowStockTable />
      </div>

      {/* Expenses */}
      <ExpenseTable />
    </div>
  );
}
