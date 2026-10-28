import React, { useMemo, useState } from "react";
import { Search, RotateCcw, UserPlus, Users, Radio, ShieldCheck, BadgeCheck } from "lucide-react";
import AdminTable from "./AdminTable";
import AddAdminForm from "./AddAdminForm";
import { ADMINS, DIVISIONS } from "../data/adminManagementData";

const PAGE_SIZE = 6;

const todayLabel = () =>
  new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });

// Isi menu "Manajemen Admin" (SRS FR-SA-04).
// Sementara data disimpan di state (hilang saat refresh). Nanti diganti API Laravel.
export default function AdminManagement() {
  const [admins, setAdmins] = useState(ADMINS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [divisionFilter, setDivisionFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return admins.filter((a) => {
      const matchSearch =
        !q || a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q) || a.nip.toLowerCase().includes(q);
      const matchStatus = statusFilter === "all" || a.status === statusFilter;
      const matchDivision = divisionFilter === "all" || a.division === divisionFilter;
      return matchSearch && matchStatus && matchDivision;
    });
  }, [admins, search, statusFilter, divisionFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const activeCount = admins.filter((a) => a.status === "aktif").length;
  const suspendCount = admins.length - activeCount;
  const onlineCount = admins.filter((a) => a.online && a.status === "aktif").length;
  const twoFAPercent = admins.length ? Math.round((admins.filter((a) => a.twoFA).length / admins.length) * 100) : 0;

  const nextNip = `AG-ADM-${String(admins.length + 1).padStart(3, "0")}`;

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setDivisionFilter("all");
    setPage(1);
  };

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (admin) => {
    setEditing(admin);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
  };

  const saveAdmin = (data) => {
    if (editing) {
      setAdmins((prev) => prev.map((a) => (a.id === editing.id ? { ...a, name: data.name, email: data.email, division: data.division } : a)));
    } else {
      // TODO (backend): POST ke API Laravel + kirim email kredensial (FR-SA-04)
      setAdmins((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: data.name,
          nip: nextNip,
          email: data.email,
          division: data.division,
          joined: todayLabel(),
          status: "aktif",
          online: false,
          twoFA: data.force2FA,
        },
      ]);
    }
    closeForm();
  };

  const toggleStatus = (id) => {
    // TODO (backend): PATCH status admin + catat AUDIT_LOGS
    setAdmins((prev) => prev.map((a) => (a.id === id ? { ...a, status: a.status === "aktif" ? "suspend" : "aktif" } : a)));
  };

  const deleteAdmin = (admin) => {
    // SRS: admin yang masih punya tugas tertunda sebaiknya di-suspend, bukan dihapus.
    if (!window.confirm(`Hapus admin ${admin.name}? Tindakan ini tidak bisa dibatalkan.`)) return;
    // TODO (backend): DELETE admin
    setAdmins((prev) => prev.filter((a) => a.id !== admin.id));
  };

  const stats = [
    {
      label: "Total Admin Terdaftar",
      icon: Users,
      value: admins.length,
      unit: "Personel",
      extra: (
        <div className="mt-2 flex gap-1.5 text-[10px] font-semibold">
          <span className="rounded bg-green-100 px-1.5 py-0.5 text-[#176137]">{activeCount} Aktif</span>
          <span className="rounded bg-red-100 px-1.5 py-0.5 text-red-600">{suspendCount} Suspend</span>
        </div>
      ),
    },
    {
      label: "Admin Online",
      icon: Radio,
      badge: "LIVE",
      value: onlineCount,
      unit: "Sesi Aktif",
      note: "Cluster Gisting & Regional HQ",
    },
    {
      label: "Tingkat 2FA",
      icon: ShieldCheck,
      value: `${twoFAPercent}%`,
      unit: "Enforced",
      unitGreen: true,
      note: "Terverifikasi FIDO2 / Passkey / TOTP",
    },
    {
      label: "Kepatuhan Kebijakan",
      icon: BadgeCheck,
      value: "ISO/IEC 27001",
      small: true,
      note: "ISMS Compliant & Audited",
      noteGreen: true,
    },
  ];

  const selectClass = "rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#176137]";

  return (
    <div className="space-y-6">
      {/* Judul */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] font-bold text-[#176137]">
            AKSES &amp; OTENTIKASI ROOT R1 <span className="text-slate-400">• Secured By Sentinel Guard</span>
          </div>
          <h1 className="mt-1 text-3xl font-extrabold text-slate-900">Manajemen Admin</h1>
          <p className="mt-1 text-sm text-slate-500">
            Kelola akun administrator operasional, status kredensial, dan provisi akses root R1.
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="flex items-center gap-2 rounded-lg bg-[#176137] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#12542e]"
        >
          <UserPlus size={16} /> Tambah Admin
        </button>
      </div>

      {/* Kartu statistik */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <article key={s.label} className="rounded-xl border border-slate-200 border-t-4 border-t-[#176137] bg-white p-4">
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">{s.label}</span>
                {s.badge ? (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 font-mono text-[9px] font-bold text-[#176137]">● {s.badge}</span>
                ) : (
                  <Icon size={16} className="text-[#176137]" />
                )}
              </div>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className={`font-extrabold text-slate-900 ${s.small ? "text-xl" : "text-3xl"}`}>{s.value}</span>
                {s.unit && <span className={`text-sm ${s.unitGreen ? "font-semibold text-[#176137]" : "text-slate-600"}`}>{s.unit}</span>}
              </div>
              {s.extra}
              {s.note && (
                <p className={`mt-2 font-mono text-[10px] ${s.noteGreen ? "font-semibold text-[#176137]" : "text-slate-500"}`}>{s.note}</p>
              )}
            </article>
          );
        })}
      </div>

      {/* Tabel + form */}
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
        <section className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <label className="flex min-w-[220px] flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <Search size={14} className="text-slate-400" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Cari nama, email @agricore.id, atau NIP..."
                className="w-full bg-transparent text-sm outline-none"
              />
            </label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className={selectClass}
            >
              <option value="all">Semua Status</option>
              <option value="aktif">Aktif</option>
              <option value="suspend">Suspend</option>
            </select>
            <select
              value={divisionFilter}
              onChange={(e) => {
                setDivisionFilter(e.target.value);
                setPage(1);
              }}
              className={selectClass}
            >
              <option value="all">Semua Divisi</option>
              {DIVISIONS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={resetFilters}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
            >
              <RotateCcw size={14} /> Reset
            </button>
          </div>

          <AdminTable
            admins={pageItems}
            page={currentPage}
            totalPages={totalPages}
            totalCount={filtered.length}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
            onEdit={openEdit}
            onToggleStatus={toggleStatus}
            onDelete={deleteAdmin}
          />
        </section>

        {formOpen && (
          <div className="w-full shrink-0 xl:w-80">
            <AddAdminForm key={editing ? editing.id : "new"} nextNip={nextNip} editing={editing} onCancel={closeForm} onSave={saveAdmin} />
          </div>
        )}
      </div>
    </div>
  );
}
