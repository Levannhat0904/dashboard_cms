import { Form, FormInstance, Input } from 'antd'
import NFormInput from '../../molecules/NFormInput'
import NInputImg from '../../atoms/NInputImg'
import NFormButtons from '../../molecules/NFormButtons'
import { validateSlug } from '../../../utils'

interface FormSectionProps {
  initialValues: any
  form: FormInstance
  handleFinish: (values: any) => void
  isPending: boolean
  autoCreateSlug?: boolean
}

const NFormSection: React.FC<FormSectionProps> = ({ initialValues, form, handleFinish, isPending, autoCreateSlug }) => (
  <div className='mx-8 my-8'>
    <Form
      initialValues={initialValues}
      form={form}
      name='validateOnly'
      layout='vertical'
      onFinish={handleFinish}
      autoComplete='off'
    >
      <NFormInput
        form={form}
        name='name'
        label='Name'
        autoCreateSlug={autoCreateSlug}
        rules={[{ required: true, message: 'Please enter a name' }]}
      />
      <NFormInput name='slug' label='Slug' rules={[{ required: true }, { validator: validateSlug }]} />
      <Form.Item name='description' label='Description'>
        <Input.TextArea />
      </Form.Item>
      <NInputImg name='featureImage' initialValues={initialValues} label='Feature Image' form={form} />
      <NFormButtons isPending={isPending} />
    </Form>
  </div>
)

export default NFormSection
