import { Input, Form, InputProps, FormInstance } from 'antd'
import { createSlug } from '../../../utils'
import { Rule } from 'antd/es/form'

interface InputFieldProps extends Omit<InputProps, 'form'> {
  label: string
  name: string
  rules?: Rule[]
  autoCreateSlug?: boolean
  form?: FormInstance
}
const NInputField: React.FC<InputFieldProps> = ({ label, name, rules, autoCreateSlug, form, ...props }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (autoCreateSlug && name === 'name') {
      const nameValue = e.target.value
      const slug = createSlug(nameValue) // Tạo slug từ giá trị name
      form?.setFieldsValue({ slug }) // Cập nhật slug vào form
    }
  }

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Input {...props} onChange={handleChange} />
    </Form.Item>
  )
}

export default NInputField
