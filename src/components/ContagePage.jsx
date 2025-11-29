import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Instagram, Send } from "lucide-react";

const bgVideo = "https://res.cloudinary.com/dsgeppk9h/video/upload/v1764356367/background2_hxf6lr.mp4";

function ContagePage() {
  const canvasRef = useRef(null);

  // -----------------------------
  // FORM STATE + VALIDATION STATE
  // -----------------------------
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // Remove error message live as user types
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let newErr = {};

    if (!form.name.trim()) newErr.name = "Full name is required";
    if (!form.phone.trim()) newErr.phone = "Phone number is required";
    if (!form.email.trim()) newErr.email = "Email address is required";
    if (!form.message.trim()) newErr.message = "Message cannot be empty";

    setErrors(newErr);

    return Object.keys(newErr).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const username = import.meta.env.VITE_API_USERNAME;
      const password = import.meta.env.VITE_API_PASSWORD;

      const authHeader = "Basic " + btoa(`${username}:${password}`);

      const res = await fetch(`${baseUrl}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      setLoading(false);
      setPopup(true);

      // Reset form after success
      setForm({
        name: "",
        phone: "",
        email: "",
        message: "",
      });

    } catch (err) {
      console.error("Error submitting contact:", err);
      setLoading(false);
      setPopup(true);
    }
  };

  // -----------------------------
  // PARTICLES
  // -----------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    let particles = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      s: Math.random() * 4 + 4,
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
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center py-32">
      <div className="w-full max-w-7xl px-4 sm:px-6 md:px-8">



        {/* BACKGROUND VIDEO */}
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={bgVideo} type="video/mp4" />
        </video>

        {/* PARTICLE CANVAS */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none"></canvas>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        {/* MAIN CONTENT */}
        <div className="relative w-full max-w-7xl grid lg:grid-cols-2 gap-12 text-white">

          {/* LEFT SIDE */}
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

            {/* CONTACT BOXES */}
            <div className="space-y-6">

              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl flex items-center gap-4 hover:bg-white/20 transition">
                <Mail className="text-yellow-300 w-10 h-10" />
                <div>
                  <h3 className="text-xl font-semibold">Email Us</h3>
                  <p className="text-gray-200">business.storyarc.creative@gmail.com</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl flex items-center gap-4 hover:bg-white/20 transition">
                <Phone className="text-green-300 w-10 h-10" />
                <div>
                  <h3 className="text-xl font-semibold">Whatsapp</h3>
                  <p className="text-gray-200">+91 8016820137</p>
                </div>
              </div>

              <a
                href="https://www.instagram.com/storyarc.creative"
                target="_blank"
                className="block"
                rel="noopener noreferrer"
              >
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl flex items-center gap-4 hover:bg-white/20 transition cursor-pointer">
                  <Instagram className="text-red-400 w-10 h-10" />
                  <div>
                    <h3 className="text-xl font-semibold">DM Us</h3>
                    <p className="text-gray-200">@storyarc.creative</p>
                  </div>
                </div>
              </a>

            </div>
          </motion.div>

          {/* RIGHT SIDE — FORM */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl space-y-6"
          >

            {/* NAME */}
            <div>
              <label className="block text-gray-200 font-medium mb-1">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-black/30 border border-white/20 text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-gray-200 font-medium mb-1">Phone Number</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-black/30 border border-white/20 text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="Enter your phone number"
              />
              {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-gray-200 font-medium mb-1">Email Address</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-black/30 border border-white/20 text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* MESSAGE */}
            <div>
              <label className="block text-gray-200 font-medium mb-1">Message</label>
              <textarea
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-black/30 border border-white/20 text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="Write your message..."
              ></textarea>
              {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-yellow-500 text-black py-3 rounded-xl text-lg font-semibold hover:bg-yellow-400 transition shadow-xl"
            >
              Send Message <Send className="w-5 h-5" />
            </button>
          </motion.form>
        </div>

        {loading && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>

              <p className="text-yellow-400 mt-4 text-lg tracking-wide animate-pulse">
                Capturing Your Message...
              </p>
            </motion.div>
          </div>
        )}


        {popup && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-[#1c1c1c] border border-white/10 p-8 rounded-2xl text-center max-w-sm"
            >
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                Thank You!
              </h2>

              <p className="text-gray-300 mb-4">
                Your message has been successfully sent.
              </p>

              <p className="text-gray-400 mb-6">
                We will contact you soon.
              </p>

              <button
                onClick={() => setPopup(false)}
                className="px-6 py-2 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-400"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ContagePage;
