import React from "react";
import { Search, Radio, Bell } from "lucide-react";
 
// Topbar halaman Super Admin: breadcrumb, pencarian, status telemetri, notifikasi, profil.
export default function Header({ pageTitle = "Dashboard", user, telemetryText = "24.8°C | pH 6.1", hasNotification = true }) {
  const name = user?.name || "Ovalia Dwi Rahmadani";
  const role = user?.role || "Super Admin R1";
 
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-6">
      {/* Breadcrumb */}
      <div className="shrink-0 font-mono text-xs text-slate-500">
        AgriCore <span className="mx-1">›</span>
        <span className="font-semibold text-slate-800">{pageTitle}</span>
      </div>
 
      {/* Pencarian */}
      <label className="hidden max-w-xs flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
        <Search size={14} className="shrink-0 text-slate-400" />
        <input
          type="text"
          placeholder="Search telemetry nodes..."
          className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />
      </label>
 
      <div className="ml-auto flex items-center gap-4">
        {/* Status telemetri */}
        <div className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 font-mono text-xs text-slate-600 lg:flex">
          <Radio size={14} className="text-[#176137]" />
          Gisting Telemetry: <span className="font-semibold text-slate-800">{telemetryText}</span>
        </div>
 
        {/* Notifikasi */}
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
          aria-label="Notifikasi"
        >
          <Bell size={18} />
          {hasNotification && (
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          )}
        </button>
 
        {/* Profil */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#176137] text-xs font-bold text-white">
            {name.charAt(0)}
          </div>
          <div className="hidden leading-tight sm:block">
            <div className="text-sm font-semibold text-slate-800">{name}</div>
            <div className="font-mono text-[10px] text-[#176137]">{role}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
 