import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import { FaHtml5, FaJs, FaNodeJs, FaJava } from "react-icons/fa";
import { SiTailwindcss, SiExpress, SiGreensock, SiFigma } from "react-icons/si";
import { MdOutlineDesignServices } from "react-icons/md";

const roles = [
  "User Interface Designing",
  "User Experience Designing",
  "HTML",
  "Tailwind",
  "JavaScript",
  "Node js",
  "Express",
  "Java",
  "Gsap",
];

const icons = [
  <MdOutlineDesignServices />,
  <SiFigma />,
  <FaHtml5 />,
  <SiTailwindcss />,
  <FaJs />,
  <FaNodeJs />,
  <SiExpress />,
  <FaJava />,
  <SiGreensock />,
];

const RolesOpen = () => {
  const rolesRef = useRef([]);
  const audioRef = useRef(null);

  useEffect(() => {
    // ✅ Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ✅ GSAP hover animations + sound
    rolesRef.current.forEach((el) => {
      if (!el) return;
      const fill = el.querySelector(".fill");
      const text = el.querySelector(".role-text");
      const icon = el.querySelector(".role-icon");

      gsap.set(fill, { scaleY: 0, transformOrigin: "bottom" });

      el.addEventListener("mouseenter", () => {
        gsap.to(fill, { scaleY: 1, duration: 0.5, ease: "power2.out" });
        gsap.to([text, icon], { color: "#ffffff", duration: 0.3, ease: "power2.out" });

        // ✅ Play sound (after unlock)
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch((err) => {
              console.log("Playback prevented:", err);
            });
          }
        }
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(fill, { scaleY: 0, duration: 0.5, ease: "power3.out" });
        gsap.to([text, icon], { color: "#000000", duration: 0.3, ease: "power2.out" });
      });
    });

    // ✅ Unlock audio on first click/tap (autoplay policy fix)
    const unlockAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        });
      }
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);
    window.addEventListener("touchstart", unlockAudio);

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };
  }, []);

  return (
    <div className="bg-white min-h-screen w-full flex flex-col items-center justify-center pt-3 md:pt-10">
      <h2 className="text-[10vw] md:text-[5vw] font-[font2] mb-6">Skills</h2>
      <div className="w-full max-w-9xl font-[font2]">
        {roles.map((role, i) => (
          <div
            key={i}
            ref={(el) => (rolesRef.current[i] = el)}
            className="relative overflow-hidden border-b border-gray-200 cursor-pointer"
          >
            <div className="relative py-3 flex items-center gap-3 md:gap-[20vh] mx-[10vw] md:mx-[20vw] z-10">
              <span className="role-icon text-2xl text-black">{icons[i]}</span>
              <span className="role-text text-[3vw] md:text-[1vw] text-black">
                {role}
              </span>
            </div>
            <div className="fill absolute inset-0 bg-black z-0"></div>
          </div>
        ))}
      </div>

      {/* ✅ Correct: file in /public → access with /hover1.mp3 */}
      <audio ref={audioRef} src="/hover1.mp3" preload="auto" />
    </div>
  );
};

export default RolesOpen;
