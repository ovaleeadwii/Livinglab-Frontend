import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sprout, Clock, MapPin, ShieldCheck, Package, Star, Check, Minus, Plus, ShoppingCart, Gift, Leaf } from 'lucide-react';
import "../index.css";
import logoImg from '../assets/logo.svg';
import pakcoyImg from '../assets/pakcoi (1).png';
import seladaImg from '../assets/selada keriting.png';
import bayamImg from '../assets/bayam.png';
import tomatImg from '../assets/tomat ceri.png';
import heroImg from '../assets/sayurann.png';
import netpotImg from '../assets/netpot.png';
import ABMIXImg from '../assets/ab mix.jpg';
import rockwoolImg from '../assets/Rockwool cubes.jpg';
import sekamImg from '../assets/sekam bakar.jpg';
import abmixsayurImg from '../assets/ab mix sayur daun.jpg';
import abmixbuahImg from '../assets/ab mix buah.jpg';
import benihseladaImg from '../assets/benih selada.jpg';
import benihtomatImg from '../assets/benih tomat ceri.jpg';
import benihpakcoyImg from '../assets/benih pakcoy.jpg';
function ProductCard({ item, qty = 0, onRequestAdd, onAddToCart, onRemoveFromCart, onSelectProduct }) {
  
const handleAdd = (e) => {
    
e.stopPropagation();
    
onRequestAdd(item);
  
};
  
const handleMinus = (e) => {
    
e.stopPropagation();
    
onRemoveFromCart(item);
  
};
  
return (
    
<div className="shop-product-card" onClick={() => onSelectProduct(item)}>
      
<div className="shop-product-img">
        
<img src={item.img} alt={item.name} />
      
</div>
      
<div className="shop-product-details">
        
<div className="prod-meta">
          
<h3 className="prod-title">{item.name}</h3>
          
{item.category && <span className="prod-cat">{item.category}</span>}
          
<div className="prod-price">{item.price}</div>
        
</div>
        
{qty === 0 ? (
          
<button className="shop-cart-btn" onClick={handleAdd} aria-label="Tambah ke keranjang">
            
<svg viewBox="0 0 24 24" fill="none" stroke="#2f8f4e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              
<circle cx="9" cy="21" r="1"/>
              
<circle cx="20" cy="21" r="1"/>
              
<path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>
            
</svg>
          
</button>
        
) : (
          
<div className="qty-control-box" onClick={(e) => e.stopPropagation()}>
            
<button className="qty-btn" onClick={handleMinus}>-</button>
            
<span className="qty-number">{qty}</span>
            
<button className="qty-btn" onClick={handleAdd}>+</button>
          
</div>
        
)}
      
</div>
    
</div>
  
);
}
export default function ShopPage({ setPage, user, onCreateOrder }) {
  
const [selectedProduct, setSelectedProduct] = useState(null);
  
const [detailQty, setDetailQty] = useState(1);
  
// Kategori / kata cari bisa dikirim dari Beranda Pembeli
  
const [filterCategory, setFilterCategory] = useState(
    
() => sessionStorage.getItem("shopKategori") || "Semua"
  
);
  
const [sortBy, setSortBy] = useState("terbaru");
  
// Keranjang disimpan di browser supaya tidak hilang saat refresh / pindah halaman
  
const [cart, setCart] = useState(() => {
    
try {
      
return JSON.parse(localStorage.getItem("livingSmartCart")) || {};
    
} catch {
      
return {};
    
}
  
});
  
const [searchText, setSearchText] = useState(
    
() => sessionStorage.getItem("shopCari") || ""
  
);
  
const [isMenuOpen, setIsMenuOpen] = useState(false);
  
const [isCartOpen, setIsCartOpen] = useState(false);
  
const [activePanel, setActivePanel] = useState(null);
  
const [pendingProduct, setPendingProduct] = useState(null);
  
const [pendingQty, setPendingQty] = useState(1);
  
const [paymentMethod, setPaymentMethod] = useState("Transfer Bank / Virtual Account");
  
// State Manajemen Buku Alamat (Saved Addresses)
  
const [savedAddresses, setSavedAddresses] = useState([
    
{ id: 1, label: "Rumah Utama", detail: "Jl. Raya Gisting Atas No. 45, RT 02/RW 01, Kec. Gisting, Tanggamus, Lampung" },
    
{ id: 2, label: "Greenhouse Gisting (GH-01)", detail: "Komplek Pertanian Hidroponik Blok C, Kec. Gisting, Tanggamus, Lampung" }
  
]);
  
const [selectedAddressId, setSelectedAddressId] = useState(1);
  
const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  
const [newAddressLabel, setNewAddressLabel] = useState("");
  
const [newAddressDetail, setNewAddressDetail] = useState("");
  
const handleMarketplace = () => {
    
setPage('shop');
  
};
  
useEffect(() => {
    
localStorage.setItem("livingSmartCart", JSON.stringify(cart));
  
}, [cart]);
  
// Setelah login dari tombol checkout, buka lagi keranjangnya
  
useEffect(() => {
    
if (user && sessionStorage.getItem("openCartAfterLogin") === "1") {
      
sessionStorage.removeItem("openCartAfterLogin");
      
setIsCartOpen(true);
    
}
  
}, [user]);
  
const gulirKeProduk = () => {
    
setTimeout(() => {
      
productsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    
}, 50);
  
};
  
// Kalau datang dari Beranda Pembeli dengan kategori / kata cari, langsung gulir ke produk
  
useEffect(() => {
    
const adaKiriman = sessionStorage.getItem("shopKategori") || sessionStorage.getItem("shopCari");
    
sessionStorage.removeItem("shopKategori");
    
sessionStorage.removeItem("shopCari");
    
if (adaKiriman && adaKiriman !== "Semua") gulirKeProduk();
  
}, []);
  
const handleSearch = (e) => {
    
e.preventDefault();
    
gulirKeProduk();
  
};
  
// Klik kategori: tampilkan produk kategori itu, lalu gulir ke daftar produk.
  
// Klik kategori yang sama sekali lagi untuk kembali ke "Semua".
  
const productsSectionRef = useRef(null);
  
const pilihKategori = (nama) => {
    
setFilterCategory((prev) => (prev === nama && nama !== "Semua" ? "Semua" : nama));
    
gulirKeProduk();
  
};
  
const allProductsList = [
    
{ name: "Pakcoy", category: "Sayuran", price: "Rp. 15.000", img: pakcoyImg, plantedDate: "10 Mei 2026", harvestDate: "7 Juni 2026", duration: "28 Hari", greenhouse: "Greenhouse Utama Gisting (GH-01)", description: "Pakcoy hidroponik segar dengan sistem NFT (Nutrient Film Technique). Dipetik langsung saat pagi hari." },
    
{ name: "Selada keriting", category: "Sayuran", price: "Rp. 18.000", img: seladaImg, plantedDate: "12 Mei 2026", harvestDate: "8 Juni 2026", duration: "30 Hari", greenhouse: "GH-02", description: "Selada keriting renyah." },
    
{ name: "Bayam", category: "Sayuran", price: "Rp. 9.000", img: bayamImg, plantedDate: "15 Mei 2026", harvestDate: "5 Juni 2026", duration: "21 Hari", greenhouse: "Greenhouse Gisting (GH-02)", description: "Bayam hijau segar kaya nutrisi tanpa pestisida kimia." },
    
{ name: "Tomat Ceri", category: "Sayuran", price: "Rp. 17.000", img: tomatImg, plantedDate: "1 April 2026", harvestDate: "1 Juni 2026", duration: "60 Hari", greenhouse: "GH-03", description: "Tomat ceri manis bernutrisi." },
    
    
{ 
      
name: "Rockwool cubes", 
      
category: "Media Tanam", 
      
price: "Rp. 35.000", 
      
img: rockwoolImg, 
      
spec1: "Kapasitas Serap Tinggi", 
      
spec2: "Bersertifikasi SNI", 
      
spec3: "Siap Pakai / Potong", 
      
spec4: "Gudang Logistik", 
      
description: "Media tanam rockwool berkualitas tinggi dengan kapasitas serap air optimal." 
    
},
    
{ 
      
name: "Netpot Hidroponik", 
      
category: "Media Tanam", 
      
price: "Rp. 5.000", 
      
img: netpotImg, 
      
spec1: "Plastik HDPE Berkualitas", 
      
spec2: "Food Grade & Certified", 
      
spec3: "Tahan Sinar UV", 
      
spec4: "Gudang Logistik", 
      
description: "Netpot hitam bertingkat ukuran standar untuk sirkulasi akar." 
    
},
    
{ 
      
name: "Sekam Bakar", 
      
category: "Media Tanam", 
      
price: "Rp. 12.000", 
      
img: sekamImg, 
      
spec1: "Steril & Bebas Patogen", 
      
spec2: "Quality Controlled", 
      
spec3: "Porus & Gembur", 
      
spec4: "Gudang Logistik", 
      
description: "Sekam bakar steril untuk campuran media." 
    
},
    
{ 
      
name: "AB MIX", 
      
category: "Nutrisi", 
      
price: "Rp. 75.000", 
      
img: ABMIXImg, 
      
spec1: "Larut 100% Tanpa Endapan", 
      
spec2: "Formula Lab Teruji", 
      
spec3: "Pekatan Cair 1 Liter", 
      
spec4: "Lab Nutrisi", 
      
description: "Nutrisi hidroponik lengkap unsur hara makro dan mikro." 
    
},
    
{ 
      
name: "AB Mix Sayur Daun", 
      
category: "Nutrisi", 
      
price: "Rp. 45.000", 
      
img: abmixsayurImg, 
      
spec1: "Larut 100% Tanpa Endapan", 
      
spec2: "Formula Lab Teruji", 
      
spec3: "Pekatan Cair 1 Liter", 
      
spec4: "Lab Nutrisi", 
      
description: "Pekatan nutrisi AB Mix khusus sayur daun." 
    
},
    
{ 
      
name: "AB Mix Buah", 
      
category: "Nutrisi", 
      
price: "Rp. 50.000", 
      
img: abmixbuahImg, 
      
spec1: "Kandungan Kalium Tinggi", 
      
spec2: "Formula Lab Teruji", 
      
spec3: "Pekatan Cair 1 Liter", 
      
spec4: "Lab Nutrisi", 
      
description: "Pekatan nutrisi khusus tanaman buah." 
    
},
    
{ 
      
name: "Benih Pakcoy Unggul", 
      
category: "Benih", 
      
price: "Rp. 8.000", 
      
img: benihpakcoyImg, 
      
spec1: "Daya Tumbuh >95%", 
      
spec2: "Sertifikat Benih Unggul", 
      
spec3: "Kemasan Sealed Pack", 
      
spec4: "Lab Benih", 
      
description: "Benih pakcoy pilihan tahan penyakit." 
    
},
    
{ 
      
name: "Benih Selada", 
      
category: "Benih", 
      
price: "Rp. 10.000", 
      
img: benihseladaImg, 
      
spec1: "Daya Tumbuh >90%", 
      
spec2: "Sertifikat Benih Unggul", 
      
spec3: "Kemasan Sealed Pack", 
      
spec4: "Lab Benih", 
      
description: "Benih selada keriting lebat." 
    
},
    
{ 
      
name: "Benih Tomat Ceri", 
      
category: "Benih", 
      
price: "Rp. 15.000", 
      
img: benihtomatImg, 
      
spec1: "Daya Tumbuh >92%", 
      
spec2: "Sertifikat Benih Unggul", 
      
spec3: "Kemasan Sealed Pack", 
      
spec4: "Lab Benih", 
      
description: "Benih tomat ceri hibrida." 
    
},
  
];
  
// Best Seller diambil dari daftar produk yang sama (nama harus persis sama),
  
// supaya produk yang sama tidak masuk keranjang dua kali.
  
const BEST_SELLER_NAMES = ["Pakcoy", "Rockwool cubes", "Bayam", "Netpot Hidroponik", "AB MIX"];
  
const bestSellers = BEST_SELLER_NAMES
    
.map((nama) => allProductsList.find((item) => item.name === nama))
    
.filter(Boolean);
  
// Paket Hemat: beberapa produk dijual sekaligus, harganya lebih murah dari beli satuan
  
const PAKET_HEMAT = [
    
{
      
name: "Paket A - Sayur Sehat",
      
category: "Paket Hemat",
      
price: "Rp. 36.000",
      
hargaNormal: "Rp. 42.000",
      
img: pakcoyImg,
      
fotoIsi: [pakcoyImg, seladaImg, bayamImg],
      
isi: ["Pakcoy 1 ikat", "Selada keriting 1 ikat", "Bayam 1 ikat"],
      
label: "Paling Laris",
      
description: "Tiga sayuran hidroponik favorit untuk masak seminggu. Dipanen di hari yang sama dengan pengiriman.",
    
},
    
{
      
name: "Paket B - Mulai Hidroponik",
      
category: "Paket Hemat",
      
price: "Rp. 115.000",
      
hargaNormal: "Rp. 134.000",
      
img: ABMIXImg,
      
fotoIsi: [ABMIXImg, rockwoolImg, netpotImg, benihpakcoyImg],
      
isi: ["AB MIX 1 set", "Rockwool cubes", "Netpot Hidroponik", "Benih Pakcoy Unggul"],
      
label: "Untuk Pemula",
      
description: "Semua yang kamu butuhkan untuk mulai menanam pakcoy hidroponik sendiri di rumah.",
    
},
    
{
      
name: "Paket C - Salad Keluarga",
      
category: "Paket Hemat",
      
price: "Rp. 45.000",
      
hargaNormal: "Rp. 53.000",
      
img: seladaImg,
      
fotoIsi: [seladaImg, tomatImg, pakcoyImg],
      
isi: ["Selada keriting 1 ikat", "Tomat Ceri 1 pack", "Pakcoy 1 ikat"],
      
label: "Hemat",
      
description: "Bahan salad segar untuk 3-4 orang: selada renyah, tomat ceri manis, dan pakcoy muda.",
    
},
  
];
  
const angkaHarga = (harga) => parseInt(String(harga).replace(/[^0-9]/g, ""), 10) || 0;
  
const kataCari = searchText.trim().toLowerCase();
  
const sedangMenyaring = filterCategory !== "Semua" || kataCari !== "";
  
const filteredProducts = allProductsList.filter(item => {
    
const cocokKategori =
      
filterCategory === "Semua" || item.category.toLowerCase() === filterCategory.toLowerCase();
    
const cocokCari =
      
!kataCari ||
      
item.name.toLowerCase().includes(kataCari) ||
      
item.category.toLowerCase().includes(kataCari);
    
return cocokKategori && cocokCari;
  
}).sort((a, b) => {
    
const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
    
const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
    
if (sortBy === "termurah") {
      
return priceA - priceB;
    
} else if (sortBy === "termahal") {
      
return priceB - priceA;
    
} else {
      
return 0;
    
}
  
});
  
const addToCart = (item) => {
    
setCart((prev) => ({
      
...prev,
      
[item.name]: {
        
...item,
        
qty: (prev[item.name]?.qty || 0) + 1,
      
},
    
}));
  
};
  
const removeFromCart = (item) => {
    
setCart((prev) => {
      
const current = prev[item.name];
      
if (!current) return prev;
      
if (current.qty <= 1) {
        
const next = { ...prev };
        
delete next[item.name];
        
return next;
      
}
      
return {
        
...prev,
        
[item.name]: {
          
...current,
          
qty: current.qty - 1,
        
},
      
};
    
});
  
};
  
const bukaDetail = (item) => {
    
setSelectedProduct(item);
    
setDetailQty(1);
  
};
  
const tambahDariDetail = () => {
    
if (!selectedProduct) return;
    
setCart((prev) => ({
      
...prev,
      
[selectedProduct.name]: {
        
...selectedProduct,
        
qty: (prev[selectedProduct.name]?.qty || 0) + detailQty,
      
},
    
}));
    
setSelectedProduct(null);
  
};
  
const requestAddToCart = (item) => {
    
setPendingProduct(item);
    
setPendingQty(1);
  
};
  
const confirmAddToCart = () => {
    
if (!pendingProduct || pendingQty < 1) return;
    
setCart((prev) => ({
      
...prev,
      
[pendingProduct.name]: {
        
...pendingProduct,
        
qty: (prev[pendingProduct.name]?.qty || 0) + pendingQty,
      
},
    
}));
    
setPendingProduct(null);
    
setPendingQty(1);
  
};
  
const pendingPrice = pendingProduct
    
? parseInt(pendingProduct.price.replace(/[^0-9]/g, ""), 10) || 0
    
: 0;
  
const pendingTotal = pendingPrice * pendingQty;
  
const cartItems = Object.values(cart);
  
const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  
const cartTotal = cartItems.reduce((sum, item) => {
    
const price = parseInt(item.price.replace(/[^0-9]/g, ""), 10) || 0;
    
return sum + price * item.qty;
  
}, 0);
  
const formatRupiah = (value) =>
    
`Rp. ${new Intl.NumberFormat("id-ID").format(value)}`;
  
const openPanel = (panel) => {
    
setIsMenuOpen(false);
    
setActivePanel(panel);
  
};
  
const handleCheckout = () => {
    
if (!cartItems.length) return;
    
setIsCartOpen(false);
    
// Pembeli wajib login dulu. Keranjang tetap tersimpan, setelah login
    
// pembeli dikembalikan ke Marketplace dan keranjang dibuka lagi.
    
if (!user) {
      
sessionStorage.setItem("marketplaceAfterLogin", "1");
      
sessionStorage.setItem("openCartAfterLogin", "1");
      
setPage("auth");
      
return;
    
}
    
setActivePanel("checkout");
  
};
  
const selectedPluginCategoryFallback = (item) => {
    
return item.category || "Produk Greenhouse";
  
};
  
const handleSaveNewAddress = () => {
    
if (!newAddressLabel || !newAddressDetail) {
      
alert("Harap isi label dan detail alamat terlebih dahulu!");
      
return;
    
}
    
const newObj = {
      
id: Date.now(),
      
label: newAddressLabel,
      
detail: newAddressDetail
    
};
    
setSavedAddresses(prev => [...prev, newObj]);
    
setSelectedAddressId(newObj.id);
    
setNewAddressLabel("");
    
setNewAddressDetail("");
    
setIsAddingNewAddress(false);
  
};
  
const handleCreateOrderSubmit = () => {
    
if (!cartItems.length) return;
    
const selectedAddrObj = savedAddresses.find(a => a.id === selectedAddressId);
    
    
// Meneruskan data pesanan ke fungsi global App.jsx
    
if (onCreateOrder) {
      
onCreateOrder(cartItems, paymentMethod, selectedAddrObj);
    
}
    
    
// Kosongkan keranjang dan arahkan panel ke pemberitahuan sukses (TETAP DI HALAMAN SHOP)
    
setCart({});
    
setActivePanel("orders"); // Tetap di modal panel pesanan, tidak pindah halaman!
  
};
  
return (
    
<motion.div 
      
initial={{ opacity: 0, y: 10 }}
      
animate={{ opacity: 1, y: 0 }}
      
exit={{ opacity: 0, y: -10 }}
      
transition={{ duration: 0.4, ease: "easeOut" }}
      
className="landing-container shop-page-responsive"
      
style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
    
>
      
<style>{`
        * 
{ box-sizing: border-box; }
        
.shop-page-responsive {
          
width: 100%;
          
max-width: 100%;
          
overflow-x: hidden;
        
}
        
.shop-page-responsive img {
          
max-width: 100%;
        
}
        
.shop-page-responsive button,
        
.shop-page-responsive input,
        
.shop-page-responsive select {
          
font: inherit;
        
}
        
.shop-page-responsive .topbar {
          
width: 100%;
          
max-width: 100%;
          
min-width: 0;
        
}
        
.shop-page-responsive .logo,
        
.shop-page-responsive .search,
        
.shop-page-responsive .actions {
          
min-width: 0;
        
}
        
.shop-page-responsive .search input {
          
min-width: 0;
        
}
        
.shop-page-responsive .hero {
          
width: calc(100% - 48px);
          
max-width: 1320px;
          
margin: 20px auto;
          
display: flex;
          
align-items: center;
          
justify-content: space-between;
          
position: relative;
          
padding: 20px 50px;
          
border-radius: 22px;
          
background-color: #19462b;
          
background-image: radial-gradient(circle at 80% 50%, rgba(28, 77, 47, 0.9) 0%, rgba(20, 56, 34, 1) 100%);
          
border: 1px solid #245837;
          
box-shadow: 0 14px 36px rgba(15, 38, 24, 0.12);
          
overflow: hidden;
          
gap: 30px;
        
}
        
.shop-page-responsive .hero-left-character {
          
flex: 0.9;
          
display: flex;
          
align-items: flex-end;
          
justify-content: center;
          
position: relative;
          
min-height: 240px;
        
}
        
.shop-page-responsive .character-img {
          
width: 100%;
          
max-width: 340px;
          
height: auto;
          
object-fit: contain;
          
filter: drop-shadow(0 16px 28px rgba(0,0,0,0.25));
          
transform: translateY(12px);
        
}
        
.shop-page-responsive .hero-right-content {
          
flex: 1.1;
          
max-width: 600px;
          
z-index: 2;
          
text-align: left;
        
}
        
.shop-page-responsive .hero-tag {
          
display: inline-flex;
          
align-items: center;
          
gap: 6px;
          
padding: 6px 14px;
          
background: rgba(43, 115, 71, 0.45);
          
color: #a3e0b8;
          
border: 1px solid rgba(163, 224, 184, 0.25);
          
border-radius: 99px;
          
font-size: 11.5px;
          
font-weight: 700;
          
letter-spacing: 0.05em;
          
text-transform: uppercase;
          
margin-bottom: 14px;
        
}
        
.shop-page-responsive .hero-right-content h1 {
          
font-size: clamp(28px, 2.6vw, 40px);
          
line-height: 1.15;
          
color: #ffffff;
          
margin-bottom: 12px;
          
font-weight: 800;
          
letter-spacing: -0.01em;
        
}
        
.shop-page-responsive .hero-right-content p {
          
font-size: clamp(13px, 1.1vw, 15px);
          
line-height: 1.6;
          
color: #d0e4d6;
          
margin: 0;
        
}
        
.shop-page-responsive .shop-categories-bar,
        
.shop-page-responsive .best-seller-section,
        
.shop-page-responsive .all-products-section,
        
.shop-page-responsive .service-features-banner {
          
width: 100%;
          
max-width: 1320px;
          
margin-left: auto;
          
margin-right: auto;
        
}
        
/* Tombol kategori yang sedang dipilih */
        
.shop-page-responsive .shop-cat-item {
          
transition: background .2s ease, color .2s ease, border-color .2s ease;
        
}
        
.shop-page-responsive .shop-cat-item.active {
          
background: #176137 !important;
          
border-color: #176137 !important;
          
color: #ffffff !important;
        
}
        
.shop-page-responsive .shop-cat-item.active .cat-text,
        
.shop-page-responsive .shop-cat-item.active .cat-icon-circle {
          
color: #ffffff !important;
        
}
        
.shop-page-responsive .all-products-section {
          
scroll-margin-top: 16px;
        
}
        
/* ===== Paket Hemat ===== */
        
.shop-paket-section {
          
width: min(1240px, calc(100% - 40px));
          
margin: 36px auto 10px;
          
scroll-margin-top: 16px;
        
}
        
.shop-paket-head {
          
display: flex;
          
justify-content: space-between;
          
align-items: flex-end;
          
gap: 12px;
          
flex-wrap: wrap;
          
margin-bottom: 18px;
        
}
        
.shop-paket-head h2 {
          
margin: 0;
          
display: flex;
          
align-items: center;
          
gap: 8px;
          
font-size: 26px;
          
font-weight: 800;
          
color: #183b25;
        
}
        
.shop-paket-head h2 svg { color: #e0483e; }
        
.shop-paket-head p { margin: 6px 0 0; color: #6d7b72; font-size: 14px; }
        
.shop-paket-link {
          
border: 1px solid #cfe0d3;
          
background: #fff;
          
color: #176137;
          
font-weight: 700;
          
font-size: 13px;
          
padding: 8px 14px;
          
border-radius: 10px;
          
cursor: pointer;
        
}
        
.shop-paket-grid {
          
display: grid;
          
grid-template-columns: repeat(3, minmax(0, 1fr));
          
gap: 20px;
        
}
        
.shop-paket-card {
          
background: #fff;
          
border: 1px solid #e3ebe5;
          
border-radius: 18px;
          
overflow: hidden;
          
cursor: pointer;
          
display: flex;
          
flex-direction: column;
          
box-shadow: 0 8px 24px rgba(20, 60, 35, 0.06);
        
}
        
.shop-paket-foto {
          
position: relative;
          
background: linear-gradient(135deg, #eaf6ec, #fff6e2);
          
padding: 16px;
        
}
        
.shop-paket-label {
          
position: absolute;
          
top: 12px;
          
left: 12px;
          
z-index: 1;
          
background: #176137;
          
color: #fff;
          
font-size: 11px;
          
font-weight: 800;
          
padding: 4px 10px;
          
border-radius: 999px;
        
}
        
.shop-paket-hemat {
          
position: absolute;
          
top: 12px;
          
right: 12px;
          
z-index: 1;
          
background: #e0483e;
          
color: #fff;
          
font-size: 11px;
          
font-weight: 800;
          
padding: 4px 10px;
          
border-radius: 999px;
        
}
        
.shop-paket-kolase {
          
display: grid;
          
gap: 8px;
          
aspect-ratio: 16 / 10;
        
}
        
.shop-paket-kolase.isi-3 { grid-template-columns: 1.4fr 1fr; grid-template-rows: 1fr 1fr; }
        
.shop-paket-kolase.isi-3 img:first-child { grid-row: 1 / 3; }
        
.shop-paket-kolase.isi-4 { grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; }
        
.shop-paket-kolase.isi-2 { grid-template-columns: 1fr 1fr; }
        
.shop-paket-kolase img {
          
width: 100%;
          
height: 100%;
          
min-height: 0;
          
object-fit: cover;
          
border-radius: 12px;
          
background: #fff;
        
}
        
.shop-paket-body { padding: 16px 18px 18px; display: flex; flex-direction: column; flex: 1; }
        
.shop-paket-body h3 { margin: 0 0 10px; font-size: 18px; font-weight: 800; color: #183b25; }
        
.shop-paket-body ul { list-style: none; margin: 0 0 14px; padding: 0; }
        
.shop-paket-body li {
          
display: flex;
          
align-items: center;
          
gap: 7px;
          
color: #4c5a51;
          
font-size: 13px;
          
margin-bottom: 5px;
        
}
        
.shop-paket-body li svg { color: #1f7a43; flex-shrink: 0; }
        
.shop-paket-bawah {
          
margin-top: auto;
          
display: flex;
          
justify-content: space-between;
          
align-items: flex-end;
          
gap: 10px;
        
}
        
.shop-paket-bawah s { display: block; color: #95a198; font-size: 12px; }
        
.shop-paket-bawah strong { color: #176137; font-size: 20px; font-weight: 800; }
        
.shop-paket-btn {
          
border: 0;
          
background: #176137;
          
color: #fff;
          
border-radius: 10px;
          
padding: 10px 14px;
          
font-weight: 700;
          
font-size: 13px;
          
display: inline-flex;
          
align-items: center;
          
gap: 6px;
          
cursor: pointer;
          
white-space: nowrap;
        
}
        
.shop-paket-btn:hover { background: #124d2b; }
        
/* ===== Pop-up detail produk ===== */
        
.pd-overlay {
          
position: fixed;
          
inset: 0;
          
z-index: 1000;
          
background: rgba(15, 30, 20, 0.55);
          
backdrop-filter: blur(4px);
          
display: flex;
          
align-items: center;
          
justify-content: center;
          
padding: 20px;
        
}
        
.pd-box {
          
position: relative;
          
width: min(960px, 100%);
          
max-height: calc(100vh - 40px);
          
overflow-y: auto;
          
background: #fff;
          
border-radius: 24px;
          
padding: 28px;
          
box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25);
        
}
        
.pd-close {
          
position: absolute;
          
top: 14px;
          
right: 14px;
          
z-index: 2;
          
width: 38px;
          
height: 38px;
          
border-radius: 50%;
          
border: 0;
          
background: #f1f4f2;
          
color: #33413a;
          
font-size: 22px;
          
line-height: 1;
          
cursor: pointer;
        
}
        
.pd-close:hover { background: #e3e9e5; }
        
.pd-grid {
          
display: grid;
          
grid-template-columns: 1fr 1.1fr;
          
gap: 30px;
        
}
        
.pd-foto {
          
background: linear-gradient(160deg, #eef7f0, #f8faf8);
          
border-radius: 20px;
          
padding: 22px;
          
display: flex;
          
flex-direction: column;
          
justify-content: center;
          
gap: 16px;
        
}
        
.pd-foto > img {
          
width: 100%;
          
aspect-ratio: 1 / 1;
          
object-fit: contain;
        
}
        
.pd-jaminan { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
        
.pd-jaminan span {
          
display: inline-flex;
          
align-items: center;
          
gap: 5px;
          
background: #fff;
          
color: #176137;
          
font-size: 12px;
          
font-weight: 600;
          
padding: 6px 10px;
          
border-radius: 999px;
        
}
        
.pd-info { display: flex; flex-direction: column; }
        
.pd-kategori {
          
align-self: flex-start;
          
background: #e7f5ea;
          
color: #176137;
          
font-size: 12px;
          
font-weight: 800;
          
letter-spacing: 0.04em;
          
text-transform: uppercase;
          
padding: 5px 12px;
          
border-radius: 999px;
        
}
        
.pd-info h2 {
          
margin: 12px 0 6px;
          
font-size: 30px;
          
font-weight: 800;
          
letter-spacing: -0.02em;
          
color: #14251a;
        
}
        
.pd-rating {
          
display: flex;
          
align-items: center;
          
gap: 5px;
          
font-size: 14px;
          
font-weight: 700;
          
color: #33413a;
        
}
        
.pd-rating svg { color: #f4b400; fill: #f4b400; }
        
.pd-rating span { color: #6d7b72; font-weight: 500; }
        
.pd-harga {
          
display: flex;
          
align-items: baseline;
          
flex-wrap: wrap;
          
gap: 10px;
          
margin: 14px 0 10px;
        
}
        
.pd-harga strong { font-size: 28px; font-weight: 800; color: #176137; }
        
.pd-harga s { color: #95a198; font-size: 15px; }
        
.pd-hemat {
          
background: #fde8e8;
          
color: #c0392b;
          
font-size: 12px;
          
font-weight: 800;
          
padding: 4px 9px;
          
border-radius: 8px;
        
}
        
.pd-desc { margin: 0 0 16px; color: #55635a; font-size: 14px; line-height: 1.7; }
        
.pd-isi-paket {
          
background: #f6faf7;
          
border: 1px solid #e3ebe5;
          
border-radius: 14px;
          
padding: 14px 16px;
          
margin-bottom: 16px;
        
}
        
.pd-isi-paket b { font-size: 14px; color: #183b25; }
        
.pd-isi-paket ul { list-style: none; margin: 8px 0 0; padding: 0; }
        
.pd-isi-paket li { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #33413a; margin-bottom: 6px; }
        
.pd-isi-paket li svg { color: #1f7a43; }
        
.pd-info-grid {
          
display: grid;
          
grid-template-columns: 1fr 1fr;
          
gap: 10px;
          
margin-bottom: 18px;
        
}
        
.pd-info-item {
          
display: flex;
          
align-items: center;
          
gap: 10px;
          
background: #f6faf7;
          
border: 1px solid #e3ebe5;
          
border-radius: 14px;
          
padding: 11px 12px;
          
min-width: 0;
        
}
        
.pd-info-icon {
          
width: 36px;
          
height: 36px;
          
border-radius: 10px;
          
background: #fff;
          
color: #176137;
          
display: flex;
          
align-items: center;
          
justify-content: center;
          
flex-shrink: 0;
        
}
        
.pd-info-item small { display: block; color: #6d7b72; font-size: 12px; }
        
.pd-info-item b { display: block; color: #183b25; font-size: 14px; overflow-wrap: anywhere; }
        
.pd-beli {
          
display: flex;
          
justify-content: space-between;
          
align-items: center;
          
gap: 12px;
          
margin-top: auto;
          
margin-bottom: 14px;
        
}
        
.pd-qty {
          
display: flex;
          
align-items: center;
          
border: 1px solid #dbe5dc;
          
border-radius: 12px;
          
overflow: hidden;
        
}
        
.pd-qty button {
          
width: 42px;
          
height: 42px;
          
border: 0;
          
background: #f6faf7;
          
color: #176137;
          
cursor: pointer;
          
display: flex;
          
align-items: center;
          
justify-content: center;
        
}
        
.pd-qty span { min-width: 44px; text-align: center; font-weight: 800; font-size: 16px; }
        
.pd-total { text-align: right; }
        
.pd-total small { display: block; color: #6d7b72; font-size: 12px; }
        
.pd-total b { font-size: 20px; color: #183b25; }
        
.pd-aksi { display: grid; grid-template-columns: 1.4fr 1fr; gap: 10px; }
        
.pd-btn-utama,
        
.pd-btn-kedua {
          
height: 50px;
          
border-radius: 12px;
          
font-size: 15px;
          
font-weight: 800;
          
cursor: pointer;
          
display: flex;
          
align-items: center;
          
justify-content: center;
          
gap: 8px;
        
}
        
.pd-btn-utama { border: 0; background: #176137; color: #fff; }
        
.pd-btn-utama:hover { background: #124d2b; }
        
.pd-btn-kedua { border: 1px solid #cfe0d3; background: #fff; color: #176137; }
        
.pd-btn-kedua:hover { background: #f0f7f1; }
        
.pd-serupa { margin-top: 24px; padding-top: 18px; border-top: 1px solid #eef1ee; }
        
.pd-serupa h4 { margin: 0 0 12px; font-size: 15px; font-weight: 800; color: #183b25; }
        
.pd-serupa-list { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
        
.pd-serupa-list button {
          
display: flex;
          
align-items: center;
          
gap: 10px;
          
text-align: left;
          
border: 1px solid #e3ebe5;
          
background: #fff;
          
border-radius: 14px;
          
padding: 8px;
          
cursor: pointer;
          
min-width: 0;
        
}
        
.pd-serupa-list button:hover { border-color: #1f7a43; }
        
.pd-serupa-list img { width: 52px; height: 52px; object-fit: contain; background: #f0f6f1; border-radius: 10px; flex-shrink: 0; }
        
.pd-serupa-list b { display: block; font-size: 13px; color: #183b25; }
        
.pd-serupa-list small { color: #176137; font-size: 12px; font-weight: 700; }
        
@media (max-width: 900px) {
          
.shop-paket-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        
}
        
@media (max-width: 720px) {
          
.shop-paket-section { width: calc(100% - 28px); margin-top: 26px; }
          
.shop-paket-head h2 { font-size: 21px; }
          
.shop-paket-grid { grid-template-columns: 1fr; gap: 14px; }
          
.pd-overlay { padding: 0; align-items: flex-end; }
          
.pd-box {
            
border-radius: 22px 22px 0 0;
            
max-height: 92vh;
            
padding: 18px 16px 20px;
          
}
          
.pd-grid { grid-template-columns: 1fr; gap: 16px; }
          
.pd-foto { padding: 14px; }
          
.pd-foto > img { aspect-ratio: 4 / 3; }
          
.pd-info h2 { font-size: 23px; }
          
.pd-harga strong { font-size: 23px; }
          
.pd-info-grid { grid-template-columns: 1fr; }
          
.pd-aksi { grid-template-columns: 1fr; }
          
.pd-serupa-list { grid-template-columns: 1fr; }
        
}
        
.shop-empty-category {
          
grid-column: 1 / -1;
          
padding: 40px 16px;
          
text-align: center;
          
color: #68756c;
          
font-size: 14px;
        
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
        
.cart-qty-btn {
          
width: 26px;
          
height: 26px;
          
border: 1px solid #d7e4d9;
          
border-radius: 7px;
          
background: #fff;
          
color: #176137;
          
font-weight: 800;
          
cursor: pointer;
        
}
      
/* ===== Footer: disamakan dengan footer Dashboard ===== */
.shop-page-responsive .footer {
  width: 100%;
  max-width: none;
  margin: 30px 0 0;
  padding: 0;
  background: #173524;
  color: #ffffff;
  border-top: 1px solid #244c32;
}
.shop-page-responsive .footer-grid {
  width: min(1420px, calc(100% - 56px));
  max-width: none;
  margin: 0 auto;
  padding: 42px 0 24px;
  display: grid;
  grid-template-columns: 1.8fr 1fr 1fr 1.15fr;
  gap: 44px;
}
.shop-page-responsive .footer-brand {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.shop-page-responsive .footer-brand-icon {
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  background: #ffffff;
  border-radius: 50%;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.shop-page-responsive .footer-brand .name {
  font-size: 21px;
  font-weight: 800;
  letter-spacing: -.03em;
  color: #ffffff;
}
.shop-page-responsive .footer-brand .name span {
  color: #9bd59d;
}
.shop-page-responsive .footer-brand .tag {
  font-size: 12px;
  color: #b9c8bc;
  margin-top: 2px;
}
.shop-page-responsive .footer-brand .desc {
  max-width: 350px;
  margin: 14px 0 0;
  color: #b9c8bc;
  font-size: 12px;
  line-height: 1.7;
}
.shop-page-responsive .footer-col h4 {
  margin: 0 0 14px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 800;
}
.shop-page-responsive .footer-col a,
.shop-page-responsive .footer-col div {
  display: block;
  margin: 0 0 9px;
  color: #b9c8bc;
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
}
.shop-page-responsive .footer-col a:hover {
  color: #ffffff;
}
@media (max-width: 1050px) {
  .shop-page-responsive .footer-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 30px;
  }
}

/* ===== Tablet ===== */
@media (max-width: 900px) {
  .shop-page-responsive .hero.shop-landing-hero {
    background: linear-gradient(165deg, #2f6b45 0%, #19462b 55%, #123821 100%);
  }
  /* Lapisan putih di banner dibuat gelap supaya tulisan putih terbaca */
  .shop-page-responsive .shop-landing-hero::before {
    background: linear-gradient(180deg, rgba(255,255,255,.10) 0%, rgba(10,40,22,.25) 100%);
  }
  .shop-page-responsive .best-seller-section,
  .shop-page-responsive .all-products-section {
    padding: 32px 24px;
  }
  .shop-page-responsive .all-products-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
  }
}

/* ===== HP ===== */
@media (max-width: 720px) {
  .shop-page-responsive .topbar {
    padding: 12px 14px;
    gap: 12px;
  }

  /* Banner lebih pendek */
  .shop-page-responsive .shop-landing-hero {
    width: auto;
    margin: 12px 14px;
    padding: 22px 18px;
    gap: 10px;
    min-height: 0;
    border-radius: 20px;
  }
  .shop-page-responsive .shop-landing-hero .hero-left-character {
    width: 100%;
    min-height: 0;
    height: auto;
  }
  .shop-page-responsive .shop-landing-hero .character-img {
    width: auto;
    max-width: 70%;
    max-height: 130px;
    margin: 0 auto;
  }
  .shop-page-responsive .shop-landing-hero .hero-right-content {
    width: 100%;
  }
  .shop-page-responsive .shop-landing-hero .hero-right-content h1 {
    font-size: 24px;
    line-height: 1.2;
    margin-bottom: 8px;
  }
  .shop-page-responsive .shop-landing-hero .hero-right-content p {
    font-size: 13px;
  }

  /* Kategori jadi satu baris yang bisa digeser */
  .shop-page-responsive .shop-categories-bar {
    flex-wrap: nowrap;
    justify-content: flex-start;
    overflow-x: auto;
    gap: 8px;
    margin: 16px 0;
    padding: 2px 14px 6px;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }
  .shop-page-responsive .shop-categories-bar::-webkit-scrollbar {
    display: none;
  }
  .shop-page-responsive .shop-cat-item {
    flex: 0 0 auto;
    padding: 8px 14px;
    gap: 8px;
    font-size: 13px;
    white-space: nowrap;
  }
  .shop-page-responsive .shop-cat-item svg {
    width: 16px;
    height: 16px;
  }

  .shop-page-responsive .best-seller-section,
  .shop-page-responsive .all-products-section {
    padding: 24px 14px;
  }

  /* Best Seller jadi satu baris yang bisa digeser */
  .shop-page-responsive .best-seller-grid {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding: 0 0 6px;
    scrollbar-width: none;
  }
  .shop-page-responsive .best-seller-grid::-webkit-scrollbar {
    display: none;
  }
  .shop-page-responsive .best-seller-grid .shop-product-card {
    flex: 0 0 calc(50% - 5px);
    scroll-snap-align: start;
  }

  /* Semua Produk: 2 kolom */
  .shop-page-responsive .all-products-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }
  .shop-page-responsive .shop-product-card {
    min-width: 0;
    padding: 10px;
    border-radius: 14px;
  }
  .shop-page-responsive .shop-product-img {
    height: 120px;
    margin-bottom: 8px;
  }
  .shop-page-responsive .shop-product-details {
    gap: 6px;
  }
  .shop-page-responsive .prod-meta {
    min-width: 0;
  }
  .shop-page-responsive .prod-title {
    font-size: 14px;
    line-height: 1.3;
  }
  .shop-page-responsive .prod-cat {
    font-size: 11px;
  }
  .shop-page-responsive .prod-price {
    font-size: 13px;
    white-space: nowrap;
  }
  .shop-page-responsive .shop-cart-btn {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
  }

  /* Judul + filter Semua Produk */
  .shop-page-responsive .all-products-header {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    margin-bottom: 16px;
  }
  .shop-page-responsive .filter-controls {
    width: 100%;
    gap: 8px;
  }
  .shop-page-responsive .filter-dropdown-wrapper {
    flex: 1 1 0;
    min-width: 0;
  }
  .shop-page-responsive .filter-select-native {
    width: 100%;
    min-width: 0;
    font-size: 13px;
  }

  .shop-page-responsive .service-features-banner {
    margin: 24px 0;
    padding: 16px 14px;
  }

  .shop-page-responsive .footer-grid {
    width: calc(100% - 48px);
    grid-template-columns: 1fr;
    gap: 25px;
  }
}

`}</style>
      
      
{/* Top bar */}
      
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
        
<form className="search" onSubmit={handleSearch}>
          
<input
            
type="text"
            
placeholder="Search for products, hydroponics, recipes..."
            
value={searchText}
            
onChange={(e) => setSearchText(e.target.value)}
          
/>
          
{/* Pilihan kategori: tampilan tetap seperti semula, pilihan dibuka lewat select tak terlihat */}
          
<div className="cat" style={{ position: "relative" }}>
            
{filterCategory === "Semua" ? "All Categories" : filterCategory}
            
<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5c6b60" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            
<select
              
aria-label="Pilih kategori"
              
value={filterCategory}
              
onChange={(e) => { setFilterCategory(e.target.value); gulirKeProduk(); }}
              
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
            onClick={() => setIsMenuOpen(true)}
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
      
{/* Hero / Banner Shop */}
      
<section className="hero shop-landing-hero">
        
<div className="hero-left-character">
          
<div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            
<img 
              
src={heroImg} 
              
alt="Sayuran Segar Hidroponik" 
              
className="character-img" 
              
style={{
                
position: 'relative',
                
zIndex: 2,
                
width: '100%',
                
maxWidth: '420px', 
                
height: 'auto',
                
objectFit: 'contain',
                
filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))',
                
marginBottom: '0', 
              
}}
            
