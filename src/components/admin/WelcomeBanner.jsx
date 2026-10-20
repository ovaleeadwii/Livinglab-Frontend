import React from "react";
import { Percent, Download } from "lucide-react";

// Banner sambutan di atas dashboard Super Admin.
export default function WelcomeBanner({ user, onOpenCommission, onExport }) {
  const name = user?.name || "Ovalia Dwi Rahmadani";

  return (
    <section className="rounded-2xl border border-green-100 bg-gradient-to-r from-white via-white to-green-50 p-6">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-green-100 px-3 py-1 font-mono text-[10px] font-bold text-[#176137]">
              ● ROOT ACCESS R1 • SUPER ADMIN
            </span>
            <span className="font-mono text-[10px] text-slate-400">
              CLUSTER: GST-PROD-01 • KAB. TANGGAMUS
            </span>
          </div>

          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
            Selamat Datang, {name}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Ringkasan performa finansial platform, tata kelola marketplace multi-role, dan telemetri
            greenhouse Gisting dalam satu konsol kendali operasional terpadu.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={onOpenCommission}
            className="flex items-center gap-2 rounded-lg bg-[#176137] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#12542e]"
          >
            <Percent size={16} />
            Konfigurasi Komisi
          </button>
          <button
            type="button"
            onClick={onExport}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Download size={16} />
            Ekspor Laporan (CSV/PDF)
          </button>
        </div>
      </div>
    </section>
  );
}
