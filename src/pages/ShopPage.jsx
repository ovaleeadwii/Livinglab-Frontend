import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  const [filterCategory, setFilterCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState("terbaru");
  const [cart, setCart] = useState({});
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

  const bestSellers = [
    { 
      name: "Pokcoy", 
      category: "Sayuran", 
      price: "Rp. 15.000", 
      img: pakcoyImg,
      plantedDate: "10 Mei 2026",
      harvestDate: "7 Juni 2026",
      duration: "28 Hari",
      greenhouse: "Greenhouse Utama Gisting (GH-01)",
      description: "Pokcoy hidroponik segar dengan sistem NFT (Nutrient Film Technique). Dipetik langsung saat pagi hari."
    },
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
      name: "Bayam", 
      category: "Sayuran", 
      price: "Rp. 9.000", 
      img: bayamImg,
      plantedDate: "15 Mei 2026",
      harvestDate: "5 Juni 2026",
      duration: "21 Hari",
      greenhouse: "Greenhouse Gisting (GH-02)",
      description: "Bayam hijau segar kaya nutrisi tanpa pestisida kimia."
    },
    { 
      name: "Netpot", 
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
  ];

  const allProductsList = [
    { name: "Pokcoy", category: "Sayuran", price: "Rp. 15.000", img: pakcoyImg, plantedDate: "10 Mei 2026", harvestDate: "7 Juni 2026", duration: "28 Hari", greenhouse: "GH-01", description: "Pokcoy hidroponik segar." },
    { name: "Selada keriting", category: "Sayuran", price: "Rp. 18.000", img: seladaImg, plantedDate: "12 Mei 2026", harvestDate: "8 Juni 2026", duration: "30 Hari", greenhouse: "GH-02", description: "Selada keriting renyah." },
    { name: "Bayam", category: "Sayuran", price: "Rp. 9.000", img: bayamImg, plantedDate: "15 Mei 2026", harvestDate: "5 Juni 2026", duration: "21 Hari", greenhouse: "GH-02", description: "Bayam hijau segar." },
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
      description: "Netpot hitam berkualitas untuk sirkulasi akar." 
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
      name: "Benih Pokcoy Unggul", 
      category: "Benih", 
      price: "Rp. 8.000", 
      img: benihpakcoyImg, 
      spec1: "Daya Tumbuh >95%", 
      spec2: "Sertifikat Benih Unggul", 
      spec3: "Kemasan Sealed Pack", 
      spec4: "Lab Benih", 
      description: "Benih pokcoy pilihan tahan penyakit." 
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

  const filteredProducts = allProductsList.filter(item => {
    if (filterCategory === "Semua") return true;
    return item.category.toLowerCase() === filterCategory.toLowerCase();
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
        * { box-sizing: border-box; }

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
        .shop-page-responsive .service-features-banner,
        .shop-page-responsive .footer {
          width: 100%;
          max-width: 1320px;
          margin-left: auto;
          margin-right: auto;
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

        <div className="search">
          <input type="text" placeholder="Search for products, hydroponics, recipes..." />
          <div className="cat">All Categories
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5c6b60" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
          </div>
          <button aria-label="Cari">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          </button>
        </div>

        <div className="actions">
          <div
            className="action-item"
            onClick={() => {
              if (user) {
                setPage("profile");
              } else {
                setPage("auth");
              }
            }}
            style={{ cursor: "pointer" }}
          >
            <div
              className="icon"
              style={
                user
                  ? {
                      overflow: "hidden",
                      borderRadius: "50%",
                      width: "38px",
                      height: "38px",
                    }
                  : {}
              }
            >
              {user && user.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4"/>
                  <path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>
                </svg>
              )}
            </div>
            <div className="label">
              <small>{user ? user.role || "Member" : "Sign in / Register"}</small>
              <strong>{user ? user.name : "My Account"}</strong>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label="Buka keranjang"
            style={{
              border: "none",
              background: "transparent",
              padding: 0,
              margin: 0,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="action-item" style={{ position: "relative" }}>
              <div className="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>
                </svg>
              </div>
              <div className="label">
                <small>My cart</small>
                <strong>{formatRupiah(cartTotal)}</strong>
              </div>
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -7,
                    left: 28,
                    minWidth: 21,
                    height: 21,
                    padding: "0 5px",
                    borderRadius: 999,
                    background: "#1f7a45",
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid #fff",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </div>
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Buka menu"
            style={{
              width: 44,
              height: 44,
              border: "none",
              borderRadius: 12,
              background: "#eef7f0",
              color: "#165c35",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              marginLeft: 2,
            }}
          >
            <svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
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
        </div>
      </section>

      {/* Kategori Bar */}
      <section className="shop-categories-bar">
        {[
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
        ].map((cat, idx) => (
          <div 
            className={`shop-cat-item ${filterCategory === cat.name ? 'active' : ''}`} 
            key={idx}
            onClick={() => setFilterCategory(cat.name)}
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

      {/* Section Best Seller */}
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
              onSelectProduct={setSelectedProduct}
            />
          ))}
        </div>
      </section>

      {/* Section Semua Produk */}
      <section className="all-products-section">
        <div className="all-products-header">
          <h2>Semua Produk</h2>
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
          {filteredProducts.map((item, idx) => (
            <ProductCard
              item={item}
              key={idx}
              qty={cart[item.name]?.qty || 0}
              onRequestAdd={requestAddToCart}
              onAddToCart={addToCart}
              onRemoveFromCart={removeFromCart}
              onSelectProduct={setSelectedProduct}
            />
          ))}
        </div>
      </section>

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
                <span>🛒</span><span>Keranjang ({cartCount})</span>
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

      {/* MODAL SPESIFIKASI PRODUK */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>&times;</button>
            
            <div className="modal-grid">
              <div className="modal-img-box">
                <img src={selectedProduct.img} alt={selectedProduct.name} />
              </div>
              <div className="modal-info">
                <span className="modal-category">{selectedPluginCategoryFallback(selectedProduct)}</span>
                <h2>{selectedProduct.name}</h2>
                <div className="modal-price">{selectedProduct.price}</div>
                <p className="modal-desc">{selectedProduct.description}</p>

                <div className="spec-box">
                  <div className="spec-item">
                    <span>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: '-2px', marginRight: '6px' }}>
                        {selectedProduct.category === "Sayuran" ? (
                          <>
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                          </>
                        ) : (
                          <>
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                          </>
                        )}
                      </svg>
                      {selectedProduct.category === "Sayuran" ? "Tanggal Tanam:" : "Spesifikasi Utama:"}
                    </span>
                    <strong>{selectedProduct.category === "Sayuran" ? selectedProduct.plantedDate : selectedProduct.spec1}</strong>
                  </div>

                  <div className="spec-item">
                    <span>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: '-2px', marginRight: '6px' }}>
                        {selectedProduct.category === "Sayuran" ? (
                          <>
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H2v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
                            <path d="M6 6h10M6 10h10"/>
                          </>
                        ) : (
                          <>
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                          </>
                        )}
                      </svg>
                      {selectedProduct.category === "Sayuran" ? "Tanggal Panen:" : "Kualitas / Sertifikasi:"}
                    </span>
                    <strong>{selectedProduct.category === "Sayuran" ? selectedProduct.harvestDate : selectedProduct.spec2}</strong>
                  </div>

                  <div className="spec-item">
                    <span>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: '-2px', marginRight: '6px' }}>
                        {selectedProduct.category === "Sayuran" ? (
                          <>
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                          </>
                        ) : (
                          <>
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                          </>
                        )}
                      </svg>
                      {selectedProduct.category === "Sayuran" ? "Masa Tanam:" : "Karakteristik:"}
                    </span>
                    <strong>{selectedProduct.category === "Sayuran" ? selectedProduct.duration : selectedProduct.spec3}</strong>
                  </div>

                  <div className="spec-item">
                    <span>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: '-2px', marginRight: '6px' }}>
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      {selectedProduct.category === "Sayuran" ? "Lokasi Lahan:" : "Lokasi Penyimpanan:"}
                    </span>
                    <strong>{selectedProduct.category === "Sayuran" ? selectedProduct.greenhouse : selectedProduct.spec4}</strong>
                  </div>
                </div>

                <button className="modal-action-btn" onClick={() => setSelectedProduct(null)}>
                  Tutup & Kembali Belanja
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}