/>
          
</div>
        
</div>
        
<div className="hero-right-content">
          
<div className="hero-tag">🌱 Hidroponik &amp; Segar</div>
          
<h1>Kebutuhan Hidroponik Terbaik<br />Langsung dari Kebun</h1>
          
<p>Temukan berbagai pilihan sayuran segar, media tanam berkualitas tinggi, dan nutrisi hidroponik standar industri.</p>
          
<button
            
type="button"
            
onClick={gulirKeProduk}
            
style={{
              
marginTop: 20,
              
border: "none",
              
borderRadius: 12,
              
padding: "12px 22px",
              
background: "#ffffff",
              
color: "#176137",
              
fontWeight: 800,
              
fontSize: 14,
              
cursor: "pointer",
              
boxShadow: "0 6px 18px rgba(0,0,0,.15)",
            
}}
          
>
            
Belanja Sekarang →
          
</button>
        
</div>
      
</section>
      
{/* Kategori Bar */}
      
<section className="shop-categories-bar">
        
{[
          
{ 
            
name: "Semua", 
            
label: "Semua",
            
icon: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></> 
          
},
          
{ 
            
name: "Sayuran", 
            
label: "Sayuran",
            
icon: <path d="M12 2a10 10 0 0 1 7.54 16.63L17 21h-2l-1-2h-4l-1 2H9l-2.54-2.37A10 10 0 0 1 12 2z"/> 
          
},
          
{ 
            
name: "Media Tanam", 
            
label: "Media Tanam",
            
icon: <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/> 
          
},
          
{ 
            
name: "Nutrisi", 
            
label: "Nutrisi",
            
icon: <path d="M12 2v6m0 0a4 4 0 0 1-4 4H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2a4 4 0 0 1-4-4z"/> 
          
},
          
{ 
            
name: "Benih", 
            
label: "Benih",
            
icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/> 
          
},
          
{ 
            
name: "Paket Hemat", 
            
label: "Paket Hemat",
            
icon: <><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/></> 
          
},
        
].map((cat, idx) => (
          
<div 
            
className={`shop-cat-item ${filterCategory === cat.name ? 'active' : ''}`} 
            
key={idx}
            
onClick={() => pilihKategori(cat.name)}
            
style={{ cursor: 'pointer' }}
          
>
            
<div className="cat-icon-circle">
              
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                
{cat.icon}
              
</svg>
            
</div>
            
<span className="cat-text">{cat.label}</span>
          
</div>
        
))}
      
