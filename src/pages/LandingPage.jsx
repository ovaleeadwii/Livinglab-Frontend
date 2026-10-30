import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Clock, Navigation, ExternalLink, Warehouse, Radio, LogIn, User, Package, LogOut, ChevronDown, LayoutDashboard } from "lucide-react";
import "../index.css";
import logoImg from "../assets/logo.svg";
import landsBg from "../assets/lands.jpg";
import heroImg from "../assets/yang baru lagi.png";
import pakcoyImg from "../assets/pakcoi (1).png";
import seladaImg from "../assets/selada keriting.png";
import bayamImg from "../assets/bayam.png";
import tomatImg from "../assets/tomat ceri.png";
import avatarImg from "../assets/foto orang.jpg";
/* =========================================================
    
MOTION
========================================================= */
const fadeUp = {
  
hidden: {
    
opacity: 0,
    
y: 18,
  
},
  
visible: {
    
opacity: 1,
    
y: 0,
    
transition: {
      
duration: 0.65,
      
ease: "easeOut",
    
},
  
},
};
const stagger = {
  
hidden: {},
  
visible: {
    
transition: {
      
staggerChildren: 0.08,
    
},
  
},
};
/* =========================================================
    
LANDING PAGE
========================================================= */
const INTRO_KEY = "agri_ics_landing_intro";
const shouldShowLandingIntro = () => {
  
const navigation = performance.getEntriesByType("navigation")[0];
  
const isRefresh = navigation?.type === "reload";
  
const hasShown = sessionStorage.getItem(INTRO_KEY) === "1";
  
  
return isRefresh || !hasShown;
};
/* =========================================================
    
BAGIAN LOKASI KEBUN
    
DATA LOKASI (ubah di sini kalau alamat / jam berubah)
========================================================= */
const LOKASI = {
  
nama: "Greenhouse Agri-ICS Gisting",
  
alamat: "Kec. Gisting, Kabupaten Tanggamus, Lampung",
  
query: "Gisting, Tanggamus, Lampung", // boleh diganti koordinat, contoh "-5.3582,104.7077"
  
jamBuka: 8, // 08.00 WIB
  
jamTutup: 17, // 17.00 WIB
};
const INFO = [
  
{ icon: MapPin, label: "Lokasi", value: "Kec. Gisting, Tanggamus" },
  
{ icon: Clock, label: "Jam Buka", value: "Setiap hari, 08.00 - 17.00 WIB" },
  
{ icon: Warehouse, label: "Greenhouse", value: "5+ greenhouse aktif" },
  
{ icon: Radio, label: "Monitoring", value: "Sistem Agri-ICS IoT terintegrasi" },
];
const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(LOKASI.query)}&z=14&output=embed`;
const mapsOpenUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(LOKASI.query)}`;
const mapsDirectionUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(LOKASI.query)}`;
/* =========================================================
    
STATUS BUKA / TUTUP (pakai jam WIB)
========================================================= */
function getJamWIB() {
  
const jam = new Intl.DateTimeFormat("en-GB", {
    
timeZone: "Asia/Jakarta",
    
hour: "numeric",
    
hour12: false,
  
}).format(new Date());
  
return parseInt(jam, 10);
}
function useStatusBuka() {
  
const [jam, setJam] = useState(getJamWIB);
  
useEffect(() => {
    
const timer = setInterval(() => setJam(getJamWIB()), 60 * 1000);
    
return () => clearInterval(timer);
  
}, []);
  
return jam >= LOKASI.jamBuka && jam < LOKASI.jamTutup;
}
/* =========================================================
    
KOMPONEN: info di kiri, peta mungil di kanan
    
(di HP: info di atas, peta di bawah)
========================================================= */
function LocationSection() {
  
const sedangBuka = useStatusBuka();
  
return (
    
<section className="maps-section">
      
{/* Judul */}
      
<motion.div
        
initial="hidden"
        
whileInView="visible"
        
viewport={{ once: true, amount: 0.2 }}
        
variants={stagger}
        
className="maps-head-center"
      
>
        
<motion.span variants={fadeUp} className="sub-title">LOKASI KEBUN</motion.span>
        
<motion.h2 variants={fadeUp}>Agri-ICS LivingLab Gisting</motion.h2>
        
<motion.p variants={fadeUp}>
          
Kunjungi pusat inovasi dan greenhouse kami di Gisting, Tanggamus. Rasakan pengalaman pertanian presisi secara langsung.
        
</motion.p>
      
</motion.div>
      
{/* Kartu */}
      
<motion.div
        
initial={{ opacity: 0, y: 25 }}
        
whileInView={{ opacity: 1, y: 0 }}
        
viewport={{ once: true }}
        
transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        
className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-6 rounded-3xl border border-[#e2eae3] bg-white p-5 shadow-[0_16px_40px_rgba(15,35,23,0.08)] sm:p-7 md:grid-cols-2 md:gap-8"
      
>
        
{/* Info */}
        
<div className="flex flex-col gap-5">
          
{/* Status buka / tutup */}
          
<span
            
className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
              
sedangBuka ? "bg-[#eef7f0] text-[#2F7041]" : "bg-gray-100 text-gray-600"
            
}`}
          
