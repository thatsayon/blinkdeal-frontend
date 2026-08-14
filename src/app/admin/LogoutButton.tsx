"use client";

import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("admin_access_token");
    window.location.href = "/admin/login";
  };

  return (
    <button
      onClick={handleLogout}
      className="flex w-full items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
    >
      <LogOut className="w-5 h-5 mr-3" />
      Logout
    </button>
  );
}
