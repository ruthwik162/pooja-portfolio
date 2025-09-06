import React, { useRef, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import Navbar from './Component/Navbar'
import FullNavbar from './Component/FullNavbar'
import Contact from './Pages/Contact'
import Projects from './Pages/Projects'
import Footer from './Component/Footer'
import gsap from 'gsap'

const App = () => {
  const cursorRef = useRef(null)
  const cursorInnerRef = useRef(null)
  const [hovering, setHovering] = useState(false)

  // move cursor with gsap
  useEffect(() => {
    const moveCursor = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power3.out",
      })
    }
    window.addEventListener("mousemove", moveCursor)
    return () => window.removeEventListener("mousemove", moveCursor)
  }, [])

  // scale cursor on hover
  useEffect(() => {
    if (!cursorInnerRef.current) return
    if (hovering) {
      gsap.to(cursorInnerRef.current, {
        width: 30,
        height: 30,
        duration: 0.3,
        ease: "expo.out",
      })
    } else {
      gsap.to(cursorInnerRef.current, {
        width: 20,
        height: 20,
        duration: 0.3,
        ease: "expo.out",
      })
    }
  }, [hovering])

  // track hover state for links/buttons
  useEffect(() => {
    const hoverables = document.querySelectorAll("a, button")
    hoverables.forEach(el => {
      el.addEventListener("mouseenter", () => setHovering(true))
      el.addEventListener("mouseleave", () => setHovering(false))
    })
    return () => {
      hoverables.forEach(el => {
        el.removeEventListener("mouseenter", () => setHovering(true))
        el.removeEventListener("mouseleave", () => setHovering(false))
      })
    }
  }, [])

  return (
    <div className='bg-white'>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div
          ref={cursorInnerRef}
          className="rounded-full bg-red-700"
          style={{
            width: 20,
            height: 20,
          }}
        ></div>
      </div>

      {/* Layout */}
      <Navbar />
      <FullNavbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/projects' element={<Projects />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
