import NInputField from '../../atoms/InputField'

interface FormInputProps {
  label: string
  name: string
  rules?: any[]
  autoCreateSlug?: boolean
  [key: string]: any
  form?: any
}

const NFormInput: React.FC<FormInputProps> = ({ label, name, rules, form, autoCreateSlug, ...props }) => (
  <NInputField label={label} name={name} rules={rules} form={form} autoCreateSlug={autoCreateSlug} {...props} />
)

export default NFormInput