>
            
<span className="relative flex h-2 w-2">
              
{sedangBuka && (
                
<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5FB34A] opacity-75" />
              
)}
              
<span className={`relative inline-flex h-2 w-2 rounded-full ${sedangBuka ? "bg-[#5FB34A]" : "bg-gray-400"}`} />
            
</span>
            
{sedangBuka ? "Buka sekarang · tutup 17.00 WIB" : "Sedang tutup · buka 08.00 WIB"}
          
</span>
          
{/* Nama & alamat */}
          
<div>
            
<h3 className="text-xl font-extrabold leading-tight text-[#173524] sm:text-2xl">{LOKASI.nama}</h3>
            
<p className="mt-1.5 text-sm text-[#5D6D63]">{LOKASI.alamat}</p>
          
</div>
          
{/* 4 info kecil */}
          
<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            
{INFO.map(({ icon: Icon, label, value }) => (
              
<div key={label} className="flex items-center gap-3">
                
<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eef7f0] text-[#2F7041]">
                  
<Icon size={17} />
                
</div>
                
<div className="min-w-0">
                  
<p className="text-[10px] font-semibold uppercase tracking-wider text-[#7A8A80]">{label}</p>
                  
<p className="text-[13px] font-bold leading-snug text-[#173524]">{value}</p>
                
</div>
              
</div>
            
))}
          
</div>
          
{/* Tombol */}
          
<div className="flex flex-col gap-3 sm:flex-row">
            
<motion.a
              
href={mapsDirectionUrl}
              
target="_blank"
              
rel="noopener noreferrer"
              
whileHover={{ y: -2 }}
              
whileTap={{ scale: 0.98 }}
              
className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#16502D] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-black/10"
            
>
              
<Navigation size={16} />
              
Petunjuk Arah
            
</motion.a>
            
<a
              
href={mapsOpenUrl}
              
target="_blank"
              
rel="noopener noreferrer"
              
className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#d9e6db] px-5 py-3 text-sm font-semibold text-[#173524] hover:bg-[#f4faf5]"
            
>
              
<ExternalLink size={16} />
              
Buka di Maps
            
</a>
          
</div>
        
</div>
        
{/* Peta mungil berbingkai */}
        
<div className="relative h-[240px] overflow-hidden rounded-2xl border-4 border-[#eef7f0] bg-[#eef3ee] sm:h-[280px] md:h-[340px]">
          
<iframe
            
title="Peta Lokasi Greenhouse Gisting"
            
src={mapsEmbedUrl}
            
className="absolute inset-0 h-full w-full border-0"
            
allowFullScreen
            
loading="lazy"
            
referrerPolicy="no-referrer-when-downgrade"
          
/>
          
{/* Label alamat melayang di bawah peta */}
          
<div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-xl bg-white/95 px-3 py-2 shadow-md">
            
<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#16502D] text-white">
              
<MapPin size={14} />
            
</span>
            
<span className="truncate text-xs font-semibold text-[#173524]">Gisting, Tanggamus, Lampung</span>
          
</div>
        
</div>
      
</motion.div>
    
