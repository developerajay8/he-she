"use client";

import { useState, useEffect, useRef } from "react";

const MENU_ITEMS = [
  {
    name: "Classic Haircut",
    desc: "Precision cut tailored to your face shape, lifestyle, and personal style.",
    price: "₹299",
    duration: "30 min",
    popular: false,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" />
        <line x1="14.47" y1="14.48" x2="20" y2="20" />
        <line x1="8.12" y1="8.12" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    name: "Beard Trim & Shape",
    desc: "Expert sculpting with a straight razor to define your jawline and style.",
    price: "₹199",
    duration: "20 min",
    popular: false,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    name: "Hot Towel Shave",
    desc: "A ritual of luxury — warm steam, premium lather, and a flawless smooth finish.",
    price: "₹349",
    duration: "45 min",
    popular: true,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    name: "Skin Fade",
    desc: "Zero to natural — a flawless gradient blending that turns heads everywhere.",
    price: "₹399",
    duration: "45 min",
    popular: false,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
      </svg>
    ),
  },
  {
    name: "Hair Colour Treatment",
    desc: "Premium colour with toning, deep conditioning and UV protection finish.",
    price: "₹799",
    duration: "90 min",
    popular: false,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    name: "Royal Grooming Package",
    desc: "Cut + beard + hot towel shave + scalp massage. The full gentleman experience.",
    price: "₹899",
    duration: "90 min",
    popular: true,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function ServiceCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useInView(0.08);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered
          ? "linear-gradient(135deg, rgba(201,160,76,0.14) 0%, rgba(201,160,76,0.04) 100%)"
          : "rgba(255,255,255,0.03)",
        border: hovered ? "1px solid rgba(201,160,76,0.55)" : "1px solid rgba(255,255,255,0.08)",
        borderRadius: "2px",
        padding: "32px 28px",
        cursor: "pointer",
        transition: "background 0.4s ease, border-color 0.4s ease, transform 0.4s cubic-bezier(.22,.68,0,1.2)",
        transform: visible
          ? hovered ? "translateY(-6px)" : "translateY(0)"
          : "translateY(48px)",
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${index * 0.1}s` : "0s",
        overflow: "hidden",
      }}
    >
      {/* Popular badge */}
      {item.popular && (
        <div style={{
          position: "absolute",
          top: 0,
          right: 0,
          background: "#C9A04C",
          color: "#100c06",
          fontSize: "8.5px",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontFamily: "'Inter', sans-serif",
          padding: "5px 14px",
          borderBottomLeftRadius: "2px",
        }}>
          Popular
        </div>
      )}

      {/* Top: icon + duration */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
        <div
          style={{
            width: "54px",
            height: "54px",
            borderRadius: "2px",
            background: hovered ? "#C9A04C" : "rgba(201,160,76,0.12)",
            color: hovered ? "#100c06" : "#C9A04C",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.4s, color 0.4s",
            flexShrink: 0,
          }}
        >
          {item.icon}
        </div>

        <div style={{ textAlign: "right" }}>
          <p style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "#C9A04C",
            fontSize: "24px",
            fontWeight: 800,
            margin: "0 0 2px",
            lineHeight: 1,
          }}>
            {item.price}
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            color: "rgba(255,255,255,0.4)",
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            margin: 0,
          }}>
            {item.duration}
          </p>
        </div>
      </div>

      {/* Content */}
      <h3 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        color: "#fff",
        fontSize: "18px",
        fontWeight: 700,
        margin: "0 0 10px",
        lineHeight: 1.2,
        transition: "color 0.3s",
      }}>
        {item.name}
      </h3>

      <p style={{
        fontFamily: "'Inter', sans-serif",
        color: "rgba(255,255,255,0.52)",
        fontSize: "13px",
        lineHeight: 1.65,
        margin: "0 0 22px",
      }}>
        {item.desc}
      </p>

      {/* Book now link */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        color: hovered ? "#C9A04C" : "rgba(255,255,255,0.35)",
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        fontFamily: "'Inter', sans-serif",
        transition: "color 0.3s",
      }}>
        <span>Book Now</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{
            transform: hovered ? "translateX(5px)" : "translateX(0)",
            transition: "transform 0.3s ease",
          }}
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>

      {/* Bottom border reveal on hover */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        height: "2px",
        background: "#C9A04C",
        width: hovered ? "100%" : "0%",
        transition: "width 0.45s ease",
      }} />
    </div>
  );
}

export default function Services() {
  const [headRef, headVisible] = useInView(0.1);
  const [activeFilter, setActiveFilter] = useState("All");
  const FILTERS = ["All", "Haircut", "Beard", "Shave", "Treatment", "Package"];

  return (
    <section style={{ background: "#100c06", padding: "100px 0 110px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;800&family=Inter:wght@300;400;500;600;700&display=swap');

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        @media (max-width: 1024px) { .menu-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px)  { .menu-grid { grid-template-columns: 1fr; } }

        .filter-btn {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 9px 20px;
          border-radius: 1px;
          cursor: pointer;
          transition: all 0.3s;
          border: 1px solid transparent;
        }
        .filter-btn.active {
          background: #C9A04C;
          color: #100c06;
          border-color: #C9A04C;
        }
        .filter-btn.inactive {
          background: transparent;
          color: rgba(255,255,255,0.45);
          border-color: rgba(255,255,255,0.12);
        }
        .filter-btn.inactive:hover {
          color: #C9A04C;
          border-color: rgba(201,160,76,0.45);
        }

        .cta-bar {
          background: rgba(201,160,76,0.07);
          border: 1px solid rgba(201,160,76,0.2);
          border-radius: 2px;
          padding: 36px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          margin-top: 60px;
          flex-wrap: wrap;
        }
        .cta-book-btn {
          background: #C9A04C;
          color: #100c06;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 15px 36px;
          border: none;
          border-radius: 1px;
          cursor: pointer;
          transition: background 0.3s, transform 0.2s;
          white-space: nowrap;
        }
        .cta-book-btn:hover { background: #dbb95e; transform: translateY(-2px); }
      `}</style>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Section heading */}
        <div
          ref={headRef}
          style={{
            textAlign: "center",
            marginBottom: "48px",
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(.22,.68,0,1.2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "18px" }}>
            <div style={{ height: "1px", width: "52px", background: "linear-gradient(to right, transparent, #C9A04C)" }} />
            <svg width="10" height="10" viewBox="0 0 10 10" fill="#C9A04C">
              <rect x="4" y="0" width="2" height="10" /><rect x="0" y="4" width="10" height="2" />
            </svg>
            <div style={{ height: "1px", width: "52px", background: "linear-gradient(to left, transparent, #C9A04C)" }} />
          </div>

          <p style={{
            color: "#C9A04C",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            fontFamily: "'Inter', sans-serif",
            marginBottom: "14px",
          }}>
            Our Services
          </p>

          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "#fff",
            fontSize: "clamp(32px, 4.5vw, 56px)",
            fontWeight: 800,
            lineHeight: 1.08,
            margin: "0 0 16px",
          }}>
            Premium <span style={{ color: "#C9A04C" }}>Grooming</span> Menu
          </h2>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            color: "rgba(255,255,255,0.5)",
            fontSize: "15px",
            lineHeight: 1.7,
            maxWidth: "460px",
            margin: "0 auto",
          }}>
            From quick cuts to complete grooming rituals — choose the service crafted for you.
          </p>
        </div>

        {/* Filter tabs */}
        {/* <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "44px",
            opacity: headVisible ? 1 : 0,
            transition: "opacity 0.8s ease 0.2s",
          }}
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn ${activeFilter === f ? "active" : "inactive"}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div> */}

        {/* Services grid */}
        <div className="menu-grid">
          {MENU_ITEMS.map((item, i) => (
            <ServiceCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* Bottom CTA bar */}
        <div
          className="cta-bar"
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s",
          }}
        >
          <div>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              color: "#fff",
              fontSize: "20px",
              fontWeight: 700,
              margin: "0 0 6px",
            }}>
              Not sure what you need?
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(255,255,255,0.5)",
              fontSize: "13px",
              margin: 0,
            }}>
              Walk in or call us — our barbers will guide you to the perfect look.
            </p>
          </div>
          <div style={{ display: "flex", gap: "14px", alignItems: "center", flexWrap: "wrap" }}>
            <a
              href="tel:+911234567890"
              style={{
                color: "#C9A04C",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.03 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              +91 12345 67890
            </a>
            <button className="cta-book-btn">Book Appointment</button>
          </div>
        </div>

      </div>
    </section>
  );
}