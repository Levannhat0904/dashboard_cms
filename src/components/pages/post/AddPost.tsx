import React from 'react'
import { Form, message } from 'antd'
// import { createPost } from '../../utils'
// import { AButton, AInput, HeaderForm, MFormItem } from '../../components'
import { showMessage } from '../../../constants'
import { createPost } from '../../../utils'
import { AButton, AInput, HeaderForm } from '../../atoms'
import { MFormItem } from '../../molecules'
// import { showMessage } from '../../constants'

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
  const [form] = Form.useForm()
  const onFinish = async (values: FormValues) => {
    console.log('Received values of form: ', values)
    const title = values.title
    const content = values.content
    const userId = 1
    try {
      const newPost = await createPost({ userId, title, body: content })
      showMessage('success', 'Thêm bài viết thành công', messageApi)
      console.log('New Post Created:', newPost)
    } catch (error) {
      showMessage('error', 'Thêm bài viết thất bại', messageApi)
      console.error('Error creating post:', error)
    }
  }
  return (
    <Form {...formItemLayout} form={form} name='editPost' onFinish={onFinish} className='w-full' scrollToFirstError>
      {contextHolder}
      <HeaderForm title='Thêm bài viết' />
      <MFormItem
        name='title'
        label='Title'
        rules={[{ required: true, message: 'Please input your title!', whitespace: true }]}
      >
        <AInput placeholder='Enter title' />
      </MFormItem>
      <MFormItem name='content' label='Content' rules={[{ required: true, message: 'Please input content' }]}>
        <AInput placeholder='Enter content' type='textarea' />
      </MFormItem>
      <Form.Item {...tailFormItemLayout}>
        <AButton type='primary' htmlType='submit' text='Thêm bài viết' onClick={() => {}} />
      </Form.Item>
    </Form>
  )
}

export default AddPost
