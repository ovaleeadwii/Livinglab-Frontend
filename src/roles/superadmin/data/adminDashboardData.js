// Data CONTOH untuk dashboard Super Admin (diambil dari mockup Figma).
// Nanti diganti dengan data dari API Laravel (Fajar) / agregasi KPI (Anis).
// Bentuk datanya sengaja dibuat sederhana supaya mudah dipetakan dari response API.

export const STAT_CARDS = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: "Rp 184.250.000",
    sub: "↗ +14.8% MoM",
    subTone: "up",
    footLabel: "Take-rate Fee",
    footValue: "7.5%",
  },
  {
    id: "gmv",
    label: "Total GMV",
    value: "Rp 2.456,8M",
    sub: "24.810 Trx Berhasil",
    footLabel: "Avg Order Val",
    footValue: "Rp 99.020",
  },
  {
    id: "users",
    label: "Total Users",
    value: "24.850 Akun",
    sub: "8 Adm • 342 Rsl",
    footLabel: "KYC Verified",
    footValue: "98.2%",
  },
  {
    id: "resellers",
    label: "Mitra Reseller",
    value: "342 Toko",
    sub: "94.2% Retensi MoM",
    subTone: "up",
    footLabel: "Avg Omset/Rs",
    footValue: "Rp 7.18M",
  },
  {
    id: "mau",
    label: "Customer MAU",
    value: "16.628 MAU",
    sub: "67.8% Repeat Order",
    subTone: "up",
    footLabel: "Cohort 30d",
    footValue: "+18.4%",
  },
  {
    id: "fee",
    label: "Platform Fee",
    value: "7.5%",
    sub: "Flat Dinamis",
    footLabel: "Policy R1 Lock",
    footValue: "SuperAdmin",
  },
];

export const GROWTH_PERIODS = [
  { id: "7d", label: "7 Hari" },
  { id: "30d", label: "30 Hari" },
  { id: "3m", label: "3 Bulan" },
  { id: "ytd", label: "Tahun Ini" },
];

// Angka grafik CONTOH (ribuan pengguna)
export const GROWTH_CHART = {
  labels: ["Nov 24", "Des 24", "Jan 25", "Feb 25", "Mar 25", "Apr 25 (Berjalan)"],
  customers: [9.8, 11.6, 14.2, 17.5, 21.0, 24.5],
  resellers: [6.1, 7.0, 8.3, 9.9, 11.8, 13.6],
  summary: [
    { label: "Cust Baru / Bln", value: "+3.480", note: "avg" },
    { label: "Reseller Baru / Bln", value: "+48", note: "mitra" },
    { label: "Conversion Ratio", value: "1 : 72.5" },
    { label: "Status Sync", value: "● Live 14:30 WIB", live: true },
  ],
};

export const TOP_RESELLERS = [
  { rank: 1, name: "Toko Segar Nusantara", rating: 4.9, area: "Gisting", orders: "1.420", gmv: "Rp 342.800.000", commission: "Rp 25.6M" },
  { rank: 2, name: "Mitra Tani Pringsewu", rating: 4.8, area: "Pringsewu", orders: "980", gmv: "Rp 218.000.000", commission: "Rp 16.3M" },
  { rank: 3, name: "Sentra Hidroponik Lampung", rating: 4.6, area: "Bandar Lampung", orders: "760", gmv: "Rp 165.000.000", commission: "Rp 12.3M" },
  { rank: 4, name: "Berkah Sayur Organik", rating: 4.7, area: "Gisting Bawah", orders: "430", gmv: "Rp 94.500.000", commission: "Rp 7.0M" },
];

export const INFO_CARDS = [
  {
    id: "admins",
    label: "Admin Aktif",
    value: "8 Petugas",
    desc: "100% 2FA Hardware Enforced. 3 di Packhouse Gisting, 5 di Hub Logistik Pusat.",
    footLeft: "Role: 1 R1 • 7 Ops",
    footRight: "Kelola",
    dot: true,
  },
  {
    id: "catalog",
    label: "Katalog Produk",
    value: "14 Kategori",
    desc: "68 Varian Aktif (Melon Golden Emerald, Pakcoy NFT Grade A & B).",
    footLeft: "12 Pre-Order Batch",
    footRight: "SKU Sync: OK",
  },
  {
    id: "disputes",
    label: "Komplain & Dispute",
    value: "2 Kasus Terbuka",
    tone: "danger",
    badge: { text: "Perhatian", tone: "danger" },
    desc: "1 Investigasi Suhu Kargo cold-chain #104, 1 Permohonan Upgrade Mitra Toko.",
    footLeft: "SLA: 2 Jam Tersisa",
    footRight: "Investigasi",
  },
  {
    id: "iot",
    label: "IoT Greenhouse",
    value: "21.4°C • RH 78%",
    tone: "success",
    badge: { text: "Normal", tone: "success" },
    desc: "Suhu nocturnal optimal. Drip cycle solenoid valve #03 sedang aktif otomatis.",
    footLeft: "pH 6.1 • EC 1.8 mS/cm",
    footRight: "Terkontrol",
  },
];

export const AUDIT_LOGS = [
  {
    id: 1,
    time: "14:20",
    admin: "Ovalia Dwi",
    role: "Super Admin R1",
    action: "Penyesuaian Platform Fee",
    target: "Kebijakan Finansial Q2",
    before: "7.0%",
    after: "7.5% Take-Rate",
    tone: "success",
  },
  {
    id: 2,
    time: "13:15",
    admin: "Budi Santoso",
    role: "Admin IoT Cluster",
    action: "Override Setpoint Nutrisi EC",
    target: "Pakcoy NFT Zone B",
    before: "1.6 mS",
    after: "1.8 mS/cm",
    tone: "success",
  },
  {
    id: 3,
    time: "11:40",
    admin: "Sari Wulandari",
    role: "Admin Kurasi",
    action: "Verifikasi Mitra Reseller",
    target: "Toko Segar Sejahtera",
    before: "Pending",
    after: "Approved",
    tone: "success",
  },
  {
    id: 4,
    time: "09:20",
    admin: "Yoga Pratama",
    role: "Admin Logistik",
    action: "Insiden Escrow #104",
    target: "Suhu Kontainer Fluktuatif",
    before: "Ditinjau",
    after: "Refund Rp 450rb",
    tone: "danger",
  },
];
