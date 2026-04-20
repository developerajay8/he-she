"use client";

import { useState, useEffect, useRef } from "react";

const GALLERY_ITEMS = [
  {
    img: "/gallery/g1.jpg",
    title: "Executive Precision Cut",
    desc: "A refined haircut tailored for leaders — sharp lines, clean finish, and unmatched sophistication.",
    tag: "Haircut",
  },
  {
    img: "/gallery/g2.jpg",
    title: "Elite Beard Craft",
    desc: "Sculpted with razor precision to enhance your jawline and elevate your presence.",
    tag: "Beard",
  },
  {
    img: "/gallery/g3.jpg",
    title: "Skin Fade Mastery",
    desc: "Seamless gradients blended to perfection — bold, clean, and undeniably modern.",
    tag: "Fade",
  },
  {
    img: "/gallery/g4.jpg",
    title: "Luxury Hot Towel Ritual",
    desc: "Indulge in a relaxing shave experience with warm towels, rich lather, and smooth precision.",
    tag: "Shave",
  },
  {
    img: "/gallery/g5.jpg",
    title: "Modern Textured Style",
    desc: "Crafted volume and natural movement designed to hold shape and style all day.",
    tag: "Style",
  },
  {
    img: "/gallery/g6.jpg",
    title: "Signature Royal Package",
    desc: "An all-in-one grooming experience — haircut, beard styling, facial care, and relaxation.",
    tag: "Premium",
  },
];

function useInView(threshold = 0.15) {
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

function GalleryCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useInView(0.1);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        aspectRatio: "3/4",
        overflow: "hidden",
        borderRadius: "2px",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(50px) scale(0.96)",
        transition: `opacity 0.8s ease ${index * 0.12}s, transform 0.8s cubic-bezier(.22,.68,0,1.2) ${index * 0.12}s`,
      }}
    >
      {/* BG image with zoom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${item.img}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: hovered ? "scale(1.1)" : "scale(1)",
          transition: "transform 0.75s cubic-bezier(.22,.68,0,1.2)",
        }}
      />

      {/* Gradient overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(to top, rgba(10,7,3,0.96) 0%, rgba(10,7,3,0.6) 50%, rgba(10,7,3,0.15) 100%)"
            : "linear-gradient(to top, rgba(10,7,3,0.55) 0%, rgba(10,7,3,0.1) 60%, transparent 100%)",
          transition: "background 0.55s ease",
        }}
      />

      {/* Gold shimmer line on hover — top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "2px",
          background: "linear-gradient(to right, transparent, #C9A04C, transparent)",
          width: hovered ? "100%" : "0%",
          transition: "width 0.55s ease",
        }}
      />

      {/* Tag pill */}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          background: "#C9A04C",
          color: "#100c06",
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          padding: "5px 14px",
          borderRadius: "1px",
          fontFamily: "'Inter', sans-serif",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        {item.tag}
      </div>

      {/* Hover content */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "28px 24px",
          transform: hovered ? "translateY(0)" : "translateY(20px)",
          opacity: hovered ? 1 : 0,
          transition: "transform 0.5s cubic-bezier(.22,.68,0,1.2) 0.05s, opacity 0.45s ease 0.05s",
        }}
      >
        {/* Gold tag on hover */}
        <span
          style={{
            display: "inline-block",
            color: "#C9A04C",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontFamily: "'Inter', sans-serif",
            marginBottom: "10px",
          }}
        >
          — {item.tag}
        </span>

        <h3
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "#fff",
            fontSize: "20px",
            fontWeight: 700,
            margin: "0 0 10px",
            lineHeight: 1.2,
          }}
        >
          {item.title}
        </h3>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "rgba(255,255,255,0.68)",
            fontSize: "13px",
            lineHeight: 1.65,
            margin: "0 0 18px",
          }}
        >
          {item.desc}
        </p>

        {/* Animated arrow link */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#C9A04C",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <span>View More</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function GallerySection() {
  const [headRef, headVisible] = useInView(0.1);

  return (
    <section style={{ background: "#100c06", padding: "100px 0 110px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;800&family=Inter:wght@300;400;500;600;700&display=swap');
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px) { .gallery-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .gallery-grid { grid-template-columns: 1fr; } }
        .gallery-view-btn {
          background: transparent;
          border: 1px solid rgba(201,160,76,0.45);
          color: #C9A04C;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 15px 44px;
          border-radius: 1px;
          cursor: pointer;
          transition: background 0.3s, color 0.3s, border-color 0.3s, transform 0.2s;
        }
        .gallery-view-btn:hover {
          background: #C9A04C;
          color: #100c06;
          border-color: #C9A04C;
          transform: translateY(-2px);
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Section heading */}
        <div
          ref={headRef}
          style={{
            textAlign: "center",
            marginBottom: "64px",
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(.22,.68,0,1.2)",
          }}
        >
          {/* Decorative lines */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "18px" }}>
            <div style={{ height: "1px", width: "48px", background: "linear-gradient(to right, transparent, #C9A04C)" }} />
            <svg width="12" height="12" viewBox="0 0 12 12" fill="#C9A04C">
              <rect x="5" y="0" width="2" height="12" /><rect x="0" y="5" width="12" height="2" />
            </svg>
            <div style={{ height: "1px", width: "48px", background: "linear-gradient(to left, transparent, #C9A04C)" }} />
          </div>

          <p style={{
            color: "#C9A04C",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            fontFamily: "'Inter', sans-serif",
            marginBottom: "16px",
          }}>
            OUR CRAFT
          </p>

          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "#fff",
            fontSize: "clamp(34px, 4.5vw, 58px)",
            fontWeight: 800,
            lineHeight: 1.08,
            margin: "0 0 18px",
          }}>
            Crafted for <span style={{ color: "#C9A04C" }}>Gentlemen</span>
          </h2>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            color: "rgba(255,255,255,0.5)",
            fontSize: "15px",
            lineHeight: 1.7,
            maxWidth: "460px",
            margin: "0 auto",
          }}>
            Experience grooming redefined — where precision meets luxury and every detail matters.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {GALLERY_ITEMS.map((item, i) => (
            <GalleryCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "54px" }}>
          <button className="gallery-view-btn">VIEW FULL COLLECTION</button>
        </div>
      </div>
    </section>
  );
}