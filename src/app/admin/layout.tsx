import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, Tags, Store as StoreIcon, Ticket } from "lucide-react";
import ClientLayout from "./ClientLayout";

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
    <ClientLayout>{children}</ClientLayout>
  );
}
