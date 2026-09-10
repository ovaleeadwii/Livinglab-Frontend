import React from 'react';
import "../index.css";

export default function DashboardPage({ setPage }) {
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
          <input type="text" placeholder="Cari data sensor, greenhouse..." />
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
          <a href="#shop" onClick={(e) => { e.preventDefault(); setPage('shop'); }}>Shop</a>
          <a href="#dashboard" onClick={(e) => { e.preventDefault(); setPage('dashboard'); }} className="active">Dashboard</a>
        </nav>
      </div>

      {/* Konten Dashboard */}
      <section className="hero shop-hero">
        <div className="hero-content">
          <h1>DASHBOARD</h1>
          <p>Pemantauan suhu, kelembapan, dan status nutrisi greenhouse secara real-time.</p>
        </div>
      </section>
    </div>
  );
}