</section>
  
);
}
/* =========================================================
    
MENU AKUN DI NAVBAR (pojok kanan atas)
    - 
Belum login  : tombol "Login" -> halaman AuthPage
    - 
Sudah login  : foto + nama, klik untuk buka dropdown
========================================================= */
function AccountMenu({ user, setPage, onLogout }) {
  
const [open, setOpen] = useState(false);
  
const menuRef = useRef(null);
  
// Tutup dropdown kalau klik di luar menu
  
useEffect(() => {
    
const handleClickOutside = (e) => {
      
if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    
};
    
document.addEventListener("mousedown", handleClickOutside);
    
return () => document.removeEventListener("mousedown", handleClickOutside);
  
}, []);
  
if (!user) {
    
return (
      
<motion.button
        
onClick={() => setPage("auth")}
        
whileHover={{ y: -1 }}
        
whileTap={{ scale: 0.97 }}
        
className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#16502D] px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-black/10"
      
>
        
<LogIn size={16} />
        
Login
      
</motion.button>
    
);
  
}
  
const namaDepan = (user.name || "Pembeli").split(" ")[0];
  
const inisial = (user.name || "P").charAt(0).toUpperCase();
  
const menuItems = [
    
{ icon: User, label: "Profil Saya", onClick: () => setPage("profile") },
    
{ icon: Package, label: "Pesanan Saya", onClick: () => setPage("profile") },
  
];
  
return (
    
<div ref={menuRef} className="relative shrink-0">
      
<button
        
onClick={() => setOpen((v) => !v)}
        
className="flex items-center gap-2 rounded-full border border-[#e2eae3] bg-white py-1 pl-1 pr-3 hover:bg-[#f4faf5]"
      
>
        
{user.avatar ? (
          
<img src={user.avatar} alt={user.name} className="h-9 w-9 rounded-full object-cover" />
        
) : (
          
<span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#16502D] text-sm font-bold text-white">
            
{inisial}
          
</span>
        
)}
        
<span className="hidden text-sm font-semibold text-[#173524] sm:inline">Hai, {namaDepan}</span>
        
<ChevronDown size={16} className={`text-[#5D6D63] transition-transform ${open ? "rotate-180" : ""}`} />
      
</button>
      
<AnimatePresence>
        
{open && (
          
<motion.div
            
initial={{ opacity: 0, y: -6 }}
            
animate={{ opacity: 1, y: 0 }}
            
exit={{ opacity: 0, y: -6 }}
            
transition={{ duration: 0.15 }}
            
className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-[#e2eae3] bg-white shadow-[0_16px_40px_rgba(15,35,23,0.12)]"
          
>
            
<div className="border-b border-[#eef3ee] px-4 py-3">
              
<p className="truncate text-sm font-bold text-[#173524]">{user.name}</p>
              
<p className="truncate text-xs text-[#7A8A80]">{user.email}</p>
            
</div>
            
{menuItems.map(({ icon: Icon, label, onClick }) => (
              
<button
                
key={label}
                
onClick={() => { setOpen(false); onClick(); }}
                
className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-[#173524] hover:bg-[#f4faf5]"
              
>
                
<Icon size={16} className="text-[#2F7041]" />
                
{label}
              
</button>
            
))}
            
<button
              
onClick={() => { setOpen(false); onLogout && onLogout(); }}
              
className="flex w-full items-center gap-3 border-t border-[#eef3ee] px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
            
>
              
<LogOut size={16} />
              
Keluar
            
</button>
          
</motion.div>
        
)}
      
</AnimatePresence>
    
</div>
  
);
}
/* =========================================================
    
HALAMAN UTAMA
========================================================= */
export default function LandingPage({ setPage, user, onLogout }) {
  
const [showIntro, setShowIntro] = useState(shouldShowLandingIntro);
  
const productsList = [
    
{
      
name: "Pokcoy",
      
price: "Rp. 15.000",
      
img: pakcoyImg,
    
},
    
{
      
name: "Selada keriting",
      
price: "Rp. 18.000",
      
img: seladaImg,
    
},
    
{
      
name: "Bayam",
      
price: "Rp. 9.000",
      
img: bayamImg,
    
},
    
{
      
name: "Tomat Ceri",
      
price: "Rp. 17.000",
      
img: tomatImg,
    
},
  
];
  
const [activeIndex, setActiveIndex] = useState(1);
  
// Fungsi untuk memutar suara "Cling" sinematik menggunakan Web Audio API (Tanpa file eksternal)
  
const playClingSound = () => {
    
try {
      
const AudioContext = window.AudioContext || window.webkitAudioContext;
      
if (!AudioContext) return;
      
const ctx = new AudioContext();
      
// Frekuensi lonceng / chime berkilau (Chime bell chord)
      
const frequencies = [523.25, 659.25, 783.99, 1046.50, 1318.51]; 
      
      
frequencies.forEach((freq, index) => {
        
const osc = ctx.createOscillator();
        
const gain = ctx.createGain();
        
osc.type = "sine";
        
osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.04);
        
// Envelope suara gemerincing lembut
        
gain.gain.setValueAtTime(0, ctx.currentTime);
        
gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + index * 0.04 + 0.02);
        
gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + index * 0.04 + 1.5);
        
osc.connect(gain);
        
gain.connect(ctx.destination);
        
osc.start(ctx.currentTime + index * 0.04);
        
osc.stop(ctx.currentTime + index * 0.04 + 1.6);
      
});
    
} catch (e) {
      
console.log("Audio autoplay dibatasi browser", e);
    
}
  
};
  
