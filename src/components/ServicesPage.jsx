import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

/* ------------------------------
   PARTICLE EFFECT
------------------------------ */
function useParticles() {
  const ref = useRef();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 150 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.4 + 0.2,
    }));

    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.shadowBlur = 20;
      ctx.shadowColor = "rgba(240,200,80,0.8)";

      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(240,200,80,${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }

      requestAnimationFrame(draw);
    }

    draw();
  }, []);

  return ref;
}

/* ------------------------------
   REUSABLE CARD
------------------------------ */
/* ----------------------------------------
   SERVICE CARD — with animated price & Save ₹X badge
----------------------------------------- */
function ServiceCard({ title, price, oldPrice, list, highlight }) {
  // Convert ₹ strings → numbers
  const toNum = (v) => Number(String(v).replace(/[^0-9]/g, ""));
  const newP = toNum(price);
  const oldP = oldPrice ? toNum(oldPrice) : null;

  const saveX = oldP ? oldP - newP : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4 }}
      className={`relative rounded-2xl p-6 backdrop-blur-md border 
        ${highlight ? "border-yellow-400/70 shadow-[0_0_25px_rgba(255,200,100,0.35)]" : "border-white/10"}
        bg-white/5 overflow-hidden`}
    >

      {/* SAVE BADGE */}
      {oldPrice && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute -top-1 -right-1 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg"
        >
          Save ₹{saveX}
        </motion.div>
      )}

      {/* BEST VALUE BADGE */}
      {highlight && (
        <div className="absolute top-0 left-0 text-xs px-3 py-1 bg-yellow-500 text-black rounded-full font-semibold shadow">
          Best Value
        </div>
      )}

      {/* title */}
      <h3 className="text-xl font-bold mb-3">{title}</h3>

      {/* price animation */}
      <div className="flex items-end gap-2 mb-4">
        <motion.span
          key={price} // trigger animation on load
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold text-yellow-400"
        >
          {price}
        </motion.span>

        {oldPrice && (
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-lg text-gray-400 line-through"
          >
            {oldPrice}
          </motion.span>
        )}
      </div>

      {/* list */}
      <ul className="space-y-2 text-gray-300">
        {list.map((li, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-yellow-400">•</span> {li}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}


/* ------------------------------
   MAIN SERVICES PAGE
------------------------------ */
export default function ServicesPage() {
  const particleRef = useParticles();

  return (
    <div className="relative bg-[#0d0d0d] text-white overflow-hidden">

    {/* PARTICLES */}
    <canvas
      ref={particleRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-80"
    />

    {/* TOP WAVE (subtle) */}
    <div className="w-full overflow-hidden">
      <svg className="w-full" height="120" viewBox="0 0 1440 320" fill="none" preserveAspectRatio="none">
        <path d="M0,96L120,122.7C240,149,480,203,720,186.7C960,171,1200,85,1320,42.7L1440,0V320H0Z" fill="#0d0d0d" />
      </svg>
    </div>

    {/* SECTION – INDIVIDUAL */}
    <section className="max-w-7xl mx-auto px-6 md:px-12 pt-14 pb-0">
      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center mb-8"
      >
        Individual Creator Packages
      </motion.h1>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <ServiceCard
          title="Shoot Only"
          price="₹5,499"
          oldPrice="₹6,499"
          list={[
            "Half day shoot (4 hours)",
            "Shoot + Raw files delivered",
            " Upgrade to full day shoot( 8hrs) at ₹1999/- extra only",
          ]}
        />

        <ServiceCard
          title="Starter Spotlight"
          price="₹7,999"
          oldPrice="₹8,499"
          list={[
            "3 Edited Reels",
            "4 hours of professional coverage",
            "High-quality raw files included",
          ]}
        />

        <ServiceCard
          title="Creator's Edge"
          price="₹9,999"
          oldPrice="₹11,499"
          highlight
          list={[
            "8 hours professional coverage",
            "4 Edited Reels (1 Premium + 3 Standard)",
            "Cinematic lighting & framing",
            "Professional grade color correction & audio sync",
            "High-quality raw files included.*"
          ]}
        />

        <ServiceCard
          title="Elite Impact"
          price="₹11,499"
          oldPrice="₹14,499"
          list={[
            "8 hours professional coverage",
            "6 Edited Reels (2 Premium + 4 Standard)",
            "Cinematic lighting & framing",
            "Professional grade color correction & audio sync",
            "High-quality raw files included.*"
          ]}
        />

        <ServiceCard
          title="Editing Only"
          price="Starting ₹999"
          list={[
            "Edit from your raw footage",
            "Perfectly polished, Smooth cuts Insta-Ready reel",
            " Upgrade to Premium Editing (Advance effects, Transitions, Pro finish) at ₹499/- extra per reel only",
          ]}
        />
      </div>
    </section>

    {/* SMALLER DIVIDER (reduced gap) */}
    <div className="w-full mt-6 mb-6">
      <svg className="w-full" height="80" viewBox="0 0 1440 160" preserveAspectRatio="none">
        <path d="M0,128L120,144C240,160,480,192,720,192C960,192,1200,160,1320,144L1440,128V160H0Z" fill="#111827" opacity="0.9" />
      </svg>
    </div>

    {/* SECTION – BRANDS */}
    <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center mb-8"
      >
        Brand Packages
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-8">
        <ServiceCard
          title="Ignite Pack"
          price="₹12,999"
          oldPrice="₹14,999"
          list={[
            "1 Reel per week (Total 4)",
            "Smooth transitions",
            "Optimized captions & hashtags",
            " Professional color grading",
            "High-quality raw files included",
          ]}
        />

        <ServiceCard
          title="Dominate Pack"
          price="₹34,999"
          oldPrice="₹45,999"
          highlight
          list={[
            "4 reel per week (Total of 16)",
            "Advanced grading + animated text",
            "Professional transitions + smooth motion cuts",
            "Hooks + thumbnail design",
            "On-brand captioning",
            "One FREE bonus reel",
            "High-quality raw files delivered*"
          ]}
        />

        <ServiceCard
          title="Elevate Pack"
          price="₹21,999"
          oldPrice="₹24,999"
          list={[
            "2 reel per week (Total of 8)",
            "Professional color grading",
            "Premium lighting adjustments",
            "Thumbnail design & Custom animated texts",
            "High-quality raw files included",
          ]}
        />
      </div>
    </section>

    {/* BOTTOM WAVE */}
    <div className="w-full -mb-2">
      <svg className="w-full" height="120" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path d="M0,256L120,224C240,192,480,128,720,112C960,96,1200,128,1320,144L1440,160V0H0Z" fill="#0d0d0d" />
      </svg>
    </div>
  </div>
  );
}
