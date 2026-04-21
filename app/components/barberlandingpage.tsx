"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = ["Home", "Services", "About", "Gallery", "Pricing", "Contact"];

export default function BarberLandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 🔥 Smooth Scroll Function
  const handleScroll = (section: string) => {
    setActive(section);
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#100c06] font-sans">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .font-serif-display { font-family: 'Playfair Display', Georgia, serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        .anim-fade-up-1 { animation: fadeUp 0.75s cubic-bezier(.22,.68,0,1.2) 0.15s both; }
        .anim-fade-up-2 { animation: fadeUp 0.75s cubic-bezier(.22,.68,0,1.2) 0.35s both; }
        .anim-fade-up-3 { animation: fadeUp 0.75s cubic-bezier(.22,.68,0,1.2) 0.5s  both; }
        .anim-fade-in   { animation: fadeIn 1.2s ease 0.1s both; }
        .gold-btn {
          background: #C9A04C;
          color: #100c06;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          letter-spacing: 0.04em;
          transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
        }
        .gold-btn:hover {
          background: #ddb35c;
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(201,160,76,0.35);
        }
        .gold-btn:active { transform: scale(0.97); }
        .nav-link-item {
          position: relative;
          font-size: 13.5px;
          font-weight: 500;
          letter-spacing: 0.025em;
          color: rgba(255,255,255,0.82);
          cursor: pointer;
          padding-bottom: 3px;
          transition: color 0.2s;
        }
        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1.5px;
          background: #C9A04C;
          transition: width 0.3s;
        }
        .nav-link-item:hover { color: #fff; }
        .nav-link-item:hover::after,
        .nav-link-item.active::after { width: 100%; }
        .nav-link-item.active { color: #C9A04C; }
        .info-divider {
          width: 1px;
          background: rgba(201,160,76,0.25);
          align-self: stretch;
        }
      `}</style>

      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0d0904]/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.6)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 py-4 flex items-center justify-between gap-6">

          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
           <img src="/image copy 1.png" className="w-[90px]" alt="He & She Salon Logo" />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <span
                key={link}
                className={`nav-link-item ${active === link ? "active" : ""}`}
                onClick={() => handleScroll(link)}
              >
                {link}
              </span>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="gold-btn hidden sm:block text-sm px-5 py-2.5 rounded-sm">
              Book Appointment
            </button>

            {/* Hamburger */}
            <button
              className="lg:hidden flex flex-col gap-[5px] p-1.5 group"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`block h-[1.5px] bg-white transition-all duration-300 ${
                    mobileOpen
                      ? i === 0 ? "w-5 translate-y-[6.5px] rotate-45"
                      : i === 1 ? "w-5 opacity-0"
                      : "w-5 -translate-y-[6.5px] -rotate-45"
                      : i === 1 ? "w-3" : "w-5"
                  }`}
                />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-400 ${
            mobileOpen ? "max-h-80" : "max-h-0"
          }`}
        >
          <div className="bg-[#0d0904]/98 px-8 pb-6 pt-2 flex flex-col gap-5 border-t border-[#C9A04C]/20">
            {NAV_LINKS.map((link) => (
              <span
                key={link}
                className={`nav-link-item text-sm ${active === link ? "active" : ""}`}
                onClick={() => handleScroll(link)}
              >
                {link}
              </span>
            ))}
            <button className="gold-btn text-sm px-5 py-2.5 rounded-sm w-fit mt-1">
              Book Appointment
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
        id="Home"
        className="relative min-h-screen flex flex-col justify-between anim-fade-in"
        style={{
          backgroundImage: "url('/image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#100c06]/90 via-[#100c06]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#100c06] via-transparent to-[#100c06]/30" />

        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-[1280px] w-full mx-auto px-6 md:px-10 lg:px-16 pt-28 pb-10">
            <div className="max-w-2xl">

              <p className="anim-fade-up-1 text-[#C9A04C] text-xs font-semibold tracking-[0.3em] uppercase mb-5">
                He & She Salon · Hair · Makeup · Beauty
              </p>

              <h1 className="anim-fade-up-2 font-serif-display text-white font-bold leading-[1.08] mb-6"
                style={{ fontSize: "clamp(38px, 5.5vw, 72px)" }}>
                Style That Defines<br />
                Your <span className="text-[#C9A04C]">Personality</span>
              </h1>

              <p className="anim-fade-up-3 text-white/65 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
                Welcome to He & She Salon – your trusted destination for stylish haircuts, professional grooming, and beauty services for both men & women.
              </p>

              <div className="anim-fade-up-3 flex flex-wrap gap-4 items-center">
                <button className="gold-btn text-sm px-7 py-3 rounded-sm">
                  Book Appointment
                </button>

                <button
                  className="text-white/80 text-sm font-medium border border-white/25 hover:border-[#C9A04C]/60 hover:text-[#C9A04C] px-7 py-3 rounded-sm transition-all duration-250"
                >
                  View Services
                </button>
              </div>
            </div>
          </div>
        </div>

        
      </section>

    </div>
  );
}