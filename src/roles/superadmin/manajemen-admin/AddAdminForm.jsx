import React, { useEffect, useState } from "react";
import { KeyRound, X, RefreshCw, Copy, Send, Check } from "lucide-react";
import { DIVISIONS } from "../data/adminManagementData";

const makePassword = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%";
  let out = "Agri";
  for (let i = 0; i < 8; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
};

const EMAIL_DOMAIN = "@agricore.id";

// Panel kanan "Tambah Administrator Baru" (juga dipakai untuk Edit).
// editing = data admin yang sedang diedit, atau null untuk admin baru.
export default function AddAdminForm({ nextNip, editing, onCancel, onSave }) {
  const [name, setName] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [password, setPassword] = useState(makePassword);
  const [division, setDivision] = useState("dosing");
  const [forceChange, setForceChange] = useState(true);
  const [force2FA, setForce2FA] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  // Isi form saat mode edit
  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setEmailUser(editing.email.replace(EMAIL_DOMAIN, ""));
      setDivision(editing.division);
    }
  }, [editing]);

  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setError("Gagal menyalin password, salin manual ya.");
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !emailUser.trim()) {
      setError("Nama dan email wajib diisi.");
      return;
    }
    if (!/^[a-z0-9._-]+$/i.test(emailUser.trim())) {
      setError("Bagian depan email hanya boleh huruf, angka, titik, - dan _.");
      return;
    }
    setError("");
    onSave({
      name: name.trim(),
      email: emailUser.trim().toLowerCase() + EMAIL_DOMAIN,
      division,
      password,
      forceChange,
      force2FA,
    });
  };

  const isEdit = !!editing;
  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#176137] focus:bg-white";

  return (
    <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-[#176137]">
            <KeyRound size={12} /> {isEdit ? "EDIT KREDENSIAL" : "KREDENSIAL BARU"}
          </div>
          <h3 className="mt-1 text-lg font-bold text-slate-900">
            {isEdit ? "Edit Administrator" : "Tambah Administrator Baru"}
          </h3>
          <p className="text-xs text-slate-500">
            {isEdit
              ? "Perbarui data administrator."
              : "Akun baru akan menerima tautan aktivasi dan token OTP sementara melalui email resmi."}
          </p>
        </div>
        <button type="button" onClick={onCancel} className="rounded-md p-1 text-slate-400 hover:bg-slate-100" aria-label="Tutup">
          <X size={18} />
        </button>
      </div>

      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="font-mono text-[11px] font-semibold text-slate-700">Nama Lengkap &amp; Gelar</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="contoh: Rian Firmansyah, S.T." className={`mt-1 ${inputClass}`} />
        </label>

        <label className="block">
          <span className="font-mono text-[11px] font-semibold text-slate-700">Email Resmi SSO</span>
          <div className="mt-1 flex items-center rounded-lg border border-slate-200 bg-slate-50 pr-3 focus-within:border-[#176137] focus-within:bg-white">
            <input
              value={emailUser}
              onChange={(e) => setEmailUser(e.target.value)}
              placeholder="nama.depan"
              className="w-full bg-transparent px-3 py-2.5 text-sm outline-none"
            />
            <span className="font-mono text-xs text-slate-500">{EMAIL_DOMAIN}</span>
          </div>
        </label>

        <div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] font-semibold text-slate-700">NIP / ID Petugas</span>
            <span className="font-mono text-[10px] font-semibold text-[#176137]">Auto-generated</span>
          </div>
          <div className="mt-1 rounded-lg bg-slate-100 px-3 py-2.5 font-mono text-sm text-slate-600">
            {isEdit ? editing.nip : nextNip}
          </div>
        </div>

        {!isEdit && (
          <div>
            <span className="font-mono text-[11px] font-semibold text-slate-700">Password Sementara</span>
            <div className="mt-1 flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5">
              <span className="flex-1 font-mono text-sm text-slate-700">{password}</span>
              <button type="button" title="Buat ulang" onClick={() => setPassword(makePassword())} className="rounded p-1.5 text-slate-500 hover:bg-white">
                <RefreshCw size={14} />
              </button>
              <button type="button" title="Salin" onClick={copyPassword} className="rounded p-1.5 text-slate-500 hover:bg-white">
                {copied ? <Check size={14} className="text-[#176137]" /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        )}

        <label className="block">
          <span className="font-mono text-[11px] font-semibold text-slate-700">Divisi / Hak Akses Awal</span>
          <select value={division} onChange={(e) => setDivision(e.target.value)} className={`mt-1 ${inputClass}`}>
            {DIVISIONS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>
        </label>

        {!isEdit && (
          <div className="space-y-2 text-xs text-slate-700">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={forceChange} onChange={(e) => setForceChange(e.target.checked)} className="h-4 w-4 accent-[#176137]" />
              Wajibkan ganti password saat login pertama
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={force2FA} onChange={(e) => setForce2FA(e.target.checked)} className="h-4 w-4 accent-[#176137]" />
              Aktifkan FIDO2 / TOTP 2FA secara paksa (Zero-Trust)
            </label>
          </div>
        )}

        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>}
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          Batal
        </button>
        <button type="submit" className="flex items-center gap-2 rounded-lg bg-[#176137] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#12542e]">
          <Send size={14} /> {isEdit ? "Simpan Perubahan" : "Simpan & Kirim Kredensial"}
        </button>
      </div>
    </form>
  );
}
