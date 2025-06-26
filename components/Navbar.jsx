"use client";

import { Bell, Search, User, ChevronDown } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm border-b border-gray-100 sticky top-0 z-50">
      {/* Left: Brand */}
      <h1 className="text-2xl font-[Sacramento] font-bold text-[#005226] whitespace-nowrap">
        .cloths
      </h1>

      {/* Center: Search Bar aligned after sidebar */}
      <div className="flex-1 ml-64">
        <div className="relative w-[436px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full text-[#005226] h-[50px] pl-10 pr-4 rounded-[10px] border border-[#005226] bg-[#bfffea]/20 text-base outline-none focus:ring-2 focus:ring-[#005226]"
          />
        </div>
      </div>

      {/* Right: Notification and Profile */}
      <div className="flex items-center gap-4 pr-2">
        {/* Notification Icon */}
        <div className="relative">
          <Bell className="h-5 w-5 text-gray-600 hover:text-[#007F5F]" />
          <span className="absolute top-[-4px] right-[-4px] w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-300" />

        {/* Profile Info */}
        <div className="flex items-center">
          {/* Avatar */}
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:ring-2 hover:ring-[#007F5F]">
            <User className="h-5 w-5 text-gray-600" />
          </button>

          {/* Name + Role */}
          <div className="flex flex-col text-left leading-tight ml-2">
            <span className="text-sm font-medium text-[#005226]">Joseph</span>
            <span className="text-xs text-gray-400">Admin</span>
          </div>

          {/* Chevron Icon */}
          <ChevronDown className="w-4 h-4 text-gray-500 ml-6" />
        </div>
      </div>
    </header>
  );
}
