import React from "react";
import { Package } from "lucide-react";

const BADGE_STYLE = {
  danger: "bg-red-100 text-red-600",
  success: "bg-green-100 text-[#176137]",
};

const VALUE_STYLE = {
  danger: "text-red-600",
  success: "text-[#176137]",
};

// 4 kartu kecil: Admin Aktif, Katalog Produk, Komplain & Dispute, IoT Greenhouse. items = INFO_CARDS
export default function InfoCards({ items = [], onOpen }) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((c) => (
        <article key={c.id} className="flex flex-col rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-start justify-between gap-2">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              {c.label}
            </span>
            {c.badge && (
              <span className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold ${BADGE_STYLE[c.badge.tone]}`}>
                {c.badge.text}
              </span>
            )}
            {c.dot && <span className="h-2 w-2 rounded-full bg-green-500" />}
            {c.id === "catalog" && <Package size={14} className="text-slate-400" />}
          </div>

          <div className={`mt-2 text-2xl font-extrabold leading-tight ${VALUE_STYLE[c.tone] || "text-slate-900"}`}>
            {c.value}
          </div>
          <p className="mt-1 text-xs text-slate-500">{c.desc}</p>

          <div className="mt-auto flex items-center justify-between gap-2 pt-3 font-mono text-[10px]">
            <span className={c.tone === "danger" ? "font-semibold text-red-600" : "font-semibold text-[#176137]"}>
              {c.footLeft}
            </span>
            <button type="button" onClick={() => onOpen?.(c.id)} className="text-slate-600 hover:text-slate-900 hover:underline">
              {c.footRight}
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}
