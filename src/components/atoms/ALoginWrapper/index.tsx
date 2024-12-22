const ALoginWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='box-border Login_wrap scr_575:pt-[20px] items-center scr_575:justify-start flex h-screen w-screen flex-col justify-center overflow-x-hidden'>
      {children}
    </div>
  )
}

export default ALoginWrapper
