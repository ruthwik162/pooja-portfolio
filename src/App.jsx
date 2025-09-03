import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import Navbar from './Component/Navbar'
import FullNavbar from './Component/FullNavbar'
import Contact from './Pages/Contact'
import Projects from './Pages/Projects'
import Footer from './Component/Footer'

const App = () => {
  return (
    <div className='bg-white'>
      <Navbar/>
      <FullNavbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/projects' element={<Projects/>}/>

      </Routes>
      <Footer/>
    </div>
  )
}

export default App
