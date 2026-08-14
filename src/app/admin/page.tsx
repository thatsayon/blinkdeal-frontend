"use client";

import Link from "next/link";
import { Tags, Store as StoreIcon, Ticket, ArrowRight, TrendingUp, PlusCircle, LayoutDashboard } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Categories",
      icon: <Tags className="w-6 h-6 text-blue-500" />,
      link: "/admin/categories",
      bgClass: "bg-blue-50",
      linkText: "Manage Categories",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Total Stores",
      icon: <StoreIcon className="w-6 h-6 text-indigo-500" />,
      link: "/admin/stores",
      bgClass: "bg-indigo-50",
      linkText: "Manage Stores",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      title: "Total Coupons",
      icon: <Ticket className="w-6 h-6 text-pink-500" />,
      link: "/admin/coupons",
      bgClass: "bg-pink-50",
      linkText: "Manage Coupons",
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Welcome back, Admin 👋
          </h1>
          <p className="mt-2 text-gray-500 font-medium">
            Here's what's happening with BlinkDeal today.
          </p>
        </div>
        <div className="relative z-10 flex gap-3">
          <Link 
            href="/admin/coupons?action=new" 
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Coupon
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="group relative bg-white p-6 rounded-3xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden flex flex-col"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-[0.03] rounded-bl-full transition-opacity group-hover:opacity-10 pointer-events-none`}></div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={`p-3 rounded-2xl ${stat.bgClass}`}>
                {stat.icon}
              </div>
              <TrendingUp className="w-5 h-5 text-gray-300" />
            </div>
            
            <div className="relative z-10 mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{stat.title}</h3>
              <p className="mt-2 text-3xl font-black text-gray-900">
                <span className="text-transparent bg-clip-text bg-gradient-to-r text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-all duration-300">
                  Manage
                </span>
              </p>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-100 relative z-10">
              <Link 
                href={stat.link}
                className="inline-flex items-center text-sm font-semibold text-gray-600 group-hover:text-indigo-600 transition-colors"
              >
                {stat.linkText}
                <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section - Empty State / Recent Activity */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden relative">
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
          <h3 className="text-base font-bold text-gray-900">Quick Overview</h3>
        </div>
        <div className="p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
            <LayoutDashboard className="w-8 h-8 text-gray-300" />
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-2">Everything is running smoothly</h4>
          <p className="text-gray-500 max-w-sm mx-auto">
            Your dashboard is ready. Navigate through the sidebar to manage your platform's resources.
          </p>
        </div>
      </div>
    </div>
  );
}


