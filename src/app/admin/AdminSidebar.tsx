"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Tags, Store as StoreIcon, Ticket, FileText } from "lucide-react";
import LogoutButton from "./LogoutButton";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Categories", href: "/admin/categories", icon: Tags },
    { name: "Stores", href: "/admin/stores", icon: StoreIcon },
    { name: "Coupons", href: "/admin/coupons", icon: Ticket },
    { name: "Posts", href: "/admin/posts", icon: FileText },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900">Blinkdeal Admin</h2>
      </div>
      <nav className="mt-6 px-4 space-y-1 flex-1">
        {navItems.map((item) => {
          // Exact match for /admin, startsWith for subpaths
          const isActive = 
            item.href === "/admin" 
              ? pathname === "/admin" 
              : pathname?.startsWith(item.href);
              
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? "bg-indigo-50 text-indigo-700 font-semibold" 
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className={`w-5 h-5 mr-3 ${isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-500"}`} />
              {item.name}
            </Link>
          );
        })}
        <div className="pt-4 mt-4 border-t border-gray-200">
          <LogoutButton />
        </div>
      </nav>
    </aside>
  );
}
