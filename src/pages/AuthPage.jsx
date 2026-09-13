import React, { useState } from 'react';
import "../index.css";

export default function AuthPage({ setPage, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState('Petani / Mitra');
  
  // State untuk form input profile / auth
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [addressInput, setAddressInput] = useState('');

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    
    const dummyUser = {
      name: nameInput ? nameInput : (isLogin ? "Anis Setiawati" : "Pengguna Baru Living Smart"),
      email: emailInput ? emailInput : "livingmart@gmail.com",
      phone: phoneInput ? phoneInput : "+62 812-3456-7890",
      address: addressInput ? addressInput : "Kec. Gisting, Tanggamus, Lampung",
      role: selectedRole,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    };

    if (onLoginSuccess) {
      onLoginSuccess(dummyUser);
    } else {
      setPage('home');
    }
  };

  return (
    <div className="landing-container">
      {/* Top bar minimalis */}
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

      {/* Konten Utama Form Auth & Profile */}
      <section className="auth-hero-section">
        <h1 className="auth-main-title">{isLogin ? 'MASUK KE AKUN ANDA' : 'LENGKAPI PROFILE ANDA'}</h1>

        <div className="auth-card-container">
          {/* Tab Pilihan Masuk / Daftar Baru */}
          <div className="auth-tabs">
            <button 
              className={`auth-tab-btn ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              MASUK
            </button>
            <button 
              className={`auth-tab-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              DAFTAR & PROFILE
            </button>
          </div>

          {/* Form Input Sesuai Referensi Desain Profile */}
          <form onSubmit={handleAuthSubmit} className="auth-form-box">
            {!isLogin && (
              <>
                <div className="profile-photo-upload-row" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div className="profile-preview-circle" style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#eef7f0', border: '2px solid #2F7041', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="Avatar Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#173524', marginBottom: '4px' }}>FOTO PROFILE</label>
                    <input type="file" accept="image/*" style={{ fontSize: '11px', color: '#5D6D63' }} />
                  </div>
                </div>

                <div className="form-group">
                  <label>Nama Lengkap</label>
                  <input 
                    type="text" 
                    placeholder="Masukkan nama lengkap..." 
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    required 
                  />
                </div>

                <div className="form-group">
                  <label>Nomor WhatsApp</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: 081234567890" 
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    required 
                  />
                </div>

                <div className="form-group">
                  <label>Alamat Domisili</label>
                  <input 
                    type="text" 
                    placeholder="Masukkan alamat lengkap..." 
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    required 
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label>Email / Akun</label>
              <input 
                type="text" 
                placeholder="Masukkan email atau nomor..." 
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required 
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>Role / Peran Pengguna</label>
                <div className="role-radio-grid" style={{ display: 'flex', gap: '16px', marginTop: '6px' }}>
                  {[
                    'Petani / Mitra',
                    'Konsumen',
                  ].map((role, idx) => (
                    <label className="radio-label" key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#173524' }}>
                      <input 
                        type="radio" 
                        name="userRole" 
                        checked={selectedRole === role} 
                        onChange={() => setSelectedRole(role)} 
                      />
                      <span>{role}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Kata Sandi</label>
              <input type="password" placeholder="Masukkan kata sandi..." required />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>Ulangi Kata Sandi</label>
                <input type="password" placeholder="Ulangi kata sandi..." required />
              </div>
            )}

            <div className="auth-options-row">
              {isLogin && (
                <>
                  <label className="remember-me">
                    <input type="checkbox" /> Ingat saya
                  </label>
                  <a href="#forgot" onClick={(e) => e.preventDefault()} className="forgot-link">Lupa Sandi?</a>
                </>
              )}
            </div>

            <div className="auth-buttons-grid">
              <button type="submit" className="btn-primary-auth">
                {isLogin ? 'Masuk ke Akun →' : 'Simpan & Lanjutkan →'}
              </button>
              <button 
                type="button" 
                className="btn-google-auth" 
                onClick={handleAuthSubmit}
              >
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.95H1.2v3.15C3.18 21.32 7.24 24 12 24z"/><path fill="#FBBC05" d="M5.28 14.25c-.25-.72-.38-1.49-.38-2.25s.13-1.53.38-2.25V6.6H1.2C.43 8.15 0 9.92 0 12s.43 3.85 1.2 5.4l4.08-3.15z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.24 0 3.18 2.68 1.2 6.6l4.08 3.15c.95-2.84 3.6-4.95 6.72-4.95z"/></svg>
                Masuk ke Google
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer Hijau Tua */}
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
