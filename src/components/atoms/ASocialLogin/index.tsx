// src/components/molecules/SocialLogin.tsx
import React from 'react'
import { AIconButton, AGoogleIcon, AFacebookIcon, AGithubIcon, ATwitterIcon } from '..'
import { cn } from '../../../utils'
interface SocialLoginProps {
  className?: string
  onGoogleLogin: () => void
  onFacebookLogin: () => void
  onGithubLogin: () => void
  onTwitterLogin: () => void
}

const MSocialLogin: React.FC<SocialLoginProps> = ({
  className,
  onGoogleLogin,
  onFacebookLogin,
  onGithubLogin,
  onTwitterLogin
}) => {
  const style = 'social-link flex space-x-4 self-start'
  return (
    <div className={cn(style, className)}>
      <AIconButton onClick={onGoogleLogin} icon={<AGoogleIcon />} />
      <AIconButton onClick={onFacebookLogin} icon={<AFacebookIcon />} />
      <AIconButton onClick={onGithubLogin} icon={<AGithubIcon />} />
      <AIconButton onClick={onTwitterLogin} icon={<ATwitterIcon />} />
    </div>
  )
}

export default MSocialLogin
