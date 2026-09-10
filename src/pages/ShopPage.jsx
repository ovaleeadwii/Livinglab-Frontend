import React, { useState } from 'react';
import "../index.css";

import pakcoyImg from '../assets/pakcoi (1).png';
import seladaImg from '../assets/selada keriting.png';
import bayamImg from '../assets/bayam.png';
import tomatImg from '../assets/tomat ceri.png';
import heroImg from '../assets/sayurr.png';

function ProductCard({ item, onSelectProduct }) {
  const [qty, setQty] = useState(0);

  const handleAdd = (e) => {
    e.stopPropagation();
    setQty(prev => prev + 1);
  };
  
  const handleMinus = (e) => {
    e.stopPropagation();
    setQty(prev => (prev > 0 ? prev - 1 : 0));
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
            <svg viewBox="0 0 24 24" fill="none" stroke="#2f8f4e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
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

export default function ShopPage({ setPage }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filterCategory, setFilterCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState("terbaru");

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
    // Mengubah format string "Rp. 15.000" menjadi angka murni (15000) untuk perbandingan
    const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
    const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));

    if (sortBy === "termurah") {
      return priceA - priceB; // Dari yang paling murah ke mahal
    } else if (sortBy === "termahal") {
      return priceB - priceA; // Dari yang paling mahal ke murah
    } else {
      return 0; // Default / Terbaru
    }
  });

  return (
    <div className="landing-container">
      {/* Top bar */}
      <header className="topbar">
        <div className="logo">
          <div className="logo-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="#2f8f4e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2c-4 3-6 6-6 10a6 6 0 0 0 12 0c0-4-2-7-6-10z"/>
            </svg>
          </div>
          <div className="logo-text">
            <div className="main">Living <span>Smart</span></div>
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
          <div className="action-item">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>
            </div>
            <div className="label"><small>Sign in / Register</small><strong>My Account</strong></div>
          </div>
          <div className="action-item">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
            </div>
            <div className="label"><small>My cart</small><strong>Rp.0</strong></div>
          </div>
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
      {/* Hero / Banner Shop ala Landing Page */}
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
            <ProductCard item={item} key={idx} onSelectProduct={setSelectedProduct} />
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
            <ProductCard item={item} key={idx} onSelectProduct={setSelectedProduct} />
          ))}
        </div>
      </section>

      {/* BANNER LAYANAN (SEPERTI DI GAMBAR REFERENSI) */}
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
      {/* FOOTER HIJAU TUA */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand-icon">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l9 7h-2v10h-5v-6H10v6H5V10H3z"/><path d="M12 9c-1.5-2-4-2-4 0 1.5 0 3 .5 4 2"/></svg>
            </div>
            <div>
              <div className="name">Living Smart</div>
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