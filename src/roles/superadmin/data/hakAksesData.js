// Data CONTOH untuk menu Manajemen Hak Akses (SRS FR-SA-05).
// Nanti diganti data dari API Laravel (tabel ROLES / PERMISSIONS).
 
// Jenis aksi pada matriks permission (CRUDA di SRS).
export const ACTIONS = [
  { id: "create", label: "Create", short: "C" },
  { id: "read", label: "Read", short: "R" },
  { id: "update", label: "Update", short: "U" },
  { id: "delete", label: "Delete", short: "D" },
  { id: "approve", label: "Approve", short: "A" },
];
 
// Menu yang bisa diakses Admin (sesuai folder src/roles/admin).
// financial: true -> wewenang finansial, hanya aktif kalau Super Admin centang manual (BR-04).
export const MODULES = [
  { id: "dashboard", label: "Dashboard", desc: "Ringkasan operasional BUMDes", actions: ["read"] },
  { id: "transaksi", label: "Transaksi", desc: "Pesanan, pembayaran, escrow", actions: ["read", "update", "approve"], financial: true },
  { id: "moderasi-produk", label: "Moderasi Produk", desc: "Review & QC produk reseller", actions: ["read", "update", "delete", "approve"] },
  { id: "kategori", label: "Kategori", desc: "Kategori & sub-kategori produk", actions: ["create", "read", "update", "delete"] },
  { id: "manajemen-user", label: "Manajemen User", desc: "Akun customer & reseller", actions: ["read", "update", "approve"] },
  { id: "laporan", label: "Laporan", desc: "Laporan penjualan & pendapatan", actions: ["read"], financial: true },
  { id: "notifikasi-dispute", label: "Dispute", desc: "Komplain & retur pembeli", actions: ["read", "update", "approve"], financial: true },
];
 
// Hak akses awal per admin (key = id admin di adminManagementData.js).
// Isi: { [moduleId]: [actionId, ...] }
export const ADMIN_PERMISSIONS = {
  1: { dashboard: ["read"], "moderasi-produk": ["read", "update"], laporan: ["read"] },
  2: { dashboard: ["read"], "moderasi-produk": ["read", "update", "approve"], kategori: ["create", "read", "update"], "manajemen-user": ["read", "approve"] },
  3: { dashboard: ["read"], transaksi: ["read", "update"], "notifikasi-dispute": ["read"] },
  4: { dashboard: ["read"], "moderasi-produk": ["read"] },
  5: { dashboard: ["read"], "manajemen-user": ["read", "update", "approve"] },
  6: {},
  7: { dashboard: ["read"], "moderasi-produk": ["read", "update", "delete", "approve"], kategori: ["read"] },
  8: { dashboard: ["read"], transaksi: ["read"], laporan: ["read"] },
};
 
// Template cepat supaya Super Admin tidak perlu centang satu per satu.
export const PRESETS = [
  { id: "viewer", label: "Hanya Lihat", perms: { dashboard: ["read"], transaksi: ["read"], "moderasi-produk": ["read"], kategori: ["read"], "manajemen-user": ["read"], laporan: ["read"], "notifikasi-dispute": ["read"] } },
  { id: "kurasi", label: "Kurasi Produk", perms: { dashboard: ["read"], "moderasi-produk": ["read", "update", "delete", "approve"], kategori: ["create", "read", "update", "delete"] } },
  { id: "operasional", label: "Operasional", perms: { dashboard: ["read"], transaksi: ["read", "update"], "manajemen-user": ["read", "update"], "notifikasi-dispute": ["read", "update"] } },
];
 