// src/components/atoms/Button.tsx
import React from 'react'
import { cn } from '../../../utils'

interface ButtonProps {
  title?: string
  value?: string | undefined | React.ReactNode
  className?: string
}

const AView: React.FC<ButtonProps> = ({ title, value, className }) => {
  const initialClass = 'block'
  return (
    <span className={cn(initialClass, className)}>
      {title && <b>{title}:</b>}
      {value}
    </span>
  )
}

export default AView
