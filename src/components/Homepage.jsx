import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion";

const homeBack = 'https://res.cloudinary.com/dsgeppk9h/image/upload/v1764356634/homeBack_sbcxym.jpg'
const featured1 = 'https://res.cloudinary.com/dsgeppk9h/image/upload/v1764356633/featured1_adrast.jpg'
const featured2 = 'https://res.cloudinary.com/dsgeppk9h/image/upload/v1764613222/5465_4_x1qhis.jpg'
const featured3 = 'https://res.cloudinary.com/dsgeppk9h/image/upload/v1764613222/6546_2_utnlj6.jpg'


 const services = [
    {
      title: "Influencer Shoots",
      desc: "Cinematic reels, curated lifestyle visuals, aesthetic portraits & complete content creation for your social pages.",
      icon: "🎥",
    },
    {
      title: "Commercials",
      desc: "Brand videos, product shoots, promos & corporate films.",
      icon: "🏷️",
    },
    {
      title: "Events",
      desc: "Birthdays, launches, cultural events & special occasions.",
      icon: "✨",
    },
  ];

function Homepage() {
    return (
        <div className="pt-20"> {/* Spacer because navbar is fixed */}


            {/* Hero Section */}
            <section className="h-screen flex items-center justify-center relative overflow-hidden">
                <img
                    src={homeBack}
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-black/40"></div>


                <div className="relative text-center text-white px-6">
                    <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                        Where Every Story Finds Its Arc
                    </h2>
                    <p className="text-xl md:text-2xl mb-8">
                        Cinematic Videography & Timeless Photography
                    </p>


                    <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
                        <Link
                            to="/portfolio"
                            className="px-8 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition"
                        >
                            View Portfolio
                        </Link>

                        <Link
                            to="/book"
                            className="px-8 py-3 bg-black/60 border border-white text-white font-semibold rounded-xl hover:bg-black/80 transition"
                        >
                            Book a Shoot
                        </Link>
                    </div>


                </div>
            </section>


            {/* Featured Work */}
            <section id="portfolio" className="py-20 max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold mb-6">Featured Work</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        featured2,
                        featured1,
                        featured3
                    ].map((img, i) => (
                        <div key={i} className="rounded-2xl overflow-hidden shadow-lg group">
                            <img src={img} className="w-full h-64 object-cover group-hover:scale-105 transition" />
                        </div>
                    ))}
                </div>
            </section>


            {/* Services */}
            <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-4xl md:text-5xl font-bold mb-14 text-center"
        >
          Our <span className="text-yellow-500">Services</span>
        </motion.h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: i * 0.15, // stagger animation
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="
                p-10 bg-white rounded-2xl shadow-sm 
                hover:shadow-lg transition-all duration-300 border border-gray-200
              "
            >
              {/* Icon */}
              <div className="text-4xl mb-4">{svc.icon}</div>

              <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                {svc.title}
              </h3>

              <p className="text-gray-600 leading-relaxed text-lg">
                {svc.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>

            {/* Contact CTA */}
            <section id="contact" className="py-20 text-center">
                <h2 className="text-4xl font-bold mb-6">Let’s Capture Your Story</h2>
                <p className="text-gray-600 text-lg mb-10">Reach out and we’ll bring your vision to life.</p>
                <Link to="/contact" className="px-10 py-4 bg-black text-white rounded-xl text-lg hover:bg-gray-800 transition">
                    Contact Us
                </Link>
            </section>



            {/* Footer */}
            <footer className="py-10 bg-black text-white text-center">
                <p>© 2025 StoryArc Creative — All Rights Reserved.</p>
            </footer>
        </div>
    )
}

export default Homepage