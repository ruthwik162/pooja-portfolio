import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import React from 'react'

const Name = () => {
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from('.text', {
      y: -150,           // start below the div
      duration: 1,
      stagger: 0.2,     // delay between each text
      ease: "power3.out"
    })

    
  });

  return (
    <div className='mx-[5vh]'>
      <div className='leading-[8vw] overflow-hidden'> {/* hides overflowing text */}
        <div className='bg-white overflow-hidden'>
          <div className='text-[9vw] text font-[font2] uppercase text-black'>
            Pooja
          </div>
        </div>
        <div className='bg-white overflow-hidden'>
          <div className='text-[9vw] text font-[font2] uppercase text-black'>
            Chaudhary
          </div>
        </div>
        <div className='bg-white overflow-hidden'>
          <div className='text-[9vw] text font-[font1] uppercase text-black'>
            Meda
          </div>
        </div>
      </div>
    </div>
  )
}

export default Name
