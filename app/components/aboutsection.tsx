"use client";

import { useEffect, useRef, useState } from "react";

// ── Reusable scroll-triggered animation hook ──
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const services = [
  { icon: "✂", title: "Hair Cutting",    desc: "Professional haircuts for men & women tailored to your style." },
  { icon: "🪒", title: "Beard Styling",   desc: "Sharp beard trims and styling for a clean and classy look." },
  { icon: "💇‍♀️", title: "Hair Styling",   desc: "Trendy hairstyles and blow-dry styling for every occasion." },
  { icon: "🎨", title: "Hair Coloring",   desc: "Modern hair coloring services from natural to bold shades." },
  { icon: "💆", title: "Hair Spa",        desc: "Relaxing hair spa treatments for healthy and shiny hair." },
  { icon: "👑", title: "Makeup & Beauty", desc: "Complete beauty and makeup services for special events." },
];

export default function AboutSection() {
  const left  = useInView();
  const right = useInView();
  const title = useInView();
  const grid  = useInView(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@300;400;500;600&display=swap');
        .pf{font-family:'Playfair Display',Georgia,serif;}
        .it{font-family:'Inter',sans-serif;}

        .slide-left  { opacity:0; transform:translateX(-60px); transition:opacity .75s ease, transform .75s cubic-bezier(.22,.68,0,1.2); }
        .slide-right { opacity:0; transform:translateX( 60px); transition:opacity .75s ease, transform .75s cubic-bezier(.22,.68,0,1.2); }
        .slide-up    { opacity:0; transform:translateY( 50px); transition:opacity .7s ease,  transform .7s  cubic-bezier(.22,.68,0,1.2); }
        .in          { opacity:1!important; transform:none!important; }

        .stagger > *:nth-child(1){transition-delay:.05s}
        .stagger > *:nth-child(2){transition-delay:.15s}
        .stagger > *:nth-child(3){transition-delay:.25s}
        .stagger > *:nth-child(4){transition-delay:.35s}
        .stagger > *:nth-child(5){transition-delay:.45s}
        .stagger > *:nth-child(6){transition-delay:.55s}

        .gold-btn{
          background:#C9A04C; color:#100c06;
          font-family:'Inter',sans-serif; font-weight:600;
          font-size:13px; letter-spacing:.05em;
          border:none; padding:12px 28px; cursor:pointer;
          transition:background .25s, transform .2s, box-shadow .25s;
        }
        .gold-btn:hover{background:#ddb35c;transform:translateY(-2px);box-shadow:0 8px 24px rgba(201,160,76,.35);}
        .gold-btn:active{transform:scale(.97);}

        .svc-card{
          background:rgba(255,255,255,.04);
          border:1px solid rgba(201,160,76,.12);
          padding:26px 22px; transition:all .3s;
          opacity:0; transform:translateY(40px);
          transition:opacity .6s ease, transform .6s cubic-bezier(.22,.68,0,1.2),
                      background .3s, border-color .3s, box-shadow .3s;
        }
        .svc-card.in{opacity:1;transform:none;}
        .svc-card:hover{background:rgba(201,160,76,.08);border-color:rgba(201,160,76,.35);box-shadow:0 8px 32px rgba(0,0,0,.3);}

        .icon-wrap{
          width:44px;height:44px;border-radius:50%;
          background:rgba(201,160,76,.12); border:1px solid rgba(201,160,76,.3);
          display:flex;align-items:center;justify-content:center;
          font-size:18px;margin-bottom:16px;transition:background .3s;
        }
        .svc-card:hover .icon-wrap{background:rgba(201,160,76,.25);}
      `}</style>

      {/* SECTION 1 */}
      <section id="About" className="bg-[#1a1108] py-20 md:py-28 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* LEFT IMAGE */}
            <div
              ref={left.ref}
              className={`slide-left ${left.visible ? "in" : ""}`}
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-[#C9A04C]/50 z-10" />
                <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-[#C9A04C]/50 z-10" />

                <div className="relative overflow-hidden" style={{ borderRadius: "4px" }}>
                  <img
                    src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=680&fit=crop&crop=center"
                    alt="Salon Work"
                    className="w-full h-[460px] object-cover"
                    style={{ filter: "brightness(0.88) contrast(1.05)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1a1108]/40 via-transparent to-transparent" />
                </div>

                <div className="absolute bottom-6 left-6 bg-[#C9A04C] px-5 py-3 z-20">
                  <p className="it text-[#100c06] text-xs font-semibold tracking-widest uppercase">He & She Salon</p>
                </div>
              </div>
            </div>

            {/* RIGHT TEXT */}
            <div
              ref={right.ref}
              className={`slide-right ${right.visible ? "in" : ""}`}
            >
              <p className="it text-[#C9A04C] text-xs font-semibold tracking-[.28em] uppercase mb-4">
                About Salon
              </p>

              <h2 className="pf text-white font-bold leading-[1.1] mb-4"
                  style={{ fontSize: "clamp(32px,4vw,52px)" }}>
                Best Hair & Beauty<br />Salon For You
              </h2>

              <p className="it text-[#C9A04C]/80 text-sm mb-6">
                Style • Confidence • Personality
              </p>

              <p className="it text-white/60 text-sm leading-[1.85] mb-8 max-w-[420px]">
                He & She Salon offers professional hair cutting, styling, beard grooming,
                and beauty services for both men and women. Our goal is to give you a
                fresh, confident, and stylish look every time you visit.
              </p>

              <div className="flex gap-8 mb-10 border-t border-[#C9A04C]/15 pt-8">
                {[["5+", "Years Experience"], ["1000+", "Happy Clients"], ["10+", "Services"]].map(([n, l]) => (
                  <div key={l}>
                    <p className="pf text-[#C9A04C] text-2xl font-bold">{n}</p>
                    <p className="it text-white/50 text-xs mt-0.5">{l}</p>
                  </div>
                ))}
              </div>

              <button className="gold-btn">Book Appointment</button>
            </div>

          </div>
        </div>
      </section>

    </>
  );
}