import React, { useState, useEffect } from "react";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import LandingPage from "./pages/LandingPage";
import ShopPage from "./pages/ShopPage";
import DashboardPage from "./pages/DashboardPage";
import AuthPage from "./roles/auth/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import BerandaPembeliPage from "./roles/pembeli/beranda/BerandaPembeliPage";
 
export default function App() {
  
// Halaman pertama yang dibuka diambil dari alamat browser:
  
//   http://localhost:5173              -> dashboard utama (LandingPage)
  
//   http://localhost:5173/?page=admin  -> Super Admin
  
const [currentPage, setCurrentPage] = useState(
    
() => new URLSearchParams(window.location.search).get("page") || "home"
  
);
 
  
const [user, setUser] = useState(() => {
    
const savedUser = localStorage.getItem("livingSmartUser");
    
return savedUser ? JSON.parse(savedUser) : null;
  
});
 
  
// State global untuk pesanan yang disinkronkan dengan localStorage
  
const [ordersData, setOrdersData] = useState(() => {
    
const savedOrders = localStorage.getItem("livingSmartOrders");
    
return savedOrders ? JSON.parse(savedOrders) : {
      
pending: [],    // Menampung pesanan "Belum Dibayar" dari Checkout ShopPage
      
harvesting: [], // Pesanan yang sedang diproses / dikemas
      
coldchain: [],  // Pesanan dalam pengiriman
      
completed: [],  // Pesanan selesai
      
rating: []      // Pesanan yang siap dinilai
    
};
  
});
 
  
// Simpan otomatis ke localStorage setiap kali ordersData berubah
  
useEffect(() => {
    
localStorage.setItem("livingSmartOrders", JSON.stringify(ordersData));
  
}, [ordersData]);
 
  
// Fungsi murni untuk menangani pembuatan pesanan dari ShopPage
  
const handleCreateOrder = (cartItems, paymentMethod, shippingAddress) => {
    
const totalAmount = cartItems.reduce((sum, item) => {
      
const price = parseInt(item.price.replace(/[^0-9]/g, ""), 10) || 0;
      
return sum + (price * item.qty);
    
}, 0);
 
    
const newInvoice = {
      
id: "INV-" + Math.floor(1000 + Math.random() * 9000),
      
items: cartItems,
      
totalPrice: totalAmount,
      
address: shippingAddress,
      
paymentMethod: paymentMethod,
      
date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
    
};
 
    
// Tentukan kategori tab berdasarkan metode pembayaran
    
const targetCategory = paymentMethod.toLowerCase().includes("transfer") || paymentMethod.toLowerCase().includes("virtual") || paymentMethod.toLowerCase().includes("pending")
      
? "pending"
      
: "harvesting";
 
    
setOrdersData(prev => ({
      
...prev,
      
[targetCategory]: [newInvoice, ...prev[targetCategory]]
    
}));
  
};
 
  
// Fungsi khusus untuk memperbarui data profil pengguna
  
const handleUpdateProfile = (updatedUserData) => {
    
setUser(updatedUserData);
    
localStorage.setItem("livingSmartUser", JSON.stringify(updatedUserData));
  
};
 
  
const handleLoginOrRegister = (userData) => {
    
setUser(userData);
    
localStorage.setItem("livingSmartUser", JSON.stringify(userData));
 
    
const dariCheckout = sessionStorage.getItem("openCartAfterLogin") === "1";
    
const pembeli = sessionStorage.getItem("marketplaceAfterLogin") === "1";
    
sessionStorage.removeItem("marketplaceAfterLogin");
 
    
if (dariCheckout) {
      
// Tadi klik checkout sebelum login -> balik ke Shop, keranjang langsung terbuka
      
setCurrentPage("shop");
    
} else if (pembeli) {
      
// Login biasa sebagai pembeli -> ke Beranda Pembeli
      
setCurrentPage("beranda-pembeli");
    
} else {
      
setCurrentPage("home");
    
}
  
};
 
  
const handleLogout = () => {
    
setUser(null);
    
localStorage.removeItem("livingSmartUser");
    
setCurrentPage("home");
  
};
 
  
return (
    
<div className="app-container">
      
{currentPage === "home" && (
        
<LandingPage setPage={setCurrentPage} user={user} onLogout={handleLogout} />
      
)}
 
      
{currentPage === "shop" && (
        
<ShopPage
          
setPage={setCurrentPage}
          
user={user}
          
onCreateOrder={handleCreateOrder}
        
/>
      
)}
 
      
{/* Beranda khusus pembeli setelah login */}
      
{currentPage === "beranda-pembeli" && (
        
<BerandaPembeliPage
          
setPage={setCurrentPage}
          
user={user}
          
onLogout={handleLogout}
        
/>
      
)}
 
      
{currentPage === "dashboard" && (
        
<DashboardPage setPage={setCurrentPage} user={user} />
      
)}
 
      
{/* Halaman Super Admin */}
      
{currentPage === "admin" && (
        
<AdminDashboardPage
          
setPage={setCurrentPage}
          
user={user}
          
onLogout={handleLogout}
        
/>
      
)}
 
      
{currentPage === "auth" && (
        
<AuthPage
          
setPage={setCurrentPage}
          
onLoginSuccess={handleLoginOrRegister}
        
/>
      
)}
 
      
{currentPage === "profile" && (
        
<ProfilePage
          
setPage={setCurrentPage}
          
user={user}
          
onUpdateProfile={handleUpdateProfile}
          
ordersData={ordersData}
          
setOrdersData={setOrdersData}
          
onLogout={handleLogout}
        
/>
      
)}
    
</div>
  
);
}