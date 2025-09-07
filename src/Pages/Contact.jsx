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
        message: ''
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [toast, setToast] = useState({ show: false, message: '', type: '' })

    const contactRef = useRef(null);
    const [hoveredContact, setHoveredContact] = useState(false);

    const imageDivRef = useRef(null)
    const rotatingTextRef = useRef(null)
    const svgPathRef = useRef(null)
    const svgPcPathRef = useRef(null);
    const toastRef = useRef(null);

    const validateForm = () => {
        const newErrors = {}

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required'
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters'
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address'
        }

        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required'
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type })

        // Animate toast in
        gsap.fromTo(toastRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
        )

        // Animate toast out after delay
        setTimeout(() => {
            if (toastRef.current) {
                gsap.to(toastRef.current, {
                    y: -100,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.in",
                    onComplete: () => setToast({ show: false, message: '', type: '' })
                })
            }
        }, 3000)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            // Shake animation for invalid form
            gsap.to('.contact-form', {
                x: 10,
                duration: 0.1,
                repeat: 5,
                yoyo: true,
                ease: "power1.inOut"
            })
            showToast('Please fix the errors in the form', 'error')
            return
        }

        setIsSubmitting(true)

        try {
            const response = await fetch("https://pooja-server.onrender.com/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                showToast("Thank you for your message! I will get back to you soon.")
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                })
            } else {
                const errorData = await response.json()
                showToast(errorData.error || "Something went wrong, please try again.", "error")
            }
        } catch (error) {
            console.error("Error submitting form:", error)
            showToast("Network error. Please try again later.", "error")
        } finally {
            setIsSubmitting(false)
        }
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
        <div id='page1' className='pt-1 min-h-screen w-full bg-white relative overflow-hidden'>

            {/* Toast Notification */}
            {toast.show && (
                <div
                    ref={toastRef}
                    className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-lg font-medium flex items-center ${toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-[#D3FD50] text-black'
                        }`}
                >
                    {toast.type === 'error' ? (
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    )}
                    {toast.message}
                </div>
            )}

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
            <div ref={imageDivRef} className='absolute overflow-hidden lg:h-[45vw] md:h-[55vw] h-[95vw] lg:rounded-3xl rounded-xl lg:w-[25vw] md:w-[35vw] w-[65vw]  lg:top-30 md:top-40 top-21 md:left-[10vw] right-[5vw] md:right-auto z-10' >
                <Image className="w-full h-full object-cover" />
            </div>

            <div className='relative font-[font2] '>
                <div className='lg:mt-[25vh] md:mt-[40vh] mt-[55vh] overflow-hidden'>
                    <div className='leading-[10vw] overflow-hidden'>
                        <div className='leading-[2vw] overflow-hidden'>
                            <div className='lg:mt-[2vh] mt-[3vw]'>
                                <h1 className='md:text-[10vw] text-[12vw]  text text-start md:text-start md:right-0 relative md:left-[33vw] left-[5vw] uppercase md:leading-[7vw] leading-[9vw] '>Contact</h1>
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
                <div className='absolute md:-top-[25vh] hidden md:block z-10 lg:mt-[25vh] md:mt-[40vh] mt-[55vh] overflow-hidden'>
                    <div className='leading-[10vw] overflow-hidden'>
                        <div className='leading-[2vw] overflow-hidden'>
                            <div className='lg:mt-[2vh] mt-[3vw]'>
                                <h1 className='md:text-[10vw] text-[12vw]  text text-start md:text-start md:right-0 relative md:left-[33vw] left-[5vw] uppercase md:leading-[7vw] leading-[9vw] stroke-text'>Contact</h1>
                            </div>
                        </div>
                    </div>
                    <div className='leading-[10vw] overflow-hidden'>
                        <div className='leading-[2vw] overflow-hidden'>
                            <div className='lg:mt-[2vh] mt-[3vw]'>
                                <h1 className='md:text-[10vw] text-[12vw] text text-start md:text-start md:right-0 relative md:left-[33vw] left-[5vw] uppercase md:leading-[7vw] leading-[9vw] stroke-text'>Me</h1>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className='md:pl-[38%] pl-[5%] md:-mt-[2vw] mt-4 mx-2 overflow-hidden contact-form'>
                    <div className='p-5 bg-red-600/15 backdrop-blur-2xl rounded-3xl'>
                        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
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
                                    className={`w-full px-4 py-3 border-b-2 focus:outline-none bg-transparent transition-colors duration-300 text-lg ${errors.name ? 'border-red-500' : 'border-gray-300 focus:border-[#D3FD50]'
                                        }`}
                                    placeholder="Your name"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
                                    className={`w-full px-4 py-3 border-b-2 focus:outline-none bg-transparent transition-colors duration-300 text-lg ${errors.email ? 'border-red-500' : 'border-gray-300 focus:border-[#D3FD50]'
                                        }`}
                                    placeholder="your.email@example.com"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
                                    className={`w-full px-4 py-3 border-b-2 focus:outline-none bg-transparent transition-colors duration-300 text-lg resize-none ${errors.message ? 'border-red-500' : 'border-gray-300 focus:border-[#D3FD50]'
                                        }`}
                                    placeholder="Your message here..."
                                />
                                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                            </div>

                            <div className="form-element pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
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
                                    className="click bg-black h-[12vw] md:h-[8vw] lg:h-[4vw] w-[50vw] md:w-[25vw] lg:w-[15vw] relative cursor-pointer rounded-full overflow-hidden border border-[#D3FD50] flex items-center justify-center"
                                >
                                    <div ref={contactRef} className="absolute bottom-0 left-0 w-full h-0 bg-[#D3FD50] transition-all duration-300"></div>
                                    <span className={`text-[4vw] md:text-[2vw] lg:text-[1vw] font-bold transition-colors duration-300 relative z-10 ${hoveredContact ? "text-black" : "text-white"}`}>
                                        {isSubmitting ? 'Sending...' : 'Contact Me'}
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact