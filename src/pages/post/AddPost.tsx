import React from 'react'
import { Button, Form, Input, message } from 'antd'
import { createPost } from '../../utils'
// const [messageApi, contextHolder] = message.useMessage()

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}
interface FormValues {
  title: string
  content: string
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
}

const AddPost: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const error_msg = () => {
    messageApi.open({
      type: 'error',
      content: 'Thêm bài viết thất bại'
    })
  }
  const success_msg = () => {
    messageApi.open({
      type: 'success',
      content: 'Thêm bài viết thành công'
    })
  }
  const [form] = Form.useForm()

  const onFinish = async (values: FormValues) => {
    console.log('Received values of form: ', values)
    const title = values.title
    const content = values.content
    const userId = 1
    try {
      // Gửi yêu cầu thêm bài viết mới bằng hàm createPost
      const newPost = await createPost({ userId, title, body: content })
      success_msg()
      console.log('New Post Created:', newPost)
    } catch (error) {
      error_msg()
      console.error('Error creating post:', error)
    }
  }

  return (
    <Form {...formItemLayout} form={form} name='register' onFinish={onFinish} className='w-full' scrollToFirstError>
      {contextHolder}
      {/* <Button onClick={success_msg}>Success</Button> */}
      <label htmlFor='Nickname' className='inline-block mx-auto flex w-full justify-center items-center mb-10 pt-10'>
        <span className='text-4xl'>Thêm bài viết</span>
      </label>
      <Form.Item
        name='title'
        label='Title'
        tooltip='What do you want others to call you?'
        rules={[{ required: true, message: 'Please input your title!', whitespace: true }]}
      >
        <Input size='large' />
      </Form.Item>
      <Form.Item name='content' label='Content' rules={[{ required: true, message: 'Please input content' }]}>
        <Input.TextArea autoSize={{ minRows: 8, maxRows: 20 }} showCount maxLength={1000} />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type='primary' htmlType='submit'>
          Thêm bài viết
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddPost
