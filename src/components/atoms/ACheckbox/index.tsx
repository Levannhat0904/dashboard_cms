// src/components/atoms/Checkbox.tsx
import React from 'react'
import { Checkbox as AntCheckbox, CheckboxChangeEvent } from 'antd'

interface CheckboxProps {
  checked: boolean
  onChange?: (e: CheckboxChangeEvent) => void // Sử dụng kiểu đúng
  className?: string
  children?: React.ReactNode // Định nghĩa prop children để truyền nội dung
}

const ACheckbox: React.FC<CheckboxProps> = ({ checked, onChange, className, children }) => {
  return (
    <AntCheckbox checked={checked} onChange={onChange} className={className}>
      {children}
    </AntCheckbox>
  )
}

export default ACheckbox
