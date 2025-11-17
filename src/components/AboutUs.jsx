import React from 'react'
import { motion } from "framer-motion";
import dp from '../assets/man.jpg'
import backVideo from '../assets/videos/background.mp4'
import wave from '../assets/illustrations/wave1.svg'
import Wave from './Wave';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.2 } },
};

function AboutUs () {
  const team = [
    { name: "Arjun Sen", role: "Creative Director", img: "/team/arjun.jpg" },
    { name: "Riya Mehta", role: "Lead Photographer", img: "/team/riya.jpg" },
    { name: "Soham Das", role: "Cinematographer", img: "/team/soham.jpg" },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-[#faf7ef] to-[#f4f2e8] text-gray-900 overflow-hidden">

  {/* Floating gold particles */}
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {Array.from({ length: 20 }).map((_, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: Math.random() * 0.6 + 0.2,
          y: [0, -80, 0],
          x: [0, Math.random() * 40 - 20, 0]
        }}
        transition={{ duration: 6 + Math.random() * 5, repeat: Infinity }}
        className="absolute w-2 h-2 bg-[#E8B004] rounded-full"
        style={{
          top: Math.random() * 100 + "%",
          left: Math.random() * 100 + "%",
        }}
      />
    ))}
  </div>


  <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">

    {/* Background looping video */}
    <video
      className="absolute inset-0 w-full h-full object-cover"
      src={backVideo}
      autoPlay
      muted
      loop
      playsInline
    />

    {/* Soft Dark Overlay */}
    <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>

    {/* Gold Blur Light Behind Title */}
    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-b from-[#ffe9a6] to-transparent opacity-30 blur-3xl"></div>

    {/* Text on top of video */}
    <motion.div
      initial="hidden"
      whileInView="show"
      variants={fadeUp}
      className="relative z-10 text-center px-6 max-w-5xl"
    >
      <h1 className="text-5xl font-fraunces font-bold tracking-tight text-white">
        About <span className="text-[#E8B004]">StoryArc Creative</span>
      </h1>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-28 h-1 bg-gradient-to-r from-[#E8B004] to-[#ffcf3b] mx-auto mt-4 rounded-full"
      />

      <motion.p
        variants={fadeUp}
        className="relative font-inter text-lg text-white/90 mt-8 leading-relaxed max-w-3xl mx-auto"
      >
        StoryArc Creative is a videography and photography studio dedicated to 
        crafting compelling stories through elegant visual art. We transform
        weddings, brand stories, events, and conceptual films into cinematic
        experiences.
      </motion.p>
    </motion.div>
  </section>

  {/* Mission Section */}
  <motion.section
    initial="hidden"
    whileInView="show"
    variants={stagger}
    className="relative py-20"
  >
    <div className="absolute -left-20 top-10 w-[300px] h-[300px] bg-[#ffe9b0] opacity-40 blur-3xl rounded-full"></div>

    <div className="max-w-5xl mx-auto px-6">
      <motion.h2
        variants={fadeUp}
        className="text-3xl font-['Playfair_Display'] font-semibold mb-3 flex items-center gap-3"
      >
        <span className="w-2 h-8 bg-[#E8B004] rounded"></span>
        Our Mission
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className="text-gray-700 font-raleway text-lg leading-relaxed ml-5"
      >
        To turn real moments into lasting stories through cinematic storytelling
        and professional craftsmanship.
      </motion.p>
    </div>
  </motion.section>

  {/* Approach Section */}
  <motion.section
    initial="hidden"
    whileInView="show"
    variants={fadeUp}
    className="relative bg-[#f6f6f6] py-20"
  >
     <img
      src={wave}
      alt=""
      className="absolute w-full top-0 opacity-15"
    />



    <div className="max-w-5xl mx-auto px-6 relative">
      <h2 className="text-3xl font-['Playfair_Display'] font-semibold mb-6 flex items-center gap-3">
        <span className="w-2 h-8 bg-[#E8B004] rounded"></span>
        Our Approach
      </h2>

      <motion.ul
        variants={stagger}
        className="space-y-3 text-gray-700 text-lg ml-5"
      >
        {[
          "We listen.",
          "We plan and storyboard.",
          "We shoot with emotion and intention.",
          "We edit with a filmmaker’s eye.",
        ].map((item, index) => (
          <motion.li key={index} variants={fadeUp} className='font-raleway'>
            • {item}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  </motion.section>

  {/* Team Section */}
  <motion.section
    initial="hidden"
    whileInView="show"
    variants={stagger}
    className="py-24"
  >
    <div className="max-w-6xl mx-auto px-6 text-center">
      <motion.h2
        variants={fadeUp}
        className="text-3xl font-['Playfair_Display'] font-semibold"
      >
        Meet the Team
      </motion.h2>

      <motion.div
        variants={fadeUp}
        className="w-20 h-1 bg-gradient-to-r from-[#E8B004] to-[#ffce3b] mx-auto my-6 rounded-full"
      />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-16 mt-12">
        {team.map((m, i) => (
          <motion.div
            variants={fadeUp}
            whileHover={{ scale: 1.05 }}
            key={i}
            className="text-center"
          >
            <img
              src={dp}
              className="w-40 h-40 mx-auto object-cover rounded-full shadow-xl border-4 border-[#E8B004]"
            />
            <h3 className="mt-4 text-xl font-semibold">{m.name}</h3>
            <p className="text-gray-600 font-raleway">{m.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
</div>

  );
};

export default AboutUs;
