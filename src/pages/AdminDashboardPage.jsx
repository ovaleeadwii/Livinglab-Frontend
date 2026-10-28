import React, { useState } from "react";
import Sidebar, { MENU_ITEMS } from "../roles/superadmin/layout/Sidebar";
import Header from "../roles/superadmin/layout/Header";
import WelcomeBanner from "../roles/superadmin/dashboard/WelcomeBanner";
import StatCards from "../roles/superadmin/dashboard/StatCards";
import GrowthChart from "../roles/superadmin/dashboard/GrowthChart";
import TopResellers from "../roles/superadmin/dashboard/TopResellers";
import InfoCards from "../roles/superadmin/dashboard/InfoCards";
import AuditLogTable from "../roles/superadmin/dashboard/AuditLogTable";
import ChatbotPanel from "../roles/superadmin/chat-cs/ChatbotPanel";
import AdminManagement from "../roles/superadmin/manajemen-admin/AdminManagement";
import HakAksesManagement from "../roles/superadmin/hak-akses/HakAksesManagement";
import {
  STAT_CARDS,
  GROWTH_CHART,
  GROWTH_PERIODS,
  TOP_RESELLERS,
  INFO_CARDS,
  AUDIT_LOGS,
} from "../roles/superadmin/data/adminDashboardData";
 
// Halaman Super Admin (AgriCore).
export default function AdminDashboardPage({ setPage, user, onLogout }) {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const activeLabel = MENU_ITEMS.find((m) => m.id === activeMenu)?.label || "Dashboard";
 
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeMenu={activeMenu} onSelect={setActiveMenu} user={user} onLogout={onLogout} />
 
      <div className="flex min-w-0 flex-1 flex-col">
        <Header pageTitle={activeLabel} user={user} />
 
        <main className="flex-1 p-6">
          {activeMenu === "dashboard" && (
            <div className="space-y-6">
              <WelcomeBanner
                user={user}
                onOpenCommission={() => setActiveMenu("commission")}
                onExport={() => console.log("TODO: ekspor laporan")}
              />
 
              <StatCards items={STAT_CARDS} />
 
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="xl:col-span-2">
                  <GrowthChart data={GROWTH_CHART} periods={GROWTH_PERIODS} />
                </div>
                <TopResellers items={TOP_RESELLERS} onSeeAll={() => console.log("TODO: halaman mitra")} />
              </div>
 
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
                <div className="xl:col-span-2">
                  <InfoCards items={INFO_CARDS} onOpen={(id) => id === "admins" || id === "disputes" ? setActiveMenu(id) : null} />
                </div>
                <div className="xl:col-span-3">
                  <AuditLogTable items={AUDIT_LOGS} onSeeAll={() => setActiveMenu("audit")} />
                </div>
              </div>
            </div>
          )}
 
          {activeMenu === "chatbot" && <ChatbotPanel />}
 
          {activeMenu === "admins" && <AdminManagement />}
 
          {activeMenu === "permissions" && <HakAksesManagement />}
 
          {!["dashboard", "chatbot", "admins", "permissions"].includes(activeMenu) && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <h2 className="text-lg font-bold text-slate-800">{activeLabel}</h2>
              <p className="mt-1 text-sm text-slate-500">Halaman ini sedang dikembangkan.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}