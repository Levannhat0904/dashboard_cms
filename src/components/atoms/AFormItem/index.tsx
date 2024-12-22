import React from 'react'
import { Form } from 'antd'

interface FormItemProps {
  name?: string
  label?: string
  placeholder?: string
  rules?: { required: boolean; message: string; whitespace?: boolean }[]
  type?: 'text' | 'textarea'
  children?: React.ReactNode
}
const MFormItem: React.FC<FormItemProps> = ({ label, name, rules, children }) => (
  <Form.Item name={name} label={label} rules={rules}>
    {children}
  </Form.Item>
)

export default MFormItem
