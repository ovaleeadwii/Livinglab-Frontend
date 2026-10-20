export const STAT_CARDS = [
  { label: "Total Revenue", value: "Rp 128.450.000", change: "+12.5%", isPositive: true },
  { label: "Transaksi Sukses", value: "1.420", change: "+8.2%", isPositive: true },
  { label: "Mitra Reseller Aktif", value: "86", change: "+4", isPositive: true },
  { label: "Petani Terdaftar", value: "312", change: "+15", isPositive: true },
  { label: "Komisi Pending", value: "Rp 14.200.000", change: "-2.1%", isPositive: false },
  { label: "Platform Fee", value: "Rp 6.420.000", change: "+5.4%", isPositive: true },
];

export const GROWTH_CHART = {
  labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt"],
  datasets: [
    {
      label: "Revenue 2026",
      data: [12, 19, 15, 25, 22, 30, 28, 35, 40, 48],
      borderColor: "#059669",
      backgroundColor: "rgba(5, 150, 105, 0.1)",
      fill: true,
      tension: 0.4,
    },
  ],
};

export const GROWTH_PERIODS = ["Mingguan", "Bulanan", "Tahunan"];

export const TOP_RESELLERS = [
  { name: "Koperasi Tani Makmur", sales: "Rp 42.500.000", status: "Aktif" },
  { name: "AgriStore Gisting", sales: "Rp 28.100.000", status: "Aktif" },
  { name: "Toko Tani Sejahtera", sales: "Rp 19.400.000", status: "Aktif" },
  { name: "Mitra Hijau Agropolitan", sales: "Rp 15.200.000", status: "Aktif" },
];

export const INFO_CARDS = [
  { title: "Status IoT Telemetri", value: "98.4% Online", desc: "12 Node Aktif di Lahat/Gisting" },
  { title: "Ketersediaan Stok", value: "2.450 Kg", desc: "Sayur & Komoditas Siap Distribusi" },
  { title: "Antrean Pencairan", value: "8 Permintaan", desc: "Butuh verifikasi Super Admin" },
  { title: "Sistem AI Anomali", value: "Normal", desc: "Tidak terdeteksi kegagalan granulasi" },
];

export const AUDIT_LOGS = [
  { id: 1, user: "Super Admin R1", action: "Verifikasi Pencairan Komisi", target: "Koperasi Tani Makmur", time: "10 menit lalu" },
  { id: 2, user: "Admin Logistik", action: "Pembaruan Stok Komoditas", target: "Gudang Gisting B", time: "25 menit lalu" },
  { id: 3, user: "System IoT", action: "Peringatan Suhu Greenhouse", target: "Node #04 Gisting", time: "1 jam lalu" },
  { id: 4, user: "Super Admin R1", action: "Persetujuan Mitra Baru", target: "AgriStore Gisting", time: "3 jam lalu" },
];