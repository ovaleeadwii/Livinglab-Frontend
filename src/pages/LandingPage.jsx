import React, { useState } from 'react';
import "../index.css";

import heroImg from '../assets/yang baru lagi.png';
import pakcoyImg from '../assets/pakcoi (1).png';
import seladaImg from '../assets/selada keriting.png';
import bayamImg from '../assets/bayam.png';
import tomatImg from '../assets/tomat ceri.png';
import avatarImg from '../assets/foto orang.jpg';

export default function LandingPage({ setPage, user }) {
  const productsList = [
    { name: "Pokcoy", price: "Rp. 15.000", img: pakcoyImg },
    { name: "Selada keriting", price: "Rp. 18.000", img: seladaImg },
    { name: "Bayam", price: "Rp. 9.000", img: bayamImg },
    { name: "Tomat Ceri", price: "Rp. 17.000", img: tomatImg },
  ];

  const [activeIndex, setActiveIndex] = useState(1);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? productsList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === productsList.length - 1 ? 0 : prev + 1));
  };

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
            <div className="main">AGRI- <span>ICS</span></div>
            <div className="tag">Hidup sehat, mulai dari kebun</div>
          </div>
        </div>

        <div className="search">
          <input type="text" placeholder="Cari produk, hidroponik, greenhouse..." />
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
                setPage('profile'); 
              } else {
                setPage('auth');    
              }
            }} 
            style={{ cursor: 'pointer' }}
          >
            <div className="icon" style={user ? { overflow: 'hidden', borderRadius: '50%', width: '38px', height: '38px' } : {}}>
              {user && user.avatar ? (
                <img src={user.avatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>
              )}
            </div>
            <div className="label">
              <small>{user ? user.role || 'Member' : 'Sign in / Register'}</small>
              <strong>{user ? user.name : 'My Account'}</strong>
            </div>
          </div>

          <div className="action-item">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
            </div>
            <div className="label"><small>My cart</small><strong>Rp.0</strong></div>
          </div>
        </div>
      </header>

      {/* Area Pemicu Navbar Perbatasan (Auto-hide & Simetris) */}
      <div className="navbar-trigger-area">
        <nav className="navbar">
          <a href="#home" onClick={(e) => { e.preventDefault(); setPage('home'); }} className="active">Home</a>
          <a href="#shop" onClick={(e) => { e.preventDefault(); setPage('shop'); }}>Shop</a>
          <a href="#dashboard" onClick={(e) => { e.preventDefault(); setPage('dashboard'); }}>Dashboard</a>
        </nav>
      </div>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>HYDRO-PERFECTION<br />Kualitas Terbaik dari Gisting</h1>
          <p>Dibudidayakan dengan penuh ketelitian di greenhouse canggih kami di Gisting. Dari kebun kami, langsung ke meja Anda.</p>
          <div className="hero-buttons">
            <button onClick={() => setPage('shop')} className="btn btn-primary">SHOP NOW
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
            <button onClick={() => setPage('dashboard')} className="btn btn-secondary">EXPLORE DASHBOARD</button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="basket">
            <img src={heroImg} alt="Foto hasil panen sayur segar" className="floating-img" />
          </div>
        </div>
      </section>

      {/* Fitur Utama */}
      <section className="features">
        <div className="features-head">
          <h2>Fitur Utama Kami</h2>
          <p>Tiga hal yang membuat kebun kami berbeda — dari sensor di lahan sampai ke meja makan Anda.</p>
        </div>

        <div className="features-row">
          <div className="feature-item is-live">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 17l5-5 3 3 6-7"/><path d="M14 8h4v4"/>
            </svg>
            <h3><span className="live-dot"></span>Realtime Monitoring</h3>
            <p>Suhu, kelembapan, dan nutrisi greenhouse terpantau dari sensor IoT yang menyala 24/7, bukan cuma estimasi.</p>
          </div>

          <div className="feature-item">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h2l2.2 11a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L21 8H7"/><circle cx="10" cy="20" r="1.3"/><circle cx="17" cy="20" r="1.3"/>
            </svg>
            <h3>Online Marketplace</h3>
            <p>Hasil panen hari itu langsung bisa dipesan, tanpa lewat gudang atau pengepul — dipetik lalu dikirim.</p>
          </div>

          <div className="feature-item">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>
            </svg>
            <h3>AI Agent</h3>
            <p>Cukup ceritakan kebutuhan sayurmu, sistem akan menyesuaikan rekomendasi dari data panen yang tersedia.</p>
          </div>
        </div>
      </section>

      {/* Produk Unggulan (Carousel 3D) */}
      <section className="products-carousel-section">
        <div className="products-head-center">
          <span className="sub-title">GALLERY</span>
          <h2>Produk Unggulan</h2>
          <p>Hasil panen terbaik dari greenhouse kami, langsung dipetik untuk Anda.</p>
        </div>

        <div className="carousel-container">
          <div className="carousel-track">
            {productsList.map((prod, idx) => {
              let position = 'carousel-item-hidden';
              if (idx === activeIndex) {
                position = 'carousel-item-active';
              } else if (
                idx === (activeIndex - 1 + productsList.length) % productsList.length
              ) {
                position = 'carousel-item-left';
              } else if (idx === (activeIndex + 1) % productsList.length) {
                position = 'carousel-item-right';
              }

              return (
                <div className={`product-card-3d ${position}`} key={idx} onClick={() => setActiveIndex(idx)}>
                  <div className="product-photo">
                    <img src={prod.img} alt={prod.name} />
                  </div>
                  <div className="product-info">
                    <div>
                      <div className="name">{prod.name}</div>
                      <div className="price">{prod.price}</div>
                    </div>
                    <button className="cart-btn" aria-label="Tambah ke keranjang">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="carousel-nav-buttons">
            <button className="carousel-arrow" onClick={handlePrev} aria-label="Sebelumnya">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <button className="carousel-arrow" onClick={handleNext} aria-label="Berikutnya">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* Statistik + Testimoni Minimalis Tipis */}
      <section className="highlights-section">
        <div className="highlights-container-slim">
          <div className="stats-slim-bar">
            <div className="stat-slim-item">
              <strong>1Jt+</strong> <span>Produk terjual</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-slim-item">
              <strong>5</strong> <span>Greenhouse aktif</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-slim-item">
              <strong>99%</strong> <span>Kepuasan pelanggan</span>
            </div>
          </div>

          <div className="testimonial-slim-bar">
            <div className="testimonial-slim-content">
              <img src={avatarImg} alt="Mas Tofar" className="slim-avatar" />
              <p>
                "Keren banget bisa tau greenhouse mana yang ada stok, terus sayurnya segar-segar banget!" 
                <span className="slim-author">— Mas Tofar</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
}