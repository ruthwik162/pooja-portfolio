import React, { useRef, useEffect, useState } from "react";
import { FaEnvelope, FaLinkedinIn } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "./Image.jsx";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroButtons from "./HeroButtons.jsx";
import Lenis from "@studio-freight/lenis";
import { images } from "../assets/assets.js";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const pathRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorInnerRef = useRef(null);
  const imageContainerRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  // 🎵 audio refs
  const hoverAudioRef = useRef(null);
  const clickAudioRef = useRef(null);

  const playSound = (audioRef) => {
    if (audioRef.current) {
      const sound = audioRef.current;
      sound.volume = 0.7;
      sound.currentTime = 0;
      const playPromise = sound.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) =>
          console.log("Playback prevented:", err)
        );
      }
    }
  };

  // Unlock audio on first click
  useEffect(() => {
    const unlockAudio = () => {
      [hoverAudioRef, clickAudioRef].forEach((ref) => {
        if (ref.current) {
          ref.current.play().then(() => {
            ref.current.pause();
            ref.current.currentTime = 0;
          });
        }
      });
      document.removeEventListener("click", unlockAudio);
    };
    document.addEventListener("click", unlockAudio);
  }, []);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);
    return () => lenis.destroy();
  }, []);

  // Cursor follow
  useEffect(() => {
    gsap.set(cursorRef.current, {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
    const moveCursor = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power3.out",
      });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  // Cursor grow/shrink
  useEffect(() => {
    if (!cursorInnerRef.current) return;
    if (hovering) {
      gsap.to(cursorInnerRef.current, {
        width: 100,
        height: 100,
        duration: 0.5,
        ease: "expo.out",
      });
    } else {
      gsap.to(cursorInnerRef.current, {
        width: 0,
        height: 0,
        duration: 0.5,
        ease: "expo.out",
      });
    }
  }, [hovering]);

  // Animations
  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out", duration: 1.8 },
      });
      tl.from(".text", { y: -150, stagger: 0.15, duration: 1.5, ease: "power4.out" }, 0.2);
      tl.from(".line", { y: 100, opacity: 0, stagger: 0.2, duration: 1.4, ease: "back.out(1.7)" }, 0.8);
      tl.from(".line2", { x: -100, opacity: 0, stagger: 0.25, duration: 1.3, ease: "power3.out" }, 1.2);

      const path = pathRef.current;
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, { strokeDashoffset: 0, duration: 1.9, ease: "power2.inOut" });

      gsap.from(".spin", { x: -100, duration: 1.3, rotate: 45 });
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="md:h-[91.2vh] xl:h-[89.5vh] h-[89.8vh] lg:h-[91.7vh] sm:h-full bg-white pb-10 flex md:flex-row flex-col-reverse md:pt-[8vh] mt-[5vh] justify-center items-start overflow-hidden relative"
    >
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="md:fixed hidden md:flex top-0 left-0 pointer-events-none z-[9999] items-center justify-center"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div
          ref={cursorInnerRef}
          className="flex items-center justify-center rounded-full overflow-hidden bg-red-700"
          style={{ width: 20, height: 20, transition: "background-color 0.3s ease" }}
        >
          {hovering && (
            <img src={images.cursor} alt="cursor" className="w-full h-full object-contain" style={{ pointerEvents: "none" }} />
          )}
        </div>
      </div>

      {/* LEFT SIDE */}
      <div className="relative md:w-2/3 md:mt-[5vw] h-full w-full">
        <div className="items-start relative leading-[15vw] px-[4vw] flex-col flex font-[font1] justify-center">
          <div className="absolute md:top-0 spin md:-left-[5vw] -top-[40vw] -left-[20vw]">
            <img src={images.header} className="rotate-90 w-70 md:w-full" alt="" />
          </div>
          <div className="md:leading-[8vw] leading-[17vw] overflow-hidden">
            {["Pooja", "Chaudhary", "Meda"].map((name, i) => (
              <div key={i} className="bg-white overflow-hidden">
                <div
                  onMouseEnter={() => {
                    setHovering(true);
                    playSound(hoverAudioRef);
                  }}
                  onMouseLeave={() => setHovering(false)}
                  className="text-[16vw] md:text-[9vw] text font-[font2] uppercase text-black will-change-transform"
                >
                  {name}
                </div>
              </div>
            ))}
          </div>

          {/* 🎵 hidden audio elements */}
          <audio ref={hoverAudioRef} src="/hover1.mp3" preload="auto" />
          <audio ref={clickAudioRef} src="/click1.mp3" preload="auto" />
        </div>

        {/* Tagline + Buttons */}
        <div className="items-start flex-col pt-[2vw] px-[4vw] flex font-[font2] justify-center">
          <div className="text-base md:text-[1.2vw] text-[3vw] leading-[3vw] md:leading-[1.3vw]">
            <div className="bg-white overflow-hidden">
              <div className="line will-change-transform">
                &nbsp;&nbsp;&nbsp;&nbsp;I'm a passionate UI/UX Designer and Frontend Developer
              </div>
            </div>
            <div className="bg-white overflow-hidden">
              <div className="line will-change-transform">with great hands on Experience</div>
            </div>
          </div>

          <div
            className="items-start flex-col pt-[2vw] flex font-[font1] justify-center"
            onClick={() => playSound(clickAudioRef)} // 🎵 click sound
          >
            <HeroButtons />
          </div>

          {/* Socials */}
          <div className="flex pt-[2vw] leading-2 text-[2vw] px-[1vw] font-[font2] flex-col items-center md:text-[0.8vw]">
            <div className="bg-white overflow-hidden">
              <div className="line2 will-change-transform">
                <a
                  href="https://linkedin.com/in/poojameda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-black hover:text-blue-600 transition-colors duration-500"
                >
                  <FaLinkedinIn className="mr-2 md:mr-[0.5vw]" />
                  <span className="font-[font2]">Pooja Meda</span>
                </a>
              </div>
              <div className="line2 mt-2 will-change-transform">
                <a
                  href="mailto:poojameda747@gmail.com"
                  className="flex items-center text-black hover:text-blue-600 transition-colors duration-500"
                >
                  <FaEnvelope className="mr-2 md:mr-[0.5vw]" />
                  <span>poojameda747@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative md:w-2/1 lg:w-3/4 xl:w-2/3 w-full flex justify-center md:justify-center items-center image-container">
        <div ref={imageContainerRef} className="relative flex -right-15 lg:right-19.5 lg:-top-15 md:right-14 sm:-right-35 md:-top-21 items-end justify-end overflow-hidden rounded-lg">
          <Image />
        </div>
        <div className="absolute lg:-top-43 xl:-top-38 md:-top-53 md:-right-[33vw] md:w-[59vw] w-[10vw] lg:-right-[35.7vw] xl:-right-[42vw] -top-20 right-[118vw] sm:right-[105vw]">
          <svg width="309" height="1140" viewBox="0 0 209 1370" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              ref={pathRef}
              d="M206.5 4C150.646 34.5 196 151.5 109.5 151.5C76.0427 151.5 49.9998 136.5 49.9998 111.5C49.9998 86.5 73.5112 69 95.2914 69C118.627 69 130.999 83.9412 130.999 100C130.999 129 105.5 134 89.4993 134C35.8629 134 4.00024 164.5 4 225.5C3.9998 276.476 26.2086 342 94 348C110.209 349.435 202 352 202 267C202 182 69.7566 204 69.7566 204C69.7566 204 66.9993 1206 66.9993 1970"
              stroke="black"
              strokeWidth="7"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