useEffect(() => {
    
if (!showIntro) return;
    
sessionStorage.setItem(INTRO_KEY, "1");
    
document.body.style.overflow = "hidden";
    
// Putar suara cling saat intro mulai muncul
    
playClingSound();
    
const timer = setTimeout(() => {
      
setShowIntro(false);
      
document.body.style.overflow = "";
    
}, 3000);
    
return () => {
      
clearTimeout(timer);
      
document.body.style.overflow = "";
    
};
  
}, [showIntro]);
  
const handleMarketplace = () => {
    
setPage("shop");
  
};
  
const handleShop = handleMarketplace;
  
const handlePrev = () => {
    
setActiveIndex((prev) =>
      
prev === 0 ? productsList.length - 1 : prev - 1
    
);
  
};
  
const handleNext = () => {
    
setActiveIndex((prev) =>
      
prev === productsList.length - 1 ? 0 : prev + 1
    
);
  
};
  
return (
    
<div className="relative min-h-screen overflow-x-hidden">
      
<style>{`
        
.landing-container,
        
.landing-container * {
          
box-sizing: border-box;
        
}
        
.landing-container {
          
width: 100%;
          
max-width: 100%;
          
overflow-x: hidden;
        
}
        
.landing-container img {
          
max-width: 100%;
        
}
        
/* Keyframes untuk Efek Cahaya Lewat (Cling Shimmer) */
        
@keyframes shimmerGlint {
          
0% {
            
transform: translateX(-150%) skewX(-20deg);
          
}
          
100% {
            
transform: translateX(250%) skewX(-20deg);
          
}
        
}
        
.shimmer-effect {
          
position: relative;
          
overflow: hidden;
        
}
        
.shimmer-effect::after {
          
content: '';
          
position: absolute;
          
top: 0;
          
left: 0;
          
width: 60%;
          
height: 100%;
          
background: linear-gradient(
            
90deg, 
            
transparent, 
            
rgba(255, 255, 255, 0.45), 
            
transparent
          
);
          
animation: shimmerGlint 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          
animation-delay: 0.4s;
        
}
        
@media (max-width: 1180px) {
          
.topbar {
            
gap: 14px !important;
            
padding-left: 28px !important;
            
padding-right: 28px !important;
          
}
          
.search {
            
min-width: 0 !important;
            
flex: 1 1 360px !important;
          
}
          
.hero {
            
padding-left: 6vw !important;
            
padding-right: 6vw !important;
            
gap: 28px !important;
          
}
          
.hero-content h1 {
            
font-size: clamp(34px, 4vw, 54px) !important;
            
line-height: 1.08 !important;
          
}
          
.features,
          
.products-carousel-section,
          
.highlights-section,
          
.footer {
            
padding-left: 6vw !important;
            
padding-right: 6vw !important;
          
}
          
.footer-grid {
            
grid-template-columns: 1.5fr repeat(2, 1fr) !important;
            
row-gap: 30px !important;
          
}
        
}
        
@media (max-width: 900px) {
          
.topbar {
            
min-height: auto !important;
            
flex-wrap: wrap !important;
            
padding: 14px 24px !important;
          
}
          
.topbar .logo {
            
flex: 1 1 auto !important;
            
min-width: 0 !important;
          
}
          
.topbar .search {
            
order: 3;
            
flex: 1 1 100% !important;
            
width: 100% !important;
            
margin-top: 2px !important;
          
}
          
.hero {
            
min-height: auto !important;
            
grid-template-columns: 1fr !important;
            
display: grid !important;
            
padding: 56px 7vw 48px !important;
            
text-align: center !important;
          
}
          
.hero-content {
            
max-width: 760px !important;
            
margin: 0 auto !important;
          
}
          
.hero-buttons {
            
justify-content: center !important;
            
flex-wrap: wrap !important;
          
}
          
.hero-visual {
            
width: min(620px, 100%) !important;
            
min-height: 360px !important;
            
margin: 0 auto !important;
          
}
          
.basket {
            
width: min(100%, 600px) !important;
            
margin: auto !important;
          
}
          
.features-row {
            
grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          
}
          
.features-row .feature-item:last-child {
            
grid-column: 1 / -1;
            
max-width: calc(50% - 12px);
            
width: 100%;
            
margin: 0 auto;
          
}
          
.footer-grid {
            
grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          
}
          
.footer-brand {
            
grid-column: 1 / -1;
          
}
        
}
        
@media (max-width: 600px) {
          
.topbar {
            
padding: 11px 15px !important;
            
gap: 10px !important;
          
}
          
.topbar .logo-badge {
            
width: 46px !important;
            
height: 46px !important;
            
min-width: 46px !important;
          
}
          
.topbar .logo-text .main {
            
font-size: 20px !important;
            
line-height: 1 !important;
          
}
          
.topbar .logo-text .tag {
            
display: none !important;
          
}
          
.search {
            
height: 44px !important;
            
border-radius: 10px !important;
          
}
          
.search input {
            
min-width: 0 !important;
            
width: 100% !important;
            
font-size: 13px !important;
            
padding-left: 13px !important;
          
}
          
.search .cat {
            
display: none !important;
          
}
          
.hero {
            
padding: 40px 18px 30px !important;
            
gap: 12px !important;
          
}
          
.hero-content h1 {
            
font-size: clamp(30px, 9vw, 42px) !important;
            
line-height: 1.06 !important;
          
}
          
.hero-buttons {
            
width: 100% !important;
            
display: grid !important;
            
grid-template-columns: 1fr !important;
            
gap: 9px !important;
          
}
          
.hero-buttons .btn {
            
width: 100% !important;
            
min-height: 44px !important;
            
justify-content: center !important;
          
}
          
.features-row {
            
grid-template-columns: 1fr !important;
            
gap: 12px !important;
          
}
          
.product-card-3d {
            
display: none !important;
          
}
          
.product-card-3d.carousel-item-active {
            
display: block !important;
            
opacity: 1 !important;
            
visibility: visible !important;
          
}
          
.footer-grid {
            
grid-template-columns: 1fr !important;
            
gap: 28px !important;
          
}
        
}
      
`}</style>
      
<motion.div
        
initial={{ opacity: 0, y: 8 }}
        
animate={{ opacity: 1, y: 0 }}
        
transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        
className="landing-container overflow-x-hidden"
      
>
        
{/* TOP BAR */}
        
<motion.header
          
initial={{ opacity: 0, y: -12 }}
          
animate={{ opacity: 1, y: 0 }}
          
transition={{ duration: 0.6, ease: "easeOut" }}
          
className="topbar"
        
>
          
<motion.div
            
className="logo"
            
whileHover={{ y: -1 }}
            
transition={{ duration: 0.2 }}
            
style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
          
>
            
<div
              
className="logo-badge"
              
style={{
                
width: 62,
                
height: 62,
                
minWidth: 62,
                
padding: 0,
                
border: "none",
                
outline: "none",
                
boxShadow: "none",
                
background: "transparent",
                
flexShrink: 0,
              
}}
            
>
              
<img
                
src={logoImg}
                
alt="Agri-ICS"
                
style={{ width: "100%", height: "100%", objectFit: "contain" }}
              
/>
            
</div>
            
<div className="logo-text" style={{ marginLeft: 12 }}>
              
<div className="main">AGRI-<span>ICS</span></div>
              
<div className="tag">Hidup sehat, mulai dari kebun</div>
            
</div>
          
</motion.div>
          
{/* Tombol masuk / menu akun pembeli */}
          
<div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <motion.button
              onClick={() => setPage("dashboard")}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[#cfe3d2] bg-white px-4 py-2.5 text-sm font-bold text-[#16502D] shadow-sm hover:bg-[#f4faf5]"
            >
              <LayoutDashboard size={16} />
              <span className="hidden sm:inline">Dashboard</span>
            </motion.button>
            <AccountMenu user={user} setPage={setPage} onLogout={onLogout} />
          </div>
        
</motion.header>
        
{/* HERO */}
        
<section className="hero" style={{ backgroundImage: `url(${landsBg})` }}>
          
<motion.div initial="hidden" animate="visible" variants={stagger} className="hero-content">
            
<motion.div
              
variants={fadeUp}
              
style={{
                
display: "inline-flex",
                
alignItems: "center",
                
gap: 9,
                
marginBottom: 15,
                
padding: "7px 13px",
                
borderRadius: 999,
                
background: "rgba(255,255,255,0.12)",
                
border: "1px solid rgba(255,255,255,0.25)",
                
backdropFilter: "blur(8px)",
                
color: "#FFFFFF",
                
fontSize: 11,
                
fontWeight: 600,
                
letterSpacing: "0.04em",
              
}}
            
>
              
<span
                
style={{
                  
width: 7,
                  
height: 7,
                  
borderRadius: "50%",
                  
background: "#B9EE91",
                  
boxShadow: "0 0 8px rgba(185,238,145,0.65)",
                
}}
              
/>
              
SMART AGRICULTURE • IoT • LIVINGLAB
            
</motion.div>
            
<motion.h1 variants={fadeUp} style={{ color: "#153524" }}>
              
HYDRO-PERFECTION
              
<br />
              
<span style={{ color: "#153524", background: "none", WebkitTextFillColor: "initial" }}>
                
Kualitas Terbaik dari Gisting
              
</span>
            
</motion.h1>
            
<motion.p variants={fadeUp} style={{ color: "#5D6D63" }}>
              
Dibudidayakan dengan penuh ketelitian di greenhouse canggih kami di Gisting. Dari kebun kami, langsung ke meja Anda.
            
</motion.p>
            
<motion.div variants={fadeUp} className="hero-buttons">
              
<motion.button
                
onClick={handleShop}
                
className="btn btn-primary"
                
whileHover={{ scale: 1.02, y: -2 }}
                
whileTap={{ scale: 0.98 }}
              
>
                
SHOP NOW
                
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  
<path d="M5 12h14M13 5l7 7-7 7" />
                
</svg>
              
</motion.button>
              
<motion.button
                
onClick={() => setPage("dashboard")}
                
className="btn btn-secondary"
                
whileHover={{ scale: 1.02, y: -2 }}
                
whileTap={{ scale: 0.98 }}
              
>
                
EXPLORE DASHBOARD
              
</motion.button>
            
</motion.div>
            
<motion.div
              
variants={fadeUp}
              
style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 20, color: "#52645A", fontSize: 11, fontWeight: 500 }}
            