</section>
      
{/* Section Best Seller (disembunyikan saat sebuah kategori dipilih) */}
      
{!sedangMenyaring && (
      
<section className="best-seller-section">
        
<div className="best-seller-header">
          
<h2>Best Seller</h2>
          
<div className="header-line"></div>
        
</div>
        
<div className="best-seller-grid">
          
{bestSellers.map((item, idx) => (
            
<ProductCard
              
item={item}
              
key={idx}
              
qty={cart[item.name]?.qty || 0}
              
onRequestAdd={requestAddToCart}
              
onAddToCart={addToCart}
              
onRemoveFromCart={removeFromCart}
              
onSelectProduct={bukaDetail}
            
/>
          
))}
        
</div>
      
</section>
      
)}
      
{/* Section Paket Hemat */}
      
{!kataCari && (filterCategory === "Semua" || filterCategory === "Paket Hemat") && (
        
<section className="shop-paket-section" ref={filterCategory === "Paket Hemat" ? productsSectionRef : null}>
          
<div className="shop-paket-head">
            
<div>
              
<h2><Gift size={22} /> Paket Hemat</h2>
              
<p>Beli sekaligus dalam satu paket, lebih murah daripada beli satuan.</p>
            
</div>
            
{filterCategory === "Paket Hemat" && (
              
<button type="button" className="shop-paket-link" onClick={() => setFilterCategory("Semua")}>
                
Lihat semua produk
              
</button>
            
)}
          
</div>
          
<div className="shop-paket-grid">
            
{PAKET_HEMAT.map((paket) => {
              
const hemat = angkaHarga(paket.hargaNormal) - angkaHarga(paket.price);
              
const qty = cart[paket.name]?.qty || 0;
              
return (
                
<motion.div
                  
key={paket.name}
                  
className="shop-paket-card"
                  
whileHover={{ y: -4 }}
                  
onClick={() => bukaDetail(paket)}
                
>
                  
<div className="shop-paket-foto">
                    
<span className="shop-paket-label">{paket.label}</span>
                    
<span className="shop-paket-hemat">Hemat {formatRupiah(hemat)}</span>
                    
<div className={`shop-paket-kolase isi-${Math.min(paket.fotoIsi.length, 4)}`}>
                      
{paket.fotoIsi.map((foto, i) => (
                        
<img key={i} src={foto} alt="" />
                      
))}
                    
</div>
                  
</div>
                  
<div className="shop-paket-body">
                    
<h3>{paket.name}</h3>
                    
<ul>
                      
{paket.isi.map((isi) => (
                        
<li key={isi}><Check size={14} /> {isi}</li>
                      
))}
                    
</ul>
                    
<div className="shop-paket-bawah">
                      
<div>
                        
<s>{paket.hargaNormal}</s>
                        
<strong>{paket.price}</strong>
                      
</div>
                      
<button
                        
type="button"
                        
className="shop-paket-btn"
                        
onClick={(e) => {
                          
e.stopPropagation();
                          
requestAddToCart(paket);
                        
}}
                      
>
                        
<ShoppingCart size={16} /> {qty > 0 ? `Tambah (${qty})` : "Ambil Paket"}
                      
</button>
                    
</div>
                  
</div>
                
</motion.div>
              
);
            
})}
          
</div>
        
</section>
      
)}
      
