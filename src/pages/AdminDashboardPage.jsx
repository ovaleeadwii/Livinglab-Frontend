import React, { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";

export default function AdminDashboardPage({ setPage, user, onLogout }) {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar Navigasi */}
      <Sidebar
        activeMenu={activeMenu}
        onSelect={setActiveMenu}
        user={user}
        onLogout={onLogout}
      />

      {/* Area Konten Utama */}
      <div className="flex flex-1 flex-col overflow-x-hidden">
        {/* Header Atas */}
        <Header pageTitle="Dashboard Utama" user={user} />

        {/* Isi Halaman */}
        <main className="flex-1 p-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-600">
              Menu aktif saat ini: <span className="font-semibold text-emerald-600">{activeMenu}</span>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
