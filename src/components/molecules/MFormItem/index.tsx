import React from 'react'
import { Form } from 'antd'

// interface FormItemProps {
//   label: string
//   name: string
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   rules?: any[]
//   children: React.ReactNode
// }

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
// const MFormItem: React.FC<FormFieldProps> = ({ name, label, placeholder, rules, type }) => (
//   <MFormItem name={name} label={label} rules={rules}>
//     <AInput placeholder={placeholder} type={type} />
//   </MFormItem>
// )

export default MFormItem
