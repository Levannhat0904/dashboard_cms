import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../contexts/AuthContext'
import { OSignInForm } from '../../organisms'
import { ALoginContainer, ALoginContent, ALoginMainContent, ALoginWrapper, ALogoContentBg } from '../../atoms'
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
    <ALoginWrapper>
      <ALoginContainer>
        <ALoginMainContent>
          <ALoginContent className='w-[40%]'>
            <ALogoContentBg />
          </ALoginContent>
          <ALoginContent className='w-[60%]'>
            <OSignInForm />
          </ALoginContent>
        </ALoginMainContent>
      </ALoginContainer>
    </ALoginWrapper>
  )
}

export default LoginForm
