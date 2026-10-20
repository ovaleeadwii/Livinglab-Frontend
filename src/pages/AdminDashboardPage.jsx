import React, { useState } from "react";
import Sidebar, { MENU_ITEMS } from "../components/admin/Sidebar";
import Header from "../components/admin/Header";
import WelcomeBanner from "../components/admin/WelcomeBanner";
import ChatbotPanel from "../components/ChatbotPanel";
// IMPORT-BERIKUTNYA

import {
  STAT_CARDS,
  GROWTH_CHART,
  GROWTH_PERIODS,
  TOP_RESELLERS,
  INFO_CARDS,
  AUDIT_LOGS,
} from "../data/adminDashboardData";

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
              <WelcomeBanner user={user} onOpenCommission={() => setActiveMenu("commission")} />

              {/* LANGKAH 4: StatCards */}

              {/* LANGKAH 5: GrowthChart + TopResellers */}

              {/* LANGKAH 6: InfoCards + AuditLogTable */}
            </div>
          )}

         {activeMenu === "chatbot" && <ChatbotPanel />}

          {activeMenu !== "dashboard" && activeMenu !== "chatbot" && (
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
