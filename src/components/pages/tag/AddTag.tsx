import React, { useEffect } from 'react'
import { App, Button, Form, Input, Space } from 'antd'
import InputImg from './InputImg'
import { createSlug, validateSlug } from '../../../utils'
import { addTag } from '../../../utils/AxiosApiServiceLogin'
import { useAddTag } from '../../../hook/useTag'
import { useNavigate } from 'react-router-dom'
import NFormTag from '../../Templates/Tag/NFormTag'

const AddTag = () => {
  const [form] = Form.useForm()
  const { isSuccess, isPending, data, mutate } = useAddTag()
  const navigate = useNavigate()
  const dataToSend = data?.data.data

  const handleNavigate = () => {
    // Sử dụng navigate và truyền state
    navigate(`/dashboard/tag/edit/${data?.data.data.id}`, { state: dataToSend })
  }
  const handleFinish = (values) => {
    // console.log('Form Submitted:', values)
    mutate(values)
    if (isSuccess) {
      console.log('thêm thành công')
    }
  }
  useEffect(() => {
    if (isSuccess) {
      console.log('thêm thành công', data)
      handleNavigate()
    }
  })
  return (
    // <App>
    //   <div className='mx-8 my-8'>
    //     <Form
    //       form={form}
    //       name='validateOnly'
    //       layout='vertical' // Horizontal layout
    //       onFinish={handleFinish}
    //       autoComplete='off'
    //     >
    //       {/* Name Field */}
    //       <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Please enter a name' }]}>
    //         <Input
    //           onChange={(e) => {
    //             const name = e.target.value
    //             const slug = createSlug(name)
    //             form.setFieldsValue({ slug })
    //           }}
    //         />
    //       </Form.Item>
    //       {/* Slug Field */}
    //       <Form.Item name='slug' label='Slug' rules={[{ required: true }, { validator: validateSlug }]}>
    //         <Input />
    //       </Form.Item>
    //       {/* Group Field */}
    //       {/* <Form.Item name='group' label='Group' initialValue='TAG'>
    //         <Input disabled />
    //       </Form.Item> */}

    //       {/* Description Field */}
    //       <Form.Item name='description' label='Description'>
    //         <Input.TextArea />
    //       </Form.Item>
    //       <InputImg name='featureImage' label='Feature Image' form={form} />

    //       {/* Submit and Reset Buttons */}
    //       <Form.Item>
    //         <Space>
    //           <Button loading={isPending} type='primary' htmlType='submit'>
    //             Submit
    //           </Button>
    //           <Button htmlType='reset'>Reset</Button>
    //         </Space>
    //       </Form.Item>
    //     </Form>
    //   </div>
    // </App>
    <NFormTag autoCreateSlug={true} form={form} handleFinish={handleFinish} isPending={isPending} />
  )
}

export default AddTag
