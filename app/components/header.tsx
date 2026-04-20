"use client";
import { useState, useEffect } from "react";

const navLinks = ["Home", "Services", "Gallery", "Team", "Contact"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a4528]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        }`}
      >
        <div className="px-8 md:px-16 lg:px-24 py-5 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="group flex items-center gap-1"
            onClick={(e) => e.preventDefault()}
          >
            <span
              className="text-white text-3xl font-black tracking-[0.15em] uppercase group-hover:text-[#E8F54B] transition-colors duration-300"
              style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
            >
              BARBR
            </span>
            <span className="w-2 h-2 rounded-full bg-[#FF6B35] group-hover:scale-125 transition-transform duration-300 ml-0.5 mt-0.5" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => setActiveLink(link)}
                className={`relative text-sm uppercase tracking-widest transition-colors duration-300 group ${
                  activeLink === link ? "text-[#E8F54B]" : "text-green-300 hover:text-white"
                }`}
                style={{ fontFamily: "Georgia, sans-serif", fontSize: "11px" }}
              >
                {link}
                <span
                  className={`absolute -bottom-1 left-0 h-[1.5px] bg-[#E8F54B] transition-all duration-300 ${
                    activeLink === link ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Book button - desktop */}
            <button
              className="hidden md:block bg-transparent border border-[#E8F54B] text-[#E8F54B] hover:bg-[#E8F54B] hover:text-[#0d5c35] text-xs font-bold px-5 py-2 rounded-full uppercase tracking-widest transition-all duration-300 hover:scale-105"
              style={{ fontFamily: "Georgia, sans-serif" }}
            >
              Book Now
            </button>

            {/* Three dots menu */}
            <button
              className="flex flex-col gap-[5px] p-2 group"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`block rounded-full bg-white transition-all duration-300 ${
                    menuOpen
                      ? i === 0
                        ? "w-5 h-[2px] rotate-45 translate-y-[7px]"
                        : i === 1
                        ? "w-5 h-[2px] opacity-0"
                        : "w-5 h-[2px] -rotate-45 -translate-y-[7px]"
                      : i === 1
                      ? "w-3 h-[2px]"
                      : "w-5 h-[2px]"
                  }`}
                />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-[#0a4528]/98 backdrop-blur-md px-8 pb-6 flex flex-col gap-4">
            {navLinks.map((link, i) => (
              <button
                key={link}
                onClick={() => {
                  setActiveLink(link);
                  setMenuOpen(false);
                }}
                className={`text-left uppercase tracking-widest text-sm transition-colors duration-200 py-1 border-b border-green-800 ${
                  activeLink === link ? "text-[#E8F54B]" : "text-green-300"
                }`}
                style={{
                  fontFamily: "Georgia, sans-serif",
                  fontSize: "11px",
                  animationDelay: `${i * 50}ms`,
                }}
              >
                {link}
              </button>
            ))}
            <button
              className="mt-2 bg-[#FF6B35] text-white text-xs font-bold px-6 py-3 rounded-full uppercase tracking-widest w-fit"
              style={{ fontFamily: "Georgia, sans-serif" }}
            >
              Book An Appointment
            </button>
          </div>
        </div>
      </header>
    </>
  );
}