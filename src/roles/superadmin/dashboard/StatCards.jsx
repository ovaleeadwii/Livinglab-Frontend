import React from "react";
import { Wallet, ShoppingBag, Users, Store, UserCheck, Percent } from "lucide-react";

const ICONS = {
  revenue: Wallet,
  gmv: ShoppingBag,
  users: Users,
  resellers: Store,
  mau: UserCheck,
  fee: Percent,
};

// 6 kartu statistik ringkasan. items = STAT_CARDS dari data/adminDashboardData.js
export default function StatCards({ items = [] }) {
  return (
    <section className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
      {items.map((item) => {
        const Icon = ICONS[item.id] || Wallet;
        return (
          <article key={item.id} className="flex flex-col rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-2">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                {item.label}
              </span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-green-50 text-[#176137]">
                <Icon size={14} />
              </span>
            </div>

            <div className="mt-2 text-lg font-extrabold leading-tight text-slate-900">{item.value}</div>
            <div
              className={`mt-1 font-mono text-[11px] ${
                item.subTone === "up" ? "font-semibold text-[#176137]" : "text-slate-500"
              }`}
            >
              {item.sub}
            </div>

            <div className="mt-auto flex items-center justify-between gap-2 border-t border-slate-100 pt-2 font-mono text-[10px]">
              <span className="text-slate-500">{item.footLabel}</span>
              <span className="font-bold text-slate-800">{item.footValue}</span>
            </div>
          </article>
        );
      })}
    </section>
  );
}