{/* Section Semua Produk / hasil filter kategori */}
      
{filterCategory !== "Paket Hemat" && (
      
<section className="all-products-section" ref={productsSectionRef}>
        
<div className="all-products-header">
          
<h2>
            
{kataCari
              
? `Hasil pencarian "${searchText.trim()}"`
              
: filterCategory === "Semua" ? "Semua Produk" : filterCategory}
            
<span style={{ marginLeft: 8, fontSize: 14, fontWeight: 600, color: "#6d7b72" }}>
              
({filteredProducts.length} produk)
            
</span>
          
</h2>
          
<div className="filter-controls">
            
<div className="filter-dropdown-wrapper">
              
<select 
                
className="filter-select-native" 
                
value={filterCategory} 
                
onChange={(e) => setFilterCategory(e.target.value)}
              
>
                
<option value="Semua">Semua Kategori</option>
                
<option value="Sayuran">Sayuran</option>
                
<option value="Media Tanam">Media Tanam</option>
                
<option value="Nutrisi">Nutrisi</option>
                
<option value="Benih">Benih</option>
                
<option value="Paket Hemat">Paket Hemat</option>
              
</select>
            
</div>
            
<div className="filter-dropdown-wrapper">
              
<select 
                
className="filter-select-native" 
                
value={sortBy} 
                
onChange={(e) => setSortBy(e.target.value)}
              
>
                
<option value="terbaru">Urutkan : Terbaru</option>
                
<option value="termurah">Urutkan : Termurah</option>
                
<option value="termahal">Urutkan : Termahal</option>
              
</select>
            
</div>
          
</div>
        
</div>
        
<div className="all-products-grid">
          
{filteredProducts.length === 0 && (
            
<div className="shop-empty-category">
              
{kataCari ? "Produk tidak ditemukan. Coba kata lain." : "Belum ada produk di kategori ini."}
            
</div>
          
)}
          
{filteredProducts.map((item, idx) => (
            
<ProductCard
              
item={item}
              
key={idx}
              
qty={cart[item.name]?.qty || 0}
              
onRequestAdd={requestAddToCart}
              
onAddToCart={addToCart}
              
onRemoveFromCart={removeFromCart}
              
onSelectProduct={bukaDetail}
            
/>
          
))}
        
</div>
      
</section>
      
)}
      
