import React from 'react'
import { Form } from 'antd'

interface FormWrapperProps {
  onFinish: (values: any) => void
  onFinishFailed?: (errorInfo: any) => void
  children: React.ReactNode
}

const FormWrapper: React.FC<FormWrapperProps> = ({ onFinish, onFinishFailed, children }) => {
  return (
    <Form className='ant-form rounded-lg bg-white p-4 shadow-md' onFinish={onFinish} onFinishFailed={onFinishFailed}>
      {children}
    </Form>
  )
}

export default FormWrapper
