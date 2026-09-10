import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

import logo from "../assets/logo.svg";
import heroImage from "../assets/hero.png";
import greenhouseImage from "../assets/fotogh.png";
import aboutImage from "../assets/about_img.svg";

import clockIcon from "../assets/clock_divider.svg";
import pictureIcon from "../assets/image_divider.svg";
import securityIcon from "../assets/security_divider.svg";

/* =========================================================
   ANIMATION
========================================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: 35,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: "easeOut",
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: -35,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: "easeOut",
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/* =========================================================
   NAVIGATION
========================================================= */

const navItems = [
  {
    label: "Home",
    id: "Home",
  },
  {
    label: "About",
    id: "About",
  },
  {
    label: "Features",
    id: "Features",
  },
  {
    label: "How It Works",
    id: "HowItWorks",
  },
  {
    label: "Contact",
    id: "Contact",
  },
];

/* =========================================================
   FLOATING DOT
========================================================= */

const FloatingDot = ({
  className = "",
  delay = 0,
  size = 8,
}) => {
  return (
    <motion.span
      className={`pointer-events-none absolute rounded-full bg-[#B9EE91] ${className}`}
      style={{
        width: size,
        height: size,
      }}
      animate={{
        y: [0, -12, 0],
        opacity: [0.12, 0.4, 0.12],
        scale: [1, 1.15, 1],
      }}
      transition={{
        duration: 5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

/* =========================================================
   LANDING PAGE
========================================================= */

const LandingPage = () => {
  const [showIntro, setShowIntro] = useState(true);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [activeSection, setActiveSection] =
    useState("Home");

  const [scrolled, setScrolled] =
    useState(false);

  /* =======================================================
     INTRO LOGO
  ======================================================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  /* =======================================================
     SCROLL STATE
  ======================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* =======================================================
     ACTIVE SECTION
  ======================================================= */

  useEffect(() => {
    const sections = navItems
      .map((item) =>
        document.getElementById(item.id)
      )
      .filter(Boolean);

    const observer =
      new IntersectionObserver(
        (entries) => {
          const visibleSection = entries
            .filter(
              (entry) =>
                entry.isIntersecting
            )
            .sort(
              (a, b) =>
                b.intersectionRatio -
                a.intersectionRatio
            )[0];

          if (visibleSection) {
            setActiveSection(
              visibleSection.target.id
            );
          }
        },
        {
          rootMargin:
            "-25% 0px -55% 0px",
          threshold: [0.1, 0.25, 0.5],
        }
      );

    sections.forEach((section) =>
      observer.observe(section)
    );

    return () =>
      observer.disconnect();
  }, []);

  /* =======================================================
     SMOOTH SCROLL
  ======================================================= */

  const scrollToSection = (id) => {
    const section =
      document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* ===================================================
          INTRO / LOGO SCREEN
      =================================================== */}

      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.7,
                ease: "easeInOut",
              },
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#092B17]"
          >
            {/* AMBIENT GLOW */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              animate={{
                opacity: [0.15, 0.35, 0.15],
                scale: [0.8, 1.15, 0.8],
              }}
              transition={{
                duration: 2.2,
                ease: "easeInOut",
              }}
              className="absolute h-[320px] w-[320px] rounded-full bg-[#B9EE91] blur-[100px]"
            />

            {/* LOGO CONTENT */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.72,
                y: 15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-10 flex flex-col items-center"
            >
              {/* LOGO */}

              <motion.div
                animate={{
                  scale: [1, 1.04, 1],
                }}
                transition={{
                  duration: 1.8,
                  ease: "easeInOut",
                }}
                className="flex h-28 w-28 items-center justify-center rounded-full bg-white p-2 shadow-[0_0_70px_rgba(185,238,145,0.22)] sm:h-32 sm:w-32"
              >
                <img
                  src={logo}
                  alt="Agri-ICS"
                  className="h-full w-full object-contain"
                />
              </motion.div>

              {/* BRAND */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.35,
                  duration: 0.7,
                }}
                className="mt-6 text-2xl font-bold tracking-[0.08em] text-white sm:text-3xl"
              >
                AGRI
                <span className="text-[#B9EE91]">
                  -ICS
                </span>
              </motion.div>

              {/* TAGLINE */}

              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.65,
                  duration: 0.7,
                }}
                className="mt-2 text-center text-xs tracking-[0.25em] text-white/45"
              >
                SMART AGRICULTURE • IoT • LIVINGLAB
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================================
          MAIN LANDING PAGE
      =================================================== */}

      <div className="min-h-screen overflow-x-hidden bg-[#EEF5EA] text-[#29412D]">

        {/* =================================================
            NAVBAR
        ================================================= */}

        <motion.header
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 2.1,
            ease: "easeOut",
          }}
          className={`fixed left-0 right-0 top-0 z-[100] transition-all duration-500 ${
            scrolled
              ? "bg-[#17351E]/95 shadow-lg shadow-black/10 backdrop-blur-xl"
              : "bg-[#17351E]/35 backdrop-blur-md"
          }`}
        >
          <nav className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-12">

            {/* LOGO */}

            <motion.button
              type="button"
              onClick={() =>
                scrollToSection("Home")
              }
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white p-1 shadow-md">
                <img
                  src={logo}
                  alt="Agri-ICS"
                  className="h-full w-full object-contain"
                />
              </div>

              <span className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                AGRI
                <span className="text-[#B9EE91]">
                  -ICS
                </span>
              </span>
            </motion.button>

            {/* DESKTOP NAV */}

            <div className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    scrollToSection(item.id)
                  }
                  className={`relative rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {item.label}

                  {activeSection ===
                    item.id && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#B9EE91]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* DESKTOP ACTION */}

            <div className="hidden items-center gap-3 lg:flex">

              <motion.div
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
              >
                <Link
                  to="/dashboard"
                  className="block rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
                >
                  Dashboard
                </Link>
              </motion.div>

              <motion.div
                whileHover={{
                  y: -2,
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
              >
                <Link
                  to="/marketplace"
                  className="block rounded-full bg-[#B9EE91] px-6 py-3 text-sm font-semibold text-[#28432D] shadow-lg transition-colors duration-300 hover:bg-white"
                >
                  Marketplace
                </Link>
              </motion.div>

            </div>

            {/* MOBILE MENU BUTTON */}

            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen(
                  (value) => !value
                )
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 lg:hidden"
              aria-label="Toggle navigation"
            >
              <div className="flex w-5 flex-col gap-1.5">

                <motion.span
                  animate={
                    mobileMenuOpen
                      ? {
                          rotate: 45,
                          y: 8,
                        }
                      : {
                          rotate: 0,
                          y: 0,
                        }
                  }
                  className="h-0.5 w-full bg-white"
                />

                <motion.span
                  animate={{
                    opacity:
                      mobileMenuOpen
                        ? 0
                        : 1,
                  }}
                  className="h-0.5 w-full bg-white"
                />

                <motion.span
                  animate={
                    mobileMenuOpen
                      ? {
                          rotate: -45,
                          y: -8,
                        }
                      : {
                          rotate: 0,
                          y: 0,
                        }
                  }
                  className="h-0.5 w-full bg-white"
                />

              </div>
            </button>

          </nav>

          {/* MOBILE NAV */}

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="overflow-hidden border-t border-white/10 bg-[#17351E]/98 backdrop-blur-xl lg:hidden"
              >
                <div className="flex flex-col px-6 py-5">

                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        scrollToSection(
                          item.id
                        )
                      }
                      className={`border-b border-white/10 py-4 text-left text-sm font-semibold ${
                        activeSection ===
                        item.id
                          ? "text-[#B9EE91]"
                          : "text-white/70"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}

                  <div className="flex gap-3 pt-5">

                    <Link
                      to="/dashboard"
                      onClick={() =>
                        setMobileMenuOpen(
                          false
                        )
                      }
                      className="flex-1 rounded-full border border-white/20 py-3 text-center text-sm font-semibold text-white"
                    >
                      Dashboard
                    </Link>

                    <Link
                      to="/marketplace"
                      onClick={() =>
                        setMobileMenuOpen(
                          false
                        )
                      }
                      className="flex-1 rounded-full bg-[#B9EE91] py-3 text-center text-sm font-semibold text-[#28432D]"
                    >
                      Marketplace
                    </Link>

                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* =================================================
            HERO
        ================================================= */}

        <section
          id="Home"
          className="relative min-h-screen scroll-mt-20 overflow-hidden"
        >

          {/* BACKGROUND */}

          <motion.div
            initial={{
              scale: 1.06,
            }}
            animate={{
              scale: 1,
            }}
            transition={{
              duration: 1.6,
              delay: 2.1,
              ease: "easeOut",
            }}
            className="absolute inset-0"
          >
            <img
              src={heroImage}
              alt="Smart greenhouse"
              className="h-full w-full object-cover object-center"
            />
          </motion.div>

          {/* DARK OVERLAY */}

          <div className="absolute inset-0 bg-[#082313]/55" />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,28,13,.96)_0%,rgba(7,35,17,.84)_38%,rgba(7,35,17,.40)_72%,rgba(7,35,17,.15)_100%)]" />

          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#061C0F]/70 to-transparent" />

          {/* AMBIENT DOTS */}

          <FloatingDot
            className="left-[8%] top-[30%]"
            delay={0.5}
          />

          <FloatingDot
            className="left-[42%] top-[20%]"
            delay={1.2}
            size={6}
          />

          <FloatingDot
            className="right-[30%] top-[38%]"
            delay={1.8}
            size={10}
          />

          {/* HERO CONTENT */}

          <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-16 pt-28 sm:px-10 lg:px-12">

            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="w-full"
            >

              <div className="max-w-4xl">

                {/* BADGE */}

                <motion.div
                  variants={fadeUp}
                  className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-md sm:text-sm"
                >
                  <motion.span
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="h-2.5 w-2.5 rounded-full bg-[#B9EE91]"
                  />

                  Smart Agriculture • IoT • LivingLab
                </motion.div>

                {/* TITLE */}

                <motion.h1
                  variants={stagger}
                  className="mt-7 max-w-5xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-white sm:text-6xl md:text-7xl lg:text-[5.6rem]"
                >
                  <motion.span
                    variants={fadeUp}
                    className="block"
                  >
                    Pertanian lebih
                  </motion.span>

                  <motion.span
                    variants={fadeUp}
                    className="block bg-gradient-to-r from-[#B9EE91] via-[#D8F9B5] to-[#A5E978] bg-clip-text text-transparent"
                  >
                    cerdas & terukur.
                  </motion.span>
                </motion.h1>

                {/* DESCRIPTION */}

                <motion.p
                  variants={fadeUp}
                  className="mt-7 max-w-2xl text-base leading-8 text-white/75 sm:text-lg"
                >
                  Agri-ICS menghubungkan teknologi
                  IoT, monitoring greenhouse, data,
                  dan ekosistem pertanian dalam satu
                  platform digital untuk membantu Anda
                  mengambil keputusan dengan lebih baik.
                </motion.p>

                {/* CTA */}

                <motion.div
                  variants={fadeUp}
                  className="mt-9 flex flex-col gap-3 sm:flex-row"
                >

                  <motion.div
                    whileHover={{
                      scale: 1.025,
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                  >
                    <Link
                      to="/dashboard"
                      className="group flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#29482E] shadow-2xl transition-colors duration-300 hover:bg-[#ECF8E7]"
                    >
                      Explore Dashboard

                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{
                      scale: 1.025,
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                  >
                    <Link
                      to="/marketplace"
                      className="group flex items-center justify-center gap-3 rounded-full border border-white/25 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20"
                    >
                      Explore Marketplace

                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </motion.div>

                </motion.div>

              </div>

            </motion.div>

            {/* =================================================
                FLOATING GREENHOUSE
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                x: 70,
                y: 25,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 1.1,
                delay: 2.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="pointer-events-none absolute -bottom-1 right-[-45px] hidden w-[320px] md:block lg:right-[5px] lg:w-[380px] xl:right-[35px] xl:w-[420px]"
            >

              {/* GLOW */}

              <motion.div
                animate={{
                  scale: [0.95, 1.05, 0.95],
                  opacity: [0.15, 0.27, 0.15],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-1/2 top-1/2 h-[65%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B9EE91] blur-3xl"
              />

              {/* GREENHOUSE IMAGE */}

              <motion.img
                src={greenhouseImage}
                alt="Smart greenhouse Agri-ICS"
                animate={{
                  y: [0, -8, 0, -4, 0],
                  rotate: [
                    0,
                    0.2,
                    0,
                    -0.15,
                    0,
                  ],
                }}
                transition={{
                  duration: 6,
                  delay: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 w-full object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,.35)]"
              />

            </motion.div>

            {/* SCROLL */}

            <motion.button
              type="button"
              onClick={() =>
                scrollToSection("About")
              }
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                y: [0, 6, 0],
              }}
              transition={{
                opacity: {
                  duration: 1,
                  delay: 3.5,
                },
                y: {
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-white/50 sm:flex"
            >
              <span>
                Scroll to explore
              </span>

              <span className="h-7 w-px bg-white/40" />
            </motion.button>

          </div>
        </section>

        {/* =================================================
            HIGHLIGHTS
        ================================================= */}

        <section className="bg-[#486744]">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={stagger}
            className="mx-auto grid max-w-7xl divide-y divide-white/10 px-6 sm:px-10 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-12"
          >

            {[
              {
                icon: clockIcon,
                title: "Real-time Monitoring",
                description:
                  "Pantau kondisi greenhouse dan lingkungan tanaman dengan data yang terus diperbarui.",
              },
              {
                icon: pictureIcon,
                title: "Visual Insights",
                description:
                  "Informasi disajikan secara visual agar kondisi tanaman lebih mudah dipahami.",
              },
              {
                icon: securityIcon,
                title: "Connected System",
                description:
                  "Hubungkan monitoring, data, dan kebutuhan pertanian dalam satu ekosistem.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{
                  y: -4,
                }}
                className="group flex gap-5 px-1 py-8 md:px-7 lg:py-9"
              >

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 transition-all duration-500 group-hover:bg-white/15">
                  <img
                    src={item.icon}
                    alt=""
                    className="h-9 w-9 object-contain"
                  />
                </div>

                <div>

                  <h2 className="font-semibold text-white">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-white/60">
                    {item.description}
                  </p>

                </div>

              </motion.div>
            ))}

          </motion.div>

        </section>

        {/* =================================================
            ABOUT
        ================================================= */}

        <section
          id="About"
          className="scroll-mt-20 bg-[#DDEBD8] px-6 py-24 sm:px-10 lg:px-12 lg:py-32"
        >

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={stagger}
            className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"
          >

            <motion.div variants={fadeRight}>

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#52734D]">
                About Agri-ICS
              </p>

              <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-[1.12] tracking-[-0.04em] text-[#29412D] sm:text-5xl">
                Teknologi yang bekerja di balik pertanian yang lebih baik.
              </h2>

              <p className="mt-7 max-w-xl text-base leading-8 text-[#5E7162]">
                Agri-ICS menghubungkan teknologi,
                monitoring greenhouse, dan data pertanian
                dalam satu ekosistem digital.
              </p>

              <p className="mt-5 max-w-xl text-base leading-8 text-[#5E7162]">
                Data tidak hanya ditampilkan sebagai angka.
                Sistem dirancang agar informasi lebih mudah
                dipahami sehingga dapat membantu proses
                pengambilan keputusan.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">

                {[
                  "IoT Connected",
                  "Real-time Insight",
                  "Smart Agriculture",
                ].map((item) => (
                  <motion.span
                    key={item}
                    whileHover={{
                      y: -2,
                    }}
                    className="rounded-full border border-[#C6D9C0] bg-[#EDF5EA] px-4 py-2 text-xs font-semibold text-[#52704D] shadow-sm"
                  >
                    {item}
                  </motion.span>
                ))}

              </div>

            </motion.div>

            <motion.div
              variants={fadeLeft}
              className="relative"
            >

              <motion.div
                animate={{
                  scale: [0.98, 1.02, 0.98],
                  opacity: [0.35, 0.55, 0.35],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-8 rounded-[3rem] bg-[#C7DDC1] blur-3xl"
              />

              <div className="relative overflow-hidden rounded-[2rem] border border-[#D2E2CE] bg-[#F3F8F0] p-5 shadow-[0_30px_80px_rgba(48,75,44,.12)] sm:p-8">

                <motion.img
                  whileHover={{
                    scale: 1.025,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                  src={aboutImage}
                  alt="Agri-ICS Smart Agriculture"
                  className="mx-auto h-auto w-full max-w-xl object-contain"
                />

              </div>

            </motion.div>

          </motion.div>

        </section>

        {/* =================================================
            FEATURES
        ================================================= */}

        <section
          id="Features"
          className="scroll-mt-20 bg-[#EEF5EA] px-6 py-24 sm:px-10 lg:px-12 lg:py-32"
        >

          <div className="mx-auto max-w-7xl">

            {/* SECTION HEADER */}

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={stagger}
              className="max-w-3xl"
            >

              <motion.p
                variants={fadeUp}
                className="text-xs font-bold uppercase tracking-[0.25em] text-[#6C8C66]"
              >
                What we offer
              </motion.p>

              <motion.h2
                variants={fadeUp}
                className="mt-5 text-3xl font-semibold leading-[1.12] tracking-[-0.04em] text-[#29412D] sm:text-5xl"
              >
                Satu ekosistem.

                <span className="block text-[#71986A]">
                  Banyak kemungkinan.
                </span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-2xl text-base leading-8 text-[#617464]"
              >
                Agri-ICS menjadi fondasi digital untuk
                menghubungkan monitoring, data, dan
                kebutuhan pertanian dalam satu pengalaman
                yang terintegrasi.
              </motion.p>

            </motion.div>

            {/* FEATURE CARDS */}

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              variants={stagger}
              className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >

              {[
                {
                  number: "01",
                  title: "Smart Greenhouse",
                  description:
                    "Monitor kondisi greenhouse dan parameter penting melalui satu dashboard.",
                },
                {
                  number: "02",
                  title: "Data-driven Decisions",
                  description:
                    "Gunakan data aktual sebagai dasar untuk memahami kondisi tanaman dan menentukan tindakan.",
                },
                {
                  number: "03",
                  title: "Agriculture Marketplace",
                  description:
                    "Temukan kebutuhan pertanian melalui marketplace yang terhubung dengan ekosistem Agri-ICS.",
                },
                {
                  number: "04",
                  title: "Integrated Ecosystem",
                  description:
                    "Hubungkan monitoring, data, produk, dan aktivitas pertanian dalam satu platform.",
                },
              ].map((feature) => (
                <motion.article
                  key={feature.number}
                  variants={fadeUp}
                  whileHover={{
                    y: -5,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="group relative flex min-h-[330px] flex-col overflow-hidden rounded-[1.5rem] border border-[#D5E3D0] bg-[#F8FBF6] p-7 shadow-[0_8px_25px_rgba(50,80,45,.04)]"
                >

                  {/* NUMBER */}

                  <span className="text-xs font-bold tracking-[0.2em] text-[#8BA383]">
                    {feature.number}
                  </span>

                  {/* CONTENT */}

                  <div className="mt-auto">

                    <h3 className="max-w-[270px] text-[21px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#304B33]">
                      {feature.title}
                    </h3>

                    <p className="mt-4 max-w-[280px] text-[15px] leading-7 text-[#657567]">
                      {feature.description}
                    </p>

                  </div>

                  {/* SUBTLE HOVER */}

                  <motion.div
                    initial={{
                      scale: 0,
                      opacity: 0,
                    }}
                    whileHover={{
                      scale: 1,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                    className="pointer-events-none absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-[#E1EEDC]"
                  />

                </motion.article>
              ))}

            </motion.div>

          </div>

        </section>

        {/* =================================================
            HOW IT WORKS
        ================================================= */}

        <section
          id="HowItWorks"
          className="scroll-mt-20 bg-[#52734D] px-6 py-24 text-white sm:px-10 lg:px-12 lg:py-32"
        >

          <div className="mx-auto max-w-7xl">

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={stagger}
              className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"
            >

              <motion.div variants={fadeRight}>

                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B9EE91]">
                  How it works
                </p>

                <h2 className="mt-5 text-3xl font-semibold leading-[1.12] tracking-[-0.04em] sm:text-5xl">
                  Dari data menjadi tindakan.
                </h2>

              </motion.div>

              <motion.p
                variants={fadeLeft}
                className="max-w-2xl text-base leading-8 text-white/65"
              >
                Pengalaman Agri-ICS dibuat agar data tidak
                berhenti sebagai angka di layar. Informasi
                membantu Anda memahami kondisi dan menentukan
                langkah berikutnya.
              </motion.p>

            </motion.div>

            {/* PROCESS */}

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              variants={stagger}
              className="mt-14 grid gap-5 md:grid-cols-3"
            >

              {[
                {
                  number: "01",
                  title: "Monitor",
                  description:
                    "Lihat kondisi greenhouse dan tanaman melalui data yang tersedia di dashboard.",
                },
                {
                  number: "02",
                  title: "Understand",
                  description:
                    "Pahami kondisi dan perubahan berdasarkan informasi yang tersedia.",
                },
                {
                  number: "03",
                  title: "Take Action",
                  description:
                    "Tentukan tindakan yang lebih tepat berdasarkan data, bukan sekadar perkiraan.",
                },
              ].map((item) => (
                <motion.article
                  key={item.number}
                  variants={fadeUp}
                  whileHover={{
                    y: -6,
                  }}
                  className="rounded-[1.75rem] border border-white/10 bg-[#456641] p-7 shadow-lg shadow-black/5 sm:p-9"
                >

                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#B9EE91] text-xs font-bold text-[#29412D]">
                    {item.number}
                  </span>

                  <h3 className="mt-9 text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/60">
                    {item.description}
                  </p>

                </motion.article>
              ))}

            </motion.div>

          </div>

        </section>

        {/* =================================================
            CONTACT
        ================================================= */}

        <section
          id="Contact"
          className="scroll-mt-20 bg-[#DDEBD8] px-6 py-24 sm:px-10 lg:px-12 lg:py-32"
        >

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            variants={stagger}
            className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-[#C9DCC5] bg-[#EDF5EA] shadow-[0_30px_80px_rgba(48,75,44,.10)] lg:grid-cols-[0.8fr_1.2fr]"
          >

            {/* CONTACT INFO */}

            <motion.div
              variants={fadeRight}
              className="flex flex-col justify-center bg-[#486744] p-8 text-white sm:p-12 lg:p-14"
            >

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B9EE91]">
                Contact
              </p>

              <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">
                Mari terhubung dengan Agri-ICS.
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-white/70 sm:text-base">
                Punya pertanyaan mengenai platform,
                greenhouse, atau pengembangan ekosistem
                Agri-ICS? Kami siap terhubung.
              </p>

              <motion.div
                whileHover={{
                  y: -4,
                }}
                className="mt-9 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm"
              >

                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-white/10 p-2">
                  <img
                    src={logo}
                    alt="Agri-ICS"
                    className="h-full w-full object-contain"
                  />
                </div>

                <div>

                  <p className="font-semibold">
                    AGRI-ICS
                  </p>

                  <p className="mt-1 text-xs text-white/55">
                    Smart Agriculture & IoT Ecosystem
                  </p>

                </div>

              </motion.div>

            </motion.div>

            {/* MAPS */}

            <motion.div
              variants={fadeLeft}
              className="relative min-h-[420px] overflow-hidden bg-[#E7F1E3]"
            >

              <iframe
                title="Gedung H Teknik Elektro - FT UNILA"
                src="https://www.google.com/maps?q=Gedung%20H%20Teknik%20Elektro%20-%20FT%20UNILA&output=embed"
                className="absolute inset-0 h-full w-full"
                style={{
                  border: 0,
                }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />

            </motion.div>

          </motion.div>

        </section>

        {/* =================================================
            FOOTER
        ================================================= */}

        <footer className="bg-[#17351E] px-6 py-10 text-white sm:px-10 lg:px-12">

          <div className="mx-auto flex max-w-7xl flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-center md:justify-between">

            <motion.button
              type="button"
              onClick={() =>
                scrollToSection("Home")
              }
              whileHover={{
                scale: 1.02,
              }}
              className="flex w-fit items-center gap-3"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-1">
                <img
                  src={logo}
                  alt="Agri-ICS"
                  className="h-full w-full object-contain"
                />
              </div>

              <span className="text-lg font-bold">
                AGRI
                <span className="text-[#B9EE91]">
                  -ICS
                </span>
              </span>

            </motion.button>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/55">

              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    scrollToSection(item.id)
                  }
                  className="transition-colors duration-300 hover:text-white"
                >
                  {item.label}
                </button>
              ))}

            </div>

          </div>

          <div className="mx-auto flex max-w-7xl flex-col gap-2 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">

            <p>
              © {new Date().getFullYear()} Agri-ICS.
              All rights reserved.
            </p>

            <p>
              Smart Agriculture • IoT • LivingLab
            </p>

          </div>

        </footer>

      </div>
    </>
  );
};

export default LandingPage;