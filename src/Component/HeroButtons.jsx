import React, { useRef } from "react";
import { images } from "../assets/assets";
import { FaDownload } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link, useNavigate } from "react-router-dom";

const HeroButtons = () => {
  const profileRef = useRef(null);
  const contactRef = useRef(null);
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  useGSAP(() => {
    gsap.from(".click", {
      y: 120,
      scale: 0.5,
      opacity: 0,
      stagger: 0.2,
      delay: 1,
      ease: "power3.out",
    });
  });

  // Reusable hover handler
  const handleHover = (ref, enter) => {
    if (ref.current) {
      ref.current.style.height = enter ? "100%" : "0%";
    }
  };

  // Scroll to top + navigate helper
  const handleNavigation = (path) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    navigate(path);
  };

  return (
    <div className="flex items-center z-1 gap-[0.5vw] mt-[1vw] justify-center">
      {/* Profile */}
      <button
        onClick={() => handleNavigation("/profile")}
        onMouseEnter={() => handleHover(profileRef, true)}
        onMouseLeave={() => handleHover(profileRef, false)}
        className="click bg-black h-[10vw] md:h-[3vw] md:w-[15vw] w-[33vw] relative cursor-pointer rounded-full overflow-hidden border border-[#D3FD50] flex items-center justify-center"
      >
        <div
          ref={profileRef}
          className="absolute bottom-0 left-0 w-full h-0 bg-[#D3FD50] transition-all duration-300"
        ></div>
        <span className="text-[5vw] md:text-[1vw] font-bold text-white transition-colors duration-300 relative z-10">
          Profile
        </span>
      </button>

      {/* Contact */}
      <button
        onClick={() => handleNavigation("/contact")}
        onMouseEnter={() => handleHover(contactRef, true)}
        onMouseLeave={() => handleHover(contactRef, false)}
        className="click bg-black h-[10vw] md:h-[3vw] md:w-[15vw] w-[33vw] relative cursor-pointer rounded-full overflow-hidden border border-[#D3FD50] flex items-center justify-center"
      >
        <div
          ref={contactRef}
          className="absolute bottom-0 left-0 w-full h-0 bg-[#D3FD50] transition-all duration-300"
        ></div>
        <span className="text-[5vw] md:text-[1vw] font-bold text-white transition-colors duration-300 relative z-10">
          Contact Me
        </span>
      </button>

      {/* Resume */}
      <a
        href={images.pooja}
        download="Pooja-Chaudhary-Resume.pdf"
        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
        onMouseEnter={() => handleHover(resumeRef, true)}
        onMouseLeave={() => handleHover(resumeRef, false)}
        className="click bg-black h-[10vw] md:h-[3vw] md:w-[15vw] w-[30vw] relative cursor-pointer rounded-full overflow-hidden border border-[#D3FD50] flex items-center justify-center"
      >
        <div
          ref={resumeRef}
          className="absolute bottom-0 left-0 w-full h-0 bg-[#D3FD50] transition-all duration-300"
        ></div>
        <span className="flex items-center gap-[1vw] font-bold text-[5vw] md:text-[1vw] text-white transition-colors duration-300 relative z-10">
          <FaDownload className="text-xl" />
          Resume
        </span>
      </a>
    </div>
  );
};

export default HeroButtons;
