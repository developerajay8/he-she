"use client";

import { useEffect, useRef, useState } from "react";

// ── Scroll animation hook ──
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── Animated counter ──
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useInView(0.3);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(target / 55);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(id); }
      else setCount(start);
    }, 28);
    return () => clearInterval(id);
  }, [visible, target]);
  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  { value: 23000, suffix: "k", label: "Styles Created",       display: "23k"  },
  { value: 19,    suffix: "+", label: "Professional Barbers",  display: "19+"  },
  { value: 15,    suffix: "",  label: "Years of Excellence",   display: "15"   },
  { value: 2,     suffix: "M", label: "Clients Served",        display: "2M"   },
];

const barbers = [
  {
    name: "David Smith",
    role: "Lead Barber",
    img: "https://images.unsplash.com/photo-1570158268183-d296b2892211?w=400&h=500&fit=crop&crop=face",
    socials: ["f", "t", "ig", "in"],
  },
  {
    name: "Marcus Lee",
    role: "Senior Stylist",
    img: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=500&fit=crop&crop=face",
    socials: ["f", "t", "ig", "in"],
  },
  {
    name: "James Ortiz",
    role: "Colour Specialist",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=500&fit=crop&crop=face",
    socials: ["f", "t", "ig", "in"],
  },
];

const testimonials = [
  {
    name: "David Smith",
    role: "Loyal Customer",
    review:
      "At The Gentleman's Chair, our mission is to redefine the modern man's grooming experience. From classic haircuts to signature beard trims, we bring precision, passion, and personal care to every client who sits in our chair.",
    stars: 5,
    img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=120&h=120&fit=crop&crop=face",
  },
  {
    name: "Alex Turner",
    role: "Regular Client",
    review:
      "Absolutely love the experience here. Every visit feels premium and the staff are incredibly skilled. The beard sculpting service is next level — highly recommend!",
    stars: 5,
    img: "https://images.unsplash.com/photo-1553267751-1c148a7280a1?w=120&h=120&fit=crop&crop=face",
  },
  {
    name: "Ryan Carter",
    role: "Happy Client",
    review:
      "Best barbershop in town. The atmosphere, the service, the attention to detail — everything is top-notch. I've been coming for two years and I never leave disappointed.",
    stars: 5,
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=face",
  },
];

const galleryImgs = [
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&h=360&fit=crop",
  "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&h=360&fit=crop",
  "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&h=360&fit=crop",
];

