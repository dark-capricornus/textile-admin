"use client";

import { Shirt, ShoppingBag, Baby, Watch } from "lucide-react";

const icons = {
  Mens: <Shirt className="text-[#005226] w-8 h-8" />, 
  Womens: <ShoppingBag className="text-[#005226] w-8 h-8" />, 
  Kids: <Baby className="text-[#005226] w-8 h-8" />, 
  Accessories: <Watch className="text-[#005226] w-8 h-8" />,
};

const summary = [
  { label: "Mens", value: 500 },
  { label: "Womens", value: 660 },
  { label: "Kids", value: 400 },
  { label: "Accessories", value: 250 },
];

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
      {summary.map(({ label, value }) => (
        <div
          key={label}
          className="flex items-center bg-white border border-[#005226] rounded-xl shadow-sm px-5 py-4 gap-4 w-full"
        >
          <div className="shrink-0">{icons[label]}</div>
          <div className="flex flex-col">
            <span className="text-xl font-semibold text-[#005226]">{value}</span>
            <span className="text-sm font-medium text-gray-600">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
