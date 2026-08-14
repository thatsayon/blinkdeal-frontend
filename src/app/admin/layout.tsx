import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, Tags, Store as StoreIcon, Ticket } from "lucide-react";
import AuthGuard from "@/app/admin/AuthGuard";
import LogoutButton from "./LogoutButton";

import AdminSidebar from "./AdminSidebar";

export const metadata: Metadata = {
  title: "Admin Dashboard - Blinkdeal",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
