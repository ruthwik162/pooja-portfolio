import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ProjectCard from "../Component/ProjectCard";
import {
    FaReact,
    FaNodeJs,
    FaVuejs,
    FaPython,
    FaAngular,
    FaAws,
    FaMobile,
    FaRocket,
    FaShieldAlt,
    FaEnvelope,
    FaLinkedin,
    FaGithub,
    FaArrowRight
} from "react-icons/fa";
import {
    SiMongodb,
    SiTailwindcss,
    SiPostgresql,
    SiThreedotjs,
    SiFirebase,
    SiTypescript,
    SiSvelte,      // ✅ fixed
    SiGraphql,
    SiTensorflow,  // ✅ fixed
    SiGoogleanalytics 
} from "react-icons/si";
import { MdBarChart } from "react-icons/md";


const Projects = () => {
    const containerRef = useRef(null);
    gsap.registerPlugin(ScrollTrigger);

    // Map stack names to React icons
    const getStackIcon = (name) => {
        const iconMap = {
            "React": FaReact,
            "Node.js": FaNodeJs,
            "MongoDB": SiMongodb,
            "Tailwind": SiTailwindcss,
            "Vue.js": FaVuejs,
            "Python": FaPython,
            "PostgreSQL": SiPostgresql,
            "Three.js": SiThreedotjs,
            "Angular": FaAngular,
            "Firebase": SiFirebase,
            "TypeScript": SiTypescript,
            "Chart.js": MdBarChart,
            "Svelte": SiSvelte,         // ✅ fixed
            "GraphQL": SiGraphql,
            "AWS": FaAws,
            "TensorFlow": SiTensorflow  // ✅ fixed
        };

        const IconComponent = iconMap[name] || FaReact;
        return <IconComponent className="text-white text-lg" />;
    };

    const projects = [
        {
            image: "https://k72.ca/uploads/caseStudies/PJC/Thumbnails/PJC_SiteK72_Thumbnail_1280x960-1280x960.jpg",
            title: "PJC",
            description: "A modern e-commerce platform with seamless user experience and advanced inventory management system.",
            url: "https://example.com/pjc",
            stacks: [
                { name: "React" },
                { name: "Node.js" },
                { name: "MongoDB" },
                { name: "Tailwind" }
            ]
        },
        {
            image: "https://k72.ca/uploads/caseStudies/WIDESCAPE/WS---K72.ca---Thumbnail-1280x960.jpg",
            title: "Widescape",
            description: "Landscape design platform featuring AR visualization and project management tools for professionals.",
            url: "https://example.com/widescape",
            stacks: [
                { name: "Vue.js" },
                { name: "Python" },
                { name: "PostgreSQL" },
                { name: "Three.js" }
            ]
        },
        {
            image: "https://k72.ca/uploads/caseStudies/OKA/OKA_thumbnail-1280x960.jpg",
            title: "OKA",
            description: "Health and wellness app with personalized workout plans and nutrition tracking capabilities.",
            url: "https://example.com/oka",
            stacks: [
                { name: "Angular" },
                { name: "Firebase" },
                { name: "TypeScript" },
                { name: "Chart.js" }
            ]
        },
        {
            image: "https://k72.ca/uploads/caseStudies/Opto/thumbnailimage_opto-1280x960.jpg",
            title: "Opto",
            description: "Optical prescription management system with AI-powered lens recommendations and virtual try-on.",
            url: "https://example.com/opto",
            stacks: [
                { name: "Svelte" },
                { name: "GraphQL" },
                { name: "AWS" },
                { name: "TensorFlow" }
            ]
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

        // Animate heading characters
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

        // Animate contact section
        gsap.from(".contact-item", {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".contact-section",
                start: "top 85%",
                end: "top 50%",
                scrub: 1,
            }
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-white">
            {/* Title with pin container */}
            <div className="title-container bg-white">
                <div className='bg-white overflow-hidden'>
                    <div className="">
                        <div className='text-[9vw] mx-[5vw] lg:mt-[40vh] text font-[font2] uppercase text-black'>
                            {"Projects".split("").map((char, idx) => (
                                <span key={idx} className="section-char inline-block">
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
                        <ProjectCard
                            image={project.image}
                            title={project.title}
                            description={project.description}
                            stacks={project.stacks}
                            url={project.url}
                            getStackIcon={getStackIcon}
                        />
                    </div>
                ))}
            </div>

            {/* Contact Section */}
            <div className="contact-section min-h-screen flex flex-col items-center justify-center gap-8 px-6 py-16 bg-gray-50">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="contact-item text-4xl md:text-6xl font-bold text-black mb-6">
                        Ready to Start Your Next Project?
                    </h2>
                    <p className="contact-item text-lg md:text-xl text-gray-600 mb-8">
                        Let's collaborate to bring your vision to life with innovative solutions and cutting-edge technology.
                    </p>
                </div>

                <div className="contact-item grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { icon: <FaMobile className="text-3xl text-blue-600 mb-4" />, title: "Responsive Design", desc: "Perfect on every device" },
                        { icon: <FaRocket className="text-3xl text-blue-600 mb-4" />, title: "Fast Performance", desc: "Lightning fast loading" },
                        { icon: <SiGoogleanalytics className="text-3xl text-blue-600 mb-4" />, title: "SEO Optimized", desc: "Better search rankings" },
                        { icon: <FaShieldAlt className="text-3xl text-blue-600 mb-4" />, title: "Secure", desc: "Enterprise-grade security" }
                    ].map((feature, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
                            {feature.icon}
                            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                            <p className="text-gray-600 text-sm">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="contact-item flex flex-col sm:flex-row gap-4">
                    <button className="px-8 py-4 bg-black text-white rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors">
                        Start a Project
                        <FaArrowRight />
                    </button>
                    <button className="px-8 py-4 border-2 border-black text-black rounded-full hover:bg-black hover:text-white transition-colors">
                        View Portfolio
                    </button>
                </div>

                <div className="contact-item mt-12 text-center">
                    <p className="text-gray-500 mb-4">Get in touch</p>
                    <div className="flex justify-center gap-6">
                        <a href="mailto:hello@example.com" className="text-blue-600 hover:text-blue-800">
                            <FaEnvelope className="text-2xl" />
                        </a>
                        <a href="https://linkedin.com" className="text-blue-600 hover:text-blue-800">
                            <FaLinkedin className="text-2xl" />
                        </a>
                        <a href="https://github.com" className="text-blue-600 hover:text-blue-800">
                            <FaGithub className="text-2xl" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;