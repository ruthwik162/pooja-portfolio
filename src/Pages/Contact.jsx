import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useRef, useState } from 'react'
import Image from '../Component/Image'

const Contact = () => {
    gsap.registerPlugin(ScrollTrigger)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const contactRef = useRef(null);
    const [hoveredContact, setHoveredContact] = useState(false);

    const imageDivRef = useRef(null)
    const rotatingTextRef = useRef(null)
    const svgPathRef = useRef(null)
    const svgPcPathRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Form submission logic would go here
        console.log('Form submitted:', formData)
        // You would typically send this data to your backend
        alert('Thank you for your message! I will get back to you soon.')
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        })
    }

    useGSAP(function () {
        // Pin the image
        gsap.to(imageDivRef.current, {
            scrollTrigger: {
                trigger: imageDivRef.current,
                start: 'top 15%',
                end: 'bottom 70%',
                pin: true,
                scrub: 1,
                pinSpacing: true,
                pinReparent: true,
                pinType: 'transform',
                anticipatePin: 1,
                invalidateOnRefresh: true,
            }
        })

        // Animate rotating text
        gsap.to(rotatingTextRef.current, {
            rotation: -360,
            duration: 15,
            repeat: -1,
            ease: "linear",
            transformOrigin: "50% 50%",
        })

        // Animate SVG path (Trim Path effect)
        if (svgPathRef.current) {
            const length = svgPathRef.current.getTotalLength()
            gsap.set(svgPathRef.current, {
                strokeDasharray: length,
                strokeDashoffset: -length,
            })
            gsap.to(svgPathRef.current, {
                strokeDashoffset: 0,
                duration: 3,
                ease: "power2.inOut",
            })
        }
        if (svgPcPathRef.current) {
            const length = svgPcPathRef.current.getTotalLength()
            gsap.set(svgPcPathRef.current, {
                strokeDasharray: length,
                strokeDashoffset: length,
            })
            gsap.to(svgPcPathRef.current, {
                strokeDashoffset: 0,
                duration: 3,
                ease: "power2.inOut",
            })
        }

        // Animate form elements
        gsap.fromTo('.form-element',
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.contact-form',
                    start: 'top 80%',
                    end: 'bottom 60%',
                    toggleActions: 'play none none reverse'
                }
            }
        )

        // Animate title text
        const tl = gsap.timeline()
        tl.from('.text', {
            y: -150,
            duration: 1.5,
            stagger: 0.2,
            ease: "power3.out"
        })
    })

    return (
        <div id='page1' className='pt-1 min-h-screen w-full bg-white relative overflow-x-hidden'>

            {/* Trim Path SVG */}
            <div className='absolute md:-top-2 md:-left-[1vw] md:w-[59vw] w-[10vw] -top-30 right-[75vw] z-0'>
                <svg className='md:block hidden' width="209" height="1140" viewBox="0 0 209 1370" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path ref={svgPcPathRef} d="M206.5 4C150.646 34.5 196 151.5 109.5 151.5C76.0427 151.5 49.9998 136.5 49.9998 111.5C49.9998 86.5 73.5112 69 95.2914 69C118.627 69 130.999 83.9412 130.999 100C130.999 129 105.5 134 89.4993 134C35.8629 134 4.00024 164.5 4 225.5C3.9998 276.476 26.2086 342 94 348C110.209 349.435 202 352 202 267C202 182 69.7566 204 69.7566 204C69.7566 204 66.9993 1206 66.9993 1370" stroke="black" strokeWidth="7" />
                </svg>
                <svg className='block md:hidden' width="331" height="297" viewBox="0 0 331 297" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path ref={svgPathRef} d="M330.5 232.035C193.5 232.035 153 234 153 232.035C153 202 169.471 171.946 195.5 171.5C231 170.891 246 202 246 232.035C246 255.371 230.879 294.264 186.808 294.264C127.5 294.264 126.51 237.326 124.889 232.035C123.5 227.5 119.948 172.528 64.5288 171.75C17.4069 171.089 3 213.755 3 232.035C3 234.047 19.7452 232.035 64.5288 232.035C95 232.035 106.5 232.035 106.5 232.035C106.5 232.035 106.5 29.714 106.5 0" stroke="black" strokeWidth="5" />
                </svg>
            </div>

            {/* Rotating Circular Text Overlay */}
            <div
                ref={rotatingTextRef}
                className="absolute flex md:top-22 top-30 md:right-[8vw] origin-center right-[39vw] items-center justify-center pointer-events-none z-10"
            >
                <svg className="w-[270px] h-[270px] md:w-[280px] md:h-[280px] sm:w-[150px] sm:h-[150px]" viewBox="0 0 200 200">
                    <defs>
                        <path id="circlePath" d="M100,100 m-65,0 a65,65 0 1,1 130,0 a65,65 0 1,1 -130,0" />
                    </defs>
                    <text
                        fill="black"
                        fontSize="15"
                        fontFamily="font2, sans-serif"
                        letterSpacing="1"
                    >
                        <textPath href="#circlePath" startOffset="0%">
                            —Pooja Chaudhary Meda •—Developer •—Designer
                        </textPath>
                    </text>
                </svg>
            </div>

            {/* Image */}
            <div ref={imageDivRef} className='absolute overflow-hidden lg:h-[45vw] md:h-[55vw] h-[95vw] lg:rounded-3xl rounded-xl lg:w-[25vw] md:w-[35vw] w-[65vw] lg:top-30 md:top-40 top-21 md:left-[10vw] right-[5vw] md:right-auto z-10' >
                <Image className="w-full h-full object-cover" />
            </div>

            <div className='relative font-[font2] z-30'>
                <div className='lg:mt-[25vh] md:mt-[40vh] mt-[55vh] overflow-hidden'>
                    <div className='leading-[10vw] overflow-hidden'>
                        <div className='leading-[2vw] overflow-hidden'>
                            <div className='lg:mt-[2vh] mt-[3vw]'>
                                <h1 className='md:text-[10vw] text-[12vw] text text-start md:text-start md:right-0 relative md:left-[33vw] left-[5vw] uppercase md:leading-[7vw] leading-[9vw]'>Contact</h1>
                            </div>
                        </div>
                    </div>
                    <div className='leading-[10vw] overflow-hidden'>
                        <div className='leading-[2vw] overflow-hidden'>
                            <div className='lg:mt-[2vh] mt-[3vw]'>
                                <h1 className='md:text-[10vw] text-[12vw] text text-start md:text-start md:right-0 relative md:left-[33vw] left-[5vw] uppercase md:leading-[7vw] leading-[9vw]'>Me</h1>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className='md:pl-[40%] pl-[5%] md:-mt-[1vw] mt-4 mx-2 overflow-hidden contact-form'>
                    <form onSubmit={handleSubmit} className="space-y-6 max-w-[90vw] md:max-w-none">
                        <div className="form-element">
                            <label htmlFor="name" className="block text-xl font-medium mb-2 text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-red-500 focus:outline-none bg-transparent transition-colors duration-300 text-lg"
                                placeholder="Your name"
                            />
                        </div>

                        <div className="form-element">
                            <label htmlFor="email" className="block text-xl font-medium mb-2 text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-red-500 focus:outline-none bg-transparent transition-colors duration-300 text-lg"
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div className="form-element">
                            <label htmlFor="subject" className="block text-xl font-medium mb-2 text-gray-700">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-red-500 focus:outline-none bg-transparent transition-colors duration-300 text-lg"
                                placeholder="What is this regarding?"
                            />
                        </div>

                        <div className="form-element">
                            <label htmlFor="message" className="block text-xl font-medium mb-2 text-gray-700">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                                rows={5}
                                className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-red-500 focus:outline-none bg-transparent transition-colors duration-300 text-lg resize-none"
                                placeholder="Your message here..."
                            />
                        </div>

                        <div className="form-element">
                            <div
                                onMouseEnter={() => {
                                    if (contactRef.current) {
                                        contactRef.current.style.height = "100%";
                                    }
                                    setHoveredContact(true);
                                }}
                                onMouseLeave={() => {
                                    if (contactRef.current) {
                                        contactRef.current.style.height = "0%";
                                    }
                                    setHoveredContact(false);
                                }}
                                className="click bg-black h-[12vw] md:h-[8vw] lg:h-[4vw] w-[50vw] md:w-[25vw] lg:w-[15vw] relative cursor-pointer rounded-full overflow-hidden"
                            >
                                <div ref={contactRef} className="absolute bottom-0 left-0 w-full h-0 bg-[#D3FD50] transition-all duration-300"></div>
                                <div className="h-full flex border border-[#D3FD50] items-center justify-center relative z-10">
                                    <h2 className={`text-[4vw] md:text-[2vw] lg:text-[1vw] font-bold transition-colors duration-300 ${hoveredContact ? "text-black" : "text-white"}`} >
                                        Contact Me
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact