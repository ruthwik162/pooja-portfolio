import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ProjectCard from "../Component/ProjectCard";

const Projects = () => {
    const containerRef = useRef(null);
    gsap.registerPlugin(ScrollTrigger);

    const projects = [
        {
            image:
                "https://k72.ca/uploads/caseStudies/PJC/Thumbnails/PJC_SiteK72_Thumbnail_1280x960-1280x960.jpg",
            title: "PJC",
        },
        {
            image:
                "https://k72.ca/uploads/caseStudies/WIDESCAPE/WS---K72.ca---Thumbnail-1280x960.jpg",
            title: "Widescape",
        },
        {
            image:
                "https://k72.ca/uploads/caseStudies/OKA/OKA_thumbnail-1280x960.jpg",
            title: "OKA",
        },
        {
            image:
                "https://k72.ca/uploads/caseStudies/Opto/thumbnailimage_opto-1280x960.jpg",
            title: "Opto",
        },
    ];

    useGSAP(() => {
        // Pin the title section
        gsap.to(".title-container", {
            scrollTrigger: {
                trigger: ".title-container",
                start: "top top",
                end: "+=400",
                pin: true,
                pinSpacing: false,
                anticipatePin: 1,
            }
        });

        // Animate heading characters as before (without scrub)
        gsap.from(".section-char", {
            y: -200,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.05,
        });

        // Animate each project card with scrub and rotation
        gsap.utils.toArray(".project-card").forEach((card, i) => {
            gsap.fromTo(card,
                {
                    x: i % 2 === 0 ? -300 : 300,
                    opacity: 0,
                    rotation: i % 2 === 0 ? -5 : 5,
                    filter: "blur(5px)"
                },
                {
                    x: 0,
                    opacity: 1,
                    rotation: 0,
                    filter: "blur(0px)",
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        end: "top 50%",
                        scrub: 1.5,
                    }
                }
            );
        });

        // Animate thanks text characters with scrub
        gsap.utils.toArray(".thanks-line").forEach((line) => {
            const chars = line.querySelectorAll(".thanks-char");

            // Wrap each character in a span for better animation control
            chars.forEach(char => {
                const wrapper = document.createElement('span');
                wrapper.className = 'char-wrapper inline-block overflow-hidden';
                char.parentNode.replaceChild(wrapper, char);
                wrapper.appendChild(char);
            });

            gsap.fromTo(line.querySelectorAll(".thanks-char"),
                {
                    y: 120,
                    opacity: 0,
                    rotation: 5,
                    filter: "blur(3px)"
                },
                {
                    y: 0,
                    opacity: 1,
                    rotation: 0,
                    filter: "blur(0px)",
                    duration: 1.2,
                    ease: "power3.out",
                    stagger: 0.03,
                    scrollTrigger: {
                        trigger: line,
                        start: "top 85%",
                        end: "top 40%",
                        scrub: 1.2,
                    }
                }
            );
        });


        gsap.from('.text', {
            y: -150,           // start below the div
            duration: 1,
            stagger: 0.2,     // delay between each text
            ease: "power3.out"
        })
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-white">
            {/* Title with pin container */}
            <div className="bg-white">
                <div className='bg-white  overflow-hidden'>
                    <div className="">
                        <div className='text-[9vw] mx-[5vw] lg:mt-[40vh] text font-[font2] uppercase text-black'>
                            {"Projects".split("").map((char, idx) => (
                                <span key={idx} className="section-char  inline-block">
                                    {char}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="px-6 lg:px-16 mt-[10vh] grid md:grid-cols-2 gap-10">
                {projects.map((project, idx) => (
                    <div key={idx} className="project-card">
                        <ProjectCard image={project.image} title={project.title} />
                    </div>
                ))}
            </div>

            {/* Thanks Section */}
            <div className="h-screen flex flex-col items-center leading-[8vw] justify-center gap-2">
                {["Thanks", "For Your", "Patience"].map((line, i) => (
                    <h2
                        key={i}
                        className="thanks-line font-[font2] uppercase text-black"
                        style={{
                            fontSize:
                                i === 0
                                    ? "10vw"
                                    : i === 1
                                        ? "9vw"
                                        : "11vw",
                        }}
                    >
                        {line.split("").map((char, idx) => (
                            <span key={idx} className="thanks-char inline-block">
                                {char}
                            </span>
                        ))}
                    </h2>
                ))}
            </div>
        </div>
    );
};

export default Projects;