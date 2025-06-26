"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

const dailyData = [
  { name: "Mon", sales: 120 },
  { name: "Tue", sales: 210 },
  { name: "Wed", sales: 180 },
  { name: "Thu", sales: 250 },
  { name: "Fri", sales: 200 },
  { name: "Sat", sales: 300 },
  { name: "Sun", sales: 280 },
];

const weeklyData = [
  { name: "Week 1", sales: 1400 },
  { name: "Week 2", sales: 1650 },
  { name: "Week 3", sales: 1500 },
  { name: "Week 4", sales: 1750 },
];

const monthlyData = [
  { name: "Jan", sales: 5800 },
  { name: "Feb", sales: 6100 },
  { name: "Mar", sales: 6400 },
  { name: "Apr", sales: 5900 },
  { name: "May", sales: 7200 },
  { name: "Jun", sales: 7000 },
];

const getDataForMode = (mode) => {
  switch (mode) {
    case "Weekly":
      return weeklyData;
    case "Monthly":
      return monthlyData;
    case "Daily":
    default:
      return dailyData;
  }
};

export default function SalesGraph() {
  const [mode, setMode] = useState("Daily");

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#005226] p-4 w-full h-full min-h-[309px] flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[#005226]">Sales Graph</h2>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="text-sm border border-[#005226] rounded-md px-3 py-1 text-[#005226] focus:outline-none"
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>

      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={getDataForMode(mode)}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#005226"
              strokeWidth={2.5}
              dot={{ r: 4, stroke: "#005226", strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
