import React, { useContext, useRef, useState, useEffect } from 'react'
import { NavbarContext } from '../Context/NavContext'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Link, useNavigate } from 'react-router-dom'
import { images } from '../assets/assets'

const Navbar = () => {
    const navYellowRef = useRef(null)
    const navbar = useRef(null)

    const navProfile = useRef(null)
    const navProjects = useRef(null)
    const contactRef = useRef(null)
    const menuRef = useRef(null)

    const [navOpen, setNavOpen] = useContext(NavbarContext)
    const [hovered, setHovered] = useState(false)
    const [profileHover, setProfileHover] = useState(false)
    const [project, setProject] = useState(false)
    const [contact, setContact] = useState(false)
    const [menu, setMenu] = useState(false)

    const navigate = useNavigate()

    // page load animation with stagger
    useGSAP(() => {
        const tl = gsap.timeline()

        tl.from('.logo', {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
        })

        tl.from(
            navbar.current.children,
            {
                y: -80,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out',
            },
            '-=0.5'
        )
    })

    // hover animation for each item (stagger inside)
    const handleHoverIn = (ref, setter) => {
        gsap.to(ref.current, {
            height: '100%',
            duration: 0.1,
            ease: 'power3.out',
        })

        gsap.fromTo(
            ref.current.parentNode.querySelectorAll('h1, div > div'),
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.4,
                stagger: 0.1,
                ease: 'power3.out',
            }
        )

        setter(true)
    }

    const handleHoverOut = (ref, setter) => {
        gsap.to(ref.current, {
            height: '0%',
            duration: 0.1,
            ease: 'power3.in',
        })
        setter(false)
    }

    return (
        <div className="bg-white flex w-full top-0 items-center z-11 justify-between fixed">
            {/* Logo */}
            <div className="overflow-hidden relative">
                <div className='absolute md:top-[0.1vw] md:left-[11.5vw] -top-[0.5vw] z-1 '>
                    <img src={images.purpleflower} className='w-5 animate-spin [animation-duration:2s]' alt="" />
                </div>
                <div className="logo leading-2 mx-[2vw] border p-1 rounded-tl-md rounded-br-md w-[25vw] md:w-[10vw]">
                    <Link to="/">
                        <svg className='w-full h-full relative' width="218" height="37" viewBox="0 0 118 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.548 8.252C17.548 10.34 16.828 12.08 15.388 13.472C13.972 14.84 11.8 15.524 8.872 15.524H4.048V26H0.772V0.907999H8.872C11.704 0.907999 13.852 1.592 15.316 2.96C16.804 4.328 17.548 6.092 17.548 8.252ZM8.872 12.824C10.696 12.824 12.04 12.428 12.904 11.636C13.768 10.844 14.2 9.716 14.2 8.252C14.2 5.156 12.424 3.608 8.872 3.608H4.048V12.824H8.872ZM32.9957 26.252C30.6677 26.252 28.5437 25.712 26.6237 24.632C24.7037 23.528 23.1797 22.004 22.0517 20.06C20.9477 18.092 20.3957 15.884 20.3957 13.436C20.3957 10.988 20.9477 8.792 22.0517 6.848C23.1797 4.88 24.7037 3.356 26.6237 2.276C28.5437 1.172 30.6677 0.619998 32.9957 0.619998C35.3477 0.619998 37.4837 1.172 39.4037 2.276C41.3237 3.356 42.8357 4.868 43.9397 6.812C45.0437 8.756 45.5957 10.964 45.5957 13.436C45.5957 15.908 45.0437 18.116 43.9397 20.06C42.8357 22.004 41.3237 23.528 39.4037 24.632C37.4837 25.712 35.3477 26.252 32.9957 26.252ZM32.9957 23.408C34.7477 23.408 36.3197 23 37.7117 22.184C39.1277 21.368 40.2317 20.204 41.0237 18.692C41.8397 17.18 42.2477 15.428 42.2477 13.436C42.2477 11.42 41.8397 9.668 41.0237 8.18C40.2317 6.668 39.1397 5.504 37.7477 4.688C36.3557 3.872 34.7717 3.464 32.9957 3.464C31.2197 3.464 29.6357 3.872 28.2437 4.688C26.8517 5.504 25.7477 6.668 24.9317 8.18C24.1397 9.668 23.7437 11.42 23.7437 13.436C23.7437 15.428 24.1397 17.18 24.9317 18.692C25.7477 20.204 26.8517 21.368 28.2437 22.184C29.6597 23 31.2437 23.408 32.9957 23.408ZM61.2964 26.252C58.9684 26.252 56.8444 25.712 54.9244 24.632C53.0044 23.528 51.4804 22.004 50.3524 20.06C49.2484 18.092 48.6964 15.884 48.6964 13.436C48.6964 10.988 49.2484 8.792 50.3524 6.848C51.4804 4.88 53.0044 3.356 54.9244 2.276C56.8444 1.172 58.9684 0.619998 61.2964 0.619998C63.6484 0.619998 65.7844 1.172 67.7044 2.276C69.6244 3.356 71.1364 4.868 72.2404 6.812C73.3444 8.756 73.8964 10.964 73.8964 13.436C73.8964 15.908 73.3444 18.116 72.2404 20.06C71.1364 22.004 69.6244 23.528 67.7044 24.632C65.7844 25.712 63.6484 26.252 61.2964 26.252ZM61.2964 23.408C63.0484 23.408 64.6204 23 66.0124 22.184C67.4284 21.368 68.5324 20.204 69.3244 18.692C70.1404 17.18 70.5484 15.428 70.5484 13.436C70.5484 11.42 70.1404 9.668 69.3244 8.18C68.5324 6.668 67.4404 5.504 66.0484 4.688C64.6564 3.872 63.0724 3.464 61.2964 3.464C59.5204 3.464 57.9364 3.872 56.5444 4.688C55.1524 5.504 54.0484 6.668 53.2324 8.18C52.4404 9.668 52.0444 11.42 52.0444 13.436C52.0444 15.428 52.4404 17.18 53.2324 18.692C54.0484 20.204 55.1524 21.368 56.5444 22.184C57.9604 23 59.5444 23.408 61.2964 23.408ZM90.8572 0.907999V19.448C90.8572 21.512 90.2212 23.168 88.9492 24.416C87.6772 25.64 85.9972 26.252 83.9092 26.252C81.7972 26.252 80.1052 25.628 78.8332 24.38C77.5612 23.108 76.9252 21.38 76.9252 19.196H80.2012C80.2252 20.42 80.5372 21.416 81.1372 22.184C81.7612 22.952 82.6852 23.336 83.9092 23.336C85.1332 23.336 86.0452 22.976 86.6452 22.256C87.2452 21.512 87.5452 20.576 87.5452 19.448V0.907999H90.8572ZM112.143 20.42H101.199L99.1831 26H95.7271L104.799 1.052H108.579L117.615 26H114.159L112.143 20.42ZM111.207 17.756L106.671 5.084L102.135 17.756H111.207Z" fill="black" />
                        </svg>
                        {/* <img src={logos.logonav} className='object-cover w-25 h-20' alt="" /> */}
                    </Link>
                </div>
            </div>

            {/* Desktop Nav */}
            <div ref={navbar} className="flex">
                {/* Profile */}
                <div
                    onClick={() => navigate('/profile')}
                    onMouseEnter={() => handleHoverIn(navProfile, setProfileHover)}
                    onMouseLeave={() => handleHoverOut(navProfile, setProfileHover)}
                    className="bg-black/65 hidden md:block rounded-bl-xl h-[12vw] sm:h-[6vw] md:h-[7.2vw] lg:h-[6.7vw] xl:h-[3vw] relative cursor-pointer w-[38vw] sm:w-[30vw] md:w-[19vw] lg:w-[20vw] xl:w-[15vw] border-l border-white"
                >
                    <div ref={navProfile} className={`w-full absolute top-0 left-0 h-0 bg-[#B11C1C] rounded-bl-2xl transition-all duration-500 ease-in-out ${contact ? "h-full" : "h-0"}`}></div>
                    <div className="h-full relative flex items-center px-[2vw] justify-center z-10 md:gap-2 sm:gap-3 gap-1">
                        <h1 className={`font-[font2] sm:text-[3vw] md:text-[3vw] lg:text-[2vw] text-[6vw] ${profileHover ? "text-black" : "text-white"}`} >  profile
                        </h1>
                        <div className="flex flex-col gap-2 items-end justify-center">
                            <div className={`md:w-20 lg:w-22 xl:w-20 h-0.5 w-15 sm:w-20 ${profileHover ? "bg-black" : "bg-white"}`}  ></div>
                            <div className={`md:w-12 lg:w-14 h-[1.5px] w-7 sm:w-13 ${profileHover ? "bg-black" : "bg-white"}`} ></div>
                        </div>
                    </div>
                </div>

                {/* Projects */}
                <div
                    onClick={() => navigate('/projects')}
                    onMouseEnter={() => handleHoverIn(navProjects, setProject)}
                    onMouseLeave={() => handleHoverOut(navProjects, setProject)}
                    className="bg-black/65 h-[12vw] hidden rounded-bl-2xl md:block sm:h-[6vw] md:h-[7.2vw] lg:h-[6.7vw] xl:h-[3.7vw] relative cursor-pointer w-[38vw] sm:w-[30vw] md:w-[19vw] lg:w-[20vw] xl:w-[15vw] border-l border-white"
                >
                    <div ref={navProjects} className={`w-full absolute top-0 left-0 h-0 bg-[#B11C1C] rounded-bl-2xl transition-all duration-500 ease-in-out ${contact ? "h-full" : "h-0"}`}></div>
                    <div className="h-full relative flex items-center px-[2vw] justify-center z-10 md:gap-2 sm:gap-3 gap-1">
                        <h1 className={`font-[font2] sm:text-[3vw] md:text-[3vw] lg:text-[2vw] text-[6vw] ${project ? "text-black" : "text-white"}`} >  project
                        </h1>
                        <div className="flex flex-col gap-2 items-end justify-center">
                            <div className={`md:w-20 lg:w-22 xl:w-20 h-0.5 w-15 sm:w-20 ${project ? "bg-black" : "bg-white"}`}  ></div>
                            <div className={`md:w-12 lg:w-14 h-[1.5px] w-7 sm:w-13 ${project ? "bg-black" : "bg-white"}`} ></div>
                        </div>
                    </div>
                </div>

                {/* Contact */}
                <div
                    onClick={() => navigate('/contact')}
                    onMouseEnter={() => handleHoverIn(contactRef, setContact)}
                    onMouseLeave={() => handleHoverOut(contactRef, setContact)}
                    className="bg-black/65 h-[12vw] hidden rounded-bl-2xl md:block sm:h-[6vw] md:h-[7.2vw] lg:h-[6.7vw] xl:h-[4.2vw] relative cursor-pointer w-[38vw] sm:w-[30vw] md:w-[19vw] lg:w-[20vw] xl:w-[14vw] border-l border-white overflow-hidden"
                >
                    {/* background fill */}
                    <div ref={contactRef} className={`w-full absolute top-0 left-0 h-0 bg-[#B11C1C] rounded-bl-2xl transition-all duration-500 ease-in-out ${contact ? "h-full" : "h-0"}`} ></div>
                    <div className="h-full relative flex items-center px-[2vw] justify-center z-10 md:gap-2 sm:gap-3 gap-1">
                        <h1 className={`font-[font2] sm:text-[3vw] md:text-[3vw] lg:text-[2vw] text-[6vw] ${contact ? "text-black" : "text-white"}`} >  Contact
                        </h1>
                        <div className="flex flex-col gap-2 items-end justify-center">
                            <div className={`md:w-20 lg:w-22 xl:w-20 h-0.5 w-15 sm:w-20 ${contact ? "bg-black" : "bg-white"}`} ></div>
                            <div className={`md:w-12 lg:w-14 h-[1.5px] w-7 sm:w-13 ${contact ? "bg-black" : "bg-white"}`} ></div>
                        </div>
                    </div>
                </div>


                {/* Menu */}
                <div
                    onClick={() => setNavOpen(true)}
                    onMouseEnter={() => handleHoverIn(menuRef, setMenu)}
                    onMouseLeave={() => handleHoverOut(menuRef, setMenu)}
                    className="md:bg-black/65 bg-black md:rounded-bl-2xl rounded-bl-md  h-[12vw] sm:h-[6vw]  md:h-[7.2vw] lg:h-[6.7vw] xl:h-[5vw] relative cursor-pointer w-[38vw] sm:w-[30vw] md:w-[19vw] lg:w-[20vw] xl:w-[12vw] border-l border-white"
                >
                    <div ref={menuRef} className={`w-full absolute top-0 left-0 h-0 bg-[#B11C1C] rounded-bl-2xl transition-all duration-500 ease-in-out ${contact ? "h-full" : "h-0"}`}></div>
                    <div className="h-full relative flex items-center px-[2vw] justify-center z-10 md:gap-2 sm:gap-3 gap-1">
                        <h1 className={`font-[font2] sm:text-[3vw] md:text-[3vw] lg:text-[2vw] text-[6vw] ${menu ? "text-black" : "text-white"}`} >  Menu
                        </h1>
                        <div className="flex flex-col gap-2 items-end justify-center">
                            <div className={`md:w-20 lg:w-22 xl:w-20 h-0.5 w-15 sm:w-20 ${menu ? "bg-black" : "bg-white"}`}  ></div>
                            <div className={`md:w-12 lg:w-14 h-[1.5px] w-7 sm:w-13 ${menu ? "bg-black" : "bg-white"}`} ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
