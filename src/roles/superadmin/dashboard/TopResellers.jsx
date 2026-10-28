import React from "react";
import { Star, ArrowRight } from "lucide-react";

// Daftar "Top Mitra Reseller". items = TOP_RESELLERS
export default function TopResellers({ items = [], totalPartners = 342, quarter = "Q2 2025", onSeeAll }) {
  return (
    <section className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Top Mitra Reseller</h2>
          <p className="text-xs text-slate-500">Peringkat GMV & SLA Bulan Ini</p>
        </div>
        <span className="rounded-md bg-green-100 px-2 py-0.5 font-mono text-[10px] font-bold text-[#176137]">
          {quarter}
        </span>
      </div>

      <ul className="mt-4 space-y-3">
        {items.map((r) => (
          <li key={r.rank} className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                r.rank <= 2 ? "bg-[#176137] text-white" : "bg-slate-200 text-slate-600"
              }`}
            >
              {r.rank}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <span className="truncate text-sm font-bold text-slate-900">{r.name}</span>
                <span className="flex shrink-0 items-center gap-0.5 font-mono text-[11px] text-slate-600">
                  <Star size={11} className="fill-amber-400 text-amber-400" />
                  {r.rating}
                </span>
              </div>
              <div className="font-mono text-[10px] text-slate-500">
                {r.area} • {r.orders} Order Dispatched
              </div>
              <div className="mt-1 flex items-center justify-between gap-2 font-mono text-[11px]">
                <span className="font-bold text-slate-800">{r.gmv}</span>
                <span className="font-semibold text-[#176137]">Komisi: {r.commission}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between pt-4 text-xs">
        <span className="font-mono text-slate-500">Total {totalPartners} mitra terdaftar</span>
        <button
          type="button"
          onClick={onSeeAll}
          className="flex items-center gap-1 font-semibold text-[#176137] hover:underline"
        >
          Lihat Semua Mitra <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
}
