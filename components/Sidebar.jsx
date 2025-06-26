"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UploadCloud,
  Package,
  Truck,
  Boxes,
  CreditCard,
  Star,
  Megaphone,
  LogOut,
} from "lucide-react";

const navLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Upload Products", href: "/upload", icon: UploadCloud },
  { label: "Orders", href: "/orders", icon: Package },
  { label: "Delivery Tracking", href: "/delivery-tracking", icon: Truck },
  { label: "Stocks", href: "/stocks", icon: Boxes },
  { label: "Expense", href: "/expense", icon: CreditCard },
  { label: "Reviews & Ratings", href: "/reviews", icon: Star },
  { label: "Advertisement", href: "/advertisement", icon: Megaphone },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#F8FBF9] min-h-screen flex flex-col justify-between py-8 border-r border-gray-200">
      {/* Top nav links */}
      <ul className="flex flex-col gap-1 px-6">
        {navLinks.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group relative font-normal text-base tracking-tight ${
                  isActive
                    ? "text-[#005226] font-semibold bg-[#E6F4ED] shadow-sm"
                    : "text-[#222] hover:bg-[#F1F5F3] hover:text-[#005226]"
                }`}
                style={{ minHeight: 48 }}
              >
                {isActive && (
                  <span className="absolute left-0 top-2 h-6 w-1 bg-[#005226] rounded-r-md" />
                )}
                <Icon
                  size={20}
                  className={`${
                    isActive ? "text-[#005226]" : "text-gray-400 group-hover:text-[#005226]"
                  } transition`}
                />
                <span className="ml-1">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Bottom logout */}
      <div className="px-6 pb-2">
        <button className="flex items-center gap-3 px-4 py-3 text-[#005226] rounded-lg w-full transition font-medium hover:bg-[#F1F5F3]">
          <LogOut size={20} />
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  );
}
