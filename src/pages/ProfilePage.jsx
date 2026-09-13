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
{/* =====================================================
          FOOTER
      ===================================================== */}

      <motion.footer
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.7,
        }}
        className="footer"
      >
        <div className="footer-grid">

          {/* BRAND */}

          <motion.div
            className="footer-brand"
            whileHover={{
              y: -2,
            }}
          >
            <motion.div
              className="footer-brand-icon"
              whileHover={{
                scale: 1.04,
              }}
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
              <div className="name">
                Living Smart
              </div>

              <div className="tag">
                Solusi sayur segar dan sehat
              </div>

              <p className="desc">
                Menghubungkan teknologi dan pertanian
                untuk masa depan pangan yang lebih hijau
                dan berkelanjutan.
              </p>
            </div>
          </motion.div>

          {/* QUICK LINKS */}

          <div className="footer-col">
            <h4>Quick links</h4>

            <motion.a
              href="#home"
              whileHover={{
                x: 3,
              }}
              onClick={(e) => {
                e.preventDefault();
                setPage("home");
              }}
            >
              Home
            </motion.a>

            <motion.a
              href="#dashboard"
              whileHover={{
                x: 3,
              }}
              onClick={(e) => {
                e.preventDefault();
                setPage("dashboard");
              }}
            >
              Dashboard
            </motion.a>

            <motion.a
              href="#shop"
              whileHover={{
                x: 3,
              }}
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
              whileHover={{
                x: 3,
              }}
              onClick={(e) => {
                e.preventDefault();
                handleMarketplace();
              }}
            >
              All Products
            </motion.a>

            <motion.a
              href="#shop"
              whileHover={{
                x: 3,
              }}
              onClick={(e) => {
                e.preventDefault();
                handleMarketplace();
              }}
            >
              Best Seller
            </motion.a>

            <motion.a
              href="#shop"
              whileHover={{
                x: 3,
              }}
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

            <motion.a
              href="#faq"
              whileHover={{
                x: 3,
              }}
            >
              FAQ
            </motion.a>

            <motion.a
              href="#terms"
              whileHover={{
                x: 3,
              }}
            >
              Terms &amp; Conditions
            </motion.a>

            <motion.a
              href="#privacy"
              whileHover={{
                x: 3,
              }}
            >
              Privacy Policy
            </motion.a>
          </div>

          {/* CONTACT */}

          <div className="footer-col">
            <h4>Contact Us</h4>

            <motion.div
              className="footer-contact-item"
              whileHover={{
                x: 3,
              }}
            >
              📍 Gisting, Tanggamus
            </motion.div>

            <motion.div
              className="footer-contact-item"
              whileHover={{
                x: 3,
              }}
            >
              📞 +62 812 3456 7890
            </motion.div>

            <motion.div
              className="footer-contact-item"
              whileHover={{
                x: 3,
              }}
            >
              ✉️ Livingmart@gmail.com
            </motion.div>
          </div>

        </div>

        <div
          style={{
            marginTop: 32,
            paddingTop: 18,
            borderTop:
              "1px solid rgba(255,255,255,0.08)",
            textAlign: "center",
            color:
              "rgba(255,255,255,0.32)",
            fontSize: 11,
          }}
        >
          Smart Agriculture • IoT • LivingLab
        </div>
      </motion.footer>
      </motion.div>

      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            style={{
              position: "fixed",
              inset: 0,
              width: "100vw",
              height: "100dvh",
              zIndex: 999999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              background:
                "linear-gradient(135deg, #092B17 0%, #123D22 55%, #17351E 100%)",
            }}
          >
            <motion.div
              animate={{
                opacity: [0.12, 0.27, 0.12],
                scale: [0.84, 1.08, 0.84],
              }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 320,
                height: 320,
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                background: "#B9EE91",
                filter: "blur(100px)",
              }}
            />

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.82,
                y: 12,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: -7,
              }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.035, 1],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  width: 120,
                  height: 120,
                  padding: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  background: "#FFFFFF",
                  boxShadow:
                    "0 0 70px rgba(185,238,145,0.22)",
                }}
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

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.6,
                }}
                style={{
                  marginTop: 22,
                  color: "#FFFFFF",
                  fontSize: 30,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              >
                AGRI
                <span style={{ color: "#B9EE91" }}>
                  -ICS
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.55,
                  duration: 0.6,
                }}
                style={{
                  margin: "7px 0 0",
                  color: "rgba(255,255,255,0.48)",
                  fontSize: 11,
                  letterSpacing: "0.22em",
                }}
              >
                SMART AGRICULTURE • IoT • LIVINGLAB
              </motion.p>

              <motion.div
                initial={{
                  width: 0,
                  opacity: 0,
                }}
                animate={{
                  width: 80,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.8,
                  duration: 1.2,
                  ease: "easeInOut",
                }}
                style={{
                  height: 1,
                  marginTop: 26,
                  background:
                    "rgba(185,238,145,0.5)",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
