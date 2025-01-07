import { FormInstance } from 'antd'
import NInputField from '../../atoms/InputField'
import { Rule } from 'antd/es/form'

interface FormInputProps {
  label: string
  name: string
  rules?: Rule[]
  autoCreateSlug?: boolean
  props?: Record<string, unknown>
  form?: FormInstance
}

const NFormInput: React.FC<FormInputProps> = ({ label, name, rules, form, autoCreateSlug, ...props }) => (
  <NInputField label={label} name={name} rules={rules} form={form} autoCreateSlug={autoCreateSlug} {...props} />
)

export default NFormInput