>
              
<span style={{ width: 6, height: 6, borderRadius: "50%", background: "#76A968" }} />
              
Dipantau dengan teknologi IoT secara real-time
            
</motion.div>
          
</motion.div>
          
<motion.div
            
initial={{ opacity: 0, x: 30, scale: 0.95 }}
            
animate={{ opacity: 1, x: 0, scale: 1 }}
            
transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            
className="hero-visual"
          
>
            
<motion.div
              
animate={{ scale: [0.97, 1.03, 0.97], opacity: [0.12, 0.2, 0.12] }}
              
transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              
style={{
                
position: "absolute",
                
width: "65%",
                
height: "65%",
                
left: "18%",
                
top: "15%",
                
borderRadius: "50%",
                
background: "#B9EE91",
                
filter: "blur(55px)",
              
}}
            
/>
            
<motion.div
              
className="basket"
              
animate={{ y: [0, -5, 0] }}
              
transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            
>
              
<img src={heroImg} alt="Foto hasil panen sayur segar" className="floating-img" />
            
</motion.div>
          
</motion.div>
        
</section>
        
{/* FEATURES */}
        
<section className="features">
          
<motion.div
            
initial="hidden"
            
whileInView="visible"
            
viewport={{ once: true, amount: 0.2 }}
            
