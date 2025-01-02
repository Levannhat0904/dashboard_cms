import { Input, Form, InputProps } from 'antd'
import { createSlug } from '../../../utils'

interface InputFieldProps extends InputProps {
  label: string
  name: string
  rules?: any[]
  autoCreateSlug?: boolean
  form: any
}

const NInputField: React.FC<InputFieldProps> = ({ label, name, rules, autoCreateSlug, form, ...props }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (autoCreateSlug && name === 'name') {
      const nameValue = e.target.value
      console.log('dsad')
      const slug = createSlug(nameValue) // Tạo slug từ giá trị name
      form.setFieldsValue({ slug }) // Cập nhật slug vào form
    }
  }

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Input {...props} onChange={handleChange} />
    </Form.Item>
  )
}

export default NInputField
