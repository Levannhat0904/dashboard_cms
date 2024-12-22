import React, { useEffect } from 'react'
// import { OSignInForm } from '../../components/organisms'
// import SignInForm from './SignInForm'
import { useNavigate } from 'react-router-dom'
// import { useAuthContext } from '../../contexts/AuthContext'
// import { ALoginWrapper, ALoginContainer, ALoginMainContent, ALoginContent, LogoContentBg } from '../../components'
import { useAuthContext } from '../../../contexts/AuthContext'
import { OSignInForm } from '../../organisms'
import { ALoginContainer, ALoginContent, ALoginMainContent, ALoginWrapper, LogoContentBg } from '../../atoms'
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
            <LogoContentBg />
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
