import React from "react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";

const RevenueChart = () => {
  const data = [
    { name: "Accessories", value: 10000, fill: "#BFFFEA" },
    { name: "Kids", value: 10000, fill: "#80FFD6" },
    { name: "Mens", value: 20000, fill: "#003927" },
    { name: "Womens", value: 30000, fill: "#005226" },
  ];

  const maxValue = 30000;
  const ringThickness = 15;
  const ringGap = 6;
  
  // Starting radius for the innermost ring
  const startRadius = 50;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-green-800 p-4 w-full min-h-[309px] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold text-[#005226]">Revenue</div>
        <select className="text-sm border border-[#005226] rounded-md px-2 py-1 text-[#005226] focus:outline-none">
          <option>Today</option>
          <option>Week</option>
          <option>Month</option>
        </select>
      </div>

      {/* Chart and Legend Container */}
      <div className="flex flex-col md:flex-row items-center justify-center flex-grow">
        {/* Chart */}        <div className="w-full md:w-1/2 relative h-[200px]">
          <ResponsiveContainer width="100%" height="100%">            <RadialBarChart
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="30%"
              outerRadius="85%"
              startAngle={90}
              endAngle={360}
              barSize={8}
            >
              <RadialBar
                dataKey="value"
                cornerRadius={3}
                fill={(entry) => entry.fill}
              />
            </RadialBarChart>
          </ResponsiveContainer>          {/* Center Label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-700 font-bold text-lg">
            Dress
          </div>
        </div>

        {/* Legend */}
        <div className="w-full md:w-1/2 flex flex-col gap-3 mt-6 md:mt-0 md:pl-4">
          {data.map((item) => (
            <div key={item.name} className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="font-semibold text-green-900">
                  {item.name}
                </span>
              </div>
              <span className="text-gray-600 text-sm ml-6">
                Rs.{item.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;