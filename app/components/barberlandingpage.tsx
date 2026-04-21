"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home",      href: "home" },
  { label: "Services",  href: "services" },
  { label: "About Us",  href: "about" },
  { label: "Plans",     href: "plans" },
  { label: "Resources", href: "resources" },
  { label: "Contact",   href: "contact" },
];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function HeaderHero() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [active,      setActive]      = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Google Fonts (one-time import, no CSS-in-JS) ── */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
      />

      {/* ════════════════════════════════
           HEADER
      ════════════════════════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0d0904]/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.6)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 py-4 flex items-center justify-between gap-6">

          {/* ── Logo ── */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-full border border-[#C9A04C]/60 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="#C9A04C" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="6" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <line x1="20" y1="4"    x2="8.12" y2="15.88" />
                <line x1="14.47" y1="14.48" x2="20" y2="20" />
                <line x1="8.12" y1="8.12"  x2="12" y2="12" />
              </svg>
            </div>
            <div className="leading-none">
              <p className="text-[#C9A04C] text-[10px] font-semibold tracking-[0.22em] uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Style N
              </p>
              <p className="text-white text-[15px] font-bold tracking-[0.18em] uppercase"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Razors
              </p>
            </div>
          </div>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => { setActive(link.label); scrollTo(link.href); }}
                className={`relative pb-0.5 text-[13.5px] font-medium tracking-[0.025em] bg-transparent border-none cursor-pointer transition-colors duration-200
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-[#C9A04C] after:transition-all after:duration-300
                  ${active === link.label
                    ? "text-[#C9A04C] after:w-full"
                    : "text-white/80 hover:text-white after:w-0 hover:after:w-full"
                  }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* ── CTA + Hamburger ── */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo("contact")}
              className="hidden sm:block text-sm font-semibold tracking-[0.04em] px-5 py-2.5 rounded-sm
                bg-[#C9A04C] text-[#100c06] border-none cursor-pointer
                transition-all duration-200 hover:bg-[#ddb35c] hover:shadow-[0_6px_24px_rgba(201,160,76,0.35)] hover:-translate-y-px active:scale-95"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Get a Free Quote
            </button>

            {/* Hamburger */}
            <button
              className="lg:hidden flex flex-col gap-[5px] p-1.5 bg-transparent border-none cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? "w-5 translate-y-[6.5px] rotate-45" : "w-5"}`} />
              <span className={`block h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? "w-5 opacity-0" : "w-3"}`} />
              <span className={`block h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? "w-5 -translate-y-[6.5px] -rotate-45" : "w-5"}`} />
            </button>
          </div>
        </div>

        {/* ── Mobile Nav ── */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-80" : "max-h-0"}`}>
          <div className="bg-[#0d0904]/98 px-8 pb-6 pt-2 flex flex-col gap-5 border-t border-[#C9A04C]/20">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => { setActive(link.label); setMobileOpen(false); scrollTo(link.href); }}
                className={`text-sm font-medium text-left bg-transparent border-none cursor-pointer transition-colors duration-200
                  ${active === link.label ? "text-[#C9A04C]" : "text-white/80 hover:text-white"}`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { setMobileOpen(false); scrollTo("contact"); }}
              className="w-fit text-sm font-semibold tracking-[0.04em] px-5 py-2.5 rounded-sm
                bg-[#C9A04C] text-[#100c06] border-none cursor-pointer
                transition-all duration-200 hover:bg-[#ddb35c]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Get a Free Quote
            </button>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════
           HERO SECTION
           → apni image /public/hero-bg.jpg me rakh do
      ════════════════════════════════ */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col justify-between bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#100c06]/92 via-[#100c06]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#100c06] via-transparent to-[#100c06]/30" />

        {/* ── Hero Content ── */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-[1280px] w-full mx-auto px-6 md:px-10 lg:px-16 pt-28 pb-10">
            <div className="max-w-xl">

              {/* Eyebrow — animate-fade-up */}
              <p
                className="text-[#C9A04C] text-xs font-semibold tracking-[0.3em] uppercase mb-5
                  opacity-0 animate-[fadeUp_0.75s_cubic-bezier(.22,.68,0,1.2)_0.15s_forwards]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Unisex Salon &amp; Makeup Studio · Est. 2010
              </p>

              {/* Headline */}
              <h1
                className="text-white font-bold leading-[1.08] mb-6
                  opacity-0 animate-[fadeUp_0.75s_cubic-bezier(.22,.68,0,1.2)_0.35s_forwards]"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(38px, 5.5vw, 72px)",
                }}
              >
                We Are Looking<br />
                To Make You<br />
                <span className="text-[#C9A04C]">Beautiful</span>
              </h1>

              {/* Sub */}
              <p
                className="text-white/65 text-sm md:text-base leading-relaxed mb-8 max-w-sm
                  opacity-0 animate-[fadeUp_0.75s_cubic-bezier(.22,.68,0,1.2)_0.5s_forwards]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                We&rsquo;re more than just a salon — we&rsquo;re a lifestyle destination for
                the modern gentleman &amp; lady.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 items-center
                opacity-0 animate-[fadeUp_0.75s_cubic-bezier(.22,.68,0,1.2)_0.5s_forwards]">
                <button
                  onClick={() => scrollTo("contact")}
                  className="text-sm font-semibold tracking-[0.04em] px-7 py-3 rounded-sm
                    bg-[#C9A04C] text-[#100c06] border-none cursor-pointer
                    transition-all duration-200 hover:bg-[#ddb35c] hover:-translate-y-px hover:shadow-[0_6px_24px_rgba(201,160,76,0.35)]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Get a Free Quote
                </button>
                <button
                  onClick={() => scrollTo("services")}
                  className="text-white/80 text-sm font-medium px-7 py-3 rounded-sm
                    bg-transparent border border-white/25 cursor-pointer
                    transition-all duration-200 hover:border-[#C9A04C]/60 hover:text-[#C9A04C]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Our Services
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Info Bar ── */}
        <div className="relative z-10 border-t border-[#C9A04C]/20 bg-[#0d0904]/80 backdrop-blur-sm">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#C9A04C]/20">

              {/* Location */}
              <div className="flex items-start gap-4 py-6 sm:pr-10">
                <div className="mt-0.5 shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="#C9A04C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[#C9A04C] text-xs font-semibold tracking-[0.18em] uppercase mb-1"
                    style={{ fontFamily: "'Inter', sans-serif" }}>Location</p>
                  <p className="text-white/75 text-sm leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}>
                    Shop No. 2, Plot No. 403–404,<br />
                    80 Feet Road, Jhotwara, Jaipur-12
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start gap-4 py-6 sm:px-10">
                <div className="mt-0.5 shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="#C9A04C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.03 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[#C9A04C] text-xs font-semibold tracking-[0.18em] uppercase mb-1"
                    style={{ fontFamily: "'Inter', sans-serif" }}>Contact</p>
                  <p className="text-white/75 text-sm leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}>
                    +91 95094 84341<br />
                    @stylenrazors
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 py-6 sm:pl-10">
                <div className="mt-0.5 shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="#C9A04C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[#C9A04C] text-xs font-semibold tracking-[0.18em] uppercase mb-1"
                    style={{ fontFamily: "'Inter', sans-serif" }}>Opening Hours</p>
                  <p className="text-white/75 text-sm leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}>
                    Mon to Fri: 9:00am – 8:30pm<br />
                    Sat: 10:00am – 6:30pm<br />
                    <span className="text-[#C9A04C]/80">Sun: Closed</span>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}