import React from "react";
import {
  Sprout,
  LayoutDashboard,
  Users,
  KeyRound,
  Percent,
  SlidersHorizontal,
  FileText,
  Globe,
  MessageSquareWarning,
  LogOut,
} from "lucide-react";
 
// Menu Super Admin (SRS 4.1). id dipakai untuk menandai menu aktif.
export const MENU_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "admins", label: "Manajemen Admin", icon: Users },
  { id: "permissions", label: "Manajemen Hak Akses", icon: KeyRound },
  { id: "commission", label: "Konfigurasi Komisi", icon: Percent },
  { id: "settings", label: "Konfigurasi Sistem", icon: SlidersHorizontal },
  { id: "audit", label: "Audit Log", icon: FileText },
  { id: "reports", label: "Laporan Global", icon: Globe },
  { id: "disputes", label: "Manajemen Dispute/Komplain", icon: MessageSquareWarning },
];
 
export default function Sidebar({ activeMenu = "dashboard", onSelect, user, onLogout }) {
  const name = user?.name || "Ovalia Dwi R.";
  const role = user?.role || "Super Admin R1";
 
  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col bg-slate-800 text-slate-300">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 pt-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#176137] text-white">
          <Sprout size={20} />
        </div>
        <div>
          <div className="text-lg font-bold leading-none text-white">AgriCore</div>
          <div className="mt-1 font-mono text-[10px] tracking-wider text-slate-400">PLATFORM OPS V2.4</div>
        </div>
      </div>
 
      {/* Status cluster IoT */}
      <div className="mx-4 mt-5 rounded-lg border border-slate-700 bg-slate-900/40 px-3 py-2">
        <div className="font-mono text-[11px] text-slate-300">IoT Cluster Gisting</div>
        <div className="mt-0.5 flex items-center gap-1.5 font-mono text-[11px] font-semibold text-green-400">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
          ONLINE • 99.8%
        </div>
      </div>
 
      {/* Menu */}
      <nav className="mt-6 flex-1 overflow-y-auto px-3">
        <div className="px-2 pb-2 font-mono text-[10px] tracking-wider text-slate-500">CORE OPERATIONS</div>
        <ul className="space-y-1">
          {MENU_ITEMS.map(({ id, label, icon: Icon }) => {
            const active = id === activeMenu;
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => onSelect?.(id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    active
                      ? "bg-[#176137] font-semibold text-white"
                      : "hover:bg-slate-700/60 hover:text-white"
                  }`}
                >
                  <Icon size={16} className="shrink-0" />
                  <span>{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
 
      {/* Profil bawah */}
      <div className="m-3 flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-900/40 p-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#176137] text-xs font-bold text-white">
          {name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-white">{name}</div>
          <div className="font-mono text-[10px] text-green-400">{role}</div>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-400 hover:bg-slate-700 hover:text-white"
          aria-label="Logout"
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}
 