import React, { useState } from 'react';
import "../index.css";

import logoImg from '../assets/logo.svg';
import pakcoyImg from '../assets/pakcoi (1).png';
import seladaImg from '../assets/selada keriting.png';
import bayamImg from '../assets/bayam.png';
import tomatImg from '../assets/tomat ceri.png';
import heroImg from '../assets/sayurr.png';

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

export default function ShopPage({ setPage, user }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filterCategory, setFilterCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState("terbaru");
  const [cart, setCart] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const [pendingProduct, setPendingProduct] = useState(null);
  const [pendingQty, setPendingQty] = useState(1);

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
      img: seladaImg,
      plantedDate: "N/A",
      harvestDate: "N/A",
      duration: "Siap Pakai",
      greenhouse: "Gudang Logistik",
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
      img: tomatImg,
      plantedDate: "N/A",
      harvestDate: "N/A",
      duration: "Awet & Tahan Lama",
      greenhouse: "Gudang Logistik",
      description: "Netpot hitam bertingkat ukuran standar untuk sirkulasi akar."
    },
    { 
      name: "AB MIX", 
      category: "Nutrisi", 
      price: "Rp. 75.000", 
      img: pakcoyImg,
      plantedDate: "N/A",
      harvestDate: "N/A",
      duration: "Formula Premium",
      greenhouse: "Laboratorium Nutrisi",
      description: "Nutrisi hidroponik lengkap unsur hara makro dan mikro."
    },
  ];

  const allProductsList = [
    { name: "Pokcoy", category: "Sayuran", price: "Rp. 15.000", img: pakcoyImg, plantedDate: "10 Mei 2026", harvestDate: "7 Juni 2026", duration: "28 Hari", greenhouse: "GH-01", description: "Pokcoy hidroponik segar." },
    { name: "Selada keriting", category: "Sayuran", price: "Rp. 18.000", img: seladaImg, plantedDate: "12 Mei 2026", harvestDate: "8 Juni 2026", duration: "30 Hari", greenhouse: "GH-02", description: "Selada keriting renyah." },
    { name: "Bayam", category: "Sayuran", price: "Rp. 9.000", img: bayamImg, plantedDate: "15 Mei 2026", harvestDate: "5 Juni 2026", duration: "21 Hari", greenhouse: "GH-02", description: "Bayam hijau segar." },
    { name: "Tomat Ceri", category: "Sayuran", price: "Rp. 17.000", img: tomatImg, plantedDate: "1 April 2026", harvestDate: "1 Juni 2026", duration: "60 Hari", greenhouse: "GH-03", description: "Tomat ceri manis bernutrisi." },
    { name: "Rockwool cubes", category: "Media Tanam", price: "Rp. 35.000", img: seladaImg, plantedDate: "N/A", harvestDate: "N/A", duration: "Siap Pakai", greenhouse: "Gudang Logistik", description: "Media tanam rockwool." },
    { name: "Netpot Hidroponik", category: "Media Tanam", price: "Rp. 5.000", img: tomatImg, plantedDate: "N/A", harvestDate: "N/A", duration: "Awet", greenhouse: "Gudang Logistik", description: "Netpot hitam berkualitas." },
    { name: "Sekam Bakar", category: "Media Tanam", price: "Rp. 12.000", img: bayamImg, plantedDate: "N/A", harvestDate: "N/A", duration: "Steril", greenhouse: "Gudang Logistik", description: "Sekam bakar steril untuk campuran media." },
    { name: "AB Mix Sayur Daun", category: "Nutrisi", price: "Rp. 45.000", img: pakcoyImg, plantedDate: "N/A", harvestDate: "N/A", duration: "1 Liter", greenhouse: "Lab Nutrisi", description: "Pekatan nutrisi AB Mix khusus sayur daun." },
    { name: "AB Mix Buah", category: "Nutrisi", price: "Rp. 50.000", img: tomatImg, plantedDate: "N/A", harvestDate: "N/A", duration: "1 Liter", greenhouse: "Lab Nutrisi", description: "Pekatan nutrisi khusus tanaman buah." },
    { name: "Benih Pokcoy Unggul", category: "Benih", price: "Rp. 8.000", img: pakcoyImg, plantedDate: "N/A", harvestDate: "N/A", duration: "Daya Tumbuh 95%", greenhouse: "Lab Benih", description: "Benih pokcoy pilihan tahan penyakit." },
    { name: "Benih Selada", category: "Benih", price: "Rp. 10.000", img: seladaImg, plantedDate: "N/A", harvestDate: "N/A", duration: "Daya Tumbuh 90%", greenhouse: "Lab Benih", description: "Benih selada keriting lebat." },
    { name: "Benih Tomat Ceri", category: "Benih", price: "Rp. 15.000", img: tomatImg, plantedDate: "N/A", harvestDate: "N/A", duration: "Daya Tumbuh 92%", greenhouse: "Lab Benih", description: "Benih tomat ceri hibrida." },
  ];

  // Logika Filter Kategori dan Sorting Harga/Terbaru
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

  return (
    <div className="landing-container">
      <style>{`
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

      {/* Area Pemicu Navbar Perbatasan */}
      <div className="navbar-trigger-area">
        <nav className="navbar">
          <a href="#home" onClick={(e) => { e.preventDefault(); setPage('home'); }}>Home</a>
          <a href="#shop" onClick={(e) => { e.preventDefault(); setPage('shop'); }} className="active">Shop</a>
          <a href="#dashboard" onClick={(e) => { e.preventDefault(); setPage('dashboard'); }}>Dashboard</a>
        </nav>
      </div>

      {/* Hero / Banner Shop */}
      <section className="hero shop-landing-hero">
        <div className="hero-content">
          <h1>SHOP<br />Kebutuhan Hidroponik Terbaik</h1>
          <p>Temukan berbagai kebutuhan greenhouse, sayuran segar, media tanam, dan nutrisi hidroponik dengan kualitas terbaik langsung dari kebun.</p>
        </div>

        <div className="hero-visual">
          <div className="basket">
            <img src={heroImg} alt="Foto etalase produk shop" className="floating-img" />
          </div>
        </div>
      </section>

      {/* Kategori Bar */}
      <section className="shop-categories-bar">
        {[
          { name: "Sayuran", label: "Sayuran" },
          { name: "Media Tanam", label: "Media Tanam" },
          { name: "Nutrisi", label: "Nutrisi" },
          { name: "Benih", label: "Benih" },
        ].map((cat, idx) => (
          <div 
            className={`shop-cat-item ${filterCategory === cat.name ? 'active' : ''}`} 
            key={idx}
            onClick={() => setFilterCategory(cat.name)}
            style={{ cursor: 'pointer' }}
          >
            <div className="cat-icon-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="#2f8f4e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/><path d="M9 12l2 2 4-4"/></svg>
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
            <svg viewBox="0 0 24 24" fill="none" stroke="#2f8f4e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/><path d="M9 12l2 2 4-4"/></svg>
          </div>
          <div>
            <h3>Produk Berkualitas</h3>
            <p>Dijamin original &amp; terbaik</p>
          </div>
        </div>

        <div className="service-feature-item">
          <div className="service-icon-circle">
            <svg viewBox="0 0 24 24" fill="none" stroke="#2f8f4e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/><path d="M9 12l2 2 4-4"/></svg>
          </div>
          <div>
            <h3>Pengiriman Cepat</h3>
            <p>Tepat Waktu sampai tujuan</p>
          </div>
        </div>

        <div className="service-feature-item">
          <div className="service-icon-circle">
            <svg viewBox="0 0 24 24" fill="none" stroke="#2f8f4e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/><path d="M9 12l2 2 4-4"/></svg>
          </div>
          <div>
            <h3>Pembayaran Aman</h3>
            <p>Transaksi Mudah &amp; aman</p>
          </div>
        </div>
      </section>

      {/* FOOTER HIJAU TUA */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div
              className="footer-brand-icon"
              style={{
                padding: 0,
                border: "none",
                outline: "none",
                boxShadow: "none",
                background: "transparent",
                overflow: "visible",
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
            <div>
              <div className="name">AGRI-ICS</div>
              <div className="tag">Solusi sayur segar dan sehat</div>
              <p className="desc">Menghubungkan teknologi dan pertanian untuk masa depan pangan yang lebih hijau dan berkelanjutan.</p>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick links</h4>
            <a href="#home" onClick={(e) => { e.preventDefault(); setPage('home'); }}>Home</a>
            <a href="#dashboard" onClick={(e) => { e.preventDefault(); setPage('dashboard'); }}>Dashboard</a>
            <a href="#shop" onClick={(e) => { e.preventDefault(); setPage('shop'); }}>Shop</a>
          </div>

          <div className="footer-col">
            <h4>Shop</h4>
            <a href="#shop" onClick={(e) => { e.preventDefault(); setPage('shop'); }}>All Products</a>
            <a href="#shop" onClick={(e) => { e.preventDefault(); setPage('shop'); }}>Best Seller</a>
            <a href="#shop" onClick={(e) => { e.preventDefault(); setPage('shop'); }}>Promo</a>
          </div>

          <div className="footer-col">
            <h4>Information</h4>
            <a href="#faq">FAQ</a>
            <a href="#terms">Terms &amp; Conditions</a>
            <a href="#privacy">Privacy Policy</a>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <div className="footer-contact-item">📍 Gisting, Tanggamus</div>
            <div className="footer-contact-item">📞 +62 812 3456 7890</div>
            <div className="footer-contact-item">✉️ Livingmart@gmail.com</div>
          </div>
        </div>
      </footer>

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

                        <strong style={{ color: "#1b6d3e", fontSize: 13 }}>
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
            style={{
              width: "min(520px, 94vw)",
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
                {activePanel === "checkout" && "Checkout"}
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
                <div style={{ fontSize: 42, marginBottom: 10 }}>📦</div>
                <strong style={{ display: "block", color: "#173524", marginBottom: 6 }}>Belum ada pesanan</strong>
                <span>Pesanan yang sudah checkout akan muncul di sini.</span>
              </div>
            )}

            {activePanel === "checkout" && (
              <div>
                <div style={{ display: "grid", gap: 10, marginBottom: 18 }}>
                  {cartItems.map((item) => (
                    <div key={item.name} style={{ display: "flex", justifyContent: "space-between", gap: 12, paddingBottom: 10, borderBottom: "1px solid #edf1ed" }}>
                      <span>{item.name} × {item.qty}</span>
                      <strong>{formatRupiah((parseInt(item.price.replace(/[^0-9]/g, ""), 10) || 0) * item.qty)}</strong>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: "#173524", marginBottom: 18 }}>
                  <strong>Total Pembayaran</strong>
                  <strong>{formatRupiah(cartTotal)}</strong>
                </div>

                <div style={{ display: "grid", gap: 10 }}>
                  <input
                    placeholder="Alamat pengiriman"
                    style={{ width: "100%", boxSizing: "border-box", padding: 12, border: "1px solid #dce5de", borderRadius: 10 }}
                  />
                  <select style={{ width: "100%", padding: 12, border: "1px solid #dce5de", borderRadius: 10, background: "#fff" }}>
                    <option>Pilih metode pembayaran</option>
                    <option>Saldo AGRI-ICS</option>
                    <option>Transfer Bank</option>
                    <option>QRIS</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      setCart({});
                      setActivePanel("orders");
                    }}
                    style={{
                      width: "100%",
                      padding: 13,
                      border: "none",
                      borderRadius: 11,
                      background: "#176137",
                      color: "#fff",
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    Buat Pesanan
                  </button>
                </div>
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

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 10, marginTop: 18 }}>
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
                <span className="modal-category">{selectedProduct.category || "Produk Greenhouse"}</span>
                <h2>{selectedProduct.name}</h2>
                <div className="modal-price">{selectedProduct.price}</div>
                <p className="modal-desc">{selectedProduct.description}</p>

                <div className="spec-box">
                  <div className="spec-item">
                    <span>📅 Tanggal Tanam:</span>
                    <strong>{selectedProduct.plantedDate}</strong>
                  </div>
                  <div className="spec-item">
                    <span>🌾 Tanggal Panen:</span>
                    <strong>{selectedProduct.harvestDate}</strong>
                  </div>
                  <div className="spec-item">
                    <span>⏱️ Masa Tanam:</span>
                    <strong>{selectedProduct.duration}</strong>
                  </div>
                  <div className="spec-item">
                    <span>📍 Lokasi Lahan:</span>
                    <strong>{selectedProduct.greenhouse}</strong>
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
    </div>
  );
}