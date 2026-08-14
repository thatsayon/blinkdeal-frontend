"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import AuthGuard from "./AuthGuard";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <AuthGuard>
      {isLoginPage ? (
        children
      ) : (
        <div className="flex min-h-screen bg-gray-50">
          <AdminSidebar />
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      )}
    </AuthGuard>
  );
}
