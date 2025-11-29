import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const logo = 'https://res.cloudinary.com/dsgeppk9h/image/upload/v1764356562/logo_r4gw7s.png';

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur bg-white/70 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="StoryArc Creative Logo" className="h-10 w-10 object-contain" />
          <h1 className="text-2xl font-bold tracking-tight">StoryArc Creative</h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-lg">

          {["Home", "Services", "Portfolio", "Contact", "About Us"].map((item, idx) => {
            const path = item === "Home"
              ? ""
              : item.toLowerCase().replace(/\s+/g, "-");

            return (
              <Link
                key={idx}
                to={path}
                className="relative group"
              >
                {item}
                <span
                  className="absolute left-1/2 -bottom-1 w-0 h-[2px] bg-yellow-400 rounded-full 
                   transition-all duration-300 group-hover:w-full group-hover:left-0"
                ></span>
              </Link>
            );
          })}


          {/* Book Now */}
          <Link
            to="/book"
            className="relative ml-4 px-5 py-2 rounded-full font-semibold text-black shadow 
             overflow-hidden group transition-all duration-300"
            style={{ backgroundColor: "#E8B004" }} // deeper gold
          >
            Book Now

            {/* Stronger Glow on hover */}
            <span className="absolute inset-0 rounded-full opacity-0 transition-all duration-300 
                   group-hover:opacity-100 group-hover:shadow-[0_0_25px_8px_rgba(232,176,4,0.8)]"></span>

            {/* ✨ Gradient Shine Animation */}
            <span
              className="absolute top-0 left-[-100%] w-[150%] h-full 
               bg-gradient-to-r from-transparent via-white/70 to-transparent 
               opacity-60 skew-x-12
               animate-shine"
            ></span>
          </Link>

        </nav>

        {/* Mobile Menu Icon */}
        <button className="md:hidden ml-4" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white/90 shadow-md py-4 px-6 space-y-4 text-lg">

          {["Home", "Services", "Portfolio", "Contact", "About Us"].map((item, idx) => (
            <Link
              key={idx}
              to={item === "Home" ? "" : `${item.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setOpen(false)}
              className="block relative group"
            >
              {item}
              {/* Underline animation */}
              <span
                className="absolute left-1/2 -bottom-1 w-0 h-[2px] bg-yellow-400 rounded-full 
                           transition-all duration-300 group-hover:w-full group-hover:left-0"
              ></span>
            </Link>
          ))}

          {/* Book Now Mobile */}
          <Link
            to="/book"
            className="relative ml-4 px-5 py-2 rounded-full font-semibold text-black shadow 
             overflow-hidden group transition-all duration-300"
            style={{ backgroundColor: "#E8B004" }}
            onClick={() => setOpen(false)}
          >
            Book Now

            {/* Glow on hover */}
            <span className="absolute inset-0 rounded-full opacity-0 transition-all duration-300 
                   group-hover:opacity-100 group-hover:shadow-[0_0_15px_5px_rgba(244,208,111,0.6)]"></span>

            {/* ✨ Gradient Shine Animation */}
            <span
              className="absolute top-0 left-[-100%] w-[150%] h-full 
               bg-gradient-to-r from-transparent via-white/60 to-transparent 
               opacity-40 skew-x-12
               animate-shine"
            ></span>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Navbar;
