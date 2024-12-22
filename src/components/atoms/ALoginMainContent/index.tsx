const LoginMainContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='login-main-content shadow-custom flex flex-row flex-wrap overflow-hidden rounded-[12px] bg-white text-sm'>
      {children}
    </div>
  )
}

export default LoginMainContent
