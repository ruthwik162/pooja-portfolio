import React, { useRef, useState } from "react";
import { images } from "../assets/assets";
import { FaDownload } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const HeroButtons = () => {
  const resumeRef = useRef(null);
  const profileRef = useRef(null);

  const contactRef = useRef(null);
  const [hoveredContact, setHoveredContact] = useState(false);
  const [hoveredProfile, setHoveredProfile] = useState(false);
  const [hoveredResume, setHoveredResume] = useState(false);

  const tl = gsap.timeline();
  useGSAP(function () {
    tl.from('.click', {
      y: 120,
      scale: 0.5,
      opacity: -5,
      stagger: 0.2,
      delay: 1,

    })
  })

  return (
    <div className="flex items-start z-0 gap-[0.2vw] mt-[1vw] justify-center">
      {/* Contact Me */}
      <div className="flex gap-[0.2vw]">
        <div
          onMouseEnter={() => {
            profileRef.current.style.height = "100%";
            setHoveredProfile(true);
          }}
          onMouseLeave={() => {
            profileRef.current.style.height = "0%";
            setHoveredProfile(false);
          }} className="click bg-black h-[10vw] md:h-[3vw] md:w-[15vw] w-[30vw] relative cursor-pointer rounded-full overflow-hidden" >
          <div ref={profileRef} className="absolute bottom-0 left-0 w-full h-0 bg-[#D3FD50] transition-all duration-300"></div>
          <div className="h-full flex border border-[#D3FD50]  items-center justify-center relative z-10">
            <Link to="/profile" className={`text-[5vw] md:text-[1vw] font-[font2] transition-colors duration-300 ${hoveredProfile ? "text-black" : "text-white"}`} >
              Profile
            </Link>
          </div>
        </div>
        <div
          onMouseEnter={() => {
            contactRef.current.style.height = "100%";
            setHoveredContact(true);
          }}
          onMouseLeave={() => {
            contactRef.current.style.height = "0%";
            setHoveredContact(false);
          }} className="click bg-black h-[10vw] md:h-[3vw] md:w-[15vw] w-[33vw] relative cursor-pointer rounded-full overflow-hidden" >
          <div ref={contactRef} className="absolute bottom-0 left-0 w-full h-0 bg-[#D3FD50] transition-all duration-300"></div>
          <div className="h-full flex border border-[#D3FD50]  items-center justify-center relative z-10">
            <h2 className={`text-[5vw] md:text-[1vw] font-bold transition-colors duration-300 ${hoveredContact ? "text-black" : "text-white"}`} >
              Contact Me
            </h2>
          </div>
        </div>

        {/* Resume */}
        <div
          onMouseEnter={() => {
            resumeRef.current.style.height = "100%";
            setHoveredResume(true);
          }}
          onMouseLeave={() => {
            resumeRef.current.style.height = "0%";
            setHoveredResume(false);
          }}
          className="click bg-black h-[10vw] md:h-[3vw] md:w-[15vw] w-[30vw] relative cursor-pointer rounded-full overflow-hidden"
        >
          {/* Yellow fill */}
          <div
            ref={resumeRef}
            className="absolute bottom-0 left-0 w-full h-0 bg-[#D3FD50] transition-all duration-300"
          ></div>

          {/* Text */}
          <div className="h-full flex items-center justify-center relative z-10">
            <a
              href={images.pooja}
              download
              className={`flex items-center gap-[1vw] font-bold text-[5vw] md:text-[1vw] transition-colors duration-300 ${hoveredResume ? "text-black" : "text-white"
                }`}
            >
              <FaDownload className="text-xl" />
              <span>Resume</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroButtons;
