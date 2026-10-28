import React, { useMemo, useState } from "react";
import { Search, KeyRound, ShieldAlert, Save, RotateCcw, History, Wallet, Users } from "lucide-react";
import PermissionMatrix from "./PermissionMatrix";
import { ADMINS, DIVISIONS } from "../data/adminManagementData";
import { ACTIONS, MODULES, ADMIN_PERMISSIONS, PRESETS } from "../data/hakAksesData";
 
// Hitung jumlah centang dalam satu objek permission.
const countPerms = (perms) => Object.values(perms).reduce((sum, list) => sum + list.length, 0);
 
// Ubah objek permission jadi daftar teks, mis. "Transaksi: Read".
const toList = (perms) =>
  MODULES.flatMap((m) =>
    (perms[m.id] || []).map((a) => `${m.label}: ${ACTIONS.find((x) => x.id === a)?.label}`)
  );
 
const divisionLabel = (id) => DIVISIONS.find((d) => d.id === id)?.label || id;
 
// Isi menu "Manajemen Hak Akses" (SRS FR-SA-05).
// Sementara data disimpan di state (hilang saat refresh). Nanti diganti API Laravel.
export default function HakAksesManagement() {
  const [allPerms, setAllPerms] = useState(ADMIN_PERMISSIONS);
  const [selectedId, setSelectedId] = useState(ADMINS[0]?.id);
  const [draft, setDraft] = useState(ADMIN_PERMISSIONS[ADMINS[0]?.id] || {});
  const [search, setSearch] = useState("");
  const [logs, setLogs] = useState([]);
 
  const selected = ADMINS.find((a) => a.id === selectedId);
  const saved = allPerms[selectedId] || {};
 
  // Perbandingan sebelum/sesudah untuk tombol Simpan & audit log.
  const before = toList(saved);
  const after = toList(draft);
  const added = after.filter((x) => !before.includes(x));
  const removed = before.filter((x) => !after.includes(x));
  const isDirty = added.length + removed.length > 0;
 
  const filteredAdmins = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ADMINS.filter((a) => !q || a.name.toLowerCase().includes(q) || a.nip.toLowerCase().includes(q));
  }, [search]);
 
  const financialCount = ADMINS.filter((a) =>
    MODULES.some((m) => m.financial && (allPerms[a.id]?.[m.id] || []).length > 0)
  ).length;
  const noAccessCount = ADMINS.filter((a) => countPerms(allPerms[a.id] || {}) === 0).length;
 
  const selectAdmin = (id) => {
    if (isDirty && !window.confirm("Perubahan belum disimpan. Pindah admin dan buang perubahan?")) return;
    setSelectedId(id);
    setDraft(allPerms[id] || {});
  };
 
  const toggle = (moduleId, actionId) => {
    setDraft((prev) => {
      const list = prev[moduleId] || [];
      const next = list.includes(actionId) ? list.filter((a) => a !== actionId) : [...list, actionId];
      return { ...prev, [moduleId]: next };
    });
  };
 
  const toggleRow = (moduleId, turnOn) => {
    const module = MODULES.find((m) => m.id === moduleId);
    setDraft((prev) => ({ ...prev, [moduleId]: turnOn ? [...module.actions] : [] }));
  };
 
  const applyPreset = (preset) => setDraft(preset.perms);
 
  const save = () => {
    // SRS FR-SA-05: kalau semua akses dihapus, minta konfirmasi tambahan.
    if (countPerms(draft) === 0 && !window.confirm(`Hapus SELURUH akses ${selected.name}? Admin ini tidak akan bisa membuka menu apa pun.`)) {
      return;
    }
    // TODO (backend): PUT permission admin ke API Laravel + catat AUDIT_LOGS (before/after)
    setAllPerms((prev) => ({ ...prev, [selectedId]: draft }));
    setLogs((prev) => [
      {
        id: Date.now(),
        time: new Date().toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" }),
        admin: selected.name,
        added,
        removed,
      },
      ...prev,
    ]);
  };
 
  const stats = [
    { label: "Admin Terdaftar", icon: Users, value: ADMINS.length, unit: "Akun" },
    { label: "Menu Terkontrol", icon: KeyRound, value: MODULES.length, unit: "Modul", note: "Matriks CRUDA per menu" },
    { label: "Akses Finansial", icon: Wallet, value: financialCount, unit: "Admin", note: "Delegasi eksplisit (BR-04)" },
    { label: "Tanpa Akses", icon: ShieldAlert, value: noAccessCount, unit: "Admin", note: "Belum diberi menu apa pun" },
  ];
 
  return (
    <div className="space-y-6">
      {/* Judul */}
      <div>
        <div className="font-mono text-[10px] font-bold text-[#176137]">
          RBAC • LEAST PRIVILEGE <span className="text-slate-400">• Semua perubahan tercatat di Audit Log</span>
        </div>
        <h1 className="mt-1 text-3xl font-extrabold text-slate-900">Manajemen Hak Akses</h1>
        <p className="mt-1 text-sm text-slate-500">
          Atur menu dan aksi yang boleh dijalankan setiap Admin. Pilih admin di kiri, lalu centang aksesnya.
        </p>
      </div>
 
      {/* Kartu statistik */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <article key={s.label} className="rounded-xl border border-slate-200 border-t-4 border-t-[#176137] bg-white p-4">
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">{s.label}</span>
                <Icon size={16} className="text-[#176137]" />
              </div>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-slate-900">{s.value}</span>
                <span className="text-sm text-slate-600">{s.unit}</span>
              </div>
              {s.note && <p className="mt-2 font-mono text-[10px] text-slate-500">{s.note}</p>}
            </article>
          );
        })}
      </div>
 
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
        {/* Daftar admin */}
        <section className="w-full shrink-0 rounded-2xl border border-slate-200 bg-white p-4 xl:w-72">
          <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <Search size={14} className="text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama atau NIP..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </label>
          <ul className="mt-3 space-y-1">
            {filteredAdmins.map((a) => {
              const active = a.id === selectedId;
              const total = countPerms(allPerms[a.id] || {});
              return (
                <li key={a.id}>
                  <button
                    type="button"
                    onClick={() => selectAdmin(a.id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                      active ? "bg-green-50 ring-1 ring-[#176137]" : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#176137] text-xs font-bold text-white">
                      {a.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold text-slate-800">{a.name}</div>
                      <div className="font-mono text-[10px] text-slate-500">
                        {a.nip} {a.status === "suspend" && <span className="text-red-600">• SUSPEND</span>}
                      </div>
                    </div>
                    <span className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold ${total ? "bg-green-100 text-[#176137]" : "bg-red-100 text-red-600"}`}>
                      {total}
                    </span>
                  </button>
                </li>
              );
            })}
            {filteredAdmins.length === 0 && <li className="px-3 py-6 text-center text-sm text-slate-500">Admin tidak ditemukan.</li>}
          </ul>
        </section>
 
        {/* Matriks hak akses */}
        <section className="min-w-0 flex-1 space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
          {selected ? (
            <>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{selected.name}</h2>
                  <p className="text-sm text-slate-500">
                    {divisionLabel(selected.division)} • {selected.email}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] text-slate-500">TEMPLATE:</span>
                  {PRESETS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => applyPreset(p)}
                      className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:border-[#176137] hover:text-[#176137]"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
 
              {selected.status === "suspend" && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                  <ShieldAlert size={16} /> Admin ini sedang di-suspend. Akses tidak berlaku sampai diaktifkan lagi.
                </div>
              )}
 
              <PermissionMatrix permissions={draft} onToggle={toggle} onToggleRow={toggleRow} />
 
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                <p className="text-sm text-slate-500">
                  {isDirty ? (
                    <>
                      <span className="font-semibold text-[#176137]">+{added.length}</span> ditambah,{" "}
                      <span className="font-semibold text-red-600">-{removed.length}</span> dicabut (belum disimpan)
                    </>
                  ) : (
                    "Tidak ada perubahan."
                  )}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setDraft(saved)}
                    disabled={!isDirty}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                  >
                    <RotateCcw size={14} /> Batal
                  </button>
                  <button
                    type="button"
                    onClick={save}
                    disabled={!isDirty}
                    className="flex items-center gap-2 rounded-lg bg-[#176137] px-4 py-2 text-sm font-semibold text-white hover:bg-[#12542e] disabled:opacity-50"
                  >
                    <Save size={14} /> Simpan Perubahan
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p className="py-10 text-center text-sm text-slate-500">Belum ada admin. Tambahkan dulu di menu Manajemen Admin.</p>
          )}
        </section>
      </div>
 
      {/* Riwayat perubahan sesi ini (contoh isi AUDIT_LOGS before/after) */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h3 className="flex items-center gap-2 font-bold text-slate-800">
          <History size={16} className="text-[#176137]" /> Riwayat Perubahan Hak Akses
        </h3>
        {logs.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">Belum ada perubahan di sesi ini.</p>
        ) : (
          <ul className="mt-3 divide-y divide-slate-100">
            {logs.map((log) => (
              <li key={log.id} className="py-3 text-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-slate-800">{log.admin}</span>
                  <span className="font-mono text-[10px] text-slate-400">{log.time}</span>
                </div>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {log.added.map((x) => (
                    <span key={`+${x}`} className="rounded bg-green-100 px-1.5 py-0.5 text-[11px] text-[#176137]">+ {x}</span>
                  ))}
                  {log.removed.map((x) => (
                    <span key={`-${x}`} className="rounded bg-red-100 px-1.5 py-0.5 text-[11px] text-red-600">- {x}</span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
 