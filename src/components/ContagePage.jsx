import React, { useEffect, useRef } from 'react'
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import bgVideo from '../assets/videos/background2.mp4'

function ContagePage() {
   const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    let particles = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      s: Math.random() * 4 +4,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
    }));

    function animate() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255,255,255,0.6)";

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center px-6 md:px-16 py-32">

      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* PARTICLE EFFECT CANVAS */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none "
      ></canvas>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* MAIN CONTENT */}
      <div className="relative w-full max-w-7xl grid lg:grid-cols-2 gap-12 text-white">

        {/* LEFT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-xl">
            Let's Create Something Amazing Together
          </h1>

          <p className="text-gray-200 text-lg max-w-lg">
            Whether it’s a wedding film, brand story, ad shoot, or cinematic project —
            we’d love to collaborate and bring your vision to life.
          </p>

          {/* CONTACT INFO CARDS */}
          <div className="space-y-6">

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl flex items-center gap-4 hover:bg-white/20 transition">
              <Mail className="text-yellow-300 w-10 h-10" />
              <div>
                <h3 className="text-xl font-semibold">Email Us</h3>
                <p className="text-gray-200">contact@storyarc.com</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl flex items-center gap-4 hover:bg-white/20 transition">
              <Phone className="text-green-300 w-10 h-10" />
              <div>
                <h3 className="text-xl font-semibold">Call Us</h3>
                <p className="text-gray-200">+91 9876543210</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl flex items-center gap-4 hover:bg-white/20 transition">
              <MapPin className="text-red-300 w-10 h-10" />
              <div>
                <h3 className="text-xl font-semibold">Visit Us</h3>
                <p className="text-gray-200">Kolkata, West Bengal, India</p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* RIGHT — FORM */}
        <motion.form
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl space-y-6"
        >
          <div>
            <label className="block text-gray-200 font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="w-full p-3 rounded-xl bg-black/30 border border-white/20 text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="Enter your name"
            />
          </div>

          {/* PHONE FIELD ADDED */}
          <div>
            <label className="block text-gray-200 font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              className="w-full p-3 rounded-xl bg-black/30 border border-white/20 text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-gray-200 font-medium mb-1">Email Address</label>
            <input
              type="email"
              className="w-full p-3 rounded-xl bg-black/30 border border-white/20 text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-200 font-medium mb-1">Message</label>
            <textarea
              rows="5"
              className="w-full p-3 rounded-xl bg-black/30 border border-white/20 text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="Write your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-yellow-500 text-black py-3 rounded-xl text-lg font-semibold hover:bg-yellow-400 transition shadow-xl"
          >
            Send Message <Send className="w-5 h-5" />
          </button>
        </motion.form>
      </div>
    </div>
  );
}

export default ContagePage