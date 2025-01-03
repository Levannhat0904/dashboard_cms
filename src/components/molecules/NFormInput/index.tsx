import { FormInstance } from 'antd'
import NInputField from '../../atoms/InputField'

interface FormInputProps {
  label: string
  name: string
  rules?: object[]
  autoCreateSlug?: boolean
  [key: string]: any
  form?: FormInstance
}

const NFormInput: React.FC<FormInputProps> = ({ label, name, rules, form, autoCreateSlug, ...props }) => (
  <NInputField label={label} name={name} rules={rules} form={form} autoCreateSlug={autoCreateSlug} {...props} />
)

export default NFormInput
