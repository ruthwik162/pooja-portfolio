import React from 'react'
import { FaLinkedin } from 'react-icons/fa'

const Footer = () => {
    return (
        <div className='bg-white'>
            <div className=''>
                <footer className="p-3 flex items-center  justify-center gap-5 text-center text-sm opacity-80">
                    copyright &copy; {new Date().getFullYear()} {" "}
                    <a
                        href="https://linkedin.com/in/poojameda/"
                        target="_blank"
                        rel="noreferrer"
                        className={`underline flex items-center   justify-center gap-2`}
                    >
                        <FaLinkedin /> Pooja Chaudary Meda
                    </a>
                </footer>
            </div>
        </div>
    )
}

export default Footer
