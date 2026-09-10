import React from 'react';
import "../index.css";

export default function ProfilePage({ setPage, user, onLogout }) {
  if (!user) {
    return (
      <div className="landing-container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Silakan login terlebih dahulu.</h2>
        <button className="btn-primary-auth" onClick={() => setPage('auth')} style={{ marginTop: '20px', width: '200px' }}>
          Ke Halaman Login
        </button>
      </div>
    );
  }

  return (
    <div className="landing-container">
      {/* Topbar */}
      <header className="topbar">
        <div className="logo" onClick={() => setPage('home')} style={{ cursor: 'pointer' }}>
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
        <div className="actions">
          <div className="action-item" onClick={() => setPage('shop')} style={{ cursor: 'pointer' }}>
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
            </div>
            <div className="label"><small>My cart</small><strong>Rp.0</strong></div>
          </div>
        </div>
      </header>

      {/* Konten Menu Profil */}
      <section className="profile-section">
        <div className="profile-card">
          <div className="profile-header-bg"></div>
          <div className="profile-user-info">
            <img src={user.avatar} alt="User Avatar" className="profile-avatar-img" />
            <h2>{user.name}</h2>
            <span className="profile-role-badge">{user.role}</span>
            <p className="profile-email">{user.email}</p>
          </div>

          <div className="profile-menu-list">
            <div className="profile-menu-item" onClick={() => setPage('home')}>🏠 Beranda Utama</div>
            <div className="profile-menu-item" onClick={() => setPage('shop')}>🛒 Belanja Produk Shop</div>
            <div className="profile-menu-item" onClick={() => setPage('dashboard')}>📊 Dashboard IoT Greenhouse</div>
            <div className="profile-menu-item logout-btn" onClick={onLogout}>🚪 Keluar / Logout Akun</div>
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}