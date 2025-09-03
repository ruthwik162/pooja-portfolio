import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { images } from '../assets/assets'

const Image = () => {
  const imgWrapperRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      imgWrapperRef.current,
      {
        clipPath: 'inset(0 100% 0 0 round 1.5rem)', // start hidden from right
      },
      {
        clipPath: 'inset(0 0% 0 0 round 1.5rem)', // fully visible, rounded corners intact
        duration: 3,
        ease: 'power3.out'
      }
    )
  }, [])

  return (
    <div className=' h-full relative flex flex-col   justify-center items-center'>
      {/* Main Image */}
      <div
        ref={imgWrapperRef}
        className='image md:w-[25vw] sm:[w-40vw]  w-[65vw] mt-[5vh] md:mt-[10vh] z-4 rounded-2xl relative overflow-hidden'
      >
        <img
          src={images.pooja2}
          alt=""
          className='h-full w-full rounded-3xl object-cover'
        />
      </div>
      {/* Caption */}
      <div className='font-[font2] text-[2vw] md:text-[0.7vw] text-thin text-center mt-[0.2vw]'>
        ft. Pooja Chaudhary
      </div>
    </div>
  )
}

export default Image
  