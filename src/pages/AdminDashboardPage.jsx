import React, { useState } from "react";
import Sidebar from "../components/admin/Sidebar";

export default function AdminDashboardPage({ setPage, user, onLogout }) {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        activeMenu={activeMenu}
        onSelect={setActiveMenu}
        user={user}
        onLogout={onLogout}
      />

      <main className="flex-1 p-6">
        <p className="text-sm text-slate-500">Menu aktif: {activeMenu}</p>
      </main>
    </div>
  );
}