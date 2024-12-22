const LogoContentBg = () => {
  return (
    <>
      <div className="logo-content-bg absolute left-0 top-0 z-10 h-full w-full before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:z-10 before:bg-[rgba(3,143,222,0.7)] before:content-['']">
        <img
          src='https://wieldy.g-axon.work/assets/images/appModule/neature.jpg'
          alt='Neature'
          className='h-full w-full max-w-full'
        />
      </div>
      <div className='logo-wid z-40 mb-auto'>
        <h1 className='font-normals z-20 mb-3 text-2xl leading-tight text-white [] '>Sign In</h1>
        <p className='mb-[14px] font-sans font-light'>By Signing Up, you can avail full features of our services.</p>
        <p className='mb-[14px]'>Get an account !!!</p>
      </div>
      <div className='app-logo relative z-40'>
        <img alt='example' src='https://wieldy.g-axon.work/assets/images/logo.png' />
      </div>
    </>
  )
}

export default LogoContentBg
