import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IND_PACKAGES = [
  "Shoot Only",
  "Editing Only",
  "Creator’s Edge",
  "Starter Spotlight",
  "Elite Impact",
];

const BRAND_PACKAGES = [
  "Ignite Pack",
  "Elevate Pack",
  "Dominate Pack",
];

export default function BookNow() {
  const particleRef = useRef(null);
  const [popup, setPopup] = useState(null);

  const [form, setForm] = useState({
    name: "",
    address: "",
    preferredTime: "",
    userType: "",
    selectedPackage: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  // ---------------------------
  // PARTICLES BACKGROUND
  // ---------------------------
  useEffect(() => {
    const canvas = particleRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const ps = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.2,
    }));

    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.shadowBlur = 14;
      ctx.shadowColor = "rgba(232,176,4,0.7)";

      ps.forEach((p) => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(232,176,4,${p.alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.vx; p.y += p.vy;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      });

      requestAnimationFrame(draw);
    }

    draw();
  }, []);

  // ---------------------------
  // FORM HANDLERS
  // ---------------------------
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const newErr = {};

    if (!form.name.trim()) newErr.name = "Name is required";
    if (!form.address.trim()) newErr.address = "Address is required";
    if (!form.preferredTime) newErr.preferredTime = "Select a date & time";
    if (!form.userType) newErr.userType = "Select a category";
    if (!form.selectedPackage) newErr.selectedPackage = "Select a package";
    if (!form.phone.trim()) newErr.phone = "Phone required";
    if (!/^[0-9]{10}$/.test(form.phone)) newErr.phone = "Enter a valid 10-digit phone";
    if (!form.email.trim()) newErr.email = "Email required";

    setErrors(newErr);

    return Object.keys(newErr).length === 0;
  };

  const formatPreferredTime = (input) => {
    const date = new Date(input);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // convert 0 → 12 for 12AM/PM

    return `${day}/${month}/${year} ${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
  }


  // ---------------------------
  // SUBMIT API
  // ---------------------------
  const submitForm = async () => {
    if (!validate()) return;

    const formattedData = {
      ...form,
      preferredTime: formatPreferredTime(form.preferredTime)
    };

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const username = import.meta.env.VITE_API_USERNAME;
      const password = import.meta.env.VITE_API_PASSWORD;

      const authHeader = "Basic " + btoa(`${username}:${password}`);

      const res = await fetch(`${baseUrl}/booknow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(formattedData),
      });

      const data = await res.json();
      setPopup(data.orderId || "ORD-NA");

    } catch (err) {
      console.error("Error:", err);
      setPopup("ORD-XXXX");
    }
  };


  // ---------------------------
  // PACKAGE LIST BASED ON TYPE
  // ---------------------------
  const packageList =
    form.userType === "Individual Creator"
      ? IND_PACKAGES
      : form.userType === "Brand"
        ? BRAND_PACKAGES
        : [];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#1b1b1b] via-[#1a1713] to-[#141412] text-white overflow-hidden">

      {/* PARTICLE CANVAS */}
      <canvas ref={particleRef} className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-10"
        >
          Book Your Shoot
        </motion.h1>

        {/* FORM CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl"
        >
          {/* NAME FIELD */}
          <Field
            label="Your Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
          />

          {/* ADDRESS */}
          <Field
            label="Shoot Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            error={errors.address}
          />

          {/* DATE + TIME */}
          <Field
            label="Preferred Time & Date"
            name="preferredTime"
            type="datetime-local"
            value={form.preferredTime}
            onChange={handleChange}
            error={errors.preferredTime}
          />

          {/* CATEGORY */}
          <SelectField
            label="You Are"
            name="userType"
            value={form.userType}
            onChange={handleChange}
            options={["Individual Creator", "Brand"]}
            error={errors.userType}
          />

          {/* PACKAGE */}
          <SelectField
            label="Select Package"
            name="selectedPackage"
            value={form.selectedPackage}
            onChange={handleChange}
            options={packageList}
            disabled={packageList.length === 0}
            error={errors.selectedPackage}
          />

          {/* PHONE */}
          <Field
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
          />

          {/* EMAIL */}
          <Field
            label="Email Address"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          {/* SUBMIT BUTTON */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={submitForm}
            className="w-full mt-4 py-3 text-lg font-semibold bg-[#E8B004] text-black rounded-xl shadow-md hover:brightness-110 transition-all cursor-pointer"
          >
            Book Now
          </motion.button>
        </motion.div>
      </div>

      {/* POPUP */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              className="bg-[#1c1c1c] border border-white/10 p-8 rounded-2xl text-center max-w-sm"
            >
              <h2 className="text-2xl font-bold text-[#E8B004] mb-2">
                Order Requested!
              </h2>
              <p className="text-gray-300 mb-4">Order ID:</p>
              <p className="text-2xl font-mono mb-6">{popup}</p>

              <p className="text-gray-400 mb-6">
                We have received your shoot request.
                We'll contact you soon via phone / email / WhatsApp.
              </p>

              <button
                onClick={() => (window.location.href = "/")}
                className="px-6 py-2 bg-[#E8B004] text-black rounded-lg font-semibold"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

/* ---------------------------------------
   🔹 Input Components
---------------------------------------- */

function Field({ label, name, value, onChange, error, type = "text" }) {
  return (
    <div className="mb-6">
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full bg-white/5 border ${error ? "border-red-500" : "border-white/20"
            } text-white p-3 rounded-lg focus:border-[#E8B004] outline-none transition`}
        />
        <span className="absolute left-3 top-[-10px] text-sm bg-[#1b1b1b] px-2 text-gray-300">
          {label}
        </span>
      </div>
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, error, disabled }) {
  return (
    <div className="mb-6">
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full bg-white/5 border ${error ? "border-red-500" : "border-white/20"
            } text-white p-3 rounded-lg focus:border-[#E8B004] outline-none transition ${disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          <option value="">Select</option>
          {options.map((opt, i) => (
            <option key={i} value={opt} className="text-black">{opt}</option>
          ))}
        </select>

        <span className="absolute left-3 top-[-10px] text-sm bg-[#1b1b1b] px-2 text-gray-300">
          {label}
        </span>
      </div>

      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}
