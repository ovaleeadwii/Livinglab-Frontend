// Data CONTOH untuk menu Manajemen Admin (dari mockup Figma).
// Nanti diganti data dari API Laravel (FR-SA-04 Manajemen Admin).

export const DIVISIONS = [
  { id: "iot", label: "IoT & Greenhouse Lead" },
  { id: "kurasi", label: "Kurasi Mitra & Reseller" },
  { id: "logistik", label: "Logistik Rantai Dingin" },
  { id: "agronomi", label: "Agronomis & IoT Dosing" },
  { id: "onboarding", label: "Onboarding Reseller" },
  { id: "qc", label: "QC & Packhouse Gisting" },
  { id: "dosing", label: "Smart Farming IoT & Sensor Dosing" },
];

export const ADMINS = [
  { id: 1, name: "Budi Santoso, S.P.", nip: "AG-ADM-001", email: "budi.santoso@agricore.id", division: "iot", joined: "12 Jan 2024", status: "aktif", online: true, twoFA: true },
  { id: 2, name: "Sari Wulandari, S.E.", nip: "AG-ADM-002", email: "sari.wulandari@agricore.id", division: "kurasi", joined: "04 Feb 2024", status: "aktif", online: true, twoFA: true },
  { id: 3, name: "Yoga Pratama, S.Log.", nip: "AG-ADM-003", email: "yoga.pratama@agricore.id", division: "logistik", joined: "18 Mar 2024", status: "aktif", online: true, twoFA: true },
  { id: 4, name: "Hendra Kusuma", nip: "AG-ADM-004", email: "hendra@agricore.id", division: "agronomi", joined: "22 Apr 2024", status: "aktif", online: true, twoFA: true },
  { id: 5, name: "Dewi Lestari", nip: "AG-ADM-005", email: "dewi.l@agricore.id", division: "onboarding", joined: "10 Mei 2024", status: "aktif", online: true, twoFA: true },
  { id: 6, name: "Fajar Ramadhan", nip: "AG-ADM-006", email: "fajar.r@agricore.id", division: "qc", joined: "15 Jun 2024", status: "suspend", online: false, twoFA: true },
  { id: 7, name: "Nadia Putri", nip: "AG-ADM-007", email: "nadia.p@agricore.id", division: "kurasi", joined: "02 Jul 2024", status: "aktif", online: true, twoFA: true },
  { id: 8, name: "Rizky Maulana", nip: "AG-ADM-008", email: "rizky.m@agricore.id", division: "logistik", joined: "19 Agu 2024", status: "aktif", online: false, twoFA: true },
];
