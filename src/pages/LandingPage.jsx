import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../index.css";

import logoImg from "../assets/logo.svg";
import heroImg from "../assets/yang baru lagi.png";
import pakcoyImg from "../assets/pakcoi (1).png";
import seladaImg from "../assets/selada keriting.png";
import bayamImg from "../assets/bayam.png";
import tomatImg from "../assets/tomat ceri.png";
import avatarImg from "../assets/foto orang.jpg";

/* =========================================================
   MOTION
========================================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/* =========================================================
   LANDING PAGE
========================================================= */

const INTRO_KEY = "agri_ics_landing_intro";

const shouldShowLandingIntro = () => {
  const navigation = performance.getEntriesByType("navigation")[0];
  const isRefresh = navigation?.type === "reload";
  const hasShown = sessionStorage.getItem(INTRO_KEY) === "1";

  // First visit to the app: show intro.
  // Browser refresh on Home: show intro again.
  // SPA navigation back to Home: do not show it again.
  return isRefresh || !hasShown;
};

export default function LandingPage({ setPage, user }) {
  const [showIntro, setShowIntro] = useState(shouldShowLandingIntro);

  const productsList = [
    {
      name: "Pokcoy",
      price: "Rp. 15.000",
      img: pakcoyImg,
    },
    {
      name: "Selada keriting",
      price: "Rp. 18.000",
      img: seladaImg,
    },
    {
      name: "Bayam",
      price: "Rp. 9.000",
      img: bayamImg,
    },
    {
      name: "Tomat Ceri",
      price: "Rp. 17.000",
      img: tomatImg,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(1);

  /*
   * Intro hanya hidup selama component LandingPage
   * pertama kali dimuat.
   *
   * Dashboard -> Home:
   * component yang sama tidak perlu menampilkan intro lagi
   * selama tidak terjadi browser refresh.
   */
  useEffect(() => {
    if (!showIntro) return;

    sessionStorage.setItem(INTRO_KEY, "1");
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setShowIntro(false);
      document.body.style.overflow = "";
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  /* =======================================================
     MARKETPLACE ACCESS
     Semua akses Marketplace -> Login/Auth -> Marketplace
  ======================================================= */

  const handleMarketplace = () => {
    // Gunakan state router aplikasi agar tetap di SPA.
    // Marketplace dibuka langsung tanpa kembali ke Home.
    setPage("shop");
  };

  const handleShop = handleMarketplace;

  /* =======================================================
     CAROUSEL
  ======================================================= */

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0
        ? productsList.length - 1
        : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === productsList.length - 1
        ? 0
        : prev + 1
    );
  };

  /* =========================================================
     LANDING PAGE BARU DIRIENDER SETELAH INTRO
  ========================================================= */

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <style>{`
        /* =====================================================
           RESPONSIVE / CROSS DEVICE
           HP • TABLET • LAPTOP • MAC • DESKTOP
        ===================================================== */
        .landing-container,
        .landing-container * {
          box-sizing: border-box;
        }

        .landing-container {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
        }

        .landing-container img {
          max-width: 100%;
        }

        /* Laptop kecil / tablet landscape */
        @media (max-width: 1180px) {
          .topbar {
            gap: 14px !important;
            padding-left: 28px !important;
            padding-right: 28px !important;
          }

          .search {
            min-width: 0 !important;
            flex: 1 1 360px !important;
          }

          .topbar > div:last-child {
            margin-left: 0 !important;
          }

          .hero {
            padding-left: 6vw !important;
            padding-right: 6vw !important;
            gap: 28px !important;
          }

          .hero-content h1 {
            font-size: clamp(34px, 4vw, 54px) !important;
            line-height: 1.08 !important;
          }

          .features,
          .products-carousel-section,
          .highlights-section,
          .footer {
            padding-left: 6vw !important;
            padding-right: 6vw !important;
          }

          .footer-grid {
            grid-template-columns: 1.5fr repeat(2, 1fr) !important;
            row-gap: 30px !important;
          }
        }

        /* Tablet */
        @media (max-width: 900px) {
          .topbar {
            min-height: auto !important;
            flex-wrap: wrap !important;
            padding: 14px 24px !important;
          }

          .topbar .logo {
            flex: 1 1 auto !important;
            min-width: 220px !important;
          }

          .topbar .search {
            order: 3;
            flex: 1 1 100% !important;
            width: 100% !important;
            margin-top: 2px !important;
          }

          .topbar > div:last-child {
            margin-left: auto !important;
          }

          .navbar-trigger-area {
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch;
          }

          .navbar {
            width: max-content !important;
            min-width: 100% !important;
            justify-content: center !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
          }

          .hero {
            min-height: auto !important;
            grid-template-columns: 1fr !important;
            display: grid !important;
            padding: 56px 7vw 48px !important;
            text-align: center !important;
          }

          .hero-content {
            max-width: 760px !important;
            margin: 0 auto !important;
          }

          .hero-content > div:first-child {
            margin-left: auto !important;
            margin-right: auto !important;
          }

          .hero-buttons {
            justify-content: center !important;
            flex-wrap: wrap !important;
          }

          .hero-visual {
            width: min(620px, 100%) !important;
            min-height: 360px !important;
            margin: 0 auto !important;
          }

          .basket {
            width: min(100%, 600px) !important;
            margin: auto !important;
          }

          .features-row {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .features-row .feature-item:last-child {
            grid-column: 1 / -1;
            max-width: calc(50% - 12px);
            width: 100%;
            margin: 0 auto;
          }

          .stats-slim-bar {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }

          .footer-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .footer-brand {
            grid-column: 1 / -1;
          }
        }

        /* HP */
        @media (max-width: 600px) {
          .topbar {
            padding: 11px 15px !important;
            gap: 10px !important;
          }

          .topbar .logo {
            min-width: 0 !important;
            width: auto !important;
          }

          .topbar .logo-badge {
            width: 46px !important;
            height: 46px !important;
            min-width: 46px !important;
          }

          .topbar .logo-text {
            margin-left: 8px !important;
          }

          .topbar .logo-text .main {
            font-size: 20px !important;
            line-height: 1 !important;
          }

          .topbar .logo-text .tag {
            display: none !important;
          }

          .topbar > div:last-child {
            gap: 6px !important;
          }

          .topbar > div:last-child button {
            height: 38px !important;
            padding: 0 10px !important;
            border-radius: 9px !important;
            font-size: 12px !important;
          }

          .topbar > div:last-child button svg {
            width: 15px !important;
            height: 15px !important;
          }

          .search {
            height: 44px !important;
            border-radius: 10px !important;
          }

          .search input {
            min-width: 0 !important;
            width: 100% !important;
            font-size: 13px !important;
            padding-left: 13px !important;
          }

          .search .cat {
            display: none !important;
          }

          .search button {
            width: 46px !important;
            min-width: 46px !important;
          }

          .navbar {
            justify-content: flex-start !important;
            gap: 4px !important;
            padding: 0 15px !important;
          }

          .navbar a {
            padding: 12px 15px !important;
            white-space: nowrap !important;
            font-size: 13px !important;
          }

          .hero {
            padding: 40px 18px 30px !important;
            gap: 12px !important;
          }

          .hero-content h1 {
            font-size: clamp(30px, 9vw, 42px) !important;
            line-height: 1.06 !important;
            word-break: normal !important;
          }

          .hero-content p {
            font-size: 14px !important;
            line-height: 1.7 !important;
            max-width: 100% !important;
          }

          .hero-content > div:first-child {
            font-size: 9px !important;
            letter-spacing: 0.03em !important;
            padding: 6px 10px !important;
          }

          .hero-buttons {
            width: 100% !important;
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 9px !important;
          }

          .hero-buttons .btn {
            width: 100% !important;
            min-height: 44px !important;
            justify-content: center !important;
          }

          .hero-visual {
            min-height: 260px !important;
            margin-top: 8px !important;
          }

          .floating-img {
            width: 100% !important;
            max-width: 430px !important;
            height: auto !important;
          }

          .features,
          .products-carousel-section,
          .highlights-section,
          .footer {
            padding-left: 18px !important;
            padding-right: 18px !important;
          }

          .features {
            padding-top: 48px !important;
            padding-bottom: 48px !important;
          }

          .features-head h2,
          .products-head-center h2 {
            font-size: 28px !important;
          }

          .features-head p,
          .products-head-center p {
            font-size: 13px !important;
            line-height: 1.65 !important;
          }

          .features-row {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }

          .features-row .feature-item:last-child {
            grid-column: auto !important;
            max-width: none !important;
          }

          .feature-item {
            padding: 20px !important;
          }

          .feature-item h3 {
            font-size: 17px !important;
          }

          .feature-item p {
            font-size: 13px !important;
            line-height: 1.65 !important;
          }

          .products-carousel-section {
            padding-top: 48px !important;
            padding-bottom: 48px !important;
          }

          /*
            Di HP hanya kartu aktif yang ditampilkan.
            Ini membuat carousel stabil dan tidak melebar keluar layar.
          */
          .carousel-container {
            width: 100% !important;
            overflow: hidden !important;
          }

          .carousel-track {
            width: 100% !important;
            min-height: 0 !important;
            height: auto !important;
            display: block !important;
          }

          .product-card-3d {
            display: none !important;
            position: relative !important;
            left: auto !important;
            right: auto !important;
            top: auto !important;
            transform: none !important;
            width: 100% !important;
            max-width: 390px !important;
            margin: 0 auto !important;
          }

          .product-card-3d.carousel-item-active {
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
          }

          .product-photo {
            height: 230px !important;
          }

          .product-info {
            padding: 15px !important;
          }

          .carousel-nav-buttons {
            margin-top: 16px !important;
            gap: 10px !important;
          }

          .carousel-arrow {
            width: 42px !important;
            height: 42px !important;
          }

          .stats-slim-bar {
            grid-template-columns: 1fr !important;
            gap: 15px !important;
            padding: 20px !important;
          }

          .stat-divider {
            width: 100% !important;
            height: 1px !important;
          }

          .stat-slim-item strong {
            font-size: 25px !important;
          }

          .testimonial-slim-bar {
            margin-top: 12px !important;
          }

          .testimonial-slim-content {
            padding: 18px !important;
            align-items: flex-start !important;
          }

          .slim-avatar {
            width: 42px !important;
            height: 42px !important;
            min-width: 42px !important;
          }

          .testimonial-slim-content p {
            font-size: 13px !important;
            line-height: 1.6 !important;
          }

          .footer {
            padding-top: 42px !important;
            padding-bottom: 24px !important;
          }

          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }

          .footer-brand {
            grid-column: auto !important;
            align-items: flex-start !important;
          }

          .footer-brand-icon {
            width: 52px !important;
            height: 52px !important;
            min-width: 52px !important;
          }

          .footer-col h4 {
            margin-bottom: 10px !important;
          }

          /* Intro */
          .landing-container + * {
            max-width: 100vw;
          }
        }

        /* HP sangat kecil */
        @media (max-width: 380px) {
          .topbar .logo-text .main {
            font-size: 18px !important;
          }

          .topbar > div:last-child button {
            padding: 0 8px !important;
            font-size: 11px !important;
          }

          .hero {
            padding-left: 14px !important;
            padding-right: 14px !important;
          }

          .hero-content h1 {
            font-size: 29px !important;
          }

          .features,
          .products-carousel-section,
          .highlights-section,
          .footer {
            padding-left: 14px !important;
            padding-right: 14px !important;
          }
        }

        /* Mac/desktop dengan pointer */
        @media (min-width: 901px) and (hover: hover) {
          .landing-container {
            overflow-x: clip;
          }
        }

        /* Kurangi animasi jika device meminta reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .landing-container *,
          .landing-container *::before,
          .landing-container *::after {
            scroll-behavior: auto !important;
          }
        }
`}</style>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.85,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="landing-container overflow-x-hidden"
      >
      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <motion.header
        initial={{
          opacity: 0,
          y: -12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="topbar"
      >
        {/* LOGO */}

        <motion.div
          className="logo"
          whileHover={{
            y: -1,
          }}
          transition={{
            duration: 0.2,
          }}
          style={{
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <div
            className="logo-badge"
            style={{
              width: 62,
              height: 62,
              minWidth: 62,
              padding: 0,
              border: "none",
              outline: "none",
              boxShadow: "none",
              background: "transparent",
              flexShrink: 0,
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
          </div>

          <div
            className="logo-text"
            style={{
              marginLeft: 12,
            }}
          >
            <div className="main">
              AGRI-
              <span>ICS</span>
            </div>

            <div className="tag">
              Hidup sehat, mulai dari kebun
            </div>
          </div>
        </motion.div>

        {/* SEARCH */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.55,
            delay: 0.12,
          }}
          className="search"
        >
          <input
            type="text"
            placeholder="Cari produk, hidroponik, greenhouse..."
          />

          <div className="cat">
            All Categories

            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#5c6b60"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>

          <motion.button
            type="button"
            aria-label="Cari"
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.96,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
              />

              <path d="M21 21l-4.3-4.3" />
            </svg>
          </motion.button>
        </motion.div>

        {/* =================================================
            DASHBOARD + MARKETPLACE
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            x: 12,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.55,
            delay: 0.18,
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            marginLeft: 14,
          }}
        >
          {/* DASHBOARD */}

          <motion.button
            type="button"
            onClick={() =>
              setPage("dashboard")
            }
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              height: 42,
              padding: "0 16px",
              borderRadius: 11,
              border:
                "1px solid #D6E3D5",
              background: "#F8FBF7",
              color: "#29412D",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
              boxShadow:
                "0 2px 8px rgba(40,70,45,0.04)",
            }}
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect
                x="3"
                y="3"
                width="7"
                height="7"
                rx="1"
              />

              <rect
                x="14"
                y="3"
                width="7"
                height="7"
                rx="1"
              />

              <rect
                x="3"
                y="14"
                width="7"
                height="7"
                rx="1"
              />

              <rect
                x="14"
                y="14"
                width="7"
                height="7"
                rx="1"
              />
            </svg>

            Dashboard
          </motion.button>

          {/* MARKETPLACE */}

          <motion.button
            type="button"
            onClick={handleMarketplace}
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              height: 42,
              padding: "0 17px",
              borderRadius: 11,
              border:
                "1px solid #2F7041",
              background:
                "linear-gradient(135deg,#2F7041,#245C34)",
              color: "#FFFFFF",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
              boxShadow:
                "0 5px 16px rgba(47,112,65,0.16)",
            }}
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 3h2l2.5 11.5a2 2 0 0 0 2 1.5h7.8a2 2 0 0 0 2-1.5L21 7H6" />

              <circle
                cx="10"
                cy="20"
                r="1.2"
              />

              <circle
                cx="18"
                cy="20"
                r="1.2"
              />
            </svg>

            Marketplace
          </motion.button>
        </motion.div>
      </motion.header>

      {/* =====================================================
          SECONDARY NAVBAR
      ===================================================== */}

      <div className="navbar-trigger-area">
        <motion.nav
          initial={{
            opacity: 0,
            y: -8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.12,
          }}
          className="navbar"
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              setPage("home");
            }}
            className="active"
          >
            Home
          </a>

          <a
            href="#shop"
            onClick={(e) => {
              e.preventDefault();
              handleMarketplace();
            }}
          >
            Shop
          </a>

          <a
            href="#dashboard"
            onClick={(e) => {
              e.preventDefault();
              setPage("dashboard");
            }}
          >
            Dashboard
          </a>
        </motion.nav>
      </div>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero">

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="hero-content"
        >
          {/* LABEL */}

          <motion.div
            variants={fadeUp}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              marginBottom: 15,
              padding: "7px 13px",
              borderRadius: 999,
              background:
                "rgba(255,255,255,0.12)",
              border:
                "1px solid rgba(255,255,255,0.25)",
              backdropFilter: "blur(8px)",
              color: "#FFFFFF",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#B9EE91",
                boxShadow:
                  "0 0 8px rgba(185,238,145,0.65)",
              }}
            />

            SMART AGRICULTURE • IoT • LIVINGLAB
          </motion.div>

          {/* =================================================
              HERO TITLE
              -------------------------------------------------
              Keduanya sengaja warna sama
              agar tidak bentrok.
          ================================================= */}

          <motion.h1
            variants={fadeUp}
            style={{
              color: "#153524",
            }}
          >
            HYDRO-PERFECTION
            <br />

            <span
              style={{
                color: "#153524",
                background: "none",
                WebkitTextFillColor:
                  "initial",
              }}
            >
              Kualitas Terbaik dari Gisting
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{
              color: "#5D6D63",
            }}
          >
            Dibudidayakan dengan penuh ketelitian
            di greenhouse canggih kami di Gisting.
            Dari kebun kami, langsung ke meja Anda.
          </motion.p>

          {/* BUTTONS */}

          <motion.div
            variants={fadeUp}
            className="hero-buttons"
          >
            <motion.button
              onClick={handleShop}
              className="btn btn-primary"
              whileHover={{
                scale: 1.02,
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              SHOP NOW

              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </motion.button>

            <motion.button
              onClick={() =>
                setPage("dashboard")
              }
              className="btn btn-secondary"
              whileHover={{
                scale: 1.02,
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              EXPLORE DASHBOARD
            </motion.button>
          </motion.div>

          {/* IoT status */}

          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: 20,
              color: "#52645A",
              fontSize: 11,
              fontWeight: 500,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#76A968",
              }}
            />

            Dipantau dengan teknologi IoT
            secara real-time
          </motion.div>
        </motion.div>

        {/* HERO IMAGE */}

        <motion.div
          initial={{
            opacity: 0,
            x: 30,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.18,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="hero-visual"
        >
          <motion.div
            animate={{
              scale: [0.97, 1.03, 0.97],
              opacity: [0.12, 0.2, 0.12],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              width: "65%",
              height: "65%",
              left: "18%",
              top: "15%",
              borderRadius: "50%",
              background: "#B9EE91",
              filter: "blur(55px)",
            }}
          />

          <motion.div
            className="basket"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src={heroImg}
              alt="Foto hasil panen sayur segar"
              className="floating-img"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section className="features">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          variants={stagger}
          className="features-head"
        >
          <motion.span
            variants={fadeUp}
            style={{
              display: "block",
              marginBottom: 7,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.22em",
              color: "#71986A",
            }}
          >
            WHY AGRI-ICS
          </motion.span>

          <motion.h2 variants={fadeUp}>
            Fitur Utama Kami
          </motion.h2>

          <motion.p variants={fadeUp}>
            Tiga hal yang membuat kebun kami berbeda
            — dari sensor di lahan sampai ke meja
            makan Anda.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          variants={stagger}
          className="features-row"
        >
          {/* FEATURE 1 */}

          <motion.div
            variants={fadeUp}
            whileHover={{
              y: -4,
            }}
            className="feature-item is-live"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 17l5-5 3 3 6-7" />
              <path d="M14 8h4v4" />
            </svg>

            <h3>
              <span className="live-dot"></span>
              Realtime Monitoring
            </h3>

            <p>
              Suhu, kelembapan, dan nutrisi
              greenhouse terpantau dari sensor IoT
              yang menyala 24/7, bukan cuma estimasi.
            </p>
          </motion.div>

          {/* FEATURE 2 */}

          <motion.div
            variants={fadeUp}
            whileHover={{
              y: -4,
            }}
            className="feature-item"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h2l2.2 11a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L21 8H7" />

              <circle
                cx="10"
                cy="20"
                r="1.3"
              />

              <circle
                cx="17"
                cy="20"
                r="1.3"
              />
            </svg>

            <h3>
              Online Marketplace
            </h3>

            <p>
              Hasil panen hari itu langsung bisa
              dipesan, tanpa lewat gudang atau
              pengepul — dipetik lalu dikirim.
            </p>
          </motion.div>

          {/* FEATURE 3 */}

          <motion.div
            variants={fadeUp}
            whileHover={{
              y: -4,
            }}
            className="feature-item"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle
                cx="12"
                cy="12"
                r="3"
              />

              <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
            </svg>

            <h3>
              AI Agent
            </h3>

            <p>
              Cukup ceritakan kebutuhan sayurmu,
              sistem akan menyesuaikan rekomendasi
              dari data panen yang tersedia.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* =====================================================
          PRODUCT CAROUSEL
      ===================================================== */}

      <section className="products-carousel-section">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          variants={stagger}
          className="products-head-center"
        >
          <motion.span
            variants={fadeUp}
            className="sub-title"
          >
            GALLERY
          </motion.span>

          <motion.h2 variants={fadeUp}>
            Produk Unggulan
          </motion.h2>

          <motion.p variants={fadeUp}>
            Hasil panen terbaik dari greenhouse kami,
            langsung dipetik untuk Anda.
          </motion.p>
        </motion.div>

        <div className="carousel-container">

          <div className="carousel-track">
            {productsList.map((prod, idx) => {
              let position =
                "carousel-item-hidden";

              if (idx === activeIndex) {
                position =
                  "carousel-item-active";
              } else if (
                idx ===
                (activeIndex -
                  1 +
                  productsList.length) %
                  productsList.length
              ) {
                position =
                  "carousel-item-left";
              } else if (
                idx ===
                (activeIndex + 1) %
                  productsList.length
              ) {
                position =
                  "carousel-item-right";
              }

              return (
                <motion.div
                  className={`product-card-3d ${position}`}
                  key={idx}
                  onClick={() =>
                    setActiveIndex(idx)
                  }
                  whileHover={{
                    y: -5,
                  }}
                >
                  <div className="product-photo">
                    <img
                      src={prod.img}
                      alt={prod.name}
                    />
                  </div>

                  <div className="product-info">

                    <div>
                      <div className="name">
                        {prod.name}
                      </div>

                      <div className="price">
                        {prod.price}
                      </div>
                    </div>

                    <motion.button
                      className="cart-btn"
                      aria-label="Tambah ke keranjang"
                      whileHover={{
                        scale: 1.06,
                      }}
                      whileTap={{
                        scale: 0.94,
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle
                          cx="9"
                          cy="21"
                          r="1"
                        />

                        <circle
                          cx="20"
                          cy="21"
                          r="1"
                        />

                        <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
                      </svg>
                    </motion.button>

                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="carousel-nav-buttons">

            <motion.button
              className="carousel-arrow"
              onClick={handlePrev}
              aria-label="Sebelumnya"
              whileHover={{
                scale: 1.05,
                x: -2,
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              className="carousel-arrow"
              onClick={handleNext}
              aria-label="Berikutnya"
              whileHover={{
                scale: 1.05,
                x: 2,
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>

          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
      ===================================================== */}

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        variants={stagger}
        className="highlights-section"
      >
        <div className="highlights-container-slim">

          <motion.div
            variants={fadeUp}
            className="stats-slim-bar"
          >
            <motion.div
              className="stat-slim-item"
              whileHover={{
                y: -2,
              }}
            >
              <strong>1Jt+</strong>
              <span>Produk terjual</span>
            </motion.div>

            <div className="stat-divider"></div>

            <motion.div
              className="stat-slim-item"
              whileHover={{
                y: -2,
              }}
            >
              <strong>5</strong>
              <span>Greenhouse aktif</span>
            </motion.div>

            <div className="stat-divider"></div>

            <motion.div
              className="stat-slim-item"
              whileHover={{
                y: -2,
              }}
            >
              <strong>99%</strong>
              <span>Kepuasan pelanggan</span>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="testimonial-slim-bar"
          >
            <motion.div
              className="testimonial-slim-content"
              whileHover={{
                y: -2,
              }}
            >
              <img
                src={avatarImg}
                alt="Mas Tofar"
                className="slim-avatar"
              />

              <p>
                "Keren banget bisa tau greenhouse mana
                yang ada stok, terus sayurnya segar-segar
                banget!"

                <span className="slim-author">
                  — Mas Tofar
                </span>
              </p>
            </motion.div>
          </motion.div>

        </div>
      </motion.section>

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