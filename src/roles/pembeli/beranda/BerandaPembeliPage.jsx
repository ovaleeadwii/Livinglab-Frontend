import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../../../index.css";
import {
  
ShoppingCart,
  
Leaf,
  
Truck,
  
ShieldCheck,
  
Star,
  
MapPin,
  
Store,
  
ArrowRight,
  
Sprout,
  
Droplets,
  
Layers,
  
Gift,
  
Check,
} from "lucide-react";
import logoImg from "../../../assets/logo.svg";
import pakcoyImg from "../../../assets/pakcoi (1).png";
import seladaImg from "../../../assets/selada keriting.png";
import bayamImg from "../../../assets/bayam.png";
import tomatImg from "../../../assets/tomat ceri.png";
import heroImg from "../../../assets/sayurann.png";
import netpotImg from "../../../assets/netpot.png";
import ABMIXImg from "../../../assets/ab mix.jpg";
import rockwoolImg from "../../../assets/Rockwool cubes.jpg";
import benihpakcoyImg from "../../../assets/benih pakcoy.jpg";
import abmixsayurImg from "../../../assets/ab mix sayur daun.jpg";
// Nama & harga produk disamakan dengan ShopPage, supaya keranjangnya nyambung
const PRODUK = [
  
{ name: "Pakcoy", category: "Sayuran", price: "Rp. 15.000", img: pakcoyImg, badge: "Terlaris", rating: 4.9, terjual: 320, greenhouse: "Greenhouse Utama Gisting (GH-01)" },
  
{ name: "Selada keriting", category: "Sayuran", price: "Rp. 18.000", img: seladaImg, badge: "Baru Panen", rating: 4.8, terjual: 210, greenhouse: "GH-02" },
  
{ name: "Bayam", category: "Sayuran", price: "Rp. 9.000", img: bayamImg, badge: "Hemat", rating: 4.8, terjual: 280, greenhouse: "Greenhouse Gisting (GH-02)" },
  
{ name: "Tomat Ceri", category: "Sayuran", price: "Rp. 17.000", img: tomatImg, badge: "Manis", rating: 4.7, terjual: 150, greenhouse: "GH-03" },
  
{ name: "AB MIX", category: "Nutrisi", price: "Rp. 75.000", img: ABMIXImg, badge: "Favorit", rating: 4.9, terjual: 190 },
  
{ name: "AB Mix Sayur Daun", category: "Nutrisi", price: "Rp. 45.000", img: abmixsayurImg, rating: 4.8, terjual: 120 },
  
{ name: "Rockwool cubes", category: "Media Tanam", price: "Rp. 35.000", img: rockwoolImg, rating: 4.8, terjual: 240 },
  
{ name: "Benih Pakcoy Unggul", category: "Benih", price: "Rp. 8.000", img: benihpakcoyImg, rating: 4.7, terjual: 130 },
];
// Paket hemat: 2 paket unggulan dari ShopPage (nama & harga harus sama persis)
const PAKET = [
  
{
    
name: "Paket A - Sayur Sehat",
    
category: "Paket Hemat",
    
price: "Rp. 36.000",
    
hargaNormal: "Rp. 42.000",
    
img: pakcoyImg,
    
isi: ["Pakcoy 1 ikat", "Selada keriting 1 ikat", "Bayam 1 ikat"],
  
},
  
{
    
name: "Paket B - Mulai Hidroponik",
    
category: "Paket Hemat",
    
price: "Rp. 115.000",
    
hargaNormal: "Rp. 134.000",
    
img: ABMIXImg,
    
isi: ["AB MIX 1 set", "Rockwool cubes", "Netpot Hidroponik", "Benih Pakcoy Unggul"],
  
},
];
const KATEGORI = [
  
{ nama: "Sayuran", icon: Leaf, warna: "#e7f5ea", jumlah: 4 },
  
{ nama: "Nutrisi", icon: Droplets, warna: "#e6f1fb", jumlah: 3 },
  
{ nama: "Benih", icon: Sprout, warna: "#fff4dd", jumlah: 3 },
  
{ nama: "Media Tanam", icon: Layers, warna: "#f3ece4", jumlah: 3 },
  
{ nama: "Paket Hemat", icon: Gift, warna: "#fde8e8", jumlah: 3 },
  
{ nama: "Semua", icon: Store, warna: "#eef0ee", jumlah: 13 },
];
const TOKO = [
  
{ nama: "Greenhouse Utama Gisting", kode: "GH-01", lokasi: "Gisting, Tanggamus", produk: "Pakcoy, Selada", rating: 4.9, terjual: "1,2rb" },
  
{ nama: "Greenhouse Gisting 2", kode: "GH-02", lokasi: "Gisting, Tanggamus", produk: "Bayam, Selada keriting", rating: 4.8, terjual: "860" },
  
{ nama: "Greenhouse Tomat Ceri", kode: "GH-03", lokasi: "Gisting, Tanggamus", produk: "Tomat Ceri", rating: 4.7, terjual: "540" },
];
const TAB_PRODUK = ["Semua", "Sayuran", "Nutrisi", "Media Tanam", "Benih"];
const angka = (harga) => parseInt(harga.replace(/[^0-9]/g, ""), 10) || 0;
const rupiah = (n) => "Rp. " + n.toLocaleString("id-ID");
function ambilKeranjang() {
  
try {
    
return JSON.parse(localStorage.getItem("livingSmartCart")) || {};
  
} catch {
    
return {};
  
}
}
export default function BerandaPembeliPage({ setPage, user, onLogout }) {
  
const [cart, setCart] = useState(ambilKeranjang);
  
const [tabAktif, setTabAktif] = useState("Semua");
  
const [cari, setCari] = useState("");
  
const [menuAkun, setMenuAkun] = useState(false);
  
const [pesan, setPesan] = useState("");
  
// Keranjang disimpan di tempat yang sama dengan ShopPage
  
useEffect(() => {
    
localStorage.setItem("livingSmartCart", JSON.stringify(cart));
  
}, [cart]);
  
useEffect(() => {
    
if (!pesan) return;
    
const t = setTimeout(() => setPesan(""), 2200);
    
return () => clearTimeout(t);
  
}, [pesan]);
  
const jumlahKeranjang = Object.values(cart).reduce((n, item) => n + (item.qty || 0), 0);
  
// Nama variabel di bawah disamakan dengan ShopPage karena header-nya disalin dari sana
  
const cartCount = jumlahKeranjang;
  
const cartTotal = Object.values(cart).reduce((sum, item) => sum + angka(item.price) * (item.qty || 0), 0);
  
const formatRupiah = (value) => `Rp. ${new Intl.NumberFormat("id-ID").format(value)}`;
  
const namaDepan = (user?.name || "Pembeli").split(" ")[0];
  
const tambahKeKeranjang = (item) => {
    
setCart((prev) => ({
      
...prev,
      
[item.name]: { ...item, qty: (prev[item.name]?.qty || 0) + 1 },
    
}));
    
setPesan(`${item.name} masuk keranjang`);
  
};
  
// Buka Marketplace, bisa langsung ke kategori / kata cari tertentu
  
const bukaShop = (kategori = "Semua", kata = "") => {
    
sessionStorage.setItem("shopKategori", kategori);
    
if (kata) sessionStorage.setItem("shopCari", kata);
    
setPage("shop");
  
};
  
const bukaKeranjang = () => {
    
sessionStorage.setItem("openCartAfterLogin", "1");
    
setPage("shop");
  
};
  
const handleCari = (e) => {
    
e.preventDefault();
    
bukaShop("Semua", cari.trim());
  
};
  
const produkTampil = tabAktif === "Semua" ? PRODUK : PRODUK.filter((p) => p.category === tabAktif);
  
const palingLaris = [...PRODUK].sort((a, b) => b.terjual - a.terjual).slice(0, 4);
  
return (
    
<motion.div
      
initial={{ opacity: 0, y: 10 }}
      
animate={{ opacity: 1, y: 0 }}
      
transition={{ duration: 0.4, ease: "easeOut" }}
      
className="landing-container shop-page-responsive bp-page"
      
style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
    
>
      
<style>{`
        
.bp-page {
          
min-height: 100vh;
          
background: #f6f8f6;
          
color: #1d2b21;
          
font-family: inherit;
        
}
        
.bp-page * { box-sizing: border-box; }
        
.bp-container {
          
width: min(1240px, calc(100% - 56px));
          
margin: 0 auto;
        
}
        
.bp-btn {
          
border: 0;
          
border-radius: 10px;
          
padding: 11px 18px;
          
font-size: 14px;
          
font-weight: 700;
          
cursor: pointer;
          
display: inline-flex;
          
align-items: center;
          
gap: 8px;
          
font-family: inherit;
        
}
        
.bp-btn-green { background: #176137; color: #fff; }
        
.bp-btn-green:hover { background: #124d2b; }
        
.bp-btn-line { background: #fff; color: #176137; border: 1px solid #cfe0d3; }
        
.bp-btn-line:hover { background: #f0f7f1; }
        
/* Aturan header, footer & menu disalin dari ShopPage supaya tampil sama */
        
.shop-page-responsive {
          
width: 100%;
          
max-width: 100%;
          
overflow-x: hidden;
        
}
        
.shop-page-responsive img { max-width: 100%; }
        
.shop-page-responsive .topbar { width: 100%; max-width: 100%; min-width: 0; }
        
.shop-page-responsive .logo,
        
.shop-page-responsive .search,
        
.shop-page-responsive .actions { min-width: 0; }
        
.shop-page-responsive .search input { min-width: 0; }
        
.shop-page-responsive .footer {
          
width: 100%;
          
max-width: 1320px;
          
margin-left: auto;
          
margin-right: auto;
        
}
        
.hdr-menu-btn {
  position: relative;
  height: 46px;
  padding: 0 16px 0 13px;
  border: none;
  border-radius: 12px;
  background: #165c35;
  color: #fff;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(22, 92, 53, 0.22);
  transition: .2s ease;
  flex-shrink: 0;
}
.hdr-menu-btn:hover { background: #124d2b; transform: translateY(-1px); }
.hdr-menu-badge {
  position: absolute;
  top: -7px;
  right: -7px;
  min-width: 21px;
  height: 21px;
  padding: 0 5px;
  border-radius: 999px;
  background: #e08a00;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
}
.shop-menu-btn.hdr-akun { background: #f4faf5; border-color: #d7e8da; }
.shop-menu-btn.hdr-akun span:first-child { width: 40px; height: 40px; border-radius: 50%; overflow: hidden; font-size: 18px; }
.shop-menu-btn.hdr-akun img { width: 100%; height: 100%; object-fit: cover; }
.shop-menu-btn.hdr-akun span:last-child { display: flex; flex-direction: column; min-width: 0; }
.shop-menu-btn.hdr-akun strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.shop-menu-btn.hdr-akun small { color: #6d7b72; font-size: 12px; font-weight: 500; }
@media (max-width: 900px) {
  .topbar .search { flex-basis: 100%; }
  .topbar .actions { margin-left: auto; }
}
@media (max-width: 640px) {
  .hdr-menu-btn span { display: none; }
  .hdr-menu-btn { width: 46px; padding: 0; justify-content: center; }
}
.shop-menu-btn {
          
width: 100%;
          
display: flex;
          
align-items: center;
          
gap: 14px;
          
padding: 14px 15px;
          
border: 1px solid #e6eee7;
          
border-radius: 12px;
          
background: #fff;
          
color: #173524;
          
font-size: 14px;
          
font-weight: 700;
          
text-align: left;
          
cursor: pointer;
          
transition: .2s ease;
        
}
        
.shop-menu-btn:hover {
          
background: #eff8f1;
          
border-color: #cfe3d2;
          
transform: translateX(-2px);
        
}
        
.shop-menu-btn span:first-child {
          
width: 30px;
          
height: 30px;
          
border-radius: 9px;
          
background: #eef7f0;
          
color: #176137;
          
display: inline-flex;
          
align-items: center;
          
justify-content: center;
          
font-size: 13px;
          
flex-shrink: 0;
        
}
        
/* Hero */
        
.bp-hero { padding: 36px 0 24px; }
        
.bp-hero-grid {
          
display: grid;
          
grid-template-columns: 1.15fr 1fr;
          
gap: 36px;
          
align-items: center;
        
}
        
.bp-chip {
          
display: inline-flex;
          
align-items: center;
          
gap: 6px;
          
background: #e7f5ea;
          
color: #176137;
          
font-size: 12px;
          
font-weight: 700;
          
padding: 6px 12px;
          
border-radius: 999px;
        
}
        
.bp-hero h1 {
          
font-size: clamp(30px, 4.4vw, 52px);
          
line-height: 1.08;
          
font-weight: 800;
          
letter-spacing: -0.03em;
          
margin: 16px 0 14px;
          
color: #14251a;
        
}
        
.bp-hero h1 span { color: #1f7a43; }
        
.bp-hero p.lead { color: #5c6a61; font-size: 15px; line-height: 1.7; max-width: 520px; margin: 0 0 22px; }
        
.bp-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
        
.bp-checks { display: flex; flex-wrap: wrap; gap: 18px; margin-top: 22px; color: #55635a; font-size: 13px; }
        
.bp-checks span { display: inline-flex; align-items: center; gap: 6px; }
        
.bp-checks svg { color: #1f7a43; }
        
.bp-hero-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        
.bp-hero-card {
          
background: #fff;
          
border: 1px solid #e4ebe5;
          
border-radius: 18px;
          
padding: 14px;
          
box-shadow: 0 10px 30px rgba(20, 50, 30, 0.06);
        
}
        
.bp-hero-card:nth-child(2) { margin-top: 34px; }
        
.bp-hero-card .foto {
          
aspect-ratio: 1 / 1;
          
border-radius: 14px;
          
background: #eef5ef;
          
display: flex;
          
align-items: center;
          
justify-content: center;
          
overflow: hidden;
        
}
        
.bp-hero-card .foto img { width: 85%; height: 85%; object-fit: contain; }
        
.bp-hero-card b { display: block; margin-top: 10px; font-size: 15px; }
        
.bp-hero-card small { color: #778279; font-size: 12px; }
        
.bp-hero-card .harga { margin-top: 6px; display: flex; justify-content: space-between; align-items: center; }
        
.bp-hero-card .harga strong { color: #176137; font-size: 15px; }
        
/* Keunggulan */
        
.bp-fitur {
          
display: grid;
          
grid-template-columns: repeat(3, 1fr);
          
gap: 14px;
          
margin-bottom: 34px;
        
}
        
.bp-fitur div {
          
background: #fff;
          
border: 1px solid #e4ebe5;
          
border-radius: 14px;
          
padding: 14px 16px;
          
display: flex;
          
align-items: center;
          
gap: 12px;
        
}
        
.bp-fitur .ikon {
          
width: 40px;
          
height: 40px;
          
border-radius: 10px;
          
background: #e7f5ea;
          
color: #176137;
          
display: flex;
          
align-items: center;
          
justify-content: center;
          
flex-shrink: 0;
        
}
        
.bp-fitur b { display: block; font-size: 14px; }
        
.bp-fitur small { color: #778279; font-size: 12px; }
        
/* Judul section */
        
.bp-section { margin-bottom: 38px; }
        
.bp-head {
          
display: flex;
          
justify-content: space-between;
          
align-items: flex-end;
          
gap: 16px;
          
margin-bottom: 16px;
          
flex-wrap: wrap;
        
}
        
.bp-head h2 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; }
        
.bp-head p { margin: 4px 0 0; color: #778279; font-size: 13px; }
        
.bp-link {
          
border: 0;
          
background: none;
          
color: #176137;
          
font-weight: 700;
          
font-size: 13px;
          
cursor: pointer;
          
display: inline-flex;
          
align-items: center;
          
gap: 4px;
          
font-family: inherit;
        
}
        
/* Kategori */
        
.bp-kategori { display: grid; grid-template-columns: repeat(6, 1fr); gap: 14px; }
        
.bp-kategori button {
          
background: #fff;
          
border: 1px solid #e4ebe5;
          
border-radius: 16px;
          
padding: 18px 10px;
          
cursor: pointer;
          
display: flex;
          
flex-direction: column;
          
align-items: center;
          
gap: 8px;
          
font-family: inherit;
          
transition: border-color .2s, transform .2s;
        
}
        
.bp-kategori button:hover { border-color: #1f7a43; transform: translateY(-2px); }
        
.bp-kategori .ikon {
          
width: 48px;
          
height: 48px;
          
border-radius: 14px;
          
color: #176137;
          
display: flex;
          
align-items: center;
          
justify-content: center;
        
}
        
.bp-kategori b { font-size: 14px; color: #1d2b21; }
        
.bp-kategori small { font-size: 12px; color: #778279; }
        
/* Promo / paket */
        
.bp-promo { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        
.bp-promo-card {
          
border-radius: 18px;
          
padding: 22px;
          
display: grid;
          
grid-template-columns: 1fr 150px;
          
gap: 16px;
          
align-items: center;
          
border: 1px solid #e4ebe5;
        
}
        
.bp-promo-card.hijau { background: #eaf6ec; }
        
.bp-promo-card.kuning { background: #fff6e2; }
        
.bp-promo-card .label {
          
display: inline-block;
          
background: #e0483e;
          
color: #fff;
          
font-size: 11px;
          
font-weight: 800;
          
padding: 4px 10px;
          
border-radius: 999px;
        
}
        
.bp-promo-card h3 { margin: 10px 0 6px; font-size: 19px; font-weight: 800; }
        
.bp-promo-card ul { margin: 0 0 12px; padding: 0; list-style: none; color: #4c5a51; font-size: 13px; }
        
.bp-promo-card li { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
        
.bp-promo-card li svg { color: #1f7a43; flex-shrink: 0; }
        
.bp-promo-card .harga { display: flex; align-items: baseline; gap: 8px; margin-bottom: 14px; }
        
.bp-promo-card .harga strong { font-size: 20px; color: #176137; }
        
.bp-promo-card .harga s { color: #95a198; font-size: 13px; }
        
.bp-promo-card .foto {
          
aspect-ratio: 1 / 1;
          
background: #fff;
          
border-radius: 16px;
          
display: flex;
          
align-items: center;
          
justify-content: center;
          
overflow: hidden;
        
}
        
.bp-promo-card .foto img { width: 85%; height: 85%; object-fit: contain; }
        
/* Produk */
        
.bp-tabs { display: flex; gap: 8px; flex-wrap: wrap; }
        
.bp-tabs button {
          
border: 1px solid #dbe5dc;
          
background: #fff;
          
color: #4c5a51;
          
border-radius: 999px;
          
padding: 7px 14px;
          
font-size: 13px;
          
font-weight: 600;
          
cursor: pointer;
          
font-family: inherit;
        
}
        
.bp-tabs button.aktif { background: #176137; border-color: #176137; color: #fff; }
        
.bp-produk { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
        
.bp-produk-card {
          
background: #fff;
          
border: 1px solid #e4ebe5;
          
border-radius: 16px;
          
overflow: hidden;
          
display: flex;
          
flex-direction: column;
        
}
        
.bp-produk-card .foto {
          
position: relative;
          
aspect-ratio: 4 / 3;
          
background: #f0f6f1;
          
display: flex;
          
align-items: center;
          
justify-content: center;
        
}
        
.bp-produk-card .foto img { width: 78%; height: 85%; object-fit: contain; }
        
.bp-produk-card .tanda {
          
position: absolute;
          
top: 10px;
          
left: 10px;
          
background: #176137;
          
color: #fff;
          
font-size: 11px;
          
font-weight: 700;
          
padding: 3px 9px;
          
border-radius: 999px;
        
}
        
.bp-produk-card .isi { padding: 12px 14px 14px; display: flex; flex-direction: column; gap: 4px; flex: 1; }
        
.bp-produk-card .kat { color: #778279; font-size: 12px; }
        
.bp-produk-card b { font-size: 15px; }
        
.bp-rating { display: flex; align-items: center; gap: 4px; color: #778279; font-size: 12px; }
        
.bp-rating svg { color: #f4b400; fill: #f4b400; }
        
.bp-produk-card .bawah { display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 8px; }
        
.bp-produk-card .bawah strong { color: #176137; font-size: 16px; }
        
.bp-add {
          
width: 36px;
          
height: 36px;
          
border-radius: 10px;
          
border: 0;
          
background: #176137;
          
color: #fff;
          
display: flex;
          
align-items: center;
          
justify-content: center;
          
cursor: pointer;
        
}
        
.bp-add:hover { background: #124d2b; }
        
/* Paling laris */
        
.bp-laris { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        
.bp-laris-card {
          
background: #fff;
          
border: 1px solid #e4ebe5;
          
border-radius: 14px;
          
padding: 10px;
          
display: flex;
          
align-items: center;
          
gap: 12px;
        
}
        
.bp-laris-card .no {
          
font-weight: 800;
          
color: #1f7a43;
          
font-size: 13px;
        
}
        
.bp-laris-card img { width: 56px; height: 56px; object-fit: contain; background: #f0f6f1; border-radius: 10px; flex-shrink: 0; }
        
.bp-laris-card b { display: block; font-size: 14px; }
        
.bp-laris-card small { color: #778279; font-size: 12px; }
        
.bp-laris-card strong { color: #176137; font-size: 13px; }
        
/* Toko */
        
.bp-toko { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        
.bp-toko-card {
          
background: #fff;
          
border: 1px solid #e4ebe5;
          
border-radius: 16px;
          
padding: 18px;
        
}
        
.bp-toko-card .atas { display: flex; gap: 12px; align-items: center; margin-bottom: 12px; }
        
.bp-toko-card .ikon {
          
width: 46px;
          
height: 46px;
          
border-radius: 12px;
          
background: #e7f5ea;
          
color: #176137;
          
display: flex;
          
align-items: center;
          
justify-content: center;
          
flex-shrink: 0;
        
}
        
.bp-toko-card b { display: block; font-size: 15px; }
        
.bp-toko-card small { color: #778279; font-size: 12px; display: inline-flex; align-items: center; gap: 4px; }
        
.bp-toko-card p { margin: 0 0 12px; color: #4c5a51; font-size: 13px; }
        
.bp-toko-stat { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 14px; }
        
.bp-toko-stat div { background: #f5f8f5; border-radius: 10px; padding: 8px; text-align: center; }
        
.bp-toko-stat strong { display: block; font-size: 14px; }
        
.bp-toko-stat span { color: #778279; font-size: 11px; }
        
.bp-toko-card .bp-btn { width: 100%; justify-content: center; }
        
/* Banner mitra */
        
.bp-mitra {
          
background: #173524;
          
color: #fff;
          
border-radius: 22px;
          
padding: 36px;
          
display: flex;
          
justify-content: space-between;
          
align-items: center;
          
gap: 24px;
          
flex-wrap: wrap;
          
margin-bottom: 40px;
        
}
        
.bp-mitra h2 { margin: 10px 0 8px; font-size: 26px; font-weight: 800; }
        
.bp-mitra p { margin: 0; color: #b9c8bc; font-size: 14px; max-width: 520px; line-height: 1.6; }
        
.bp-mitra .bp-chip { background: rgba(255,255,255,0.12); color: #9bd59d; }
        
.bp-mitra .bp-btn { background: #fff; color: #173524; }
        
/* Notifikasi kecil */
        
.bp-toast {
          
position: fixed;
          
bottom: 22px;
          
left: 50%;
          
transform: translateX(-50%);
          
background: #173524;
          
color: #fff;
          
padding: 11px 18px;
          
border-radius: 12px;
          
font-size: 14px;
          
z-index: 50;
          
display: flex;
          
align-items: center;
          
gap: 8px;
          
box-shadow: 0 12px 30px rgba(0,0,0,0.2);
        
}
        
/* Tablet */
        
@media (max-width: 1050px) {
          
.bp-hero-grid { grid-template-columns: 1fr; }
          
.bp-kategori { grid-template-columns: repeat(3, 1fr); }
          
.bp-produk { grid-template-columns: repeat(3, 1fr); }
          
.bp-laris { grid-template-columns: repeat(2, 1fr); }
          
.bp-toko { grid-template-columns: 1fr 1fr; }
          
.bp-promo { grid-template-columns: 1fr; }
          
.footer-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 30px; }
          
.footer-brand { grid-column: 1 / -1; }
        
}
        
/* HP */
        
@media (max-width: 720px) {
          
.bp-container { width: calc(100% - 28px); }
          
.bp-hero { padding-top: 22px; }
          
.bp-hero-card:nth-child(2) { margin-top: 0; }
          
.bp-fitur { grid-template-columns: 1fr; }
          
.bp-kategori { grid-template-columns: repeat(3, 1fr); gap: 10px; }
          
.bp-kategori button { padding: 14px 6px; }
          
.bp-produk { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          
.bp-produk-card .isi { padding: 10px; }
          
.bp-produk-card b { font-size: 14px; }
          
.bp-laris { grid-template-columns: 1fr; }
          
.bp-toko { grid-template-columns: 1fr; }
          
.bp-promo-card { grid-template-columns: 1fr 100px; padding: 16px; }
          
.bp-mitra { padding: 24px; }
          
.bp-mitra h2 { font-size: 21px; }
          
.footer-grid { width: calc(100% - 28px); grid-template-columns: 1fr; gap: 25px; }
        
}
      
`}</style>
      
{/* Top bar (disalin persis dari ShopPage) */}
      
<header className="topbar">
        
<div className="logo">
          
<div
            
className="logo-badge"
            
style={{
              
padding: 0,
              
width: 62,
              
height: 62,
              
minWidth: 62,
              
border: "none",
              
outline: "none",
              
boxShadow: "none",
              
background: "transparent",
              
overflow: "visible",
              
borderRadius: 0,
            
}}
          
>
            
<img
              
src={logoImg}
              
alt="Agri-ICS"
              
style={{
                
width: "100%",
                
height: "100%",
                
objectFit: "contain",
                
display: "block",
              
}}
            
/>
          
</div>
          
<div className="logo-text">
            
<div className="main">AGRI-<span>ICS</span></div>
            
<div className="tag">Solusi sayur segar dan sehat</div>
          
</div>
        
</div>
        
<form className="search" onSubmit={handleCari}>
          
<input
            
type="text"
            
placeholder="Search for products, hydroponics, recipes..."
            
value={cari}
            
onChange={(e) => setCari(e.target.value)}
          
/>
          
{/* Pilihan kategori: tampilan tetap seperti semula, pilihan dibuka lewat select tak terlihat */}
          
<div className="cat" style={{ position: "relative" }}>
            
All Categories
            
<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5c6b60" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            
<select
              
aria-label="Pilih kategori"
              
value="Semua"
              
onChange={(e) => bukaShop(e.target.value)}
              
style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
            
>
              
<option value="Semua">All Categories</option>
              
<option value="Sayuran">Sayuran</option>
              
<option value="Media Tanam">Media Tanam</option>
              
<option value="Nutrisi">Nutrisi</option>
              
<option value="Benih">Benih</option>
            
</select>
          
</div>
          
<button type="submit" aria-label="Cari">
            
<svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          
</button>
        
</form>
        
<div className="actions">
          <button
            type="button"
            className="hdr-menu-btn"
            onClick={() => setMenuAkun(true)}
            aria-label="Buka menu"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <span>Menu</span>
            {cartCount > 0 && <b className="hdr-menu-badge">{cartCount}</b>}
          </button>
        
</div>
      
</header>
      
<main className="bp-container">
        
{/* ================= HERO ================= */}
        
<section className="bp-hero">
          
<div className="bp-hero-grid">
            
<motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              
<span className="bp-chip"><Leaf size={14} /> Halo {namaDepan}, panen segar hari ini dari greenhouse</span>
              
<h1>
                
Pakcoy &amp; Sayuran Segar <span>Langsung dari Greenhouse</span>
              
</h1>
              
<p className="lead">
                
Belanja sayuran hidroponik yang dipanen pagi hari, plus nutrisi, benih, dan media tanam
                
untuk berkebun sendiri di rumah.
              
</p>
              
<div className="bp-hero-btns">
                
<button type="button" className="bp-btn bp-btn-green" onClick={() => bukaShop()}>
                  
Belanja Sekarang <ArrowRight size={16} />
                
</button>
                
<button type="button" className="bp-btn bp-btn-line" onClick={() => document.getElementById("bp-produk")?.scrollIntoView({ behavior: "smooth" })}>
                  
Lihat Produk
                
</button>
              
</div>
              
<div className="bp-checks">
                
<span><Check size={15} /> Dipanen setiap hari</span>
                
<span><Check size={15} /> Tanpa pestisida kimia</span>
                
<span><Check size={15} /> Bisa dilacak asal kebunnya</span>
              
</div>
            
</motion.div>
            
<motion.div className="bp-hero-cards" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              
{[PRODUK[0], PRODUK[3]].map((item) => (
                
<div className="bp-hero-card" key={item.name}>
                  
<div className="foto"><img src={item.img} alt={item.name} /></div>
                  
<b>{item.name}</b>
                  
<small>{item.greenhouse}</small>
                  
<div className="harga">
                    
<strong>{item.price}</strong>
                    
<button type="button" className="bp-add" onClick={() => tambahKeKeranjang(item)} aria-label="Tambah ke keranjang">
                      
<ShoppingCart size={16} />
                    
</button>
                  
</div>
                
</div>
              
))}
            
</motion.div>
          
</div>
        
</section>
        
<div className="bp-fitur">
          
<div>
            
<span className="ikon"><Leaf size={20} /></span>
            
<span><b>Dipanen Segar 100%</b><small>Langsung dari greenhouse Gisting</small></span>
          
</div>
          
<div>
            
<span className="ikon"><Truck size={20} /></span>
            
<span><b>Pengiriman Cepat</b><small>Dikemas dingin supaya tetap segar</small></span>
          
</div>
          
<div>
            
<span className="ikon"><ShieldCheck size={20} /></span>
            
<span><b>Pembayaran Aman</b><small>Transfer bank, e-wallet, atau COD</small></span>
          
</div>
        
</div>
        
{/* ================= KATEGORI ================= */}
        
<section className="bp-section" id="bp-kategori">
          
<div className="bp-head">
            
<div>
              
<h2>Jelajahi Kategori</h2>
              
<p>Pilih kategori, nanti langsung dibuka di Marketplace</p>
            
</div>
            
<button type="button" className="bp-link" onClick={() => bukaShop()}>
              
Lihat semua <ArrowRight size={14} />
            
</button>
          
</div>
          
<div className="bp-kategori">
            
{KATEGORI.map(({ nama, icon: Ikon, warna, jumlah }) => (
              
<button
                
type="button"
                
key={nama}
                
onClick={() => bukaShop(nama)}
              
>
                
<span className="ikon" style={{ background: warna }}><Ikon size={22} /></span>
                
<b>{nama}</b>
                
<small>{jumlah} produk</small>
              
</button>
            
))}
          
</div>
        
</section>
        
{/* ================= PAKET HEMAT ================= */}
        
<section className="bp-section" id="bp-promo">
          
<div className="bp-head">
            
<div>
              
<h2>Paket Hemat Hari Ini</h2>
              
<p>Beli sekaligus dalam paket, harganya lebih murah daripada satuan</p>
            
</div>
            
<button type="button" className="bp-link" onClick={() => bukaShop("Paket Hemat")}>
              
Lihat semua paket <ArrowRight size={14} />
            
</button>
          
</div>
          
<div className="bp-promo">
            
{PAKET.map((paket, i) => (
              
<div className={`bp-promo-card ${i === 0 ? "hijau" : "kuning"}`} key={paket.name}>
                
<div>
                  
<span className="label">Hemat {rupiah(angka(paket.hargaNormal) - angka(paket.price))}</span>
                  
<h3>{paket.name}</h3>
                  
<ul>
                    
{paket.isi.map((isi) => (
                      
<li key={isi}><Check size={14} /> {isi}</li>
                    
))}
                  
</ul>
                  
<div className="harga">
                    
<strong>{paket.price}</strong>
                    
<s>{paket.hargaNormal}</s>
                  
</div>
                  
<button type="button" className="bp-btn bp-btn-green" onClick={() => tambahKeKeranjang(paket)}>
                    
<ShoppingCart size={16} /> Ambil Paket
                  
</button>
                
</div>
                
<div className="foto"><img src={paket.img} alt={paket.name} /></div>
              
</div>
            
))}
          
</div>
        
</section>
        
{/* ================= PRODUK UNGGULAN ================= */}
        
<section className="bp-section" id="bp-produk">
          
<div className="bp-head">
            
<div>
              
<h2>Produk Unggulan</h2>
              
<p>Pilihan terbaik dari kebun dan gudang kami</p>
            
</div>
            
<div className="bp-tabs">
              
{TAB_PRODUK.map((tab) => (
                
<button type="button" key={tab} className={tabAktif === tab ? "aktif" : ""} onClick={() => setTabAktif(tab)}>
                  
{tab}
                
</button>
              
))}
            
</div>
          
</div>
          
<div className="bp-produk">
            
{produkTampil.map((item) => (
              
<motion.div className="bp-produk-card" key={item.name} whileHover={{ y: -3 }}>
                
<div className="foto">
                  
{item.badge && <span className="tanda">{item.badge}</span>}
                  
<img src={item.img} alt={item.name} />
                
</div>
                
<div className="isi">
                  
<span className="kat">{item.category}</span>
                  
<b>{item.name}</b>
                  
<span className="bp-rating"><Star size={13} /> {item.rating} · {item.terjual} terjual</span>
                  
<div className="bawah">
                    
<strong>{item.price}</strong>
                    
<button type="button" className="bp-add" onClick={() => tambahKeKeranjang(item)} aria-label="Tambah ke keranjang">
                      
<ShoppingCart size={16} />
                    
</button>
                  
</div>
                
</div>
              
</motion.div>
            
))}
          
</div>
        
</section>
        
{/* ================= PALING BANYAK DIBELI ================= */}
        
<section className="bp-section">
          
<div className="bp-head">
            
<div>
              
<h2>Paling Banyak Dibeli</h2>
              
<p>Produk favorit pembeli minggu ini</p>
            
</div>
          
</div>
          
<div className="bp-laris">
            
{palingLaris.map((item, i) => (
              
<div className="bp-laris-card" key={item.name}>
                
<span className="no">#{i + 1}</span>
                
<img src={item.img} alt={item.name} />
                
<div>
                  
<b>{item.name}</b>
                  
<strong>{item.price}</strong> <small>· {item.terjual} terjual</small>
                
</div>
              
</div>
            
))}
          
</div>
        
</section>
        
{/* ================= TOKO PILIHAN ================= */}
        
<section className="bp-section">
          
<div className="bp-head">
            
<div>
              
<h2>Greenhouse Pilihan</h2>
              
<p>Kebun mitra yang memasok sayuran segar untuk kamu</p>
            
</div>
          
</div>
          
<div className="bp-toko">
            
{TOKO.map((toko) => (
              
<div className="bp-toko-card" key={toko.kode}>
                
<div className="atas">
                  
<span className="ikon"><Store size={22} /></span>
                  
<div>
                    
<b>{toko.nama}</b>
                    
<small><MapPin size={12} /> {toko.lokasi}</small>
                  
</div>
                
</div>
                
<p>Spesialis: {toko.produk}</p>
                
<div className="bp-toko-stat">
                  
<div><strong>{toko.rating}</strong><span>Rating</span></div>
                  
<div><strong>{toko.terjual}</strong><span>Terjual</span></div>
                  
<div><strong>{toko.kode}</strong><span>Kode</span></div>
                
</div>
                
<button type="button" className="bp-btn bp-btn-line" onClick={() => bukaShop("Sayuran")}>Kunjungi Toko</button>
              
</div>
            
))}
          
</div>
        
</section>
        
{/* ================= BANNER MITRA ================= */}
        
<section className="bp-mitra">
          
<div>
            
<span className="bp-chip"><Sprout size={14} /> Untuk petani &amp; pemilik greenhouse</span>
            
<h2>Ingin Menjual Hasil Panen Anda?</h2>
            
<p>Gabung jadi mitra Agri-ICS. Hasil panen kamu tampil di Marketplace dan bisa dipantau lewat dashboard IoT.</p>
          
</div>
          
<button type="button" className="bp-btn" onClick={() => setPage("dashboard")}>
            
Pelajari Dashboard <ArrowRight size={16} />
          
</button>
        
</section>
      
</main>
      
{/* FOOTER (disalin persis dari ShopPage) */}
      
<motion.footer
        
initial={{ opacity: 0 }}
        
whileInView={{ opacity: 1 }}
        
viewport={{ once: true }}
        
transition={{ duration: 0.7 }}
        
className="footer"
      
>
        
<div className="footer-grid">
          
<motion.div className="footer-brand" whileHover={{ y: -2 }}>
            
<motion.div className="footer-brand-icon" whileHover={{ scale: 1.04 }}>
              
<img
                
src={logoImg}
                
alt="Agri-ICS"
                
style={{ width: "100%", height: "100%", objectFit: "contain" }}
              
/>
            
</motion.div>
            
<div>
              
<div className="name">Living Smart</div>
              
<div className="tag">Solusi sayur segar dan sehat</div>
              
<p className="desc">
                
Menghubungkan teknologi dan pertanian untuk masa depan pangan yang lebih hijau dan berkelanjutan.
              
</p>
            
</div>
          
</motion.div>
          
<div className="footer-col">
            
<h4>Quick links</h4>
            
<motion.a href="#home" whileHover={{ x: 3 }} onClick={(e) => { e.preventDefault(); setPage("home"); }}>Home</motion.a>
            
<motion.a href="#dashboard" whileHover={{ x: 3 }} onClick={(e) => { e.preventDefault(); setPage("dashboard"); }}>Dashboard</motion.a>
            
<motion.a href="#shop" whileHover={{ x: 3 }} onClick={(e) => { e.preventDefault(); bukaShop(); }}>Shop</motion.a>
          
</div>
          
<div className="footer-col">
            
<h4>Shop</h4>
            
<motion.a href="#shop" whileHover={{ x: 3 }} onClick={(e) => { e.preventDefault(); bukaShop(); }}>All Products</motion.a>
            
<motion.a href="#shop" whileHover={{ x: 3 }} onClick={(e) => { e.preventDefault(); bukaShop(); }}>Best Seller</motion.a>
            
<motion.a href="#shop" whileHover={{ x: 3 }} onClick={(e) => { e.preventDefault(); bukaShop(); }}>Promo</motion.a>
          
</div>
          
<div className="footer-col">
            
<h4>Information</h4>
            
<motion.a href="#faq" whileHover={{ x: 3 }}>FAQ</motion.a>
            
<motion.a href="#terms" whileHover={{ x: 3 }}>Terms &amp; Conditions</motion.a>
            
<motion.a href="#privacy" whileHover={{ x: 3 }}>Privacy Policy</motion.a>
          
</div>
          
<div className="footer-col">
            
<h4>Contact Us</h4>
            
<motion.div className="footer-contact-item" whileHover={{ x: 3 }}>📍 Gisting, Tanggamus</motion.div>
            
<motion.div className="footer-contact-item" whileHover={{ x: 3 }}>📞 +62 812 3456 7890</motion.div>
            
<motion.div className="footer-contact-item" whileHover={{ x: 3 }}>✉️ Livingmart@gmail.com</motion.div>
          
</div>
        
</div>
        
<div
          
style={{
            
marginTop: 32,
            
paddingTop: 18,
            
borderTop: "1px solid rgba(255,255,255,0.08)",
            
textAlign: "center",
            
color: "rgba(255,255,255,0.32)",
            
fontSize: 11,
          
}}
        
>
          
Smart Agriculture • IoT • LivingLab
        
</div>
      
</motion.footer>
      
{/* DRAWER MENU */}
      
{menuAkun && (
        
<div
          
onClick={() => setMenuAkun(false)}
          
style={{
            
position: "fixed",
            
inset: 0,
            
zIndex: 9998,
            
background: "rgba(15, 35, 23, 0.32)",
          
}}
        
>
          
<aside
            
onClick={(e) => e.stopPropagation()}
            
className="shop-menu-drawer"
            
style={{
              
position: "absolute",
              
top: 0,
              
right: 0,
              
width: "min(360px, 88vw)",
              
height: "100%",
              
background: "#fff",
              
boxShadow: "-12px 0 35px rgba(0,0,0,.15)",
              
padding: 24,
              
overflowY: "auto",
            
}}
          
>
            
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              
<div>
                
<div style={{ fontSize: 12, color: "#6d7b72" }}>AGRI-ICS</div>
                
<h3 style={{ margin: "3px 0 0", color: "#173524", fontSize: 22 }}>Menu</h3>
              
</div>
              
<button
                
type="button"
                
onClick={() => setMenuAkun(false)}
                
style={{
                  
width: 38,
                  
height: 38,
                  
borderRadius: "50%",
                  
border: "1px solid #e1e8e2",
                  
background: "#fff",
                  
cursor: "pointer",
                  
fontSize: 22,
                  
color: "#526158",
                
}}
              
>
                
×
              
</button>
            
</div>
            
<div style={{ display: "grid", gap: 10 }}>
            <button className="shop-menu-btn hdr-akun" onClick={() => setPage("profile")}>
              <span>{user && user.avatar ? <img src={user.avatar} alt="" /> : "👤"}</span>
              <span>
                <strong>{user ? user.name : "Akun Saya"}</strong>
                <small>Lihat profil saya</small>
              </span>
            </button>

              
<button className="shop-menu-btn" onClick={() => setPage("home")}>
                
<span>⌂</span><span>Home</span>
              
</button>
              
<button className="shop-menu-btn" onClick={() => setPage("dashboard")}>
                
<span>▦</span><span>Dashboard</span>
              
</button>
              
<button className="shop-menu-btn" onClick={() => bukaShop()}>
                
<span>🏪</span><span>Marketplace</span>
              
</button>
              
<button className="shop-menu-btn" onClick={() => setPage("profile")}>
                
<span>▤</span><span>Pesanan Saya</span>
              
</button>
              
<button className="shop-menu-btn" onClick={bukaKeranjang}>
                
<span>🛒</span><span>Keranjang ({jumlahKeranjang})</span>
              
</button>
              
<button className="shop-menu-btn" onClick={onLogout} style={{ color: "#c0392b" }}>
                
<span>⎋</span><span>Keluar</span>
              
</button>
            
</div>
          
</aside>
        
</div>
      
)}
      
{pesan && (
        
<div className="bp-toast">
          
<Check size={16} /> {pesan}
        
</div>
      
)}
    
</motion.div>
  
);
}
