import React, { useState } from "react";
import Sidebar, { MENU_ITEMS } from "../components/admin/Sidebar";
import Header from "../components/admin/Header";
 
// Halaman Home Super Admin (AgriCore).
// Sudah: Sidebar, Header. Menyusul: WelcomeBanner, StatCards, AuditLogTable.
export default function AdminDashboardPage({ setPage, user, onLogout }) {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const activeLabel = MENU_ITEMS.find((m) => m.id === activeMenu)?.label || "Dashboard";
 
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        activeMenu={activeMenu}
        onSelect={setActiveMenu}
        user={user}
        onLogout={onLogout}
      />
 
      <div className="flex min-w-0 flex-1 flex-col">
        <Header pageTitle={activeLabel} user={user} />
 
        <main className="flex-1 p-6">
          {/* Sementara: penanda isi halaman */}
          <p className="text-sm text-slate-500">Menu aktif: {activeLabel}</p>
        </main>
      </div>
    </div>
  );
}