{/* BANNER LAYANAN */}
      
<section className="service-features-banner">
        
<div className="service-feature-item">
          
<div className="service-icon-circle">
            
<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              
<circle cx="12" cy="8" r="7"></circle>
              
<polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
            
</svg>
          
</div>
          
<div>
            
<h3>Produk Berkualitas</h3>
            
<p>Dijamin original &amp; terbaik</p>
          
</div>
        
</div>
        
<div className="service-feature-item">
          
<div className="service-icon-circle">
            
<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              
<rect x="1" y="3" width="15" height="13"></rect>
              
<polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              
<circle cx="5.5" cy="18.5" r="2.5"></circle>
              
<circle cx="18.5" cy="18.5" r="2.5"></circle>
            
</svg>
          
</div>
          
<div>
            
<h3>Pengiriman Cepat</h3>
            
<p>Tepat Waktu sampai tujuan</p>
          
</div>
        
</div>
        
<div className="service-feature-item">
          
<div className="service-icon-circle">
            
<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              
<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              
<path d="M9 12l2 2 4-4"></path>
            
</svg>
          
</div>
          
<div>
            
<h3>Pembayaran Aman</h3>
            
<p>Transaksi Mudah &amp; aman</p>
          
</div>
        
</div>
      
</section>
      
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
              
