import React from "react";
import {
  Pencil,
  PauseCircle,
  PlayCircle,
  Trash2,
  Sprout,
  Store,
  Snowflake,
  Droplet,
  UserPlus,
  ClipboardCheck,
  Cpu,
} from "lucide-react";
import { DIVISIONS } from "../data/adminManagementData";

const DIVISION_ICON = {
  iot: Sprout,
  kurasi: Store,
  logistik: Snowflake,
  agronomi: Droplet,
  onboarding: UserPlus,
  qc: ClipboardCheck,
  dosing: Cpu,
};

const initials = (name) =>
  name
    .split(",")[0]
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

// Tabel daftar admin + pagination.
export default function AdminTable({ admins, page, totalPages, totalCount, pageSize, onPageChange, onEdit, onToggleStatus, onDelete }) {
  const start = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalCount);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr className="bg-slate-100 font-mono text-[10px] uppercase text-slate-600">
              <th className="rounded-l-lg px-3 py-3 font-semibold">Nama &amp; NIP</th>
              <th className="px-3 py-3 font-semibold">Email Resmi</th>
              <th className="px-3 py-3 font-semibold">Divisi / Role</th>
              <th className="px-3 py-3 font-semibold">Tanggal Bergabung</th>
              <th className="px-3 py-3 font-semibold">Status</th>
              <th className="rounded-r-lg px-3 py-3 text-right font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a) => {
              const suspended = a.status === "suspend";
              const Icon = DIVISION_ICON[a.division] || Sprout;
              const divisionLabel = DIVISIONS.find((d) => d.id === a.division)?.label || a.division;
              return (
                <tr key={a.id} className={`border-b border-slate-100 ${suspended ? "bg-red-50/50" : ""}`}>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                          suspended ? "bg-red-100 text-red-600" : "bg-green-100 text-[#176137]"
                        }`}
                      >
                        {initials(a.name)}
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{a.name}</div>
                        <div className="font-mono text-[10px] text-slate-500">NIP: {a.nip}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 font-mono text-xs text-slate-700">{a.email}</td>
                  <td className="px-3 py-3">
                    <span className="flex items-center gap-2 text-sm text-slate-700">
                      <Icon size={14} className={suspended ? "text-red-500" : "text-[#176137]"} />
                      {divisionLabel}
                    </span>
                  </td>
                  <td className="px-3 py-3 font-mono text-xs text-slate-600">{a.joined}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        suspended ? "bg-red-100 text-red-600" : "bg-green-100 text-[#176137]"
                      }`}
                    >
                      ● {suspended ? "Suspend" : "Aktif"}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex justify-end gap-1 text-slate-500">
                      <button type="button" title="Edit" onClick={() => onEdit(a)} className="rounded-md p-1.5 hover:bg-slate-100 hover:text-slate-900">
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        title={suspended ? "Aktifkan" : "Suspend"}
                        onClick={() => onToggleStatus(a.id)}
                        className="rounded-md p-1.5 hover:bg-slate-100 hover:text-slate-900"
                      >
                        {suspended ? <PlayCircle size={15} className="text-[#176137]" /> : <PauseCircle size={15} />}
                      </button>
                      <button type="button" title="Hapus" onClick={() => onDelete(a)} className="rounded-md p-1.5 hover:bg-red-50 hover:text-red-600">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {admins.length === 0 && (
              <tr>
                <td colSpan={6} className="py-10 text-center text-sm text-slate-400">
                  Tidak ada admin yang cocok dengan pencarian/filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <span>
          Menampilkan <b className="text-slate-800">{start} - {end}</b> dari <b className="text-slate-800">{totalCount}</b> admin terverifikasi
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="rounded-md border border-slate-200 px-3 py-1.5 disabled:opacity-40"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onPageChange(n)}
              className={`h-8 w-8 rounded-md text-xs font-semibold ${
                n === page ? "bg-[#176137] text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="rounded-md border border-slate-200 px-3 py-1.5 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
