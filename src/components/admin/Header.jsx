import React from "react";
import { Search, Bell, ChevronDown } from "lucide-react";

export default function Header({ pageTitle = "Dashboard", user }) {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-6">
      {/* Judul Halaman */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">{pageTitle}</h1>
      </div>

      {/* Bagian Kanan: Pencarian, Notifikasi, & Profil */}
      <div className="flex items-center gap-4">
        {/* Input Search */}
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari sesuatu..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-4 text-sm text-slate-700 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* Tombol Notifikasi */}
        <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
        </button>

        {/* Pembatas / Divider */}
        <div className="h-6 w-px bg-slate-200"></div>

        {/* Profil Admin */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white">
            {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
          </div>
          <div className="hidden text-left md:block">
            <p className="text-sm font-medium text-slate-800 leading-tight">
              {user?.name || "Super Admin"}
            </p>
            <p className="text-xs text-slate-500">AgriCore Systems</p>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </div>
      </div>
    </header>
  );
}