<img
                
src={logoImg}
                
alt="Agri-ICS"
                
style={{ width: "100%", height: "100%", objectFit: "contain" }}
              
/>
            
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
            
<h4>Contact Us</h4>
            
<div className="footer-contact-item">📍 Gisting, Tanggamus</div>
            
<div className="footer-contact-item">📞 +62 812 3456 7890</div>
            
<div className="footer-contact-item">✉️ Livingmart@gmail.com</div>
          
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
      
{isMenuOpen && (
        
<div
          
onClick={() => setIsMenuOpen(false)}
          
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
                
onClick={() => setIsMenuOpen(false)}
                
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
            <button className="shop-menu-btn hdr-akun" onClick={() => setPage(user ? "profile" : "auth")}>
              <span>{user && user.avatar ? <img src={user.avatar} alt="" /> : "👤"}</span>
              <span>
                <strong>{user ? user.name : "Masuk / Daftar"}</strong>
                <small>{user ? "Lihat profil saya" : "Masuk untuk belanja"}</small>
              </span>
            </button>

              
<button className="shop-menu-btn" onClick={() => setPage("home")}>
                
<span>⌂</span><span>Home</span>
              
</button>
              
<button className="shop-menu-btn" onClick={() => setPage("dashboard")}>
                
<span>▦</span><span>Dashboard</span>
              
</button>
              
<button className="shop-menu-btn" onClick={() => openPanel("saldo")}>
                
<span>Rp</span><span>Saldo Saya</span>
              
</button>
              
<button className="shop-menu-btn" onClick={() => openPanel("orders")}>
                
<span>▤</span><span>Pesanan Saya</span>
              
</button>
              
<button className="shop-menu-btn" onClick={() => { setIsMenuOpen(false); setIsCartOpen(true); }}>
                
<span>🛒</span><span>Keranjang ({cartCount}) · {formatRupiah(cartTotal)}</span>
              
</button>
            
</div>
          
</aside>
        
</div>
      
)}
      
{/* DRAWER KERANJANG */}
      
{isCartOpen && (
        
<div
          
onClick={() => setIsCartOpen(false)}
          
style={{
            
position: "fixed",
            
inset: 0,
            
zIndex: 9997,
            
background: "rgba(15, 35, 23, 0.32)",
          
}}
        
>
          
<aside
            
onClick={(e) => e.stopPropagation()}
            
className="shop-cart-drawer"
            
style={{
              
position: "absolute",
              
top: 0,
              
right: 0,
              
width: "min(440px, 94vw)",
              
height: "100%",
              
background: "#fff",
              
boxShadow: "-12px 0 35px rgba(0,0,0,.15)",
              
display: "flex",
              
flexDirection: "column",
            
}}
          
>
            
<div style={{ padding: "22px 24px", borderBottom: "1px solid #e9eee9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              
<div>
                
<div style={{ fontSize: 12, color: "#6d7b72" }}>BELANJA</div>
                
<h3 style={{ margin: "3px 0 0", color: "#173524", fontSize: 22 }}>Keranjang Saya</h3>
              
</div>
              
<button
                
type="button"
                
onClick={() => setIsCartOpen(false)}
                
style={{ border: "none", background: "transparent", fontSize: 27, cursor: "pointer", color: "#526158" }}
              
>
                
×
              
</button>
            
</div>
            
<div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
              
{!cartItems.length ? (
                
<div style={{ textAlign: "center", padding: "70px 20px", color: "#68756c" }}>
                  
<div style={{ fontSize: 48, marginBottom: 12 }}>🛒</div>
                  
<strong style={{ display: "block", color: "#173524", marginBottom: 6 }}>Keranjang masih kosong</strong>
                  
<span>Tambahkan produk untuk melanjutkan checkout.</span>
                
</div>
              
) : (
                
<div style={{ display: "grid", gap: 14 }}>
                  
{cartItems.map((item) => {
                    
const price = parseInt(item.price.replace(/[^0-9]/g, ""), 10) || 0;
                    
return (
                      
<div
                        
key={item.name}
                        
className="shop-cart-item"
                        
style={{
                          
display: "grid",
                          
gridTemplateColumns: "64px 1fr auto",
                          
gap: 12,
                          
alignItems: "center",
                          
padding: 12,
                          
border: "1px solid #e7eee8",
                          
borderRadius: 14,
                        
}}
                      
>
                        
<div style={{ width: 64, height: 64, borderRadius: 12, background: "#f5f8f5", overflow: "hidden" }}>
                          
<img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                        
</div>
                        
<div>
                          
<strong style={{ display: "block", color: "#173524", fontSize: 14 }}>{item.name}</strong>
                          
<span style={{ display: "block", color: "#718076", fontSize: 12, margin: "3px 0 8px" }}>{item.price}</span>
                          
<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            
<button className="cart-qty-btn" onClick={() => removeFromCart(item)}>−</button>
                            
<strong style={{ minWidth: 18, textAlign: "center" }}>{item.qty}</strong>
                            
<button className="cart-qty-btn" onClick={() => addToCart(item)}>+</button>
                          
</div>
                        
</div>
                        
<strong className="shop-cart-item-total" style={{ color: "#1b6d3e", fontSize: 13 }}>
                          
{formatRupiah(price * item.qty)}
                        
</strong>
                      
</div>
                    
);
                  
})}
                
</div>
              
)}
            
</div>
            
{cartItems.length > 0 && (
              
<div style={{ padding: 20, borderTop: "1px solid #e9eee9", background: "#fbfdfb" }}>
                
<div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7, color: "#657168" }}>
                  
<span>Total item</span><span>{cartCount} item</span>
                
</div>
                
<div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, color: "#173524", fontSize: 18 }}>
                  
<strong>Total</strong><strong>{formatRupiah(cartTotal)}</strong>
                
</div>
                
<button
                  
type="button"
                  
onClick={handleCheckout}
                  
style={{
                    
width: "100%",
                    
border: "none",
                    
borderRadius: 12,
                    
padding: "13px 16px",
                    
background: "#176137",
                    
color: "#fff",
                    
fontWeight: 800,
                    
cursor: "pointer",
                  
}}
                
>
                  
Lanjut ke Checkout
                
</button>
              
</div>
            
)}
          
