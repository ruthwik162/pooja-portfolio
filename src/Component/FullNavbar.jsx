import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useContext, useRef } from 'react'
import { NavbarContext } from '../Context/NavContext'
import { logos } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const FullScreenNav = () => {
  const fullNavLinksRef = useRef(null)
  const fullScreenRef = useRef(null)

  const [navOpen, setNavOpen] = useContext(NavbarContext)
  const navigate = useNavigate();




  function gsapAnimation() {
    const tl = gsap.timeline()

    // Show container immediately
    tl.to('.fullscreennav', {
      display: 'block',
      duration: 0
    })


    // Fade in navlinks faster
    tl.to('.navlink', {
      opacity: 1,
      duration: 0.2
    }, "-=0.15") // slight overlap

    // Show links quickly
    tl.to('.link', {
      opacity: 1,
      rotateX: 0,
      duration: 0.25,
      stagger: {
        amount: 0.15
      }
    }, "-=0.1")
  }

  function gsapAnimationReverse() {
    const tl = gsap.timeline()

    // Hide links quickly
    tl.to('.link', {
      opacity: 0,
      rotateX: 90,
      duration: 0.2,
      stagger: {
        amount: 0.1
      }
    })



    // Fade out navlinks quickly
    tl.to('.navlink', {
      opacity: 0,
      duration: 0.15
    }, "-=0.1")

    // Hide container instantly
    tl.to('.fullscreennav', {
      display: 'none',
      duration: 0
    })
  }




  useGSAP(function () {
    if (navOpen) {

      gsapAnimation()
    } else {

      gsapAnimationReverse()

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

  const handleNavClick = (path) => {
    navigate(path)
    window.scrollTo(0, 0)
    setNavOpen(false)
  }

  return (
    <div ref={fullScreenRef} id='fullscreennav' className='fullscreennav fixed h-full bg-black hidden text-white overflow-hidden md:top-0 -top-0 w-full z-99 '>

      <div ref={fullNavLinksRef} className='relative'>
        <div className="navlink flex w-full justify-between lg:p-5 p-2 items-start">
          <div className=''>
            <div className='lg:w-36 w-24'>
              <img src={logos.logonav} className='w-full h-full bg-white p-1 rounded-3xl object-cover' alt="" />
            </div>
          </div>
          <div onClick={() => {
            setNavOpen(false)
          }} className='lg:h-32 h-20 w-20 lg:w-32 relative cursor-pointer'>
            <div className='lg:h-44 h-28 lg:w-1 w-0.5 -rotate-45 origin-top absolute bg-[#D3FD50]'></div>
            <div className='lg:h-44 h-28 lg:w-1 w-0.5 right-0 rotate-45 origin-top absolute bg-[#D3FD50]'></div>

          </div>
        </div>
        <div className=' py-10 mt-[20vw] md:mt-[0vw]'>

          <div onClick={() => handleNavClick("/")}
            onMouseEnter={(e) => handleHover(e.currentTarget, true)}
            onMouseLeave={(e) => handleHover(e.currentTarget, false)}
            className='link origin-top cursor-pointer relative border-y-1 border-white'>
            <h1 className='font-[font2] text-5xl lg:text-[8vw] text-center lg:leading-[0.8] lg:pt-10 pt-3 uppercase'>Home</h1>

          </div>

          <div onClick={() => handleNavClick("/profile")}
            onMouseEnter={(e) => handleHover(e.currentTarget, true)}
            onMouseLeave={(e) => handleHover(e.currentTarget, false)}
            className='link origin-top cursor-pointer relative border-t-1 border-white'>
            <h1 className='font-[font2] text-5xl lg:text-[8vw] text-center lg:leading-[0.8] lg:pt-10 pt-3 uppercase'>Profile</h1>

          </div>

          <div onClick={() => handleNavClick("/projects")}
            onMouseEnter={(e) => handleHover(e.currentTarget, true)}
            onMouseLeave={(e) => handleHover(e.currentTarget, false)}
            className='link origin-top cursor-pointer relative border-t-1 border-white'>
            <h1 className='font-[font2] text-5xl lg:text-[8vw] text-center lg:leading-[0.8] lg:pt-10 pt-3 uppercase'>Projects</h1>

          </div>

          <div onClick={() => handleNavClick("/contact")}
            onMouseEnter={(e) => handleHover(e.currentTarget, true)}
            onMouseLeave={(e) => handleHover(e.currentTarget, false)}
            className='link origin-top cursor-pointer relative border-y-1 border-white'>
            <h1 className='font-[font2] text-5xl lg:text-[8vw] text-center lg:leading-[0.8] lg:pt-10 pt-3 uppercase'>Contact</h1>

          </div>
        </div>
      </div>
    </div>
  )
}

export default FullScreenNav