import React from "react";
import { ShieldCheck, ArrowRight } from "lucide-react";

const AFTER_STYLE = {
  success: "bg-green-100 text-[#176137]",
  danger: "bg-red-100 text-red-600",
};

// Tabel "Audit Log Terkini". items = AUDIT_LOGS
export default function AuditLogTable({ items = [], merkleRoot = "GST-R1-88419-f9c0", onSeeAll }) {
  return (
    <section className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <ShieldCheck size={18} className="text-[#176137]" />
            Audit Log Terkini
          </h2>
          <p className="text-xs text-slate-500">SHA-256 Cryptographic Immutability Trail (Platform Ops)</p>
        </div>
        <span className="rounded-md border border-slate-200 px-2 py-0.5 font-mono text-[10px] text-slate-500">
          Merkle Tree Sync: OK
        </span>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[520px] text-left">
          <thead>
            <tr className="border-y border-slate-100 bg-slate-50 font-mono text-[10px] uppercase text-slate-500">
              <th className="px-3 py-2 font-semibold">Waktu</th>
              <th className="px-3 py-2 font-semibold">Admin</th>
              <th className="px-3 py-2 font-semibold">Aksi Operasional</th>
              <th className="px-3 py-2 font-semibold">Before / After</th>
            </tr>
          </thead>
          <tbody>
            {items.map((log) => (
              <tr key={log.id} className="border-b border-slate-100 align-top">
                <td className="px-3 py-3 font-mono text-xs text-slate-600">
                  {log.time}
                  <div className="text-[10px] text-slate-400">WIB</div>
                </td>
                <td className="px-3 py-3">
                  <div className="text-sm font-semibold text-slate-800">{log.admin}</div>
                  <div className="font-mono text-[10px] text-[#176137]">{log.role}</div>
                </td>
                <td className="px-3 py-3">
                  <div className="text-sm text-slate-800">{log.action}</div>
                  <div className="font-mono text-[10px] text-slate-500">{log.target}</div>
                </td>
                <td className="px-3 py-3 font-mono text-[11px]">
                  <span className="text-slate-400 line-through">{log.before}</span>
                  <span className="mx-1 text-slate-400">→</span>
                  <span className={`rounded px-1.5 py-0.5 font-semibold ${AFTER_STYLE[log.tone] || ""}`}>
                    {log.after}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4 text-xs">
        <span className="font-mono text-slate-500">
          SHA-256 Merkle Root: <span className="font-semibold text-slate-700">{merkleRoot}</span>
        </span>
        <button
          type="button"
          onClick={onSeeAll}
          className="flex items-center gap-1 font-semibold text-[#176137] hover:underline"
        >
          Buka Audit Trail Lengkap <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
}
