// src/components/atoms/Button.tsx
import React from 'react'
import { Button as AntButton } from 'antd'
import { cn } from '../../../utils'

interface ButtonProps {
  onClick: () => void
  text: string
  loading?: boolean
  className?: string
  type?: 'text' | 'link' | 'default' | 'primary' | 'dashed' | undefined
  htmlType?: 'button' | 'submit' | 'reset'
}

const AButton: React.FC<ButtonProps> = ({ loading, onClick, text, className, htmlType, type }) => {
  return (
    <AntButton
      loading={loading}
      htmlType={htmlType}
      type={type}
      onClick={onClick}
      className={cn('ant-btn mr-3 px-4 py-4 text-lg font-semibold', className)}
    >
      {text}
    </AntButton>
  )
}

export default AButton
