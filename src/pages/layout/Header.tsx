import React from 'react'

const Header = () => {
  return (
    <div className='box-border w-screen '>
      <div className='z-50 Navbar fixed w-screen left-0 top-0 grid h-20 grid-cols-[auto_1fr] items-center bg-slate-300'>
        <div className='The_box flex items-center justify-start pl-[112px]'>
          <img src='logo.png' alt='logo_thebox' className='mr-2 h-12 w-10' />
          <span className='font-sans text-3xl font-bold italic text-[#2947A9]'>The</span>
          <span className='font-sans text-3xl font-bold text-[#2947A9]'>Box</span>
        </div>
        <div className='Navitems mr-[112px] grid grid-flow-col gap-[50px] justify-self-end'>
          <div className="Home font-['Work Sans'] text-lg font-normal text-[#14171F]">Home</div>
          <div className="AboutUs font-['Work Sans'] text-lg font-normal text-[#14171F]">About Us</div>
          <div className="Projects font-['Work Sans'] text-lg font-normal text-[#14171F]">Projects</div>
          <div className="Services font-['Work Sans'] text-lg font-normal text-[#14171F]">Services</div>
          <div className="ContactUs font-['Work Sans'] text-lg font-semibold text-[#F9995D]">Contact Us</div>
        </div>
      </div>
    </div>
  )
}
export default Header
