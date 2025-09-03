// SmoothScroll.jsx
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,       // scroll speed
      easing: (t) => 1 - Math.pow(1 - t, 4), // easeOutQuart
      smoothWheel: true,
      smoothTouch: false,
    });

    // Sync Lenis with GSAP’s ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Sync with ScrollTrigger refresh
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-auto">
      {children}
    </div>
  );
};

export default SmoothScroll;