</aside>
        
</div>
      
)}
      
{/* PANEL SALDO / PESANAN / CHECKOUT */}
      
{activePanel && (
        
<div
          
onClick={() => setActivePanel(null)}
          
style={{
            
position: "fixed",
            
inset: 0,
            
zIndex: 9999,
            
background: "rgba(15, 35, 23, 0.38)",
            
display: "flex",
            
alignItems: "center",
            
justifyContent: "center",
            
padding: 20,
          
}}
        
>
          
<div
            
onClick={(e) => e.stopPropagation()}
            
className="shop-panel"
            
style={{
              
width: "min(540px, 94vw)",
              
maxHeight: "88vh",
              
overflowY: "auto",
              
background: "#fff",
              
borderRadius: 20,
              
padding: 26,
              
boxShadow: "0 20px 60px rgba(0,0,0,.18)",
            
}}
          
>
            
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              
<h3 style={{ margin: 0, color: "#173524", fontSize: 22 }}>
                
{activePanel === "saldo" && "Saldo Saya"}
                
{activePanel === "orders" && "Pesanan Saya"}
                
{activePanel === "checkout" && "Checkout & Pengiriman"}
              
</h3>
              
<button
                
type="button"
                
onClick={() => setActivePanel(null)}
                
style={{ border: "none", background: "transparent", fontSize: 26, cursor: "pointer" }}
              
>
                
×
              
</button>
            
</div>
            
{activePanel === "saldo" && (
              
<div>
                
<div style={{ padding: 20, borderRadius: 16, background: "#eff8f1", marginBottom: 16 }}>
                  
<div style={{ color: "#6a786e", fontSize: 13 }}>Saldo tersedia</div>
                  
<div style={{ color: "#176137", fontSize: 30, fontWeight: 800, marginTop: 4 }}>Rp. 0</div>
                
</div>
                
<button
                  
type="button"
                  
onClick={() => setActivePanel(null)}
                  
style={{ width: "100%", padding: 12, borderRadius: 11, border: "1px solid #176137", background: "#fff", color: "#176137", fontWeight: 700, cursor: "pointer" }}
                
>
                  
Tutup
                
</button>
              
</div>
            
)}
            
{activePanel === "orders" && (
              
<div style={{ textAlign: "center", padding: "30px 10px", color: "#68756c" }}>
                
<div style={{ fontSize: 42, marginBottom: 10 }}>🎉</div>
                
<strong style={{ display: "block", color: "#173524", marginBottom: 6 }}>Pesanan Berhasil Dibuat!</strong>
                
<span>Pesanan Anda telah tercatat dan masuk ke daftar <strong>Belum Dibayar</strong>. Anda bisa memeriksanya nanti melalui menu Profil.</span>
                
<button
                  
type="button"
                  
onClick={() => setActivePanel(null)}
                  
style={{ marginTop: 20, width: "100%", padding: 11, borderRadius: 10, background: "#176137", color: "#fff", fontWeight: "700", border: "none", cursor: "pointer" }}
                
>
                  
Lanjut Belanja Lagi ✓
                
</button>
              
</div>
            
)}
            
{activePanel === "checkout" && (
              
<div style={{ display: "grid", gap: 16 }}>
                
{/* Ringkasan Produk */}
                
<div style={{ display: "grid", gap: 8, paddingBottom: 12, borderBottom: "1px solid #edf1ed" }}>
                  
<div style={{ fontSize: "13px", fontWeight: "800", color: "#163821" }}>📦 Ringkasan Belanja:</div>
                  
{cartItems.map((item) => (
                    
<div key={item.name} style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: "13.5px" }}>
                      
<span style={{ color: "#334238" }}>{item.name} × {item.qty}</span>
                      
<strong style={{ color: "#163821" }}>{formatRupiah((parseInt(item.price.replace(/[^0-9]/g, ""), 10) || 0) * item.qty)}</strong>
                    
</div>
                  
))}
                
</div>
                
{/* Bagian Alamat Pengiriman Tersimpan / Buku Alamat */}
                
<div style={{ display: "grid", gap: 8 }}>
                  
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    
<label style={{ fontSize: "13px", fontWeight: "800", color: "#163821" }}>📍 Pilih Alamat Pengiriman:</label>
                    
<button 
                      
type="button"
                      
onClick={() => setIsAddingNewAddress(!isAddingNewAddress)}
                      
style={{ background: "transparent", border: "none", color: "#176137", fontSize: "12px", fontWeight: "700", cursor: "pointer", textDecoration: "underline" }}
                    
>
                      
{isAddingNewAddress ? "Batal Tambah" : "+ Tambah Alamat Baru"}
                    
</button>
                  
</div>
                  
{!isAddingNewAddress ? (
                    
<div style={{ display: "grid", gap: "8px" }}>
                      
{savedAddresses.map((addr) => (
                        
<div 
                          
key={addr.id}
                          
onClick={() => setSelectedAddressId(addr.id)}
                          
style={{
                            
padding: "12px 14px",
                            
borderRadius: "12px",
                            
border: selectedAddressId === addr.id ? "2px solid #163821" : "1px solid #dce5de",
                            
background: selectedAddressId === addr.id ? "#f4f8f5" : "#fff",
                            
cursor: "pointer",
                            
display: "flex",
                            
flexDirection: "column",
                            
gap: "3px"
                          
}}
                        
>
                          
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            
<strong style={{ fontSize: "13px", color: "#163821" }}>{addr.label}</strong>
                            
{selectedAddressId === addr.id && <span style={{ fontSize: "11px", background: "#163821", color: "#fff", padding: "2px 8px", borderRadius: "6px", fontWeight: "700" }}>Utama</span>}
                          
</div>
                          
<span style={{ fontSize: "12px", color: "#55635a", lineHeight: "1.4" }}>{addr.detail}</span>
                        
</div>
                      
))}
                    
</div>
                  
) : (
                    
<div style={{ background: "#f9fbf9", padding: "14px", borderRadius: "14px", border: "1px solid #c2d5c5", display: "grid", gap: "10px" }}>
                      
<div style={{ fontSize: "12.5px", fontWeight: "700", color: "#163821" }}>Form Simpan Alamat Baru</div>
                      
<input 
                        
type="text"
                        
placeholder="Label Alamat (Contoh: Rumah, Kantor, Kosan)"
                        
value={newAddressLabel}
                        
onChange={(e) => setNewAddressLabel(e.target.value)}
                        
style={{ padding: "10px 12px", borderRadius: "8px", border: "1px solid #dce5de", fontSize: "13px", outline: "none" }}
                      
/>
                      
<textarea 
                        
rows="2"
                        
placeholder="Detail Alamat: Nama Jalan, No. Rumah, RT/RW, Patokan khusus..."
                        
value={newAddressDetail}
                        
onChange={(e) => setNewAddressDetail(e.target.value)}
                        
style={{ padding: "10px 12px", borderRadius: "8px", border: "1px solid #dce5de", fontSize: "13px", outline: "none", resize: "none" }}
                      
/>
                      
<button 
                        
type="button"
                        
onClick={handleSaveNewAddress}
                        
style={{ padding: "9px 16px", background: "#163821", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "12px", cursor: "pointer", justifySelf: "start" }}
                      
>
                        
Simpan Alamat ke Buku Alamat ✓
                      
</button>
                    
</div>
                  
)}
                
</div>
                
{/* Metode Pembayaran */}
                
<div style={{ display: "grid", gap: 6 }}>
                  
<label style={{ fontSize: "13px", fontWeight: "800", color: "#163821" }}>💳 Metode Pembayaran:</label>
                  
<select 
                    
value={paymentMethod} 
                    
onChange={(e) => setPaymentMethod(e.target.value)}
                    
style={{ width: "100%", padding: 12, border: "1px solid #dce5de", borderRadius: 10, background: "#fff", fontWeight: "600", fontSize: "13px" }}
                  
>
                    
<option value="Transfer Bank / Virtual Account">Transfer Bank / Virtual Account (Belum Bayar / Pending)</option>
                    
<option value="Saldo AGRI-ICS">Saldo AGRI-ICS</option>
                    
<option value="QRIS Instan">QRIS Instan</option>
                  
</select>
                
</div>
                
<div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, color: "#173524", borderTop: "1px solid #edf1ed", paddingTop: "10px" }}>
                  
<strong>Total Pembayaran</strong>
                  
<strong style={{ color: "#163821" }}>{formatRupiah(cartTotal)}</strong>
                
</div>
                
<button
                  
type="button"
                  
onClick={handleCreateOrderSubmit}
                  
style={{
                    
width: "100%",
                    
padding: 13,
                    
border: "none",
                    
borderRadius: 11,
                    
background: "#163821",
                    
color: "#fff",
                    
fontWeight: 800,
                    
cursor: "pointer",
                    
boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                  
}}
                
>
                  
Buat Pesanan Sekarang ✓
                
</button>
              
</div>
            
)}
          
</div>
        
</div>
      
)}
      
{/* MODAL KONFIRMASI TAMBAH KE KERANJANG */}
      
