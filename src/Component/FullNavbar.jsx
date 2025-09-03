import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useContext, useRef } from 'react'
import { NavbarContext } from '../Context/NavContext'
import { useNavigate } from 'react-router-dom'
import { images } from '../assets/assets'

const FullNavbar = () => {
  const fullNavRef = useRef(null)
  const fullscreenRef = useRef(null)
  const [navOpen, setNavOpen] = useContext(NavbarContext)

  const tlRef = useRef(null)
  const navigate = useNavigate()

  const handleNavClick = (path) => {
    navigate(path)
    window.scrollTo(0, 0)
    setNavOpen(false)
  }

  // build timeline once
  useGSAP(() => {
    tlRef.current = gsap.timeline({ paused: true })

    tlRef.current
      .fromTo(
        fullscreenRef.current,
        { autoAlpha: 0, display: 'none' },
        { autoAlpha: 1, display: 'block', duration: 0.3, ease: 'power2.out' }
      )
      .from(
        '.navLink',
        { opacity: 0, y: -20, duration: 0.4, ease: 'power2.out' },
        '-=0.1'
      )
      // 🔥 flip animation for links
      .from(
        '.link',
        {
          opacity: 1,
          rotateX: 90,
          transformOrigin: 'top',
          stagger: 0.15,
          duration: 0.6,
          ease: 'back.out(1.2)',
        },
        '-=0.2'
      )
  }, [])

  // play or reverse on navOpen change
  useGSAP(() => {
    if (navOpen) {
      tlRef.current.play()
    } else {
      tlRef.current.reverse()
    }
  }, [navOpen])

  // hover animation handler
  const handleHover = (el, isEnter) => {
    gsap.to(el.querySelector('.moveLink'), {
      height: isEnter ? '100%' : '0%',
      duration: 0.15,
      ease: 'power1.inOut',
    })
  }

  return (
    <div
      id="fullscreennav"
      ref={fullscreenRef}
      className="fullscreennav overflow-hidden fixed inset-0 w-full z-50 overflow-y-auto text-white bg-black"
    >
      <div ref={fullNavRef} className="relative">
        {/* Header (logo + close) */}
        <div className="navLink flex w-full justify-between p-4 sm:p-6 items-start">
          <div className="w-16 sm:w-20  md:w-22">

            <img src={images.logo} className='w-full h-full object-cover' alt="" />
          </div>
          {/* Close button */}
          <div
            onClick={() => setNavOpen(false)}
            className="relative cursor-pointer h-8 w-8 sm:h-10 sm:w-10 md:h-16 md:w-16 flex items-center justify-center"
          >
            <div className="bg-[#D3FD50] absolute h-full w-0.5 rotate-45"></div>
            <div className="bg-[#D3FD50] absolute h-full w-0.5 -rotate-45"></div>
          </div>
        </div>

        {/* Links */}
        <div id="all-links" className="py-40 sm:py-16 lg:py-20">
          <div onClick={() => handleNavClick("/profile")}
            onMouseEnter={(e) => handleHover(e.currentTarget, true)}
            onMouseLeave={(e) => handleHover(e.currentTarget, false)}
            className='link origin-top cursor-pointer relative border-t-1 border-white'>
            <h1 className='font-[font2] text-5xl lg:text-[8vw] text-center lg:leading-[0.8] lg:pt-10 pt-3 uppercase'>Profile</h1>
            <div className='moveLink absolute text-black flex top-0 bg-[#D3FD50]'>
              <div className='moveX flex items-center'>
                <h2 className='whitespace-nowrap font-[font2] lg:text-[8vw] text-5xl  text-center lg:leading-[0.8] lg:pt-10 pt-4 uppercase'>View my profile</h2>
                <div className='md:w-60 md:h-20 w-30 h-10 z-0 bg-red-500 rounded-full'></div>
                <h2 className='whitespace-nowrap font-[font2] lg:text-[8vw] text-5xl  text-center lg:leading-[0.8] lg:pt-10 pt-4 uppercase'>View my profile</h2>
                <div className='md:w-60 md:h-20 w-30 h-10 z-0 bg-blue-500 rounded-full'></div>

              </div>
              <div className='moveX flex items-center'>
                <h2 className='whitespace-nowrap font-[font2] lg:text-[8vw] text-5xl  text-center lg:leading-[0.8] lg:pt-10 pt-4 uppercase'>View my profile</h2>
                <div className='md:w-60 md:h-20 w-30 h-10 z-0 bg-orange-500 rounded-full'></div>

                <h2 className='whitespace-nowrap font-[font2] lg:text-[8vw] text-5xl  text-center lg:leading-[0.8] lg:pt-10 pt-4 uppercase'>View my profile</h2>
                <div className='md:w-60 md:h-20 w-30 h-10 z-0 bg-black rounded-full'></div>

              </div>
            </div>
          </div>

          <div onClick={() => handleNavClick("/projects")}
            onMouseEnter={(e) => handleHover(e.currentTarget, true)}
            onMouseLeave={(e) => handleHover(e.currentTarget, false)}
            className='link origin-top cursor-pointer relative border-t-1 border-white'>
            <h1 className='font-[font2] text-5xl lg:text-[8vw] text-center lg:leading-[0.8] lg:pt-10 pt-3 uppercase'>Projects</h1>
            <div className='moveLink absolute text-black flex top-0 bg-[#D3FD50]'>
              <div className='moveX flex items-center'>
                <h2 className='whitespace-nowrap font-[font2] lg:text-[8vw] text-5xl  text-center lg:leading-[0.8] lg:pt-10 pt-4 uppercase'>View all my Projects</h2>
                <div className='md:w-60 md:h-20 w-30 h-10 z-0 bg-black rounded-full'></div>
                <h2 className='whitespace-nowrap font-[font2] lg:text-[8vw] text-5xl  text-center lg:leading-[0.8] lg:pt-10 pt-4 uppercase'>View all my Projects</h2>
                <div className='md:w-60 md:h-20 w-30 h-10 z-0 bg-black rounded-full'></div>

              </div>
              <div className='moveX flex items-center'>
                <h2 className='whitespace-nowrap font-[font2] lg:text-[8vw] text-5xl  text-center lg:leading-[0.8] lg:pt-10 pt-4 uppercase'>View all my Projects</h2>
                <div className='md:w-60 md:h-20 w-30 h-10 z-0 bg-black rounded-full'></div>

                <h2 className='whitespace-nowrap font-[font2] lg:text-[8vw] text-5xl  text-center lg:leading-[0.8] lg:pt-10 pt-4 uppercase'>View all my Projects</h2>
                <div className='md:w-60 md:h-20 w-30 h-10 z-0 bg-black rounded-full'></div>

              </div>
            </div>
          </div>

          <div onClick={() => handleNavClick("/contact")}
            onMouseEnter={(e) => handleHover(e.currentTarget, true)}
            onMouseLeave={(e) => handleHover(e.currentTarget, false)}
            className='link origin-top cursor-pointer relative border-t-1 border-white'>
            <h1 className='font-[font2] text-5xl lg:text-[8vw] text-center lg:leading-[0.8] lg:pt-10 pt-3 uppercase'>Contact</h1>
            <div className='moveLink absolute z-1 text-black flex top-0 bg-[#D3FD50]'>
              <div className='moveX flex items-center'>
                <h2 className='whitespace-nowrap font-[font2] lg:text-[8vw] text-5xl  text-center lg:leading-[0.8] lg:pt-10 pt-4 uppercase'>Feel free to Ping Me</h2>
                <div className='md:w-60 md:h-20 w-30 h-10 z-[-9] bg-red-900 rounded-full'></div>
                <h2 className='whitespace-nowrap font-[font2] lg:text-[8vw] text-5xl  text-center lg:leading-[0.8] lg:pt-10 pt-4 uppercase'>Feel free to Ping Me</h2>
                <div className='md:w-60 md:h-20 w-30 h-10 z-[-9] bg-red-900 rounded-full'></div>

              </div>
              <div className='moveX flex items-center'>
                <h2 className='whitespace-nowrap font-[font2] lg:text-[8vw] text-5xl  text-center lg:leading-[0.8] lg:pt-10 pt-4 uppercase'>Feel free to Ping Me</h2>
                <div className='md:w-60 md:h-20 w-30 h-10 z-0 bg-red-900 rounded-full'></div>

                <h2 className='whitespace-nowrap font-[font2] lg:text-[8vw] text-5xl  text-center lg:leading-[0.8] lg:pt-10 pt-4 uppercase'>Feel free to Ping Me</h2>
                <div className='md:w-60 md:h-20 w-30 h-10 z-0 bg-red-900 rounded-full'></div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default FullNavbar
