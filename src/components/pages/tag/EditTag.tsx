import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { App, Breadcrumb, Button, Form, Input, Space } from 'antd'
import InputImg from './InputImg'
import { createSlug, validateSlug } from '../../../utils'
import { useNavigate } from 'react-router-dom'
import { useUpdateTag } from '../../../hook/useTag'
import NInputItem from '../../atoms/InputField'
import NButtonComponent from '../../atoms/NButton'
import NFormTag from '../../Templates/Tag/NFormTag'
const EditTag = () => {
  const location = useLocation()
  const dataReceived = location.state // Lấy dữ liệu từ state
  const [form] = Form.useForm()
  const { isSuccess, isPending, data, mutate } = useUpdateTag()
  const navigate = useNavigate()
  const dataToSend = data?.data.data
  const dataToSendDashboard = true
  const handleNavigate = () => {
    // Sử dụng navigate và truyền state
    navigate(`/dashboard/tag`, { state: dataToSendDashboard })
  }
  const handleFinish = (values) => {
    console.log('Form update Submitted:', values)
    const id = dataReceived.id
    // const res = editTag(id, values)
    mutate({ id: id, newData: values })
    // mutate(values)
    if (isSuccess) {
      console.log('cập nhật thành công')
    }
  }
  useEffect(() => {
    if (isSuccess) {
      console.log('thêm thành công', data)
      handleNavigate()
    }
  })
  const initialValues = dataReceived
  console.log(initialValues)
  return (
    // <div>
    //   <Breadcrumb
    //     className='ml-3 mt-2'
    //     items={[
    //       {
    //         title: <Link to='/dashboard/tag'>Tag</Link>
    //       },
    //       {
    //         title: dataReceived.name
    //       }
    //     ]}
    //   />
    //   {dataReceived ? (
    //     <App>
    //       {/* {console.log(dataReceived)} */}
    //       <div className='mx-8 my-8'>
    //         <Form
    //           initialValues={initialValues}
    //           form={form}
    //           name='validateOnly'
    //           layout='vertical' // Horizontal layout
    //           onFinish={handleFinish}
    //           autoComplete='off'
    //         >
    //           {/* Name Field */}
    //           <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Please enter a name' }]}>
    //             {/* <Input /> */}
    //             <Input />
    //           </Form.Item>
    //           {/* Slug Field */}
    //           <Form.Item name='slug' label='Slug' rules={[{ required: true }, { validator: validateSlug }]}>
    //             <Input />
    //           </Form.Item>
    //           {/* Description Field */}
    //           <Form.Item name='description' label='Description'>
    //             <Input.TextArea />
    //           </Form.Item>
    //           <InputImg name='featureImage' initialValues={initialValues} label='Feature Image' form={form} />
    //           {/* Submit and Reset Buttons */}
    //           <Form.Item>
    //             <Space>
    //               <Button loading={isPending} type='primary' htmlType='submit'>
    //                 Submit
    //               </Button>
    //               <Button htmlType='reset'>Reset</Button>
    //             </Space>
    //           </Form.Item>
    //         </Form>
    //       </div>
    //     </App>
    //   ) : (
    //     <p>No data received.</p>
    //   )}
    // </div>
    <NFormTag
      dataReceived={dataReceived}
      initialValues={initialValues}
      form={form}
      handleFinish={handleFinish}
      isPending={isPending}
    />
  )
}

export default EditTag