variants={stagger}
            
className="features-head"
          
>
            
<motion.span
              
variants={fadeUp}
              
style={{ display: "block", marginBottom: 7, fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", color: "#71986A" }}
            
>
              
WHY AGRI-ICS
            
</motion.span>
            
<motion.h2 variants={fadeUp}>Fitur Utama Kami</motion.h2>
            
<motion.p variants={fadeUp}>
              
Tiga hal yang membuat kebun kami berbeda — dari sensor di lahan sampai ke meja makan Anda.
            
</motion.p>
          
</motion.div>
          
<motion.div
            
initial="hidden"
            
whileInView="visible"
            
viewport={{ once: true, amount: 0.15 }}
            
variants={stagger}
            
className="features-row"
          
>
            
<motion.div variants={fadeUp} whileHover={{ y: -4 }} className="feature-item is-live">
              
<svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                
<path d="M3 17l5-5 3 3 6-7" />
                
<path d="M14 8h4v4" />
              
</svg>
              
<h3>
                
<span className="live-dot"></span>
                
Realtime Monitoring
              
</h3>
              
<p>Suhu, kelembapan, dan nutrisi greenhouse terpantau dari sensor IoT yang menyala 24/7, bukan cuma estimasi.</p>
            
</motion.div>
            
<motion.div variants={fadeUp} whileHover={{ y: -4 }} className="feature-item">
              
<svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                
<path d="M4 4h2l2.2 11a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L21 8H7" />
                
<circle cx="10" cy="20" r="1.3" />
                
<circle cx="17" cy="20" r="1.3" />
              
</svg>
              
<h3>Online Marketplace</h3>
              
<p>Hasil panen hari itu langsung bisa dipesan, tanpa lewat gudang atau pengepul — dipetik lalu dikirim.</p>
            
</motion.div>
            
<motion.div variants={fadeUp} whileHover={{ y: -4 }} className="feature-item">
              
<svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                
<circle cx="12" cy="12" r="3" />
                
<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
              
</svg>
              
<h3>AI Agent</h3>
              
<p>Cukup ceritakan kebutuhan sayurmu, sistem akan menyesuaikan rekomendasi dari data panen yang tersedia.</p>
            
</motion.div>
          
</motion.div>
        
</section>
        
{/* PRODUCT CAROUSEL */}
        
<section className="products-carousel-section">
          
<motion.div
            
initial="hidden"
            
whileInView="visible"
            
viewport={{ once: true, amount: 0.2 }}
            
variants={stagger}
            
className="products-head-center"
          
>
            
<motion.span
              
variants={fadeUp}
              
style={{ display: "block", marginBottom: 7, fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", color: "#71986A" }}
            
>
              
GALLERY
            
</motion.span>
            
<motion.h2 variants={fadeUp} style={{ fontSize: 21, fontWeight: 700, color: "#173524", margin: "0 0 8px" }}>
              
Produk Unggulan
            
</motion.h2>
            
<motion.p variants={fadeUp} style={{ fontSize: 13, color: "#5D6D63", lineHeight: 1.6 }}>
              
Hasil panen terbaik dari greenhouse kami, langsung dipetik untuk Anda.
            
</motion.p>
          
</motion.div>
          
<div className="carousel-container">
            
<div className="carousel-track" style={{ position: "relative", height: "340px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              
{productsList.map((prod, idx) => {
                
let xPos = 0;
                
let scaleVal = 0.7;
                
let opacityVal = 0;
                
let pointerEventsVal = "none";
                
let zIndexVal = 1;
                
if (idx === activeIndex) {
                  
xPos = 0;
                  
scaleVal = 1.05;
                  
opacityVal = 1;
                  
pointerEventsVal = "auto";
                  
zIndexVal = 30;
                
} else if (idx === (activeIndex - 1 + productsList.length) % productsList.length) {
                  
xPos = -220;
                  
scaleVal = 0.85;
                  
opacityVal = 0.7;
                  
pointerEventsVal = "auto";
                  
zIndexVal = 20;
                
} else if (idx === (activeIndex + 1) % productsList.length) {
                  
xPos = 220;
                  
scaleVal = 0.85;
                  
opacityVal = 0.7;
                  
pointerEventsVal = "auto";
                  
zIndexVal = 20;
                
}
                
return (
                  
<motion.div
                    
className={`product-card-3d ${idx === activeIndex ? "carousel-item-active" : ""}`}
                    
key={idx}
                    
onClick={() => setActiveIndex(idx)}
                    
initial={false}
                    
animate={{ x: xPos, scale: scaleVal, opacity: opacityVal }}
                    
transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    
style={{ position: "absolute", zIndex: zIndexVal, pointerEvents: pointerEventsVal, cursor: "pointer" }}
                    
whileHover={{ y: -5 }}
                  
>
                    
<div className="product-photo">
                      
<img src={prod.img} alt={prod.name} />
                    
</div>
                    
<div className="product-info">
                      
<div>
                        
<div className="name">{prod.name}</div>
                        
<div className="price">{prod.price}</div>
                      
</div>
                      
<motion.button className="cart-btn" aria-label="Tambah ke keranjang" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}>
                        
<svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          
<circle cx="9" cy="21" r="1" />
                          
<circle cx="20" cy="21" r="1" />
                          
<path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
                        
</svg>
                      
</motion.button>
                    
</div>
                  
</motion.div>
                
);
              
})}
            
</div>
            
<div className="carousel-nav-buttons" style={{ display: "flex", justifyContent: "center", gap: 15, marginTop: 20 }}>
              
<motion.button
                
className="carousel-arrow"
                
onClick={handlePrev}
                
aria-label="Sebelumnya"
                
whileHover={{ scale: 1.05, x: -2 }}
                
whileTap={{ scale: 0.95 }}
              
>
                
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  
<path d="M19 12H5M12 19l-7-7 7-7" />
                
</svg>
              
</motion.button>
              
<motion.button
                
className="carousel-arrow"
                
onClick={handleNext}
                
aria-label="Berikutnya"
                
whileHover={{ scale: 1.05, x: 2 }}
                
whileTap={{ scale: 0.95 }}
              
>
                
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  
<path d="M5 12h14M12 5l7 7-7 7" />
                
</svg>
              
</motion.button>
            
</div>
          
</div>
        
</section>
        
{/* MAPS & INFO */}
        
<LocationSection />
        
{/* STATS SECTION */}
        
<motion.section
          
initial="hidden"
          
whileInView="visible"
          
viewport={{ once: true, amount: 0.15 }}
          
variants={stagger}
          
className="highlights-section"
        
>
          
<motion.div variants={fadeUp} className="testimonial-slim-bar">
            
<motion.div className="testimonial-slim-content" whileHover={{ y: -2 }}>
              
<img src={avatarImg} alt="Mas Tofar" className="slim-avatar" />
              
<p>
                
"Keren banget bisa tau greenhouse mana yang ada stok, terus sayurnya segar-segar banget!"
                
<span className="slim-author">— Mas Tofar</span>
              
</p>
            
</motion.div>
          
</motion.div>
        
</motion.section>
        
{/* FOOTER */}
        
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
                
<img src={logoImg} alt="Agri-ICS" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              
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
              
<motion.a href="#shop" whileHover={{ x: 3 }} onClick={(e) => { e.preventDefault(); handleMarketplace(); }}>Shop</motion.a>
            
</div>
            
<div className="footer-col">
              
<h4>Shop</h4>
              
<motion.a href="#shop" whileHover={{ x: 3 }} onClick={(e) => { e.preventDefault(); handleMarketplace(); }}>All Products</motion.a>
              
<motion.a href="#shop" whileHover={{ x: 3 }} onClick={(e) => { e.preventDefault(); handleMarketplace(); }}>Best Seller</motion.a>
              
<motion.a href="#shop" whileHover={{ x: 3 }} onClick={(e) => { e.preventDefault(); handleMarketplace(); }}>Promo</motion.a>
            
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
      
</motion.div>
      
{/* INTRO ANIMATION */}
      
<AnimatePresence>
        
{showIntro && (
          
<motion.div
            
initial={{ opacity: 1 }}
            
exit={{
              
opacity: 0,
              
transition: {
                
duration: 0.8,
                
ease: [0.22, 1, 0.36, 1],
              
},
            
}}
            
style={{
              
position: "fixed",
              
inset: 0,
              
width: "100vw",
              
height: "100dvh",
              
zIndex: 999999,
              
display: "flex",
              
alignItems: "center",
              
justifyContent: "center",
              
overflow: "hidden",
              
background: "linear-gradient(135deg, #092B17 0%, #123D22 55%, #17351E 100%)",
            
}}
          
>
            
<motion.div
              
animate={{
                
opacity: [0.12, 0.27, 0.12],
                
scale: [0.84, 1.08, 0.84],
              
}}
              
transition={{
                
duration: 2.6,
                
repeat: Infinity,
                
ease: "easeInOut",
              
}}
              
style={{
                
position: "absolute",
                
left: "50%",
                
top: "50%",
                
width: 320,
                
height: 320,
                
transform: "translate(-50%, -50%)",
                
borderRadius: "50%",
                
background: "#B9EE91",
                
filter: "blur(100px)",
              
}}
            
/>
            
<motion.div
              
initial={{ opacity: 0, scale: 0.82, y: 12 }}
              
animate={{ opacity: 1, scale: 1, y: 0 }}
              
exit={{ opacity: 0, scale: 0.96, y: -7 }}
              
transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              
style={{
                
position: "relative",
                
zIndex: 2,
                
display: "flex",
                
flexDirection: "column",
                
alignItems: "center",
                
justifyContent: "center",
                
textAlign: "center",
              
}}
            
>
              
{/* Logo dengan efek kilatan cahaya lewat (shimmer-effect) */}
              
<motion.div
                
animate={{ scale: [1, 1.035, 1] }}
                
transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                
className="shimmer-effect"
                
style={{
                  
width: 120,
                  
height: 120,
                  
padding: 8,
                  
display: "flex",
                  
alignItems: "center",
                  
justifyContent: "center",
                  
borderRadius: "50%",
                  
background: "#FFFFFF",
                  
boxShadow: "0 0 70px rgba(185,238,145,0.22)",
                
}}
              
>
                
<img src={logoImg} alt="Agri-ICS" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              
</motion.div>
              
{/* Teks dengan efek kilatan cahaya lewat (shimmer-effect) */}
              
<motion.div
                
initial={{ opacity: 0, y: 8 }}
                
animate={{ opacity: 1, y: 0 }}
                
transition={{ delay: 0.3, duration: 0.6 }}
                
className="shimmer-effect"
                
style={{ marginTop: 22, color: "#FFFFFF", fontSize: 30, fontWeight: 700, letterSpacing: "0.08em", display: "inline-block", borderRadius: "8px", padding: "0 10px" }}
              
>
                
AGRI<span style={{ color: "#B9EE91" }}>-ICS</span>
              
</motion.div>
              
<motion.p
                
initial={{ opacity: 0 }}
                
animate={{ opacity: 1 }}
                
transition={{ delay: 0.55, duration: 0.6 }}
                
style={{ margin: "7px 0 0", color: "rgba(255,255,255,0.48)", fontSize: 11, letterSpacing: "0.22em" }}
              
>
                
SMART AGRICULTURE • IoT • LIVINGLAB
              
</motion.p>
            
</motion.div>
          
</motion.div>
        
)}
      
</AnimatePresence>
    
</div>
  
);
}