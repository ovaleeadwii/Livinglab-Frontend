import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import "../index.css";
// Logo yang sama dengan beranda (LandingPage)
import logoImg from "../assets/logo.svg";
// Foto banner kiri. Boleh diganti dengan foto kebun sendiri,
// misalnya: import bannerImg from "../assets/greenhouse.jpg";
const BANNER_IMG =
  
"https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1200&q=80";
const API_URL = "http://127.0.0.1:8000/api";
/* ================= IKON KECIL (SVG) ================= */
const Icon = ({ d, className = "h-4 w-4", strokeWidth = 2 }) => (
  
<svg
    
viewBox="0 0 24 24"
    
fill="none"
    
stroke="currentColor"
    
strokeWidth={strokeWidth}
    
strokeLinecap="round"
    
strokeLinejoin="round"
    
className={className}
  
>
    
{d}
  
</svg>
);
const IconUser = (p) => <Icon {...p} d={<><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>} />;
const IconHome = (p) => <Icon {...p} d={<><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z" /></>} />;
const IconChevron = (p) => <Icon {...p} d={<path d="m9 18 6-6-6-6" />} />;
const IconLogin = (p) => <Icon {...p} d={<><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><path d="m10 17 5-5-5-5" /><path d="M15 12H3" /></>} />;
const IconUserPlus = (p) => <Icon {...p} d={<><circle cx="9" cy="8" r="4" /><path d="M2 21a7 7 0 0 1 14 0" /><path d="M19 8v6" /><path d="M22 11h-6" /></>} />;
const IconAt = (p) => <Icon {...p} d={<><circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" /></>} />;
const IconLock = (p) => <Icon {...p} d={<><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>} />;
const IconEye = (p) => <Icon {...p} d={<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>} />;
const IconEyeOff = (p) => <Icon {...p} d={<><path d="M9.9 4.2A10 10 0 0 1 12 4c6.5 0 10 8 10 8a17 17 0 0 1-2.2 3.2" /><path d="M6.6 6.6A17 17 0 0 0 2 12s3.5 8 10 8a9.7 9.7 0 0 0 5.4-1.6" /><path d="M14.1 14.1a3 3 0 1 1-4.2-4.2" /><path d="m2 2 20 20" /></>} />;
const IconArrow = (p) => <Icon {...p} d={<><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>} />;
const IconShield = (p) => <Icon {...p} d={<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>} />;
const IconBadgeCheck = (p) => <Icon {...p} d={<><path d="M12 2 15 5h4v4l3 3-3 3v4h-4l-3 3-3-3H5v-4l-3-3 3-3V5h4Z" /><path d="m9 12 2 2 4-4" /></>} />;
const IconClock = (p) => <Icon {...p} d={<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>} />;
const IconHeadset = (p) => <Icon {...p} d={<><path d="M3 14v-2a9 9 0 0 1 18 0v2" /><path d="M21 15a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2Z" /><path d="M3 15a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2Z" /><path d="M18 17v1a3 3 0 0 1-3 3h-3" /></>} />;
const IconTruck = (p) => <Icon {...p} d={<><path d="M3 6h11v10H3Z" /><path d="M14 9h4l3 3v4h-7" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></>} />;
const IconFarmer = (p) => <Icon {...p} d={<><circle cx="12" cy="7" r="3" /><path d="M5 21v-2a7 7 0 0 1 14 0v2" /><path d="M8 5h8" /></>} />;
const IconStore = (p) => <Icon {...p} d={<><path d="M3 9 5 4h14l2 5" /><path d="M4 9v11h16V9" /><path d="M3 9h18" /><path d="M9 20v-6h6v6" /></>} />;
const IconStar = (p) => <Icon {...p} d={<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9Z" />} />;
const IconChat = (p) => <Icon {...p} d={<><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M7 9h10" /><path d="M7 13h6" /></>} />;
const IconMail = (p) => <Icon {...p} d={<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>} />;
const GoogleLogo = () => (
  
<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    
<path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
    
<path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.95H1.2v3.15C3.18 21.32 7.24 24 12 24z" />
    
<path fill="#FBBC05" d="M5.28 14.25c-.25-.72-.38-1.49-.38-2.25s.13-1.53.38-2.25V6.6H1.2C.43 8.15 0 9.92 0 12s.43 3.85 1.2 5.4l4.08-3.15z" />
    
<path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.24 0 3.18 2.68 1.2 6.6l4.08 3.15c.95-2.84 3.6-4.95 6.72-4.95z" />
  
</svg>
);
/* ================= DATA TAMPILAN ================= */
const BANNER_FEATURES = [
  
{ icon: IconTruck, title: "Panen Subuh & Kirim Berpendingin", desc: "Selesai potong langsung masuk jalur pendingin dalam 4 jam." },
  
{ icon: IconFarmer, title: "Harga Langsung Petani Presisi", desc: "Transparan tanpa rantai tengkulak atau mark-up perantara." },
  
{ icon: IconStore, title: "Kemitraan Reseller Instan B2B", desc: "Buka gerai suplai sayur & melon dengan margin hingga 25%." },
];
const TRUST_ITEMS = [
  
{ icon: IconBadgeCheck, title: "100% Bebas Pestisida", desc: "Nutrisi AB mix terkontrol IoT" },
  
{ icon: IconClock, title: "Same-Day Harvest", desc: "Panen fajar, antar siang hari" },
  
{ icon: IconLock, title: "Data Terenkripsi", desc: "Keamanan transaksi terjamin" },
  
{ icon: IconHeadset, title: "CS Tanggamus Siaga", desc: "Respon cepat via WhatsApp" },
];
const AVATAR_DEFAULT =
  
"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150";
/* Kelas Tailwind yang dipakai berulang */
const inputBox =
  
"flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3.5 transition focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-600/15";
const inputField =
  
"h-11 w-full border-0 bg-transparent p-0 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-0";
const labelText = "text-xs font-semibold text-slate-800";
export default function AuthPage({ setPage, onLoginSuccess }) {
  
const [isLogin, setIsLogin] = useState(true);
  
const [showPassword, setShowPassword] = useState(false);
  
const [loading, setLoading] = useState(false);
  
const [errorMsg, setErrorMsg] = useState("");
  
const [identifier, setIdentifier] = useState(
    
() => localStorage.getItem("livingSmartRememberId") || ""
  
);
  
const [rememberMe, setRememberMe] = useState(
    
() => !!localStorage.getItem("livingSmartRememberId")
  
);
  
const [passwordInput, setPasswordInput] = useState("");
  
// Form daftar
  
const [nameInput, setNameInput] = useState("");
  
const [phoneInput, setPhoneInput] = useState("");
  
const [emailInput, setEmailInput] = useState("");
  
const [addressInput, setAddressInput] = useState("");
  
const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  
const switchTab = (login) => {
    
setIsLogin(login);
    
setErrorMsg("");
    
setShowPassword(false);
  
};
  
// Setelah login sebagai Pembeli, App.jsx membuka Marketplace (ShopPage)
  
const selesaiLogin = (userData) => {
    
const role = (userData.role || "").toLowerCase();
    
if (role.includes("konsumen") || role.includes("pembeli")) {
      
sessionStorage.setItem("marketplaceAfterLogin", "1");
    
}
    
if (onLoginSuccess) onLoginSuccess(userData);
    
else setPage("shop");
  
};
  
const handleLogin = async () => {
    
const isEmail = identifier.includes("@");
    
try {
      
const response = await fetch(`${API_URL}/login`, {
        
method: "POST",
        
headers: { "Content-Type": "application/json", Accept: "application/json" },
        
body: JSON.stringify({
          
email: identifier,
          
...(isEmail ? {} : { phone: identifier }),
          
password: passwordInput,
        
}),
      
});
      
const data = await response.json();
      
if (!response.ok) {
        
setErrorMsg(data.message || "Login gagal, periksa kembali email/nomor dan kata sandi Anda.");
        
return;
      
}
      
localStorage.setItem("token", data.token);
      
if (rememberMe) localStorage.setItem("livingSmartRememberId", identifier);
      
else localStorage.removeItem("livingSmartRememberId");
      
selesaiLogin({
        
name: data.user.name,
        
email: data.user.email,
        
phone: data.user.phone || "",
        
address: data.user.address || "",
        
role: data.user.role || "Konsumen",
        
avatar: data.user.avatar || AVATAR_DEFAULT,
      
});
    
} catch (error) {
      
console.error("Terjadi kesalahan koneksi ke backend:", error);
      
setErrorMsg("Tidak dapat terhubung ke server. Pastikan backend Laravel (php artisan serve) sudah menyala.");
    
}
  
};
  
const handleRegister = () => {
    
if (passwordInput !== confirmPasswordInput) {
      
setErrorMsg("Kata sandi dan ulangi kata sandi belum sama.");
      
return;
    
}
    
// Sementara data daftar disimpan di browser (belum ke backend)
    
selesaiLogin({
      
name: nameInput,
      
email: emailInput,
      
phone: phoneInput,
      
address: addressInput,
      
role: "Konsumen",
      
avatar: AVATAR_DEFAULT,
    
});
  
};
  
const handleSubmit = async (e) => {
    
e.preventDefault();
    
setErrorMsg("");
    
setLoading(true);
    
if (isLogin) await handleLogin();
    
else handleRegister();
    
setLoading(false);
  
};
  
// ===== Masuk dengan Google =====
  
// Butuh Client ID dari Google Cloud Console, simpan di file .env:
  
//   VITE_GOOGLE_CLIENT_ID=xxxxxxxx.apps.googleusercontent.com
  
const handleGoogleLogin = () => {
    
setErrorMsg("");
    
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    
if (!clientId) {
      
setErrorMsg("Login Google belum diatur. Tambahkan VITE_GOOGLE_CLIENT_ID di file .env lalu jalankan ulang npm run dev.");
      
return;
    
}
    
const mulaiLogin = () => {
      
const tokenClient = window.google.accounts.oauth2.initTokenClient({
        
client_id: clientId,
        
scope: "openid email profile",
        
callback: async (tokenResponse) => {
          
if (!tokenResponse.access_token) return;
          
try {
            
const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
              
headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            
});
            
const profil = await res.json();
            
selesaiLogin({
              
name: profil.name,
              
email: profil.email,
              
phone: "",
              
address: "",
              
role: "Konsumen",
              
avatar: profil.picture,
              
loginWith: "google",
            
});
          
} catch (error) {
            
console.error("Gagal mengambil profil Google:", error);
            
setErrorMsg("Login Google gagal, coba lagi.");
          
}
        
},
      
});
      
tokenClient.requestAccessToken();
    
};
    
// Muat script Google sekali saja
    
if (window.google?.accounts?.oauth2) {
      
mulaiLogin();
    
} else {
      
const script = document.createElement("script");
      
script.src = "https://accounts.google.com/gsi/client";
      
script.async = true;
      
script.onload = mulaiLogin;
      
script.onerror = () => setErrorMsg("Tidak bisa memuat Google Sign-In. Cek koneksi internet.");
      
document.body.appendChild(script);
    
}
  
};
  
const handleMarketplace = () => {
    
setPage("shop");
  
};
  
return (
    
<motion.div
      
initial={{ opacity: 0, y: 10 }}
      
animate={{ opacity: 1, y: 0 }}
      
exit={{ opacity: 0, y: -10 }}
      
transition={{ duration: 0.4, ease: "easeOut" }}
      
className="min-h-screen bg-[#f6f7fb] text-slate-800"
    
>
      
{/* CSS header & footer, disalin dari DashboardPage supaya tampilannya sama */}
      
<style>{`
        
.pro-container {
          
width: min(1420px, calc(100% - 56px));
          
margin: 0 auto;
        
}
        
/* Header */
        
.pro-header {
          
background: #ffffff;
          
border-bottom: 1px solid #e4e9e4;
        
}
        
.pro-header-inner {
          
min-height: 104px;
          
display: flex;
          
align-items: center;
          
justify-content: space-between;
          
gap: 30px;
        
}
        
.pro-brand {
          
border: 0;
          
background: transparent;
          
padding: 0;
          
display: inline-flex;
          
align-items: center;
          
gap: 12px;
          
cursor: pointer;
          
color: #183b25;
          
text-align: left;
        
}
        
/* Bulatan abu-abu di belakang logo, seperti di beranda */
        
.pro-brand-badge {
          
width: 72px;
          
height: 72px;
          
flex-shrink: 0;
          
border-radius: 50%;
          
background: #e9ecea;
          
padding: 8px;
          
display: flex;
          
align-items: center;
          
justify-content: center;
        
}
        
.pro-brand-badge img {
          
width: 100%;
          
height: 100%;
          
object-fit: contain;
          
display: block;
        
}
        
.pro-brand-name {
          
font-size: 23px;
          
line-height: 1;
          
font-weight: 800;
          
letter-spacing: -0.035em;
        
}
        
.pro-brand-name span {
          
color: #2f814b;
        
}
        
.pro-brand-sub {
          
margin-top: 5px;
          
color: #778279;
          
font-size: 11px;
          
font-weight: 500;
        
}
        
/* Footer */
        
.footer {
          
margin-top: 30px;
          
background: #173524;
          
color: #ffffff;
          
border-top: 1px solid #244c32;
        
}
        
.footer-grid {
          
width: min(1420px, calc(100% - 56px));
          
margin: 0 auto;
          
padding: 42px 0 24px;
          
display: grid;
          
grid-template-columns: 1.8fr 1fr 1fr 1fr 1.15fr;
          
gap: 44px;
        
}
        
.footer-brand {
          
display: flex;
          
align-items: flex-start;
          
gap: 12px;
        
}
        
.footer-brand-icon {
          
width: 52px;
          
height: 52px;
          
background: #ffffff;
          
border-radius: 50%;
          
padding: 3px;
          
display: flex;
          
align-items: center;
          
justify-content: center;
          
flex-shrink: 0;
        
}
        
.footer-brand .name {
          
font-size: 21px;
          
font-weight: 800;
          
letter-spacing: -.03em;
        
}
        
.footer-brand .name span {
          
color: #9bd59d;
        
}
        
.footer-brand .tag {
          
font-size: 12px;
          
color: #b9c8bc;
          
margin-top: 2px;
        
}
        
.footer-brand .desc {
          
max-width: 350px;
          
margin: 14px 0 0;
          
color: #b9c8bc;
          
font-size: 12px;
          
line-height: 1.7;
        
}
        
.footer-col h4 {
          
margin: 0 0 14px;
          
color: #ffffff;
          
font-size: 13px;
          
font-weight: 800;
        
}
        
.footer-col a,
        
.footer-col div {
          
display: block;
          
margin: 0 0 9px;
          
color: #b9c8bc;
          
font-size: 12px;
          
text-decoration: none;
          
cursor: pointer;
        
}
        
.footer-col a:hover {
          
color: #ffffff;
        
}
        
@media (max-width: 1050px) {
          
.footer-grid {
            
grid-template-columns: repeat(2, minmax(0, 1fr));
            
gap: 30px;
          
}
          
.footer-brand {
            
grid-column: 1 / -1;
          
}
        
}
        
@media (max-width: 720px) {
          
.pro-container {
            
width: calc(100% - 28px);
          
}
          
.pro-header-inner {
            
min-height: 68px;
            
gap: 12px;
          
}
          
.pro-brand-badge {
            
width: 52px;
            
height: 52px;
            
padding: 6px;
          
}
          
.pro-brand-name {
            
font-size: 19px;
          
}
          
.footer-grid {
            
grid-template-columns: 1fr;
            
gap: 25px;
          
}
        
}
      
`}</style>
      
{/* ================= HEADER (sama dengan DashboardPage) ================= */}
      
<header className="pro-header">
        
<div className="pro-container pro-header-inner">
          
<button
            
type="button"
            
className="pro-brand"
            
onClick={() => setPage("home")}
            
aria-label="Kembali ke Home"
          
>
            
<span className="pro-brand-badge">
              
<img src={logoImg} alt="Agri-ICS" />
            
</span>
            
<div>
              
<div className="pro-brand-name">
                
AGRI-<span>ICS</span>
              
</div>
              
<div className="pro-brand-sub">
                
Hidup sehat, mulai dari kebun
              
</div>
            
</div>
          
</button>
          
{/* Tombol Kembali ke dashboard utama (beranda) */}
          
<motion.button
            
type="button"
            
onClick={() => setPage("home")}
            
whileHover={{ y: -1 }}
            
whileTap={{ scale: 0.97 }}
            
className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#16502D] px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-black/10"
          
>
            
<ArrowLeft size={16} />
            
Kembali
          
</motion.button>
        
</div>
      
</header>
      
{/* ================= KONTEN ================= */}
      
<main className="mx-auto max-w-6xl px-4 pb-14 pt-6 sm:px-6 lg:px-8">
        
{/* Breadcrumb */}
        
<div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          
<nav className="flex items-center gap-1.5 text-xs text-slate-500">
            
<button type="button" onClick={() => setPage("home")} className="flex items-center gap-1 hover:text-green-700">
              
<IconHome className="h-3.5 w-3.5" /> Beranda
            
</button>
            
<IconChevron className="h-3 w-3" />
            
<span className="text-slate-600">Akun</span>
            
<IconChevron className="h-3 w-3" />
            
<span className="font-semibold text-green-700">Masuk &amp; Daftar</span>
          
</nav>
          
<span className="hidden items-center gap-2 rounded-full bg-slate-100 px-3 py-1 font-mono text-[10px] text-slate-600 sm:flex">
            
<span className="h-1.5 w-1.5 rounded-full bg-green-600" />
            
Sistem Autentikasi Terenkripsi 256-bit
          
</span>
        
</div>
        
{/* Kartu utama: split screen */}
        
<section className="grid overflow-hidden rounded-2xl bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.18)] lg:grid-cols-[42%_58%]">
          
{/* ---------- KIRI: banner greenhouse ---------- */}
          
{/* Foto tampil jelas, semua tulisan ada di kotak padat (tidak tembus pandang) */}
          
<div className="relative hidden min-h-[660px] overflow-hidden bg-green-900 lg:block">
            
<img src={BANNER_IMG} alt="" onError={(e) => (e.currentTarget.style.display = "none")} className="absolute inset-0 h-full w-full object-cover" />
            
<div className="absolute inset-0 bg-black/10" />
            
<div className="relative flex h-full flex-col justify-between gap-6 p-7 xl:p-8">
              
<div className="rounded-2xl bg-[#14532d] p-6 shadow-lg">
                
<span className="inline-flex items-center gap-2 rounded-full bg-[#22c55e] px-3 py-1 text-[11px] font-semibold text-white">
                  
<IconShield className="h-3.5 w-3.5" /> Panen Segar Terjamin
                
</span>
                
<h2 className="mt-4 text-[30px] font-bold leading-[1.15] tracking-tight text-white">
                  
Sayur segar langsung dari kebun ke meja Anda.
                
</h2>
                
<p className="mt-3 text-sm leading-relaxed text-green-50">
                  
Dipetik langsung dari instalasi hidroponik berteknologi iklim mikro lereng Gunung Tanggamus. Dijamin higienis, renyah, dan 100% bebas residu pestisida kimia.
                
</p>
              
</div>
              
<div className="space-y-3">
                
<ul className="space-y-4 rounded-2xl bg-white p-5 shadow-lg">
                  
{BANNER_FEATURES.map(({ icon: FeatureIcon, title, desc }) => (
                    
<li key={title} className="flex gap-3">
                      
<span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-green-100 text-green-700">
                        
<FeatureIcon className="h-4 w-4" />
                      
</span>
                      
<div>
                        
<p className="text-sm font-semibold text-slate-900">{title}</p>
                        
<p className="mt-0.5 text-xs leading-relaxed text-slate-600">{desc}</p>
                      
</div>
                    
</li>
                  
))}
                
</ul>
                
{/* Kartu rating */}
                
<div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-lg">
                  
<span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-green-100 text-green-700">
                    
<IconStar className="h-5 w-5" />
                  
</span>
                  
<div className="min-w-0 flex-1">
                    
<p className="text-lg font-bold text-slate-900">
                      
4.9 / 5.0 <span className="ml-1 text-[11px] font-semibold text-green-700">Rating Kepuasan</span>
                    
</p>
                    
<p className="text-[11px] leading-snug text-slate-600">Dipercaya 1.850+ pelanggan &amp; 42 mitra reseller</p>
                  
</div>
                  
<div className="flex -space-x-2">
                    
<span className="grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-green-200 text-[9px] font-bold text-green-800">LT</span>
                    
<span className="grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-emerald-300 text-[9px] font-bold text-emerald-900">GK</span>
                    
<span className="grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-sky-200 text-[9px] font-bold text-sky-800">+4k</span>
                  
</div>
                
</div>
              
</div>
            
</div>
          
</div>
          
{/* Banner versi HP (lebih pendek) */}
          
<div className="relative overflow-hidden bg-green-900 p-4 lg:hidden">
            
<img src={BANNER_IMG} alt="" onError={(e) => (e.currentTarget.style.display = "none")} className="absolute inset-0 h-full w-full object-cover" />
            
<div className="relative rounded-xl bg-[#14532d] p-4 shadow-lg">
              
<h2 className="text-xl font-bold leading-tight text-white">Sayur segar langsung dari kebun ke meja Anda.</h2>
              
<p className="mt-1.5 text-xs leading-relaxed text-green-50">Panen subuh, harga langsung petani, 100% bebas pestisida.</p>
            
</div>
          
</div>
          
{/* ---------- KANAN: form auth ---------- */}
          
<div className="flex items-center px-5 py-8 sm:px-10 lg:px-14 lg:py-12">
            
<div className="mx-auto w-full max-w-md">
              
{/* Tab Masuk / Daftar */}
              
<div className="grid grid-cols-2 gap-1 rounded-xl bg-[#f1f3fa] p-1">
                
<button
                  
type="button"
                  
onClick={() => switchTab(true)}
                  
className={`flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-medium sm:gap-2 sm:text-sm transition ${
                    
isLogin ? "bg-white text-green-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
                  
}`}
                
>
                  
<IconLogin className="h-4 w-4" /> Masuk ke Akun
                
</button>
                
<button
                  
type="button"
                  
onClick={() => switchTab(false)}
                  
className={`flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-medium sm:gap-2 sm:text-sm transition ${
                    
!isLogin ? "bg-white text-green-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
                  
}`}
                
>
                  
<IconUserPlus className="h-4 w-4" /> Daftar Akun Baru
                  
<span className="hidden rounded-full bg-green-300 px-1.5 py-0.5 font-mono sm:inline text-[9px] font-bold text-green-900">Gratis</span>
                
</button>
              
</div>
              
<AnimatePresence mode="wait">
                
<motion.div
                  
key={isLogin ? "masuk" : "daftar"}
                  
initial={{ opacity: 0, y: 8 }}
                  
animate={{ opacity: 1, y: 0 }}
                  
exit={{ opacity: 0, y: -8 }}
                  
transition={{ duration: 0.2 }}
                
>
                  
<h1 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
                    
{isLogin ? "Selamat Datang Kembali" : "Buat Akun Pembeli"}
                  
</h1>
                  
<p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                    
{isLogin
                      
? "Masuk untuk melanjutkan belanja hasil panen hidroponik atau kelola toko mitra Anda."
                      
: "Daftar gratis untuk belanja sayur & melon segar langsung dari greenhouse Gisting."}
                  
</p>
                  
<form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    
{isLogin ? (
                      
<div>
                        
<div className="mb-1.5 flex items-center justify-between">
                          
<label htmlFor="auth-id" className={labelText}>No. WhatsApp atau Email Terdaftar</label>
                          
<span className="font-mono text-[10px] text-slate-400">Format resmi</span>
                        
</div>
                        
<div className={inputBox}>
                          
<IconAt className="h-4 w-4 shrink-0 text-slate-400" />
                          
<input
                            
id="auth-id"
                            
type="text"
                            
autoComplete="username"
                            
placeholder="Contoh: 081234567890 atau nama@email.com"
                            
value={identifier}
                            
onChange={(e) => setIdentifier(e.target.value)}
                            
className={inputField}
                            
required
                          
/>
                        
</div>
                      
</div>
                    
) : (
                      
<>
                        
<div>
                          
<label htmlFor="reg-name" className={`${labelText} mb-1.5 block`}>Nama Lengkap</label>
                          
<div className={inputBox}>
                            
<IconUser className="h-4 w-4 shrink-0 text-slate-400" />
                            
<input id="reg-name" type="text" placeholder="Masukkan nama lengkap" value={nameInput} onChange={(e) => setNameInput(e.target.value)} className={inputField} required />
                          
</div>
                        
</div>
                        
<div className="grid gap-4 sm:grid-cols-2">
                          
<div>
                            
<label htmlFor="reg-phone" className={`${labelText} mb-1.5 block`}>No. WhatsApp</label>
                            
<div className={inputBox}>
                              
<IconChat className="h-4 w-4 shrink-0 text-slate-400" />
                              
<input id="reg-phone" type="tel" placeholder="081234567890" value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} className={inputField} required />
                            
</div>
                          
</div>
                          
<div>
                            
<label htmlFor="reg-email" className={`${labelText} mb-1.5 block`}>Email</label>
                            
<div className={inputBox}>
                              
<IconMail className="h-4 w-4 shrink-0 text-slate-400" />
                              
<input id="reg-email" type="email" placeholder="nama@email.com" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className={inputField} required />
                            
</div>
                          
</div>
                        
</div>
                        
<div>
                          
<label htmlFor="reg-address" className={`${labelText} mb-1.5 block`}>Alamat Pengiriman</label>
                          
<div className={inputBox}>
                            
<IconHome className="h-4 w-4 shrink-0 text-slate-400" />
                            
<input id="reg-address" type="text" placeholder="Contoh: Jl. Raya Gisting, Tanggamus" value={addressInput} onChange={(e) => setAddressInput(e.target.value)} className={inputField} required />
                          
</div>
                        
</div>
                      
</>
                    
)}
                    
<div>
                      
<div className="mb-1.5 flex items-center justify-between">
                        
<label htmlFor="auth-password" className={labelText}>Kata Sandi</label>
                        
{isLogin && (
                          
<button type="button" onClick={() => setErrorMsg("Fitur lupa sandi segera hadir. Hubungi CS via WhatsApp untuk reset.")} className="text-xs font-semibold text-green-700 hover:underline">
                            
Lupa sandi?
                          
</button>
                        
)}
                      
</div>
                      
<div className={inputBox}>
                        
<IconLock className="h-4 w-4 shrink-0 text-slate-400" />
                        
<input
                          
id="auth-password"
                          
type={showPassword ? "text" : "password"}
                          
autoComplete={isLogin ? "current-password" : "new-password"}
                          
placeholder={isLogin ? "Masukkan kata sandi akun" : "Minimal 8 karakter"}
                          
minLength={isLogin ? undefined : 8}
                          
value={passwordInput}
                          
onChange={(e) => setPasswordInput(e.target.value)}
                          
className={inputField}
                          
required
                        
/>
                        
<button
                          
type="button"
                          
onClick={() => setShowPassword((v) => !v)}
                          
className="text-slate-400 hover:text-slate-600"
                          
aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                        
>
                          
{showPassword ? <IconEyeOff className="h-4 w-4" /> : <IconEye className="h-4 w-4" />}
                        
</button>
                      
</div>
                    
</div>
                    
{!isLogin && (
                      
<div>
                        
<label htmlFor="reg-confirm" className={`${labelText} mb-1.5 block`}>Ulangi Kata Sandi</label>
                        
<div className={inputBox}>
                          
<IconLock className="h-4 w-4 shrink-0 text-slate-400" />
                          
<input id="reg-confirm" type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="Ketik ulang kata sandi" value={confirmPasswordInput} onChange={(e) => setConfirmPasswordInput(e.target.value)} className={inputField} required />
                        
</div>
                      
</div>
                    
)}
                    
{isLogin && (
                      
<div className="flex items-center justify-between gap-3">
                        
<label className="flex cursor-pointer items-center gap-2 text-xs text-slate-600">
                          
<input
                            
type="checkbox"
                            
checked={rememberMe}
                            
onChange={(e) => setRememberMe(e.target.checked)}
                            
className="h-4 w-4 rounded border-slate-300 accent-blue-600"
                          
/>
                          
Ingat kredensial di perangkat ini
                        
</label>
                        
<span className="flex items-center gap-1 font-mono text-[10px] font-semibold text-green-700">
                          
<IconShield className="h-3.5 w-3.5" /> SSO Tanggamus
                        
</span>
                      
</div>
                    
)}
                    
{errorMsg && (
                      
<p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700" role="alert">
                        
{errorMsg}
                      
</p>
                    
)}
                    
<button
                      
type="submit"
                      
disabled={loading}
                      
className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-green-700 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-wait disabled:opacity-70"
                    
>
                      
{loading ? "Memproses..." : isLogin ? "Masuk ke Akun" : "Daftar & Mulai Belanja"}
                      
{!loading && <IconArrow className="h-4 w-4" />}
                    
</button>
                    
<div className="flex items-center gap-3 py-1">
                      
<span className="h-px flex-1 bg-slate-200" />
                      
<span className="text-[11px] text-slate-400">
                        
{isLogin ? "atau masuk lebih cepat dengan" : "atau daftar lebih cepat dengan"}
                      
</span>
                      
<span className="h-px flex-1 bg-slate-200" />
                    
</div>
                    
<button
                      
type="button"
                      
onClick={handleGoogleLogin}
                      
className="flex h-11 w-full items-center justify-center gap-2.5 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                    
>
                      
<GoogleLogo /> Lanjutkan dengan Google Akun
                    
</button>
                    
<p className="pt-3 text-center text-xs text-slate-500">
                      
{isLogin ? "Belum memiliki akun Living Smart?" : "Sudah punya akun Living Smart?"}{" "}
                      
<button type="button" onClick={() => switchTab(!isLogin)} className="font-semibold text-green-700 hover:underline">
                        
{isLogin ? "Daftar Baru Sekarang" : "Masuk di sini"}
                      
</button>
                    
</p>
                  
</form>
                
</motion.div>
              
</AnimatePresence>
            
</div>
          
</div>
        
</section>
        
{/* Keunggulan di bawah kartu */}
        
<section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          
{TRUST_ITEMS.map(({ icon: TrustIcon, title, desc }) => (
            
<div key={title} className="flex items-center gap-3 rounded-xl bg-[#eff1f8] px-4 py-3.5">
              
<TrustIcon className="h-5 w-5 shrink-0 text-green-700" />
              
<div>
                
<p className="text-xs font-semibold text-slate-900">{title}</p>
                
<p className="text-[11px] text-slate-500">{desc}</p>
              
</div>
            
</div>
          
))}
        
</section>
      
</main>
      
{/* ================= FOOTER (sama dengan DashboardPage + kolom Information) ================= */}
      
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
              
<div className="name">
                
Living <span>Smart</span>
              
</div>
              
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
  
);
}
