import { Form, FormInstance, Input, Layout } from 'antd'
import NFormInput from '../../molecules/NFormInput'
import NInputImg from '../../atoms/NInputImg'
import NFormButtons from '../../molecules/NFormButtons'
import { validateSlug } from '../../../utils'
import NFormSEO from '../../molecules/NFormSEO'
import { useState } from 'react'
import { ITag } from '../../../utils/AxiosApiServiceLogin'
import { useEvenEdit } from '../../../contexts/EventContext'

interface FormSectionProps {
  initialValues: ITag | undefined
  form: FormInstance
  handleFinish: (values: object) => void
  isPending: boolean
  autoCreateSlug?: boolean
  // evenEdit: any
  // setEvenEdit: any
}

const NFormSection: React.FC<FormSectionProps> = ({
  initialValues,
  form,
  handleFinish,
  isPending,
  autoCreateSlug
  // evenEdit,
  // setEvenEdit
}) => {
  const [uploading, setUploading] = useState(false)
  const { isEdit, setIsEdit } = useEvenEdit()
  const handleChange = () => {
    setIsEdit(true)
  }

  return (
    <Layout className='mx-8 my-8'>
      <Form
        initialValues={initialValues}
        form={form}
        name='validateOnly'
        onChange={handleChange}
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
        <NInputImg
          name='featureImage'
          setUploading={setUploading}
          initialValues={initialValues}
          label='Feature Image'
          form={form}
        />
        <NFormSEO />
        <NFormButtons isPending={isPending || uploading} />
        {/* <NNotify setEvenEdit={setEvenEdit} evenEdit={evenEdit} /> */}
      </Form>
    </Layout>
  )
}

export default NFormSection
