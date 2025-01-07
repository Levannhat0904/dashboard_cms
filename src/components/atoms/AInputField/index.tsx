import React, { forwardRef } from 'react'
import { Input as AntInput, InputRef } from 'antd'
import { cn } from '../../../utils'
import { SizeType } from 'antd/es/config-provider/SizeContext'

interface InputProps {
  placeholder?: string
  type?: 'text' | 'password' | 'email' | 'textarea'
  value?: string
  className?: string
  size?: SizeType
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

// Use forwardRef to properly handle refs
const AInput = forwardRef<InputRef, InputProps>(({ placeholder, type, value, size, onChange, className }, ref) => {
  const style = 'ant-input rounded-lg border border-gray-300 bg-[#f5f5f5] px-4 py-2'

  if (type === 'textarea') {
    return (
      <AntInput.TextArea
        ref={ref}
        placeholder={placeholder}
        value={value}
        size={size}
        onChange={onChange}
        className={cn(style, className)}
      />
    )
  }
  return (
    <AntInput
      ref={ref}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      className={cn(style, className)}
    />
  )
})

AInput.displayName = 'AInput' // to ensure the component has a proper display name

export default AInput