{pendingProduct && (
        
<div
          
onClick={() => {
            
setPendingProduct(null);
            
setPendingQty(1);
          
}}
          
style={{
            
position: "fixed",
            
inset: 0,
            
zIndex: 10000,
            
background: "rgba(15, 35, 23, 0.42)",
            
display: "flex",
            
alignItems: "center",
            
justifyContent: "center",
            
padding: 20,
          
}}
        
>
          
<div
            
onClick={(e) => e.stopPropagation()}
            
className="shop-confirm-modal"
            
style={{
              
width: "min(470px, 94vw)",
              
background: "#fff",
              
borderRadius: 22,
              
padding: 24,
              
boxShadow: "0 24px 70px rgba(0,0,0,.20)",
            
}}
          
>
            
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              
<div>
                
<div style={{ fontSize: 12, color: "#6d7b72", letterSpacing: ".08em", fontWeight: 700 }}>
                  
TAMBAH KE KERANJANG
                
</div>
                
<h3 style={{ margin: "5px 0 0", color: "#173524", fontSize: 22 }}>
                  
Konfirmasi Produk
                
</h3>
              
</div>
              
<button
                
type="button"
                
onClick={() => {
                  
setPendingProduct(null);
                  
setPendingQty(1);
                
}}
                
style={{
                  
width: 36,
                  
height: 36,
                  
borderRadius: "50%",
                  
border: "1px solid #e1e8e2",
                  
background: "#fff",
                  
color: "#526158",
                  
fontSize: 22,
                  
cursor: "pointer",
                
}}
              
>
                
×
              
</button>
            
</div>
            
<div
              
className="shop-confirm-product"
              
style={{
                
display: "grid",
                
gridTemplateColumns: "82px 1fr",
                
gap: 14,
                
alignItems: "center",
                
padding: 14,
                
border: "1px solid #e5eee7",
                
borderRadius: 16,
                
background: "#fbfdfb",
              
}}
            
>
              
<div
                
style={{
                  
width: 82,
                  
height: 82,
                  
borderRadius: 14,
                  
background: "#f4f8f4",
                  
overflow: "hidden",
                
}}
              
>
                
<img
                  
src={pendingProduct.img}
                  
alt={pendingProduct.name}
                  
style={{ width: "100%", height: "100%", objectFit: "contain" }}
                
/>
              
</div>
              
<div>
                
<strong style={{ display: "block", color: "#173524", fontSize: 17 }}>
                  
{pendingProduct.name}
                
</strong>
                
<span style={{ display: "block", color: "#718076", fontSize: 13, marginTop: 4 }}>
                  
{pendingProduct.category}
                
</span>
                
<strong style={{ display: "block", color: "#176137", fontSize: 16, marginTop: 7 }}>
                  
{pendingProduct.price}
                
</strong>
              
</div>
            
</div>
            
<div
              
style={{
                
marginTop: 18,
                
padding: 15,
                
borderRadius: 14,
                
background: "#eff8f1",
              
}}
            
>
              
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                
<span style={{ color: "#536158", fontWeight: 600 }}>Jumlah</span>
                
<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  
<button
                    
type="button"
                    
className="cart-qty-btn"
                    
onClick={() => setPendingQty((q) => Math.max(1, q - 1))}
                  
>
                    
−
                  
</button>
                  
<strong style={{ minWidth: 24, textAlign: "center", color: "#173524", fontSize: 16 }}>
                    
{pendingQty}
                  
</strong>
                  
<button
                    
type="button"
                    
className="cart-qty-btn"
                    
onClick={() => setPendingQty((q) => q + 1)}
                  
>
                    
+
                  
</button>
                
</div>
              
</div>
              
<div
                
style={{
                  
display: "flex",
                  
justifyContent: "space-between",
                  
marginTop: 14,
                  
paddingTop: 14,
                  
borderTop: "1px solid #dbe8de",
                
}}
              
>
                
<span style={{ color: "#536158", fontWeight: 600 }}>Total</span>
                
<strong style={{ color: "#176137", fontSize: 20 }}>
                  
{formatRupiah(pendingTotal)}
                
</strong>
              
</div>
            
</div>
            
<div className="shop-confirm-actions" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 10, marginTop: 18 }}>
              
<button
                
type="button"
                
onClick={() => {
                  
setPendingProduct(null);
                  
setPendingQty(1);
                
}}
                
style={{
                  
border: "1px solid #d7e4d9",
                  
borderRadius: 12,
                  
padding: "13px 16px",
                  
background: "#fff",
                  
color: "#526158",
                  
fontWeight: 800,
                  
cursor: "pointer",
                
}}
              
>
                
Batal
              
</button>
              
<button
                
type="button"
                
onClick={confirmAddToCart}
                
style={{
                  
border: "none",
                  
borderRadius: 12,
                  
padding: "13px 16px",
                  
background: "#176137",
                  
color: "#fff",
                  
fontWeight: 800,
                  
cursor: "pointer",
                
}}
              
>
                
Konfirmasi &amp; Tambah ke Keranjang
              
</button>
            
</div>
          
</div>
        
</div>
      
)}
      
{/* POP-UP DETAIL PRODUK */}
      
{selectedProduct && (() => {
        
const p = selectedProduct;
        
const isPaket = p.category === "Paket Hemat";
        
const isSayur = p.category === "Sayuran";
        
const info = isSayur
          
? [
              
{ icon: <Calendar size={18} />, label: "Tanggal Tanam", nilai: p.plantedDate },
              
{ icon: <Sprout size={18} />, label: "Tanggal Panen", nilai: p.harvestDate },
              
{ icon: <Clock size={18} />, label: "Masa Tanam", nilai: p.duration },
              
{ icon: <MapPin size={18} />, label: "Lokasi Lahan", nilai: p.greenhouse },
            
]
          
: isPaket
          
? []
          
: [
              
{ icon: <Star size={18} />, label: "Spesifikasi", nilai: p.spec1 },
              
{ icon: <ShieldCheck size={18} />, label: "Kualitas", nilai: p.spec2 },
              
{ icon: <Package size={18} />, label: "Karakteristik", nilai: p.spec3 },
              
{ icon: <MapPin size={18} />, label: "Dikirim dari", nilai: p.spec4 },
            
];
        
const serupa = (isPaket ? PAKET_HEMAT : allProductsList)
          
.filter((item) => item.category === p.category && item.name !== p.name)
          
.slice(0, 3);
        
const totalHarga = angkaHarga(p.price) * detailQty;
        
return (
          
<div className="pd-overlay" onClick={() => setSelectedProduct(null)}>
            
<motion.div
              
className="pd-box"
              
onClick={(e) => e.stopPropagation()}
              
initial={{ opacity: 0, y: 24, scale: 0.98 }}
              
animate={{ opacity: 1, y: 0, scale: 1 }}
              
transition={{ duration: 0.25 }}
            
>
              
<button className="pd-close" onClick={() => setSelectedProduct(null)} aria-label="Tutup">&times;</button>
              
<div className="pd-grid">
                
{/* Kiri: foto */}
                
<div className="pd-foto">
                  
{isPaket ? (
                    
<div className={`shop-paket-kolase isi-${Math.min(p.fotoIsi.length, 4)}`}>
                      
{p.fotoIsi.map((foto, i) => <img key={i} src={foto} alt="" />)}
                    
</div>
                  
) : (
                    
<img src={p.img} alt={p.name} />
                  
)}
                  
<div className="pd-jaminan">
                    
<span><Leaf size={14} /> {isSayur ? "Dipanen segar" : "Produk asli"}</span>
                    
<span><ShieldCheck size={14} /> Dikemas aman</span>
                  
</div>
                
</div>
                
{/* Kanan: info */}
                
<div className="pd-info">
                  
<span className="pd-kategori">{selectedPluginCategoryFallback(p)}</span>
                  
<h2>{p.name}</h2>
                  
<div className="pd-rating">
                    
<Star size={15} /> 4.8 <span>· Stok tersedia</span>
                  
</div>
                  
<div className="pd-harga">
                    
<strong>{p.price}</strong>
                    
{p.hargaNormal && <s>{p.hargaNormal}</s>}
                    
{p.hargaNormal && (
                      
<span className="pd-hemat">Hemat {formatRupiah(angkaHarga(p.hargaNormal) - angkaHarga(p.price))}</span>
                    
)}
                  
</div>
                  
<p className="pd-desc">{p.description}</p>
                  
{isPaket && (
                    
<div className="pd-isi-paket">
                      
<b>Isi paket:</b>
                      
<ul>
                        
{p.isi.map((isi) => <li key={isi}><Check size={15} /> {isi}</li>)}
                      
</ul>
                    
</div>
                  
)}
                  
{info.length > 0 && (
                    
<div className="pd-info-grid">
                      
{info.map((row) => (
                        
<div className="pd-info-item" key={row.label}>
                          
<span className="pd-info-icon">{row.icon}</span>
                          
<div>
                            
<small>{row.label}</small>
                            
<b>{row.nilai || "-"}</b>
                          
</div>
                        
</div>
                      
))}
                    
</div>
                  
)}
                  
<div className="pd-beli">
                    
<div className="pd-qty">
                      
<button type="button" onClick={() => setDetailQty((q) => Math.max(1, q - 1))} aria-label="Kurangi"><Minus size={16} /></button>
                      
<span>{detailQty}</span>
                      
<button type="button" onClick={() => setDetailQty((q) => q + 1)} aria-label="Tambah"><Plus size={16} /></button>
                    
</div>
                    
<div className="pd-total">
                      
<small>Subtotal</small>
                      
<b>{formatRupiah(totalHarga)}</b>
                    
</div>
                  
</div>
                  
<div className="pd-aksi">
                    
<button type="button" className="pd-btn-utama" onClick={tambahDariDetail}>
                      
<ShoppingCart size={18} /> Tambah ke Keranjang
                    
</button>
                    
<button type="button" className="pd-btn-kedua" onClick={() => setSelectedProduct(null)}>
                      
Kembali Belanja
                    
</button>
                  
</div>
                
</div>
              
</div>
              
{serupa.length > 0 && (
                
<div className="pd-serupa">
                  
<h4>{isPaket ? "Paket lainnya" : "Produk serupa"}</h4>
                  
<div className="pd-serupa-list">
                    
{serupa.map((item) => (
                      
<button type="button" key={item.name} onClick={() => bukaDetail(item)}>
                        
<img src={item.img} alt="" />
                        
<span>
                          
<b>{item.name}</b>
                          
<small>{item.price}</small>
                        
</span>
                      
</button>
                    
))}
                  
</div>
                
</div>
              
)}
            
</motion.div>
          
</div>
        
);
      
})()}
    
</motion.div>
  
);
}
