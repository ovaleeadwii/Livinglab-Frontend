import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import "../index.css";

import logoImg from "../assets/logo.svg";

export default function AuthPage({ setPage, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState('Petani / Mitra');
  
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [addressInput, setAddressInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Proses Login ke Backend Laravel
      try {
        const response = await fetch('http://127.0.0.1:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            email: emailInput,
            password: passwordInput
          })
        });

        const data = await response.json();

        if (response.ok) {
          // Simpan token akses dari Laravel
          localStorage.setItem('token', data.token);
          
          const userData = {
            name: data.user.name,
            email: data.user.email,
            phone: data.user.phone || "+62 812-3456-7890",
            address: data.user.address || "Kec. Gisting, Tanggamus, Lampung",
            role: selectedRole,
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
          };

          if (onLoginSuccess) {
            onLoginSuccess(userData);
          } else {
            setPage('home');
          }
        } else {
          alert(data.message || 'Login gagal, periksa kembali email dan password Anda.');
        }
      } catch (error) {
        console.error('Terjadi kesalahan koneksi ke backend:', error);
        alert('Tidak dapat terhubung ke server backend Laravel. Pastikan server lokal (php artisan serve) sudah menyala.');
      }
    } else {
      // Logika untuk pendaftaran (sementara menggunakan dummy/local data)
      const dummyUser = {
        name: nameInput || "Pengguna Baru Living Smart",
        email: emailInput,
        phone: phoneInput || "+62 812-3456-7890",
        address: addressInput || "Kec. Gisting, Tanggamus, Lampung",
        role: selectedRole,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
      };

      if (onLoginSuccess) {
        onLoginSuccess(dummyUser);
      } else {
        setPage('home');
      }
    }
  };

  const handleMarketplace = () => {
    setPage('shop');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="landing-container"
      style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
    >
      {/* Top bar minimalis */}
      <header className="topbar">
        <div className="logo" onClick={() => setPage('home')} style={{ cursor: 'pointer' }}>
          <div className="logo-badge" style={{ padding: 0, width: 50, height: 50, background: 'transparent', border: 'none' }}>
            <img src={logoImg} alt="Agri-ICS" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
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
                type="email" 
                placeholder="Masukkan email..." 
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
              <input 
                type="password" 
                placeholder="Masukkan kata sandi..." 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required 
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>Ulangi Kata Sandi</label>
                <input 
                  type="password" 
                  placeholder="Ulangi kata sandi..." 
                  value={confirmPasswordInput}
                  onChange={(e) => setConfirmPasswordInput(e.target.value)}
                  required 
                />
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

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="footer"
      >
        <div className="footer-grid">
          {/* BRAND */}
          <motion.div
            className="footer-brand"
            whileHover={{ y: -2 }}
          >
            <motion.div
              className="footer-brand-icon"
              whileHover={{ scale: 1.04 }}
            >
              <img
                src={logoImg}
                alt="Agri-ICS"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
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

          {/* QUICK LINKS */}
          <div className="footer-col">
            <h4>Quick links</h4>
            <motion.a
              href="#home"
              whileHover={{ x: 3 }}
              onClick={(e) => {
                e.preventDefault();
                setPage("home");
              }}
            >
              Home
            </motion.a>

            <motion.a
              href="#dashboard"
              whileHover={{ x: 3 }}
              onClick={(e) => {
                e.preventDefault();
                setPage("dashboard");
              }}
            >
              Dashboard
            </motion.a>

            <motion.a
              href="#shop"
              whileHover={{ x: 3 }}
              onClick={(e) => {
                e.preventDefault();
                handleMarketplace();
              }}
            >
              Shop
            </motion.a>
          </div>

          {/* SHOP */}
          <div className="footer-col">
            <h4>Shop</h4>
            <motion.a
              href="#shop"
              whileHover={{ x: 3 }}
              onClick={(e) => {
                e.preventDefault();
                handleMarketplace();
              }}
            >
              All Products
            </motion.a>

            <motion.a
              href="#shop"
              whileHover={{ x: 3 }}
              onClick={(e) => {
                e.preventDefault();
                handleMarketplace();
              }}
            >
              Best Seller
            </motion.a>

            <motion.a
              href="#shop"
              whileHover={{ x: 3 }}
              onClick={(e) => {
                e.preventDefault();
                handleMarketplace();
              }}
            >
              Promo
            </motion.a>
          </div>

          {/* INFORMATION */}
          <div className="footer-col">
            <h4>Information</h4>
            <motion.a href="#faq" whileHover={{ x: 3 }}>FAQ</motion.a>
            <motion.a href="#terms" whileHover={{ x: 3 }}>Terms &amp; Conditions</motion.a>
            <motion.a href="#privacy" whileHover={{ x: 3 }}>Privacy Policy</motion.a>
          </div>

          {/* CONTACT */}
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
    </motion.div>
  );
}