export default function StatsTeamReviews() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeBarber, setActiveBarber] = useState(0);

  const gallery   = useInView(0.1);
  const statsRef  = useInView(0.2);
  const teamTitle = useInView(0.2);
  const teamCards = useInView(0.1);
  const revTitle  = useInView(0.2);
  const revCard   = useInView(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@300;400;500;600&display=swap');
        .pf{font-family:'Playfair Display',Georgia,serif;}
        .it{font-family:'Inter',sans-serif;}

        /* Directional animations */
        .from-left  {opacity:0;transform:translateX(-55px);transition:opacity .7s ease,transform .7s cubic-bezier(.22,.68,0,1.2);}
        .from-right {opacity:0;transform:translateX( 55px);transition:opacity .7s ease,transform .7s cubic-bezier(.22,.68,0,1.2);}
        .from-bottom{opacity:0;transform:translateY( 50px);transition:opacity .65s ease,transform .65s cubic-bezier(.22,.68,0,1.2);}
        .from-scale {opacity:0;transform:scale(.88);       transition:opacity .65s ease,transform .65s cubic-bezier(.22,.68,0,1.2);}
        .vis{opacity:1!important;transform:none!important;}

        .barber-card{position:relative;overflow:hidden;cursor:pointer;transition:transform .35s;}
        .barber-card:hover{transform:translateY(-6px);}
        .barber-overlay{
          position:absolute;inset:0;
          background:linear-gradient(to top,rgba(16,12,6,.92) 0%,rgba(16,12,6,.45) 45%,transparent 100%);
          transition:opacity .3s;
        }
        .barber-socials{
          position:absolute;bottom:0;left:0;right:0;
          padding:16px 18px;
          display:flex;align-items:flex-end;justify-content:space-between;
        }
        .social-icons{display:flex;gap:8px;opacity:0;transform:translateY(10px);transition:all .3s;}
        .barber-card:hover .social-icons{opacity:1;transform:translateY(0);}
        .soc{
          width:28px;height:28px;border-radius:50%;
          background:rgba(201,160,76,.15);border:1px solid rgba(201,160,76,.4);
          display:flex;align-items:center;justify-content:center;
          font-size:9px;color:#C9A04C;transition:background .2s;
        }
        .soc:hover{background:rgba(201,160,76,.35);}

        .gold-btn{
          background:#C9A04C;color:#100c06;font-family:'Inter',sans-serif;
          font-weight:600;font-size:13px;letter-spacing:.05em;
          border:none;padding:10px 22px;cursor:pointer;
          transition:background .25s,transform .2s,box-shadow .25s;
        }
        .gold-btn:hover{background:#ddb35c;transform:translateY(-1px);box-shadow:0 6px 20px rgba(201,160,76,.35);}

        .nav-arrow{
          width:38px;height:38px;border:1px solid rgba(201,160,76,.35);
          display:flex;align-items:center;justify-content:center;
          cursor:pointer;transition:all .25s;color:#C9A04C;font-size:14px;
        }
        .nav-arrow:hover{background:#C9A04C;color:#100c06;}

        .star{color:#C9A04C;font-size:16px;}
        .star.empty{color:rgba(201,160,76,.25);}

        .thumb{
          width:48px;height:48px;border-radius:50%;
          border:2px solid rgba(255,255,255,.12);
          overflow:hidden;cursor:pointer;transition:border-color .2s;
        }
        .thumb.active{border-color:#C9A04C;}
        .thumb:hover{border-color:rgba(201,160,76,.6);}

        .gal-img{overflow:hidden;transition:transform .4s;}
        .gal-img:hover img{transform:scale(1.06);}
        .gal-img img{width:100%;height:100%;object-fit:cover;transition:transform .4s;}
      `}</style>

      {/* ══════════════════════════════════════════
           1. PHOTO GALLERY GRID
      ══════════════════════════════════════════ */}
      {/* <section className="bg-[#1a1108] py-16 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div
            ref={gallery.ref}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {galleryImgs.map((src, i) => (
              <div
                key={i}
                className={`gal-img h-52 sm:h-64 ${
                  i === 0 ? "from-left" : i === 1 ? "from-bottom" : "from-right"
                } ${gallery.visible ? "vis" : ""}`}
                style={{ transitionDelay: gallery.visible ? `${i * 0.12}s` : "0s", borderRadius: "3px" }}
              >
                <img src={src} alt={`Gallery ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ══════════════════════════════════════════
           2. STATS BAR  (gold bg)
      ══════════════════════════════════════════ */}
      <section
        ref={statsRef.ref}
        className="bg-[#C9A04C] py-12 overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`from-bottom ${statsRef.visible ? "vis" : ""}`}
                style={{ transitionDelay: statsRef.visible ? `${i * 0.1}s` : "0s" }}
              >
                <p className="pf text-[#100c06] font-bold"
                   style={{ fontSize: "clamp(32px,4vw,52px)", lineHeight: 1.05 }}>
                  {statsRef.visible
                    ? s.label === "Styles Created" ? "23k"
                    : s.label === "Professional Barbers" ? "19+"
                    : s.label === "Years of Excellence" ? "15"
                    : "2M"
                    : "0"}
                </p>
                <p className="it text-[#100c06]/70 text-sm font-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
           3. MEET OUR PROFESSIONALS
      ══════════════════════════════════════════ */}
      <section className="bg-[#100c06] py-20 md:py-28 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

          {/* Title row */}
          <div
            ref={teamTitle.ref}
            className={`flex flex-col sm:flex-row sm:items-end justify-between mb-12 from-bottom ${teamTitle.visible ? "vis" : ""}`}
          >
            <div>
              <p className="it text-[#C9A04C] text-xs font-semibold tracking-[.28em] uppercase mb-3">
                The Team
              </p>
              <h2 className="pf text-white font-bold mb-2"
                  style={{ fontSize: "clamp(28px,3.5vw,44px)" }}>
                Meet Our Professionals
              </h2>
              <p className="it text-white/45 text-sm">Expert hands. Modern style. Classic precision.</p>
            </div>
            <div className="flex gap-2 mt-6 sm:mt-0">
              <button
                className="nav-arrow"
                onClick={() => setActiveBarber(p => (p - 1 + barbers.length) % barbers.length)}
              >←</button>
              <button
                className="nav-arrow"
                onClick={() => setActiveBarber(p => (p + 1) % barbers.length)}
              >→</button>
            </div>
          </div>

          {/* Cards */}
          <div
            ref={teamCards.ref}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {barbers.map((b, i) => (
              <div
                key={b.name}
                className={`barber-card ${
                  i === 0 ? "from-left" : i === 1 ? "from-bottom" : "from-right"
                } ${teamCards.visible ? "vis" : ""}`}
                style={{
                  transitionDelay: teamCards.visible ? `${i * 0.12}s` : "0s",
                  borderRadius: "4px",
                  height: "380px",
                }}
              >
                <img
                  src={b.img}
                  alt={b.name}
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.82) contrast(1.05)" }}
                />
                <div className="barber-overlay" />
                <div className="barber-socials">
                  <div>
                    <p className="pf text-white font-bold text-lg">{b.name}</p>
                    <p className="it text-[#C9A04C] text-xs tracking-wider">{b.role}</p>
                  </div>
                  <div className="social-icons">
                    {["f", "tw", "ig", "in"].map((s) => (
                      <div key={s} className="soc">
                        <span className="it font-bold" style={{ fontSize: "9px" }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
           4. WHAT OUR CLIENTS SAY
      ══════════════════════════════════════════ */}
      <section className="bg-[#1a1108] py-20 md:py-28 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

          {/* Title row */}
          <div
            ref={revTitle.ref}
            className={`flex flex-col sm:flex-row sm:items-end justify-between mb-12 from-bottom ${revTitle.visible ? "vis" : ""}`}
          >
            <div>
              <p className="it text-[#C9A04C] text-xs font-semibold tracking-[.28em] uppercase mb-3">
                Testimonials
              </p>
              <h2 className="pf text-white font-bold mb-2"
                  style={{ fontSize: "clamp(28px,3.5vw,44px)" }}>
                What Our Clients Say
              </h2>
              <p className="it text-white/45 text-sm">Best feedback from our happy clients</p>
            </div>
            <div className="flex gap-2 mt-6 sm:mt-0">
              <button
                className="nav-arrow"
                onClick={() => setActiveTestimonial(p => (p - 1 + testimonials.length) % testimonials.length)}
              >←</button>
              <button
                className="nav-arrow"
                onClick={() => setActiveTestimonial(p => (p + 1) % testimonials.length)}
              >→</button>
            </div>
          </div>

          {/* Testimonial card */}
          <div
            ref={revCard.ref}
            className={`grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center from-bottom ${revCard.visible ? "vis" : ""}`}
          >
            {/* Photo left */}
            <div className="lg:col-span-2">
              <div
                className="relative overflow-hidden mx-auto lg:mx-0"
                style={{ width: "min(280px, 100%)", height: "320px", borderRadius: "4px" }}
              >
                <img
                  src={testimonials[activeTestimonial].img}
                  alt={testimonials[activeTestimonial].name}
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.85)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1108]/60 to-transparent" />
                {/* Gold quote mark */}
                <div className="absolute top-4 right-4 pf text-[#C9A04C] text-6xl leading-none opacity-60">"</div>
              </div>

              {/* Thumbnail row */}
              <div className="flex gap-3 mt-5">
                {testimonials.map((t, i) => (
                  <div
                    key={t.name}
                    className={`thumb ${i === activeTestimonial ? "active" : ""}`}
                    onClick={() => setActiveTestimonial(i)}
                  >
                    <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Content right */}
            <div className="lg:col-span-3">
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`star ${i < testimonials[activeTestimonial].stars ? "" : "empty"}`}>★</span>
                ))}
              </div>

              <p className="pf text-white/85 text-lg md:text-xl leading-[1.7] mb-7 italic">
                &ldquo;{testimonials[activeTestimonial].review}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div className="h-[1px] w-10 bg-[#C9A04C]" />
                <div>
                  <p className="pf text-white font-bold text-base">{testimonials[activeTestimonial].name}</p>
                  <p className="it text-[#C9A04C] text-xs tracking-wider mt-0.5">
                    {testimonials[activeTestimonial].role}
                  </p>
                </div>
              </div>

              <button className="gold-btn mt-8">
                Leave a Review
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
           5. FOOTER STRIP
      ══════════════════════════════════════════ */}
      {/* <footer className="bg-[#0a0704] border-t border-[#C9A04C]/15 py-6">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="it text-white/35 text-xs tracking-wider">
            © 2025 The Gentleman&apos;s Chair. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy", "Terms", "Sitemap"].map((l) => (
              <span key={l} className="it text-white/35 text-xs hover:text-[#C9A04C] cursor-pointer transition-colors">
                {l}
              </span>
            ))}
          </div>
        </div>
      </footer> */}
    </>
  );
}