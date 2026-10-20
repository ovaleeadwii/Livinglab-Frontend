import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";

export default function WelcomeBanner({ user, onOpenCommission }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 p-6 text-white shadow-lg md:p-8">
      <div className="relative z-10 max-w-2xl">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-200 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
          <span>Sistem Agropolitan Smart Living Lab</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          Selamat Datang, {user?.name || "Super Admin"}! 👋
        </h2>
        <p className="mt-2 text-sm text-emerald-100/90 leading-relaxed md:text-base">
          Pantau seluruh aktivitas transaksi komoditas, jaringan mitra reseller, telemetry IoT, dan komisi platform AgriCore secara real-time dari panel ini.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenCommission}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          >
            <span>Kelola Komisi Pending</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => window.open("#", "_blank")}
            className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
          >
            <span>Lihat Laporan Analytics</span>
          </button>
        </div>
      </div>

      {/* Dekorasi Aksen Latar Belakang */}
      <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute right-20 top-0 h-40 w-40 rounded-full bg-teal-400/10 blur-2xl pointer-events-none" />
    </div>
  );
}