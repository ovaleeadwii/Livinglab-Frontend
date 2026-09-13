import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "../index.css";
import logoImg from "../assets/logo.svg";

export default function ProfilePage({ setPage, user, onLogout, onUpdateUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || 'Anis Setiawati');
  const [phone, setPhone] = useState(user?.phone || '081234567890');
  const [email, setEmail] = useState(user?.email || 'livingmart@gmail.com');
  const [role, setRole] = useState(user?.role || 'Petani / Mitra');
  const [gender, setGender] = useState(user?.gender || 'Perempuan');
  const [address, setAddress] = useState(user?.address || 'Jl. Raya Gisting Atas No. 45, Tanggamus');

  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [coverPhoto, setCoverPhoto] = useState('https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=1200');
  
  // State successMsg diubah menjadi string agar pesannya dinamis sesuai konteks aksi
  const [successMsg, setSuccessMsg] = useState("");

  // State Modal Kebijakan & Regulasi
  const [showRegulasiModal, setShowRegulasiModal] = useState(false);

  // State Keuangan & Rewards
  const [walletBalance, setWalletBalance] = useState(451000);
  const [points, setPoints] = useState(250);
  const [paymentMethod, setPaymentMethod] = useState('transfer');
  const [selectedBank, setSelectedBank] = useState('bca');
  const [selectedEwallet, setSelectedEwallet] = useState('dana');
  const [accountNumber, setAccountNumber] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isAccountVerified, setIsAccountVerified] = useState(false);
  const [accountOwnerName, setAccountOwnerName] = useState('');
  const [topUpAmount, setTopUpAmount] = useState('');
  const [showQrisModal, setShowQrisModal] = useState(false);

  // State Pesanan & Real-time Counts
  const [orderCounts, setOrderCounts] = useState({
    pending: 2,
    harvesting: 1,
    coldchain: 3,
    completed: 2,
    rating: 2
  });

  const [selectedOrderTab, setSelectedOrderTab] = useState(null);
  const [checkoutOrder, setCheckoutOrder] = useState(null);

  // Data Simulasi Detail Barang
  const [ordersData, setOrdersData] = useState({
    pending: [
      { id: 'INV-001', name: 'Bayam Hijau Hidroponik (1 Kg)', price: 15000, status: 'Menunggu Pembayaran', date: '13 Sep 2026' },
      { id: 'INV-002', name: 'Pakcoy Segar Organik (500 gr)', price: 12000, status: 'Menunggu Pembayaran', date: '13 Sep 2026' }
    ],
    harvesting: [
      { id: 'INV-003', name: 'Selada Keriting Premium (1 Kg)', price: 20000, status: 'Petani sedang memanen di Greenhouse Gisting', date: '12 Sep 2026' }
    ],
    coldchain: [
      { 
        id: 'INV-004', 
        name: 'Brokoli Segar Dataran Tinggi (1 Kg)', 
        price: 35000, 
        status: 'Dalam pengiriman berpendingin (Cold-chain Suhu 4°C)', 
        date: '11 Sep 2026',
        timeline: [
          { time: '10:00 - 11 Sep', desc: 'Pesanan dikemas dalam kotak termal berpendingin', active: true },
          { time: '13:30 - 11 Sep', desc: 'Berangkat dari Greenhouse Gisting, Tanggamus', active: true },
          { time: '17:00 - 11 Sep', desc: 'Tiba di Hub Transit Bandar Lampung (Suhu Stabil 4°C)', active: true },
          { time: '08:00 - 12 Sep', desc: 'Kurir menuju alamat tujuan pengiriman', active: false }
        ]
      },
      { 
        id: 'INV-005', 
        name: 'Wortel Organik Pringsewu (1 Kg)', 
        price: 18000, 
        status: 'Kurir menuju lokasi pengiriman utama', 
        date: '11 Sep 2026',
        timeline: [
          { time: '09:00 - 11 Sep', desc: 'Dipanen & disortir ketat', active: true },
          { time: '14:00 - 11 Sep', desc: 'Masuk armada cold-chain', active: true },
          { time: '18:00 - 11 Sep', desc: 'Dalam perjalanan kurir lokal', active: true }
        ]
      },
      { 
        id: 'INV-006', 
        name: 'Tomat Merah Segar (500 gr)', 
        price: 14000, 
        status: 'Dalam perjalanan kurir lokal', 
        date: '10 Sep 2026',
        timeline: [
          { time: '08:00 - 10 Sep', desc: 'Pengemasan higienis', active: true },
          { time: '12:00 - 10 Sep', desc: 'Proses pengiriman cold-chain', active: true }
        ]
      }
    ],
    completed: [
      { id: 'INV-007', name: 'Kangkung Hidroponik (1 Kg)', price: 10000, status: 'Pesanan telah diterima dengan baik', date: '08 Sep 2026' },
      { id: 'INV-008', name: 'Daun Bawang Segar (250 gr)', price: 8000, status: 'Pesanan selesai', date: '07 Sep 2026' }
    ],
    rating: [
      { id: 'INV-009', name: 'Cabai Merah Keriting (500 gr)', price: 25000, status: 'Menunggu ulasan dan bintang dari Anda', date: '05 Sep 2026', rated: false, stars: 0 },
      { id: 'INV-010', name: 'Timun Jepang (1 Kg)', price: 16000, status: 'Menunggu ulasan produk', date: '04 Sep 2026', rated: false, stars: 0 }
    ]
  });

  const [vouchers, setVouchers] = useState([
    { id: 1, title: 'Gratis Ongkir Seluruh Lampung', code: 'ONGKIRSEGAR', discount: '100%', expiry: '31 Des 2026', limit: 'Digunakan maks. 3 kali', terms: 'Minimum belanja Rp 50.000 khusus pengiriman wilayah Lampung.' },
    { id: 2, title: 'Diskon Sayur Organik 50%', code: 'ORGANIK50', discount: '50%', expiry: '15 Okt 2026', limit: 'Digunakan maks. 1 kali', terms: 'Berlaku untuk semua produk kategori sayur hidroponik dan organik.' }
  ]);

  const [selectedVoucherSnK, setSelectedVoucherSnK] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  const [showPhotoMenu, setShowPhotoMenu] = useState(false);
  const [viewingPhoto, setViewingPhoto] = useState(false);
  const [cropModal, setCropModal] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef(null);

  const handleMarketplace = () => setPage('shop');
  const goHome = () => setPage("home");

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result);
        setZoom(1);
        setPosition({ x: 0, y: 0 });
        setShowPhotoMenu(false);
        setCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleSaveCrop = () => {
    setAvatar(tempImage);
    setCropModal(false);
    const updatedUser = { ...user, name, phone, email, role, gender, address, avatar: tempImage };
    if (onUpdateUser) onUpdateUser(updatedUser);
    setSuccessMsg("Foto profil berhasil diperbarui! ✨");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, name, phone, email, role, gender, address, avatar };
    if (onUpdateUser) onUpdateUser(updatedUser);
    setIsEditing(false);
    setSuccessMsg("Perubahan profil berhasil disimpan! ✨");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleVerifyAccount = () => {
    if (!accountNumber || accountNumber.length < 5) {
      alert('Masukkan nomor rekening atau nomor e-wallet yang valid terlebih dahulu!');
      return;
    }
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      setIsAccountVerified(true);
      setAccountOwnerName(name.toUpperCase() + ' (Terverifikasi Aktif)');
    }, 1200);
  };

  const handleTopUpSubmit = (e) => {
    e.preventDefault();
    const amount = parseInt(topUpAmount);
    if (!isAccountVerified) {
      alert('Harap verifikasi nomor rekening / e-wallet terlebih dahulu melalui sistem backend.');
      return;
    }
    if (!isNaN(amount) && amount > 0) {
      if (paymentMethod === 'qris') {
        setShowQrisModal(true);
      } else {
        setWalletBalance(prev => prev + amount);
        setTopUpAmount('');
        setAccountNumber('');
        setIsAccountVerified(false);
        setActiveModal(null);
        setSuccessMsg("Top Up Dompet Segar berhasil! Saldo bertambah. 🎉");
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    }
  };

  const confirmQrisPayment = () => {
    const amount = parseInt(topUpAmount || '50000');
    setWalletBalance(prev => prev + amount);
    setTopUpAmount('');
    setAccountNumber('');
    setIsAccountVerified(false);
    setShowQrisModal(false);
    setActiveModal(null);
    setSuccessMsg("Top Up via QRIS berhasil! Saldo bertambah. 🎉");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleFinalCheckoutPayment = (order) => {
    const totalBayar = order.price + 4000;
    if (walletBalance < totalBayar) {
      alert('Saldo Dompet Segar Anda tidak mencukupi untuk pembayaran ini.');
      setActiveModal('wallet');
      return;
    }
    setWalletBalance(prev => prev - totalBayar);
    setOrdersData(prev => ({
      ...prev,
      pending: prev.pending.filter(item => item.id !== order.id),
      harvesting: [...prev.harvesting, { ...order, status: 'Pembayaran Berhasil. Menunggu Jadwal Panen Petani' }]
    }));
    setOrderCounts(prev => ({
      ...prev,
      pending: prev.pending - 1,
      harvesting: prev.harvesting + 1
    }));
    setCheckoutOrder(null);
    setSelectedOrderTab(null);
    setSuccessMsg("Pembayaran berhasil! Pesanan diteruskan ke tahap panen. ✓");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleSubmitReview = (itemId, stars) => {
    if (stars === 0) {
      alert('Berikan minimal 1 bintang untuk penilaian produk.');
      return;
    }
    setPoints(prev => prev + 50);
    setOrdersData(prev => ({
      ...prev,
      rating: prev.rating.map(item => item.id === itemId ? { ...item, rated: true, stars } : item)
    }));
    setOrderCounts(prev => ({
      ...prev,
      rating: Math.max(0, prev.rating - 1)
    }));
    setSuccessMsg("✨ Terima kasih! Penilaian terkirim (+50 SmartPoin Rewards)!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  if (!user) {
    return (
      <div className="landing-container" style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'Inter, sans-serif' }}>
        <h2>Silakan login terlebih dahulu.</h2>
        <button className="btn-primary-auth" onClick={() => setPage('auth')} style={{ marginTop: '20px', width: '200px', cursor: 'pointer' }}>
          Ke Halaman Login
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="pro-dashboard" 
      style={{ background: '#f7f8f6', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
    >
      <style>{`
        .pro-dashboard, .pro-dashboard * { box-sizing: border-box; }
        .pro-container { width: min(1420px, calc(100% - 56px)); margin: 0 auto; }
        .pro-header { background: #ffffff; border-bottom: 1px solid #e4e9e4; }
        .pro-header-inner { min-height: 82px; display: flex; align-items: center; justify-content: space-between; gap: 30px; }
        .pro-brand { border: 0; background: transparent; padding: 0; display: inline-flex; align-items: center; gap: 12px; cursor: pointer; color: #183b25; text-align: left; }
        .pro-brand img { width: 52px; height: 52px; object-fit: contain; display: block; }
        .pro-brand-name { font-size: 23px; line-height: 1; font-weight: 800; letter-spacing: -0.035em; }
        .pro-brand-name span { color: #2f814b; }
        .pro-brand-sub { margin-top: 5px; color: #778279; font-size: 11px; font-weight: 500; }
        .pro-header-actions { display: flex; align-items: center; gap: 12px; }
        .pro-nav-button { height: 46px; padding: 0 22px; border: 1px solid #d6e0d7; border-radius: 10px; background: #ffffff; color: #1e3a27; font-size: 14px; font-weight: 750; cursor: pointer; display: inline-flex; align-items: center; gap: 9px; transition: border-color .18s ease, background .18s ease; }
        .pro-nav-button:hover { background: #f4f8f4; border-color: #b8ccb9; }
        .pro-nav-button.market { border-color: #176137; background: #176137; color: #ffffff; }
        .pro-nav-button.market:hover { background: #12542e; border-color: #12542e; }
        
        @media (max-width: 720px) {
          .pro-container { width: calc(100% - 28px); }
          .pro-header-inner { min-height: auto; padding: 14px 0; align-items: flex-start; flex-direction: column; }
          .pro-header-actions { width: 100%; display: grid; grid-template-columns: 1fr 1fr; }
          .pro-nav-button { width: 100%; justify-content: center; }
        }
      `}</style>

      {/* HEADER */}
      <header className="pro-header">
        <div className="pro-container pro-header-inner">
          <button type="button" className="pro-brand" onClick={goHome} aria-label="Kembali ke Home">
            <img src={logoImg} alt="Agri-ICS" />
            <div>
              <div className="pro-brand-name">AGRI-<span>ICS</span></div>
              <div className="pro-brand-sub">Solusi sayur segar dan sehat</div>
            </div>
          </button>

          <div className="pro-header-actions">
            <button type="button" className="pro-nav-button" onClick={goHome}>
              <span>⌂</span> Home
            </button>
            <button type="button" className="pro-nav-button market" onClick={handleMarketplace}>
              <span>🛒</span> Marketplace
            </button>
          </div>
        </div>
      </header>

      {/* KONTEN UTAMA PROFIL */}
      <section style={{ padding: '40px 0 60px', flex: 1 }}>
        <div className="pro-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {successMsg && (
            <div style={{ padding: '12px 18px', background: '#e6f4e9', border: '1px solid #176137', color: '#176137', borderRadius: '12px', fontWeight: 700, fontSize: '13px', textAlign: 'center' }}>
              {successMsg}
            </div>
          )}

          {/* FOTO SAMPUL & HEADER PROFIL (VERTIKAL KE BAWAH) */}
          <div style={{ background: '#ffffff', borderRadius: '24px 24px 0 0', border: '1px solid #c2d5c5', borderBottom: 'none', overflow: 'hidden' }}>
            <div style={{ position: 'relative', height: '190px', background: '#d6e4d9', width: '100%' }}>
              <img src={coverPhoto} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <label style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.65)', color: '#fff', padding: '9px 16px', borderRadius: '10px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', backdropFilter: 'blur(4px)', display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                Ubah Sampul
                <input type="file" accept="image/*" onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setCoverPhoto(reader.result);
                    reader.readAsDataURL(file);
                  }
                }} style={{ display: 'none' }} />
              </label>
            </div>

            <div style={{ background: '#b2c7b5', padding: '28px 38px 34px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '28px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '28px' }}>
                <div 
                  onClick={() => setShowPhotoMenu(true)}
                  style={{ position: 'relative', width: '135px', height: '135px', borderRadius: '50%', background: '#fff', border: '4px solid #fff', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.18)', flexShrink: '0', marginTop: '-65px', cursor: 'pointer' }}
                >
                  {avatar ? (
                    <img src={avatar} alt="User Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: '#163821', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px', fontWeight: 'bold' }}>
                      {name ? name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = 1} onMouseLeave={(e) => e.currentTarget.style.opacity = 0}>
                    <span style={{ color: '#fff', fontSize: '12px', fontWeight: 700, textAlign: 'center' }}>Atur Foto</span>
                  </div>
                </div>

                {/* Stacked Vertical Info Layout */}
                <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {/* Nama (Bold) */}
                  <h1 style={{ margin: 0, color: '#111d14', fontSize: '30px', fontWeight: '900', letterSpacing: '-0.5px', lineHeight: '1.2' }}>{name}</h1>
                  
                  {/* No. Telepon */}
                  {phone && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2b3b30', fontSize: '13.5px', fontWeight: '400' }}>
                      <span>📞 {phone}</span>
                    </div>
                  )}

                  {/* Email (Opsional) */}
                  {email && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#253529', fontSize: '13.5px', fontWeight: '400' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      <span>{email}</span>
                    </div>
                  )}

                  {/* Jenis Kelamin */}
                  {gender && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2b3b30', fontSize: '13.5px', fontWeight: '400' }}>
                      <span>👤 {gender}</span>
                    </div>
                  )}

                  {/* Alamat */}
                  {address && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2b3b30', fontSize: '13px', fontWeight: '400' }}>
                      <span>📍 {address}</span>
                    </div>
                  )}

                  {/* Peran */}
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#163821', color: '#ffffff', padding: '6px 14px', borderRadius: '50px', fontSize: '12.5px', fontWeight: '500', boxShadow: '0 2px 6px rgba(0,0,0,0.12)', width: 'fit-content', marginTop: '4px' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <span>Peran: {role}</span>
                  </div>
                </div>
              </div>

              <div>
                <button type="button" onClick={() => setIsEditing(true)} style={{ background: '#163821', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '12px', fontSize: '13.5px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Edit Profil
                </button>
              </div>
            </div>
          </div>

          {/* KOTAK 3 MENU UTAMA */}
          <div style={{ background: '#ffffff', borderRadius: '0 0 24px 24px', padding: '24px 20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', textAlign: 'center', boxShadow: '0 8px 25px rgba(0,0,0,0.06)', border: '1px solid #c2d5c5', borderTop: '1px solid #e1eade' }}>
            <div onClick={() => setActiveModal('wallet')} style={{ padding: '14px', borderRight: '1px solid #edf2ee', cursor: 'pointer', borderRadius: '12px' }}>
              <div style={{ fontSize: '13px', color: '#525e56', fontWeight: '600', marginBottom: '8px' }}>💳 Dompet Segar</div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#111d14', marginBottom: '10px' }}>Rp {walletBalance.toLocaleString('id-ID')}</div>
              <span style={{ background: '#c8f5d7', color: '#11522a', padding: '6px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', display: 'inline-block' }}>Top Up &amp; Bank ›</span>
            </div>
            <div onClick={() => setActiveModal('points')} style={{ padding: '14px', borderRight: '1px solid #edf2ee', cursor: 'pointer', borderRadius: '12px' }}>
              <div style={{ fontSize: '13px', color: '#525e56', fontWeight: '600', marginBottom: '8px' }}>⭐ SmartPoin</div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#111d14', marginBottom: '10px' }}>{points.toLocaleString('id-ID')} Poin</div>
              <span style={{ color: '#163821', fontSize: '11px', fontWeight: '600', display: 'inline-block' }}>Tukar Potongan Belanja ›</span>
            </div>
            <div onClick={() => setActiveModal('vouchers')} style={{ padding: '14px', cursor: 'pointer', borderRadius: '12px' }}>
              <div style={{ fontSize: '13px', color: '#525e56', fontWeight: '600', marginBottom: '8px' }}>🎟️ Voucher Diskon</div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#111d14', marginBottom: '10px' }}>{vouchers.length} Kupon</div>
              <span style={{ color: '#163821', fontSize: '11px', fontWeight: '600', display: 'inline-block' }}>Lihat S&amp;K &amp; Kupon ›</span>
            </div>
          </div>

          {/* MENU PESANAN SAYA */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px 25px', boxShadow: '0 6px 20px rgba(0,0,0,0.05)', border: '1px solid #c2d5c5' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h4 style={{ margin: 0, fontSize: '15px', color: '#111d14', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#163821" strokeWidth="2.2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg> Pesanan Saya
              </h4>
              <span onClick={() => setSelectedOrderTab('coldchain')} style={{ fontSize: '13px', color: '#163821', fontWeight: '600', cursor: 'pointer' }}>Lihat Riwayat ›</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', textAlign: 'center' }}>
              {[
                { key: 'pending', label: 'Belum Dibayar', count: orderCounts.pending, animSvg: (
                  <motion.svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#163821" strokeWidth="2" animate={{ rotate: [0, -10, 10, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
                    <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
                  </motion.svg>
                )},
                { key: 'harvesting', label: 'Dipanen', count: orderCounts.harvesting, animSvg: (
                  <motion.svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#163821" strokeWidth="2" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </motion.svg>
                )},
                { key: 'coldchain', label: 'Cold-chain', count: orderCounts.coldchain, animSvg: (
                  <motion.svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#163821" strokeWidth="2" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
                    <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                  </motion.svg>
                )},
                { key: 'completed', label: 'Selesai', count: orderCounts.completed, animSvg: (
                  <motion.svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#163821" strokeWidth="2" animate={{ rotate: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </motion.svg>
                )},
                { key: 'rating', label: 'Beri Penilaian', count: orderCounts.rating, animSvg: (
                  <motion.svg width="24" height="24" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="2" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </motion.svg>
                )}
              ].map((item) => (
                <div key={item.key} onClick={() => setSelectedOrderTab(item.key)} style={{ cursor: 'pointer', padding: '8px', position: 'relative' }}>
                  <div style={{ width: '52px', height: '52px', background: '#eaf4eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', border: '1px solid #c2e5cc', position: 'relative' }}>
                    {item.animSvg}
                    {item.count > 0 && (
                      <span style={{ position: 'absolute', top: -2, right: -2, background: '#c53030', color: '#fff', fontSize: '10.5px', fontWeight: '800', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                        {item.count}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: '#334238', fontWeight: '600', lineHeight: '1.3' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* MODAL PUSAT BANTUAN & REGULASI DATA */}
          {showRegulasiModal && (
            <div onClick={() => setShowRegulasiModal(false)} style={{ position: 'fixed', inset: 0, zIndex: 10025, background: 'rgba(15, 35, 23, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(5px)' }}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                onClick={(e) => e.stopPropagation()} 
                style={{ background: '#ffffff', borderRadius: '24px', padding: '32px', width: 'min(700px, 94vw)', boxShadow: '0 30px 70px rgba(0,0,0,0.3)', border: '1px solid #c2d5c5', display: 'grid', gap: '20px', maxHeight: '85vh', overflowY: 'auto' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e1eade', paddingBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '38px', height: '38px', background: '#eaf4eb', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#163821', fontWeight: '900' }}>🛡️</div>
                    <h3 style={{ margin: 0, color: '#163821', fontSize: '18px', fontWeight: '900' }}>Pusat Bantuan &amp; Regulasi Data</h3>
                  </div>
                  <button onClick={() => setShowRegulasiModal(false)} style={{ background: 'transparent', border: 'none', fontSize: '26px', cursor: 'pointer', color: '#525e56' }}>&times;</button>
                </div>

                <div style={{ display: 'grid', gap: '16px', fontSize: '13.5px', color: '#334238', lineHeight: '1.6' }}>
                  <div style={{ background: '#f4f8f5', padding: '16px', borderRadius: '14px', border: '1px solid #c2e5cc' }}>
                    <h4 style={{ margin: '0 0 6px', color: '#163821', fontSize: '14.5px', fontWeight: '800' }}>1. Kebijakan Privasi &amp; Perlindungan Data Pengguna</h4>
                    <p style={{ margin: 0, color: '#55635a' }}>
                      Agri-ICS berkomitmen penuh melindungi kerahasiaan data pribadi Anda (termasuk Nama, No. Telepon, Email, dan Alamat Pengiriman). Seluruh informasi enkripsi disimpan secara aman dan tidak akan dibagikan kepada pihak ketiga tanpa izin eksplisit sesuai regulasi perlindungan data konsumen yang berlaku.
                    </p>
                  </div>

                  <div style={{ background: '#f4f8f5', padding: '16px', borderRadius: '14px', border: '1px solid #c2e5cc' }}>
                    <h4 style={{ margin: '0 0 6px', color: '#163821', fontSize: '14.5px', fontWeight: '800' }}>2. Standar Regulasi Transaksi &amp; Cold-chain</h4>
                    <p style={{ margin: 0, color: '#55635a' }}>
                      Setiap transaksi pembelian sayur hidroponik dan organik diatur dalam sistem garansi kesegaran produk berbasis IoT berpendingin (Cold-chain 4°C). Jika produk diterima dalam kondisi tidak layak, Anda berhak mengajukan klaim penggantian dalam waktu 1x24 jam.
                    </p>
                  </div>

                  <div style={{ background: '#f4f8f5', padding: '16px', borderRadius: '14px', border: '1px solid #c2e5cc' }}>
                    <h4 style={{ margin: '0 0 6px', color: '#163821', fontSize: '14.5px', fontWeight: '800' }}>3. Layanan Bantuan Pelanggan (24/7)</h4>
                    <p style={{ margin: 0, color: '#55635a' }}>
                      Butuh bantuan kendala akun, top up dompet, atau pelacakan panen? Hubungi tim support kami melalui WhatsApp resmi di <strong>+62 812-3456-7890</strong> atau email ke <strong>livingmart@gmail.com</strong>.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <button onClick={() => setShowRegulasiModal(false)} style={{ padding: '11px 24px', background: '#163821', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '800', cursor: 'pointer' }}>
                    Saya Mengerti &amp; Setuju ✓
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* MODAL RINCIAN STATUS */}
          {selectedOrderTab && !checkoutOrder && (
            <div onClick={() => setSelectedOrderTab(null)} style={{ position: 'fixed', inset: 0, zIndex: 10015, background: 'rgba(15, 35, 23, 0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' }}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={(e) => e.stopPropagation()} 
                style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', width: 'min(640px, 94vw)', boxShadow: '0 24px 60px rgba(0,0,0,0.25)', border: '1px solid #c2d5c5', display: 'grid', gap: '16px', maxHeight: '85vh', overflowY: 'auto' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, color: '#111d14', fontSize: '18px', fontWeight: '800' }}>
                    📦 Rincian Status: {
                      selectedOrderTab === 'pending' ? 'Belum Dibayar' :
                      selectedOrderTab === 'harvesting' ? 'Tahap Panen Greenhouse' :
                      selectedOrderTab === 'coldchain' ? 'Pengiriman Cold-chain' :
                      selectedOrderTab === 'completed' ? 'Pesanan Selesai' : 'Beri Penilaian & Dapatkan Koin'
                    }
                  </h3>
                  <button onClick={() => setSelectedOrderTab(null)} style={{ background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#525e56' }}>&times;</button>
                </div>

                {selectedOrderTab === 'pending' && (
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {ordersData.pending.length === 0 ? (
                      <p style={{ textAlign: 'center', color: '#778279', padding: '20px' }}>Tidak ada tagihan yang belum dibayar.</p>
                    ) : (
                      ordersData.pending.map(order => (
                        <div key={order.id} style={{ padding: '16px', borderRadius: '14px', background: '#f4f8f5', border: '1px solid #c2e5cc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <strong style={{ color: '#163821', fontSize: '13px' }}>{order.id}</strong>
                            <div style={{ fontSize: '14px', fontWeight: '800', color: '#111d14', marginTop: '2px' }}>{order.name}</div>
                            <div style={{ fontSize: '12px', color: '#c53030', fontWeight: '700', marginTop: '2px' }}>Total Tagihan: Rp {order.price.toLocaleString('id-ID')}</div>
                          </div>
                          <button onClick={() => setCheckoutOrder(order)} style={{ padding: '10px 18px', background: '#163821', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '800', fontSize: '12px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }}>
                            Bayar Sekarang 🛒
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {selectedOrderTab === 'harvesting' && (
                  <div style={{ display: 'grid', gap: '16px' }}>
                    <div style={{ background: 'linear-gradient(135deg, #eaf4eb 0%, #d4e8d6 100%)', borderRadius: '18px', padding: '24px', textAlign: 'center', border: '1px solid #bce0c3', position: 'relative', overflow: 'hidden' }}>
                      <motion.div animate={{ x: [-20, 20, -20], rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} style={{ fontSize: '48px', marginBottom: '8px' }}>
                        🧑‍🌾 🌱 🚜
                      </motion.div>
                      <h4 style={{ margin: '0 0 4px', color: '#163821', fontSize: '16px', fontWeight: '800' }}>Petani Sedang Beraksi di Greenhouse!</h4>
                      <p style={{ margin: 0, fontSize: '12.5px', color: '#334238', maxWidth: '400px', marginInline: 'auto' }}>
                        Sayuran Anda sedang dipetik langsung dari sistem hidroponik Gisting untuk menjamin kesegaran maksimal saat dikirim.
                      </p>
                    </div>

                    {ordersData.harvesting.map(order => (
                      <div key={order.id} style={{ padding: '16px', borderRadius: '14px', background: '#f4f8f5', border: '1px solid #c2e5cc' }}>
                        <strong style={{ color: '#163821', fontSize: '13px' }}>{order.id}</strong>
                        <div style={{ fontSize: '14px', fontWeight: '800', color: '#111d14' }}>{order.name}</div>
                        <div style={{ fontSize: '12px', color: '#2f814b', fontWeight: '700', marginTop: '4px' }}>Status: {order.status}</div>
                      </div>
                    ))}
                  </div>
                )}

                {selectedOrderTab === 'coldchain' && (
                  <div style={{ display: 'grid', gap: '18px' }}>
                    {ordersData.coldchain.map(order => (
                      <div key={order.id} style={{ padding: '18px', borderRadius: '16px', background: '#f4f8f5', border: '1px solid #c2e5cc', display: 'grid', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong style={{ color: '#163821', fontSize: '13px' }}>{order.id}</strong>
                          <span style={{ fontSize: '12px', fontWeight: '700', color: '#2f814b' }}>Rp {order.price.toLocaleString('id-ID')}</span>
                        </div>
                        <div style={{ fontSize: '15px', fontWeight: '800', color: '#111d14' }}>{order.name}</div>

                        <div style={{ background: '#ffffff', padding: '14px 16px', borderRadius: '12px', border: '1px solid #e1eade', display: 'grid', gap: '12px' }}>
                          <div style={{ fontSize: '12px', fontWeight: '800', color: '#163821', marginBottom: '2px' }}>📍 Timeline Perjalanan Cold-chain (Suhu 4°C):</div>
                          {order.timeline?.map((t, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', position: 'relative' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: t.active ? '#163821' : '#cbd5d0', border: '2px solid #fff', boxShadow: '0 0 0 2px ' + (t.active ? '#163821' : '#cbd5d0') }} />
                                {idx < order.timeline.length - 1 && <div style={{ width: '2px', height: '24px', background: '#cbd5d0', margin: '2px 0' }} />}
                              </div>
                              <div style={{ fontSize: '12px' }}>
                                <div style={{ fontWeight: '700', color: t.active ? '#111d14' : '#778279' }}>{t.desc}</div>
                                <div style={{ fontSize: '10.5px', color: '#88968d' }}>{t.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {selectedOrderTab === 'completed' && (
                  <div style={{ display: 'grid', gap: '16px' }}>
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }} style={{ background: '#eaf4eb', borderRadius: '18px', padding: '20px', textAlign: 'center', border: '1px solid #c2e5cc' }}>
                      <div style={{ fontSize: '38px', marginBottom: '6px' }}>🎉📦✨</div>
                      <h4 style={{ margin: '0 0 4px', color: '#163821', fontSize: '16px', fontWeight: '800' }}>Pesanan Telah Diterima dengan Selamat!</h4>
                      <p style={{ margin: 0, fontSize: '12px', color: '#55635a' }}>Semua produk sayur segar telah sampai di tangan Anda dalam kondisi steril dan terjaga.</p>
                    </motion.div>

                    {ordersData.completed.map(order => (
                      <div key={order.id} style={{ padding: '16px', borderRadius: '14px', background: '#f4f8f5', border: '1px solid #c2e5cc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong style={{ color: '#163821', fontSize: '13px' }}>{order.id}</strong>
                          <div style={{ fontSize: '14px', fontWeight: '800', color: '#111d14', marginTop: '2px' }}>{order.name}</div>
                          <div style={{ fontSize: '11.5px', color: '#2f814b', fontWeight: '700', marginTop: '2px' }}>✓ {order.status} ({order.date})</div>
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: '#111d14' }}>Rp {order.price.toLocaleString('id-ID')}</span>
                      </div>
                    ))}
                  </div>
                )}

                {selectedOrderTab === 'rating' && (
                  <div style={{ display: 'grid', gap: '16px' }}>
                    <div style={{ background: '#fff9e6', padding: '14px 16px', borderRadius: '14px', border: '1px solid #ffe0b2', fontSize: '12.5px', color: '#8d6b00', fontWeight: '700' }}>
                      ⭐ Berikan ulasan dan rating produk untuk mendapatkan <span style={{ color: '#c68a00', fontWeight: '900' }}>+50 SmartPoin Rewards</span> per produk!
                    </div>

                    {ordersData.rating.map(order => (
                      <div key={order.id} style={{ padding: '16px', borderRadius: '14px', background: '#f4f8f5', border: '1px solid #c2e5cc', display: 'grid', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong style={{ color: '#163821', fontSize: '13px' }}>{order.id}</strong>
                          <span style={{ fontSize: '12px', fontWeight: '700', color: '#2f814b' }}>Rp {order.price.toLocaleString('id-ID')}</span>
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: '800', color: '#111d14' }}>{order.name}</div>

                        {order.rated ? (
                          <div style={{ background: '#eaf4eb', padding: '10px', borderRadius: '8px', color: '#163821', fontSize: '12px', fontWeight: '700', textAlign: 'center' }}>
                            ✓ Ulasan terkirim! +50 Poin telah ditambahkan ke akun Anda.
                          </div>
                        ) : (
                          <div style={{ display: 'grid', gap: '8px', borderTop: '1px solid #e1eade', paddingTop: '10px' }}>
                            <div style={{ fontSize: '12px', fontWeight: '700', color: '#334238' }}>Pilih Rating Bintang:</div>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button 
                                  key={star}
                                  type="button"
                                  onClick={() => {
                                    setOrdersData(prev => ({
                                      ...prev,
                                      rating: prev.rating.map(r => r.id === order.id ? { ...r, stars: star } : r)
                                    }));
                                  }}
                                  style={{ background: 'transparent', border: 'none', fontSize: '22px', cursor: 'pointer', color: star <= (order.stars || 0) ? '#f59e0b' : '#cbd5d0' }}
                                >
                                  ★
                                </button>
                              ))}
                            </div>
                            <button onClick={() => handleSubmitReview(order.id, order.stars || 5)} style={{ padding: '9px 16px', background: '#163821', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '12px', cursor: 'pointer', justifySelf: 'start' }}>
                              Kirim Penilaian &amp; Klaim Koin 🎁
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <button onClick={() => setSelectedOrderTab(null)} style={{ padding: '10px 20px', background: '#163821', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                    Tutup
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* HALAMAN CHECKOUT PEMBAYARAN */}
          {checkoutOrder && (
            <div onClick={() => setCheckoutOrder(null)} style={{ position: 'fixed', inset: 0, zIndex: 10020, background: 'rgba(15, 35, 23, 0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(5px)' }}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                onClick={(e) => e.stopPropagation()} 
                style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', width: 'min(620px, 95vw)', boxShadow: '0 30px 70px rgba(0,0,0,0.3)', border: '1px solid #c2d5c5', display: 'grid', gap: '16px', maxHeight: '90vh', overflowY: 'auto' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e1eade', paddingBottom: '12px' }}>
                  <h3 style={{ margin: 0, color: '#163821', fontSize: '18px', fontWeight: '900' }}>🛒 Halaman Checkout &amp; Pembayaran</h3>
                  <button onClick={() => setCheckoutOrder(null)} style={{ background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#525e56' }}>&times;</button>
                </div>

                <div style={{ background: '#f4f8f5', padding: '14px', borderRadius: '14px', border: '1px solid #c2e5cc' }}>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: '#163821', marginBottom: '4px' }}>📍 Alamat Pengiriman:</div>
                  <div style={{ fontSize: '13.5px', fontWeight: '800', color: '#111d14' }}>{name} ({phone})</div>
                  <div style={{ fontSize: '12px', color: '#55635a', marginTop: '2px' }}>{address}</div>
                </div>

                <div style={{ display: 'grid', gap: '8px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: '#163821' }}>📦 Produk Dipesan:</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderRadius: '10px', background: '#fafcfa', border: '1px solid #e1eade' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '800', color: '#111d14' }}>{checkoutOrder.name}</div>
                      <div style={{ fontSize: '11.5px', color: '#778279' }}>No. Inv: {checkoutOrder.id}</div>
                    </div>
                    <div style={{ fontWeight: '800', color: '#163821' }}>Rp {checkoutOrder.price.toLocaleString('id-ID')}</div>
                  </div>
                </div>

                <div style={{ background: '#f9fbf9', padding: '16px', borderRadius: '14px', border: '1px solid #e1eade', display: 'grid', gap: '10px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: '#163821' }}>💳 Metode Pembayaran:</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                    <span style={{ fontWeight: '700', color: '#334238' }}>Dompet Segar (Saldo Aktif)</span>
                    <span style={{ fontWeight: '900', color: walletBalance >= (checkoutOrder.price + 4000) ? '#2f814b' : '#c53030' }}>
                      Rp {walletBalance.toLocaleString('id-ID')}
                    </span>
                  </div>
                  {walletBalance < (checkoutOrder.price + 4000) && (
                    <div style={{ fontSize: '11px', color: '#c53030', fontWeight: '700' }}>
                      ⚠️ Saldo kurang! Silakan Top Up terlebih dahulu agar pembayaran dapat diproses.
                    </div>
                  )}
                </div>

                <div style={{ display: 'grid', gap: '6px', fontSize: '13px', borderTop: '1px solid #e1eade', paddingTop: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#55635a' }}>
                    <span>Subtotal Produk</span>
                    <span>Rp {checkoutOrder.price.toLocaleString('id-ID')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#55635a' }}>
                    <span>Biaya Pengiriman (Cold-chain)</span>
                    <span>Rp 4.000</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '900', color: '#163821', fontSize: '15px', marginTop: '4px' }}>
                    <span>Total Pembayaran</span>
                    <span style={{ color: '#2f814b' }}>Rp {(checkoutOrder.price + 4000).toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                  <button onClick={() => setCheckoutOrder(null)} style={{ padding: '11px 18px', background: '#edf2ee', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', color: '#525e56' }}>
                    Batal
                  </button>
                  <button 
                    onClick={() => handleFinalCheckoutPayment(checkoutOrder)}
                    style={{ padding: '11px 24px', background: '#163821', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                  >
                    Bayar Sekarang ✓
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* MODAL TOP UP DOMPET */}
          {activeModal === 'wallet' && (
            <div onClick={() => setActiveModal(null)} style={{ position: 'fixed', inset: 0, zIndex: 10005, background: 'rgba(15, 35, 23, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' }}>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()} style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', width: 'min(560px, 94vw)', boxShadow: '0 24px 60px rgba(0,0,0,0.25)', border: '1px solid #c2d5c5', display: 'grid', gap: '16px', maxHeight: '90vh', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, color: '#111d14', fontSize: '20px', fontWeight: '800' }}>💳 Top Up Dompet Segar &amp; Verifikasi</h3>
                  <button onClick={() => setActiveModal(null)} style={{ background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#525e56' }}>&times;</button>
                </div>
                <div style={{ background: '#f4f8f5', padding: '16px', borderRadius: '16px', border: '1px solid #c2e5cc' }}>
                  <div style={{ fontSize: '12px', color: '#525e56', fontWeight: '700' }}>Saldo Aktif Saat Ini</div>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: '#163821', marginTop: '4px' }}>Rp {walletBalance.toLocaleString('id-ID')}</div>
                </div>
                <form onSubmit={handleTopUpSubmit} style={{ display: 'grid', gap: '14px' }}>
                  <div style={{ display: 'grid', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#334238' }}>1. Pilih Metode Sumber Dana</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                      <button type="button" onClick={() => { setPaymentMethod('transfer'); setIsAccountVerified(false); }} style={{ padding: '10px', borderRadius: '10px', border: paymentMethod === 'transfer' ? '2px solid #163821' : '1px solid #c2d5c5', background: paymentMethod === 'transfer' ? '#eaf4eb' : '#fff', fontWeight: '700', color: '#163821', cursor: 'pointer', fontSize: '12px' }}>🏦 Transfer Bank</button>
                      <button type="button" onClick={() => { setPaymentMethod('ewallet'); setIsAccountVerified(false); }} style={{ padding: '10px', borderRadius: '10px', border: paymentMethod === 'ewallet' ? '2px solid #163821' : '1px solid #c2d5c5', background: paymentMethod === 'ewallet' ? '#eaf4eb' : '#fff', fontWeight: '700', color: '#163821', cursor: 'pointer', fontSize: '12px' }}>📱 E-Wallet</button>
                      <button type="button" onClick={() => { setPaymentMethod('qris'); setIsAccountVerified(true); }} style={{ padding: '10px', borderRadius: '10px', border: paymentMethod === 'qris' ? '2px solid #163821' : '1px solid #c2d5c5', background: paymentMethod === 'qris' ? '#eaf4eb' : '#fff', fontWeight: '700', color: '#163821', cursor: 'pointer', fontSize: '12px' }}>⚡ QRIS Instan</button>
                    </div>
                  </div>
                  {paymentMethod === 'transfer' && (
                    <div style={{ display: 'grid', gap: '6px' }}>
                      <label style={{ fontSize: '13px', fontWeight: '700', color: '#334238' }}>Pilih Bank Tujuan</label>
                      <select value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)} style={{ padding: '11px 14px', borderRadius: '10px', border: '1px solid #c2d5c5', fontSize: '13px', outline: 'none', background: '#fff', fontWeight: '600' }}>
                        <option value="bca">Bank BCA</option>
                        <option value="bni">Bank BNI</option>
                        <option value="mandiri">Bank Mandiri</option>
                        <option value="bri">Bank BRI</option>
                      </select>
                    </div>
                  )}
                  {paymentMethod === 'ewallet' && (
                    <div style={{ display: 'grid', gap: '6px' }}>
                      <label style={{ fontSize: '13px', fontWeight: '700', color: '#334238' }}>Pilih Aplikasi E-Wallet</label>
                      <select value={selectedEwallet} onChange={(e) => setSelectedEwallet(e.target.value)} style={{ padding: '11px 14px', borderRadius: '10px', border: '1px solid #c2d5c5', fontSize: '13px', outline: 'none', background: '#fff', fontWeight: '600' }}>
                        <option value="dana">DANA</option>
                        <option value="OVO">OVO</option>
                        <option value="gopay">GoPay</option>
                        <option value="shopeepay">ShopeePay</option>
                      </select>
                    </div>
                  )}
                  {paymentMethod !== 'qris' && (
                    <div style={{ display: 'grid', gap: '6px' }}>
                      <label style={{ fontSize: '13px', fontWeight: '700', color: '#334238' }}>{paymentMethod === 'transfer' ? 'Nomor Rekening Bank Anda' : 'Nomor Handphone E-Wallet'}</label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input type="text" placeholder={paymentMethod === 'transfer' ? 'Masukkan no rekening...' : 'Contoh: 081234567890'} value={accountNumber} onChange={(e) => { setAccountNumber(e.target.value); setIsAccountVerified(false); }} style={{ flex: 1, padding: '11px 14px', borderRadius: '10px', border: '1px solid #c2d5c5', fontSize: '13px', outline: 'none' }} />
                        <button type="button" onClick={handleVerifyAccount} style={{ padding: '11px 16px', background: isAccountVerified ? '#2f814b' : '#163821', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '12px', cursor: 'pointer', whiteSpace: 'nowrap' }}>{isValidating ? 'Memeriksa...' : isAccountVerified ? '✓ Terverifikasi' : 'Verifikasi Sistem'}</button>
                      </div>
                      {isAccountVerified && <div style={{ fontSize: '11.5px', color: '#2f814b', fontWeight: '700', marginTop: '2px' }}>Backend Terhubung: Pemilik akun terdeteksi aktif atas nama <strong>{accountOwnerName}</strong></div>}
                    </div>
                  )}
                  <div style={{ display: 'grid', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#334238' }}>Nominal Top Up (Rp)</label>
                    <input type="number" placeholder="Contoh: 100000" value={topUpAmount} onChange={(e) => setTopUpAmount(e.target.value)} required style={{ padding: '11px 14px', borderRadius: '10px', border: '1px solid #c2d5c5', fontSize: '13px', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
                    <button type="button" onClick={() => setActiveModal(null)} style={{ padding: '11px 18px', background: '#edf2ee', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', color: '#525e56' }}>Batal</button>
                    <button type="submit" style={{ padding: '11px 22px', background: !isAccountVerified && paymentMethod !== 'qris' ? '#88968d' : '#163821', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: !isAccountVerified && paymentMethod !== 'qris' ? 'not-allowed' : 'pointer' }}>{paymentMethod === 'qris' ? 'Lanjut QRIS' : 'Konfirmasi Top Up'}</button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}

          {/* MODAL QRIS SIMULASI */}
          {showQrisModal && (
            <div onClick={() => setShowQrisModal(false)} style={{ position: 'fixed', inset: 0, zIndex: 10010, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(5px)' }}>
              <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: '24px', padding: '30px', width: 'min(360px, 90vw)', textAlign: 'center', display: 'grid', gap: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                <h3 style={{ margin: 0, color: '#111d14', fontSize: '18px', fontWeight: '800' }}>Scan QRIS Pembayaran</h3>
                <div style={{ background: '#f0f4f0', padding: '20px', borderRadius: '16px', border: '2px dashed #163821', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '160px', height: '160px', background: '#163821', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px', fontWeight: '800', borderRadius: '8px' }}>[ QRIS BARCODE ]</div>
                </div>
                <button onClick={confirmQrisPayment} style={{ padding: '12px', background: '#163821', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>Simulasikan Pembayaran Berhasil ✓</button>
              </div>
            </div>
          )}

          {/* MODAL SMARTPOIN */}
          {activeModal === 'points' && (
            <div onClick={() => setActiveModal(null)} style={{ position: 'fixed', inset: 0, zIndex: 10005, background: 'rgba(15, 35, 23, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' }}>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()} style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', width: 'min(520px, 94vw)', boxShadow: '0 24px 60px rgba(0,0,0,0.25)', border: '1px solid #c2d5c5', display: 'grid', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, color: '#111d14', fontSize: '20px', fontWeight: '800' }}>⭐ Penukaran SmartPoin</h3>
                  <button onClick={() => setActiveModal(null)} style={{ background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#525e56' }}>&times;</button>
                </div>
                <div style={{ background: '#f4f8f5', padding: '20px', borderRadius: '16px', border: '1px solid #c2e5cc' }}>
                  <div style={{ fontSize: '13px', color: '#525e56', fontWeight: '700' }}>Total Poin Anda Saat Ini</div>
                  <div style={{ fontSize: '28px', fontWeight: '900', color: '#163821', marginTop: '4px' }}>{points.toLocaleString('id-ID')} Poin</div>
                </div>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#334238' }}>Tukar Poin untuk Potongan Harga Belanja:</div>
                  <div style={{ padding: '14px', borderRadius: '12px', border: '1px solid #e1eade', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafcfa' }}>
                    <div>
                      <div style={{ fontWeight: '800', fontSize: '14px', color: '#111d14' }}>Voucher Potongan Belanja Rp 10.000</div>
                      <div style={{ fontSize: '12px', color: '#55635a' }}>Biaya Tukar: 100 Poin</div>
                    </div>
                    <button onClick={() => { if (points >= 100) { setPoints(prev => prev - 100); setVouchers(prev => [...prev, { id: Date.now(), title: 'Potongan Belanja Poin Rp 10.000', code: 'POIN10K', discount: 'Rp 10.000', expiry: '31 Des 2026', limit: '1x pakai', terms: 'Didapat dari penukaran SmartPoin.' }]); setSuccessMsg("Voucher berhasil ditukar! 🎉"); setTimeout(() => setSuccessMsg(""), 3000); } else { alert('Poin Anda tidak mencukupi!'); } }} style={{ padding: '8px 14px', background: '#163821', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}>Tukar</button>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <button onClick={() => setActiveModal(null)} style={{ padding: '10px 20px', background: '#edf2ee', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', color: '#525e56' }}>Tutup</button>
                </div>
              </motion.div>
            </div>
          )}

          {/* MODAL VOUCHER */}
          {activeModal === 'vouchers' && (
            <div onClick={() => setActiveModal(null)} style={{ position: 'fixed', inset: 0, zIndex: 10005, background: 'rgba(15, 35, 23, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' }}>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()} style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', width: 'min(580px, 94vw)', boxShadow: '0 24px 60px rgba(0,0,0,0.25)', border: '1px solid #c2d5c5', display: 'grid', gap: '16px', maxHeight: '85vh', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, color: '#111d14', fontSize: '20px', fontWeight: '800' }}>🎟️ Daftar Voucher &amp; Kupon Anda</h3>
                  <button onClick={() => setActiveModal(null)} style={{ background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#525e56' }}>&times;</button>
                </div>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {vouchers.map(v => (
                    <div key={v.id} style={{ padding: '16px', borderRadius: '14px', background: '#f4f8f5', border: '1px solid #c2e5cc', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ fontWeight: '800', fontSize: '15px', color: '#163821' }}>{v.title}</div>
                          <div style={{ fontSize: '12px', color: '#55635a', marginTop: '3px' }}>Kode Kupon: <strong style={{ color: '#111d14' }}>{v.code}</strong></div>
                        </div>
                        <span style={{ padding: '6px 12px', background: '#163821', color: '#fff', borderRadius: '8px', fontSize: '12px', fontWeight: '700' }}>{v.discount}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', color: '#66756b', borderTop: '1px solid #e1eade', paddingTop: '8px' }}>
                        <div>⏳ Berlaku s.d. <strong>{v.expiry}</strong></div>
                        <div>🔄 {v.limit}</div>
                        <button onClick={() => setSelectedVoucherSnK(v)} style={{ background: 'transparent', border: 'none', color: '#163821', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline', fontSize: '11.5px' }}>Syarat &amp; Ketentuan</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <button onClick={() => setActiveModal(null)} style={{ padding: '10px 20px', background: '#edf2ee', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', color: '#525e56' }}>Tutup</button>
                </div>
              </motion.div>
            </div>
          )}

          {/* MODAL S&K VOUCHER */}
          {selectedVoucherSnK && (
            <div onClick={() => setSelectedVoucherSnK(null)} style={{ position: 'fixed', inset: 0, zIndex: 10020, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' }}>
              <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: '20px', padding: '24px', width: 'min(400px, 90vw)', display: 'grid', gap: '14px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                <h4 style={{ margin: 0, color: '#163821', fontSize: '16px', fontWeight: '800' }}>Syarat &amp; Ketentuan Kupon</h4>
                <div style={{ fontSize: '13px', color: '#334238', lineHeight: '1.6', background: '#f9fbf9', padding: '12px', borderRadius: '10px', border: '1px solid #e1eade' }}>{selectedVoucherSnK.terms}</div>
                <button onClick={() => setSelectedVoucherSnK(null)} style={{ padding: '10px', background: '#163821', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>Mengerti</button>
              </div>
            </div>
          )}

          {/* MENU PILIHAN FOTO PROFIL */}
          {showPhotoMenu && (
            <div onClick={() => setShowPhotoMenu(false)} style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(15, 35, 23, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
              <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: '20px', padding: '24px', width: 'min(320px, 90vw)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', display: 'grid', gap: '12px', textAlign: 'center' }}>
                <h3 style={{ margin: '0 0 8px', color: '#111d14', fontSize: '18px', fontWeight: '800' }}>Foto Profil</h3>
                {avatar && <button onClick={() => { setShowPhotoMenu(false); setViewingPhoto(true); }} style={{ padding: '12px', background: '#edf2ee', border: 'none', borderRadius: '12px', fontWeight: '700', color: '#163821', cursor: 'pointer' }}>👁️ Lihat Foto</button>}
                <button onClick={() => { setShowPhotoMenu(false); fileInputRef.current?.click(); }} style={{ padding: '12px', background: '#163821', border: 'none', borderRadius: '12px', fontWeight: '700', color: '#fff', cursor: 'pointer' }}>📷 Unggah &amp; Sesuaikan Foto Baru</button>
                <button onClick={() => setShowPhotoMenu(false)} style={{ padding: '10px', background: 'transparent', border: 'none', fontWeight: '600', color: '#778279', cursor: 'pointer' }}>Batal</button>
              </div>
            </div>
          )}
          <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileSelect} style={{ display: 'none' }} />

          {/* MODAL LIHAT FOTO PENUH */}
          {viewingPhoto && (
            <div onClick={() => setViewingPhoto(false)} style={{ position: 'fixed', inset: 0, zIndex: 10001, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
              <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
                <button onClick={() => setViewingPhoto(false)} style={{ position: 'absolute', top: -40, right: 0, background: 'transparent', border: 'none', color: '#fff', fontSize: '32px', cursor: 'pointer' }}>&times;</button>
                <img src={avatar} alt="Full Avatar" style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '12px' }} />
              </div>
            </div>
          )}

          {/* MODAL PENYESUAIAN MANUAL */}
          {cropModal && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 10002, background: 'rgba(15, 35, 23, 0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(5px)' }}>
              <div style={{ background: '#fff', borderRadius: '24px', padding: '28px', width: 'min(420px, 94vw)', boxShadow: '0 24px 60px rgba(0,0,0,0.25)', display: 'grid', gap: '20px', textAlign: 'center' }}>
                <h3 style={{ margin: 0, color: '#111d14', fontSize: '18px', fontWeight: '800' }}>Sesuaikan Posisi &amp; Ukuran Foto</h3>
                <div onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} style={{ width: '220px', height: '220px', borderRadius: '50%', margin: '0 auto', overflow: 'hidden', border: '4px solid #163821', position: 'relative', cursor: 'grab', background: '#eee' }}>
                  {tempImage && <img src={tempImage} alt="Crop Preview" style={{ position: 'absolute', transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`, width: '100%', height: '100%', objectFit: 'cover', userSelect: 'none', pointerEvents: 'none' }} />}
                </div>
                <div style={{ display: 'grid', gap: '6px', textAlign: 'left' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#334238' }}>Zoom / Perbesar: {zoom.toFixed(1)}x</label>
                  <input type="range" min="1" max="3" step="0.1" value={zoom} onChange={(e) => setZoom(parseFloat(e.target.value))} style={{ width: '100%', accentColor: '#163821', cursor: 'pointer' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button onClick={() => setCropModal(false)} style={{ padding: '12px', background: '#edf2ee', border: 'none', borderRadius: '12px', fontWeight: '700', color: '#525e56', cursor: 'pointer' }}>Batal</button>
                  <button onClick={handleSaveCrop} style={{ padding: '12px', background: '#163821', border: 'none', borderRadius: '12px', fontWeight: '700', color: '#fff', cursor: 'pointer' }}>Simpan Foto</button>
                </div>
              </div>
            </div>
          )}

          {/* MODAL EDIT PROFIL */}
          {isEditing && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(15, 35, 23, 0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' }}>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ width: 'min(520px, 94vw)', background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)', border: '1px solid #c2d5c5', maxHeight: '90vh', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                  <h3 style={{ margin: 0, color: '#111d14', fontSize: '18px', fontWeight: '800' }}>Edit Informasi Profil</h3>
                  <button type="button" onClick={() => setIsEditing(false)} style={{ background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#525e56' }}>&times;</button>
                </div>

                <form onSubmit={handleSaveProfile} style={{ display: 'grid', gap: '14px' }}>
                  <div style={{ display: 'grid', gap: '5px' }}>
                    <label style={{ fontSize: '12.5px', fontWeight: '700', color: '#334238' }}>Nama Lengkap</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #c2d5c5', fontSize: '13.5px', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'grid', gap: '5px' }}>
                    <label style={{ fontSize: '12.5px', fontWeight: '700', color: '#334238' }}>Nomor Telepon / WhatsApp</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #c2d5c5', fontSize: '13.5px', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'grid', gap: '5px' }}>
                    <label style={{ fontSize: '12.5px', fontWeight: '700', color: '#334238' }}>Email Pengguna (Opsional)</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #c2d5c5', fontSize: '13.5px', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'grid', gap: '5px' }}>
                    <label style={{ fontSize: '12.5px', fontWeight: '700', color: '#334238' }}>Jenis Kelamin</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)} style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #c2d5c5', fontSize: '13.5px', outline: 'none', background: '#fff' }}>
                      <option value="Perempuan">Perempuan</option>
                      <option value="Laki-laki">Laki-laki</option>
                    </select>
                  </div>
                  <div style={{ display: 'grid', gap: '5px' }}>
                    <label style={{ fontSize: '12.5px', fontWeight: '700', color: '#334238' }}>Alamat Lengkap</label>
                    <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows="2" style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #c2d5c5', fontSize: '13.5px', outline: 'none', resize: 'none' }} />
                  </div>
                  <div style={{ display: 'grid', gap: '5px' }}>
                    <label style={{ fontSize: '12.5px', fontWeight: '700', color: '#334238' }}>Peran (Role)</label>
                    <input type="text" value={role} onChange={(e) => setRole(e.target.value)} required style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #c2d5c5', fontSize: '13.5px', outline: 'none' }} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                    <button type="button" onClick={() => setIsEditing(false)} style={{ padding: '10px 18px', background: '#edf2ee', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', color: '#525e56' }}>Batal</button>
                    <button type="submit" style={{ padding: '10px 22px', background: '#163821', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', color: '#fff' }}>Simpan Perubahan</button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}

          {/* Pengaturan Akun */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px 25px', boxShadow: '0 6px 20px rgba(0,0,0,0.05)', border: '1px solid #c2d5c5' }}>
            <h4 style={{ margin: '0 0 18px', fontSize: '12px', color: '#111d14', fontWeight: '800', letterSpacing: '0.08em' }}>PENGATURAN AKUN</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div onClick={() => setIsEditing(true)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', paddingBottom: '14px', borderBottom: '1px solid #f0f4f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '44px', height: '44px', background: '#eaf4eb', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #c2e5cc' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#163821" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: '#111d14' }}>Profil Saya</div>
                    <div style={{ fontSize: '12px', color: '#525e56', fontWeight: '500' }}>Profil lengkap 100%</div>
                  </div>
                </div>
                <span style={{ color: '#88968d', fontSize: '18px', fontWeight: '700' }}>›</span>
              </div>
            </div>
          </div>

          {/* Tombol Pusat Bantuan & Regulasi dan Tombol Keluar / Logout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div 
              onClick={() => setShowRegulasiModal(true)} 
              style={{ background: '#ffffff', borderRadius: '16px', padding: '18px', textAlign: 'center', fontWeight: '800', color: '#111d14', fontSize: '13px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #c2d5c5', letterSpacing: '0.04em' }}
            >
              PUSAT BANTUAN &amp; REGULASI
            </div>
            <div 
              onClick={onLogout} 
              style={{ background: '#fdf2f2', borderRadius: '16px', padding: '18px', textAlign: 'center', fontWeight: '800', color: '#c53030', fontSize: '13px', cursor: 'pointer', border: '1px solid #f9d8d8' }}
            >
              Keluar / Logout Akun
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ marginTop: '30px', background: '#173524', color: '#ffffff', borderTop: '1px solid #244c32' }}
      >
        <div style={{ width: 'min(1420px, calc(100% - 56px))', margin: '0 auto', padding: '42px 0 24px', display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1.15fr', gap: '44px' }}>
          <motion.div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }} whileHover={{ y: -2 }}>
            <motion.div style={{ width: '52px', height: '52px', background: '#ffffff', borderRadius: '50%', padding: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} whileHover={{ scale: 1.04 }}>
              <img src={logoImg} alt="Agri-ICS" style={{ width: "100%", height: "100%", objectFit: 'contain' }} />
            </motion.div>
            <div>
              <div style={{ fontSize: '21px', fontWeight: 800, letterSpacing: '-0.03em' }}>Living <span style={{ color: '#9bd59d' }}>Smart</span></div>
              <div style={{ fontSize: '12px', color: '#b9c8bc', marginTop: '2px' }}>Solusi sayur segar dan sehat</div>
              <p style={{ maxWidth: '350px', margin: '14px 0 0', color: '#b9c8bc', fontSize: '12px', lineHeight: 1.7 }}>
                Menghubungkan teknologi dan pertanian untuk masa depan pangan yang lebih hijau dan berkelanjutan.
              </p>
            </div>
          </motion.div>
          <div>
            <h4 style={{ margin: '0 0 14px', color: '#ffffff', fontSize: '13px', fontWeight: 800 }}>Quick links</h4>
            <motion.a href="#home" whileHover={{ x: 3 }} onClick={(e) => { e.preventDefault(); setPage("home"); }} style={{ display: 'block', margin: '0 0 9px', color: '#b9c8bc', fontSize: '12px', textDecoration: 'none', cursor: 'pointer' }}>Home</motion.a>
            <motion.a href="#dashboard" whileHover={{ x: 3 }} onClick={(e) => { e.preventDefault(); setPage("dashboard"); }} style={{ display: 'block', margin: '0 0 9px', color: '#b9c8bc', fontSize: '12px', textDecoration: 'none', cursor: 'pointer' }}>Dashboard</motion.a>
            <motion.a href="#shop" whileHover={{ x: 3 }} onClick={(e) => { e.preventDefault(); handleMarketplace(); }} style={{ display: 'block', margin: '0 0 9px', color: '#b9c8bc', fontSize: '12px', textDecoration: 'none', cursor: 'pointer' }}>Shop</motion.a>
          </div>
          <div>
            <h4 style={{ margin: '0 0 14px', color: '#ffffff', fontSize: '13px', fontWeight: 800 }}>Shop</h4>
            <motion.a href="#shop" whileHover={{ x: 3 }} onClick={(e) => { e.preventDefault(); handleMarketplace(); }} style={{ display: 'block', margin: '0 0 9px', color: '#b9c8bc', fontSize: '12px', textDecoration: 'none', cursor: 'pointer' }}>All Products</motion.a>
            <motion.a href="#shop" whileHover={{ x: 3 }} onClick={(e) => { e.preventDefault(); handleMarketplace(); }} style={{ display: 'block', margin: '0 0 9px', color: '#b9c8bc', fontSize: '12px', textDecoration: 'none', cursor: 'pointer' }}>Best Seller</motion.a>
            <motion.a href="#shop" whileHover={{ x: 3 }} onClick={(e) => { e.preventDefault(); handleMarketplace(); }} style={{ display: 'block', margin: '0 0 9px', color: '#b9c8bc', fontSize: '12px', textDecoration: 'none', cursor: 'pointer' }}>Promo</motion.a>
          </div>
          <div>
            <h4 style={{ margin: '0 0 14px', color: '#ffffff', fontSize: '13px', fontWeight: 800 }}>Contact Us</h4>
            <div style={{ color: '#b9c8bc', fontSize: '12px', marginBottom: '9px' }}>📍 Gisting, Tanggamus</div>
            <div style={{ color: '#b9c8bc', fontSize: '12px', marginBottom: '9px' }}>📞 +62 812 3456 7890</div>
            <div style={{ color: '#b9c8bc', fontSize: '12px', marginBottom: '9px' }}>✉️ Livingmart@gmail.com</div>
          </div>
        </div>
        <div style={{ marginTop: 32, paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.08)", textAlign: "center", color: "rgba(255,255,255,0.32)", fontSize: 11 }}>
          Smart Agriculture • IoT • LivingLab
        </div>
      </motion.footer>
    </motion.div>
  );
}