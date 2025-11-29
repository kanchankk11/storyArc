import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { portfolioItems } from "./utils/portfolioItems.js";

// YOUR ASSET IMPORTS (from your message)

const items = portfolioItems;

const categories = ["All", "Event", "Influencer", "Cafe", "PreWedding", "Product", "FnB"];



function Portfolio() {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState(null); // item
  const particleRef = useRef(null);
  const videoRefs = useRef(new Map()); // id => video element
  const cardRefs = useRef(new Map()); // id => card element

  // particles (soft)
  // particles (stronger + more + visible)
  useEffect(() => {
    const canvas = particleRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Increase count + radius + glow
    const ps = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 1.5, // bigger particles
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.35 + 0.3, // much more visible
    }));

    let raf = null;

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // glow effect

      ctx.shadowBlur = 18;
      ctx.shadowColor = "rgba(232,176,4,0.7)";

      for (const p of ps) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(232,176,4,${p.alpha})`; // warm gold glow
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        // loop edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      }

      raf = requestAnimationFrame(draw);
    }

    draw();

    function onResize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);


  // IntersectionObserver to keep videos paused when not visible
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((ent) => {
          const id = ent.target.getAttribute("data-id");
          const v = videoRefs.current.get(id);
          if (!v) return;
          if (ent.isIntersecting && ent.intersectionRatio > 0.5) {
            // keep paused by default (we autoplay on hover only) — but we can pre-play muted if desired
            // v.play().catch(()=> {});
          } else {
            v.pause();
            v.currentTime = 0;
            v.style.opacity = 0;
          }
        });
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    cardRefs.current.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const filtered = active === "All" ? items : items.filter((it) => it.category === active);

  // helper to set refs
  const setVideoRef = (id, node) => {
    if (node) videoRefs.current.set(String(id), node);
    else videoRefs.current.delete(String(id));
  };
  const setCardRef = (id, node) => {
    if (node) cardRefs.current.set(String(id), node);
    else cardRefs.current.delete(String(id));
  };

  // tilt on mouse move
  const handleTilt = (e, id) => {
    const el = cardRefs.current.get(String(id));
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const rx = (-dy / rect.height) * 6;
    const ry = (dx / rect.width) * 8;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
  };
  const resetTilt = (id) => {
    const el = cardRefs.current.get(String(id));
    if (!el) return;
    el.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
  };

  // hover preview
  const handleHoverPlay = (id) => {
    const v = videoRefs.current.get(String(id));
    if (!v) return;
    v.muted = true;
    v.currentTime = 0;
    v.play().catch(() => { });
    v.style.opacity = 1;
  };
  const handleHoverPause = (id) => {
    const v = videoRefs.current.get(String(id));
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    v.style.opacity = 0;
  };

  // ripple effect on click
  const createRipple = (e, el) => {
    const circle = document.createElement("span");
    circle.className = "ripple";
    const d = Math.max(el.clientWidth, el.clientHeight);
    circle.style.width = circle.style.height = `${d}px`;
    const rect = el.getBoundingClientRect();
    circle.style.left = `${e.clientX - rect.left - d / 2}px`;
    circle.style.top = `${e.clientY - rect.top - d / 2}px`;
    el.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  };

  // open lightbox
  const openLightbox = (it, e) => {
    createRipple(e, e.currentTarget);
    setSelected(it);
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#1a1a17] via-[#2a2925] to-[#1a1a17] overflow-hidden">
      {/* particle canvas */}
      <canvas
        ref={particleRef}
        className="pointer-events-none absolute inset-0 w-full h-full opacity-70"
      />

      {/* TOP WAVE – warm, soft, cinematic */}
      <svg
        className="absolute left-0 right-0 top-0 w-full pointer-events-none"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,64 C220,120 440,6 720,40 C1000,74 1220,120 1440,86 L1440,0 L0,0 Z"
          fill="url(#warmwave)"
          opacity="0.9"
        ></path>

        <defs>
          <linearGradient id="warmwave" x1="0" x2="1">
            <stop offset="0" stopColor="#2b2924" />
            <stop offset="1" stopColor="#1f1e1a" />
          </linearGradient>
        </defs>
      </svg>

      {/* CONTENT WRAPPER */}
      <div className="relative max-w-7xl mx-auto px-6 py-24">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">Portfolio</h2>
          <p className="text-gray-300 mt-2 max-w-2xl mx-auto">
            Selected reels, event highlights and product films — vertical-first and cinematic.
          </p>
        </motion.div>

        {/* Filter bar (glass) */}
        <div className="w-full mb-8 overflow-x-auto px-2 scrollbar-hide touch-pan-x">
          <div className="flex gap-3 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 w-max mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-1.5 text-sm rounded-full transition ${active === cat
                  ? "bg-[#E8B004] text-black font-semibold"
                  : "text-gray-300 bg-white/10 hover:bg-white/20"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* grid (4-5 per row depending width) */}
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((it) => (
            <motion.div
              key={it.id}
              data-id={it.id}
              ref={(el) => setCardRef(it.id, el)}
              className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-lg shadow-sm border border-white/10"
              onMouseMove={(e) => handleTilt(e, it.id)}
              onMouseLeave={() => resetTilt(it.id)}
            >
              {/* card layer */}
              <div
                onClick={(e) => openLightbox(it, e)}
                className="relative cursor-pointer group"
                style={{ height: "30vh", minHeight: 220 }}
              >
                {/* thumbnail */}
                <img
                  src={it.thumb}
                  alt={it.title}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                />

                {/* hover video */}
                {it.type === "video" && (
                  <video
                    ref={(node) => setVideoRef(it.id, node)}
                    src={it.src}
                    muted
                    playsInline
                    loop
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300"
                    onMouseEnter={() => handleHoverPlay(it.id)}
                    onMouseLeave={() => handleHoverPause(it.id)}
                  />
                )}

                {/* overlay play icon */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center opacity-90 transition group-hover:scale-105 group-hover:bg-[#E8B004]/95">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* footer */}
              <div className="p-3 bg-white/10 backdrop-blur-md border-t border-white/10">
                <div className="flex items-center justify-between text-gray-200">
                  <div>
                    <div className="text-sm font-semibold">{it.title}</div>
                    <div className="text-xs text-gray-400">{it.category}</div>
                  </div>
                  <div className="text-xs text-gray-400">View</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* BOTTOM WAVE */}
      <div className="w-full">
        <svg
          className="w-full"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C220,140 440,20 720,60 C1000,100 1220,160 1440,120 L1440,200 L0,200 Z"
            fill="url(#warmwave2)"
            opacity="0.85"
          />
          <defs>
            <linearGradient id="warmwave2" x1="0" x2="1">
              <stop offset="0" stopColor="#1f1e1a" />
              <stop offset="1" stopColor="#2b2924" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="max-w-[420px] w-full"
              onClick={() => setSelected(null)}
            >
              {selected.type === "image" ? (
                <img src={selected.src} alt={selected.title} className="w-full rounded-xl" />
              ) : (
                <video
                  src={selected.src}
                  controls
                  autoPlay
                  className="w-full rounded-xl aspect-[9/16] object-cover"
                />
              )}
              <div className="mt-4 flex justify-center">
                <button className="px-4 py-2 rounded-full bg-white/90">Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ripple animation */}
      <style>{`
    .ripple {
      position: absolute;
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 600ms linear;
      background: rgba(232,176,4,0.18);
      pointer-events: none;
    }
    @keyframes ripple { to { transform: scale(4); opacity: 0; } }
  `}</style>
    </div>


  );
}

export default Portfolio

