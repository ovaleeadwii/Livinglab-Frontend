import React from "react";
import { Check, Minus, Wallet } from "lucide-react";
import { ACTIONS, MODULES } from "../data/hakAksesData";
 
// Tabel matriks menu x aksi (CRUDA). Satu baris = satu menu Admin.
export default function PermissionMatrix({ permissions, onToggle, onToggleRow, disabled }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full min-w-[640px] text-sm">
        <thead className="bg-slate-50 font-mono text-[10px] uppercase tracking-wider text-slate-500">
          <tr>
            <th className="px-4 py-3 text-left">Menu</th>
            {ACTIONS.map((a) => (
              <th key={a.id} className="px-2 py-3 text-center" title={a.label}>
                {a.label}
              </th>
            ))}
            <th className="px-3 py-3 text-center">Semua</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {MODULES.map((m) => {
            const granted = permissions[m.id] || [];
            const allOn = m.actions.every((a) => granted.includes(a));
            return (
              <tr key={m.id} className="hover:bg-slate-50/60">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 font-semibold text-slate-800">
                    {m.label}
                    {m.financial && (
                      <span
                        className="flex items-center gap-1 rounded bg-amber-100 px-1.5 py-0.5 font-mono text-[9px] font-bold text-amber-700"
                        title="Wewenang finansial: hanya aktif jika dicentang Super Admin (BR-04)"
                      >
                        <Wallet size={10} /> FINANSIAL
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500">{m.desc}</div>
                </td>
 
                {ACTIONS.map((a) => {
                  // Aksi yang tidak berlaku untuk menu ini ditampilkan sebagai strip.
                  if (!m.actions.includes(a.id)) {
                    return (
                      <td key={a.id} className="px-2 py-3 text-center text-slate-300">
                        <Minus size={14} className="mx-auto" />
                      </td>
                    );
                  }
                  const on = granted.includes(a.id);
                  return (
                    <td key={a.id} className="px-2 py-3 text-center">
                      <button
                        type="button"
                        disabled={disabled}
                        onClick={() => onToggle(m.id, a.id)}
                        aria-label={`${a.label} ${m.label}`}
                        aria-pressed={on}
                        className={`mx-auto flex h-7 w-7 items-center justify-center rounded-md border transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                          on
                            ? "border-[#176137] bg-[#176137] text-white"
                            : "border-slate-300 bg-white text-transparent hover:border-[#176137]"
                        }`}
                      >
                        <Check size={14} />
                      </button>
                    </td>
                  );
                })}
 
                <td className="px-3 py-3 text-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[#176137]"
                    checked={allOn}
                    disabled={disabled}
                    onChange={() => onToggleRow(m.id, !allOn)}
                    aria-label={`Semua akses ${m.label}`}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
 