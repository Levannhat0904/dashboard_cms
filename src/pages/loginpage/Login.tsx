import React, { useEffect } from 'react'
import SignInForm from './SignInForm'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
const LoginForm: React.FC = () => {
  const navigate = useNavigate()

  const { isLoggedIn } = useAuthContext()
  useEffect(() => {
    // Kiểm tra xem có access token trong localStorage không
    // Nếu có token, chuyển hướng người dùng tới trang chính (dashboard hoặc trang chủ)
    if (isLoggedIn) {
      navigate('/dashboard') // Hoặc trang chính của bạn
    }
  }, [isLoggedIn, navigate])
  return (
    <div className='box-border Login_wrap scr_575:pt-[20px] scr_575:justify-start flex h-screen flex-col justify-center overflow-x-hidden'>
      <div className='login-container scr_575:pb-5 relative mx-auto w-[94%] max-w-[680px]'>
        <div className='login-main-content shadow-custom flex flex-row flex-wrap overflow-hidden rounded-[12px] bg-white text-sm'>
          <div className='logo-content box-border scr_575:w-full scr_575:pt-5 scr_575:pl-5 scr_575:pb-[10px] scr_575:pr-5 relative flex w-[40%] flex-col flex-nowrap overflow-hidden pb-[20px] pl-[35px] pr-[35px] pt-[35px] text-white'>
            {/* before:content-[''] before:absolute before:left-0 before:top-0 before:right-0 before:bottom-0 before:bg-[rgba(3,143,222,0.7)] before:z-10 */}
            <div className="logo-content-bg absolute left-0 top-0 z-10 h-full w-full before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:z-10 before:bg-[rgba(3,143,222,0.7)] before:content-['']">
              <img
                src='https://wieldy.g-axon.work/assets/images/appModule/neature.jpg'
                alt='Neature'
                className='h-full w-full max-w-full'
              />
            </div>
            <div className='logo-wid z-40 mb-auto'>
              <h1 className='font-normals z-20 mb-3 text-2xl leading-tight text-white [] '>Sign In</h1>
              <p className='mb-[14px] font-sans font-light'>
                By Signing Up, you can avail full features of our services.
              </p>
              <p className='mb-[14px]'>Get an account !!!</p>
            </div>
            <div className='app-logo relative z-40'>
              <img alt='example' src='https://wieldy.g-axon.work/assets/images/logo.png' />
            </div>
          </div>
          <div className='scr_575:w-full scr_575:pt-5 scr_575:pl-5 scr_575:pb-[10px] scr_575:pr-5 login-content w-[60%] pb-[20px] pl-[35px] pr-[35px] pt-[35px]'>
            <SignInForm />
          </div>
        </div>
      </div>
    </div>
  )
  // <div className="box-border flex h-screen items-center justify-center">
  //   <div className="Form-login flex flex-col items-center justify-center sm:h-[345px] sm:flex-row">
  //     {/* <div className="Img-login scr_575:h-[151px] bg-slate-300 sm:h-[345px] sm:w-[272px]"> */}
  //     <div className="Img-login h-[151px] w-full flex-shrink flex-grow bg-slate-300 sm:h-[345px] sm:w-[272px]">
  //       img
  //     </div>
  //     <div className="Input-login h-[320px] w-[408px] flex-shrink flex-grow bg-green-300 sm:h-full">
  //       form
  //     </div>
  //   </div>
  // </div>
  // <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
  //   <div className="md:flex">
  //     <div className="md:shrink-0">
  //       <img
  //         className="h-48 w-full object-cover md:h-full md:w-48"
  //         src="logo.png"
  //         alt="Modern building architecture"
  //       />
  //     </div>
  //     <div className="p-8">
  //       <div className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
  //         Company retreats
  //       </div>
  //       <a
  //         href="#"
  //         className="mt-1 block text-lg font-medium leading-tight text-black hover:underline"
  //       >
  //         Incredible accommodation for your team
  //       </a>
  //       <p className="mt-2 text-slate-500">
  //         Looking to take your team away on a retreat to enjoy awesome food and
  //         take in some sunshine? We have a list of places to do just that.
  //       </p>
  //     </div>
  //   </div>
  // </div>
}

export default LoginForm
