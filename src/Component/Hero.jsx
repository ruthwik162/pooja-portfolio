import React, { useRef, useEffect } from "react";
import { FaEnvelope, FaLinkedinIn } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "./Image.jsx";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroButtons from "./HeroButtons.jsx";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const heroRef = useRef(null);
    const pathRef = useRef(null);

    useEffect(() => {
        // Lenis setup
        const lenis = new Lenis({
            duration: 1.3, // feel of smoothness
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
            smoothWheel: true,
            smoothTouch: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Sync Lenis with ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        return () => {
            lenis.destroy();
        };
    }, []);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                defaults: { ease: "expo.out", duration: 1.8 },
            });

            tl.from(
                ".text",
                {
                    y: -150,
                    stagger: 0.15,
                    duration: 1.5,
                    ease: "power4.out",
                },
                0.2
            );

            tl.from(
                ".line",
                {
                    y: 100,
                    opacity: 0,
                    stagger: 0.2,
                    duration: 1.4,
                    ease: "back.out(1.7)",
                },
                0.8
            );

            tl.from(
                ".line2",
                {
                    x: -100,
                    opacity: 0,
                    stagger: 0.25,
                    duration: 1.3,
                    ease: "power3.out",
                },
                1.2
            );

            const path = pathRef.current;
            const length = path.getTotalLength();

            gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
            });

            gsap.to(path, {
                strokeDashoffset: 0,
                duration: 1.9,
                ease: "power2.inOut",
            });
        },
        { scope: heroRef }
    );

    return (
        <section
            ref={heroRef}
            className="md:h-[89.5vh] h-[90vh]  bg-white pb-10 flex md:flex-row flex-col-reverse md:pt-[8vh] mt-[5vh] justify-center items-start overflow-hidden relative"
        >
            {/* LEFT SIDE */}
            <div className="relative md:w-1/2 md:mt-[5vw] h-full w-full">
                {/* Name */}
                <div className="items-start leading-[15vw] px-[4vw] flex-col flex font-[font1] justify-center">
                    <div className="md:leading-[8vw] leading-[17vw] overflow-hidden">
                        <div className="bg-white overflow-hidden">
                            <div className="text-[18vw] md:text-[9vw] text font-[font2] uppercase text-black will-change-transform">
                                Pooja
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden">
                            <div className="text-[15vw] md:text-[9vw] text font-[font2] uppercase text-black will-change-transform">
                                Chaudhary
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden">
                            <div className="text-[16vw] md:text-[9vw] text font-[font1] uppercase text-black will-change-transform">
                                Meda
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tagline */}
                <div className="items-start flex-col pt-[2vw] px-[4vw] flex font-[font2] justify-center">
                    <div className="text-base md:text-[1.2vw] text-[3vw] leading-[3vw] md:leading-[1.3vw]">
                        <div className="bg-white overflow-hidden">
                            <div className="line will-change-transform">
                                &nbsp;&nbsp;&nbsp;&nbsp;I'm a passionate UI/UX Designer and
                                Frontend Developer
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden">
                            <div className="line will-change-transform">
                                with great hands on Experience
                            </div>
                        </div>
                    </div>
                    <div className="items-start flex-col pt-[2vw] flex font-[font1] justify-center">
                        <HeroButtons />
                    </div>

                    {/* Socials */}
                    <div className="flex pt-[2vw] leading-2 text-[2vw] px-[1vw] font-[font2] flex-col items-center  md:text-[0.8vw]">
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
            <div className="relative md:w-1/2 w-full flex justify-center md:justify-center items-center image-container">
                <div className="relative flex -right-15 md:right-0 items-end justify-end">
                    <Image />
                </div>
                <div className='absolute md:-top-20 md:-right-[40vw] md:w-[59vw] w-[10vw] -top-20 right-[120vw] '>
                    <svg width="309" height="1140" viewBox="0 0 209 1370" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path ref={pathRef} d="M206.5 4C150.646 34.5 196 151.5 109.5 151.5C76.0427 151.5 49.9998 136.5 49.9998 111.5C49.9998 86.5 73.5112 69 95.2914 69C118.627 69 130.999 83.9412 130.999 100C130.999 129 105.5 134 89.4993 134C35.8629 134 4.00024 164.5 4 225.5C3.9998 276.476 26.2086 342 94 348C110.209 349.435 202 352 202 267C202 182 69.7566 204 69.7566 204C69.7566 204 66.9993 1206 66.9993 1370" stroke="black" strokeWidth="7" />
                    </svg>
                </div>
            </div>
            
        </section>
    );
};

export default Hero;
