// src/components/atoms/IconButton.tsx
import React from 'react'
import { cn } from '../../../utils'

interface IconButtonProps {
  onClick: () => void
  icon: React.ReactNode
  className?: string
}

const AIconButton: React.FC<IconButtonProps> = ({ onClick, icon, className }) => {
  const style = 'flex h-8 w-8 content-center items-center justify-center rounded-full border-[1px] border-sky-500'
  return (
    <div onClick={onClick} role='button' className={cn(style, className)}>
      {icon}
    </div>
  )
}

export default AIconButton
