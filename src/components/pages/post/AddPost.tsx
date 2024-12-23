import React from 'react'
import { Form, message } from 'antd'
// import { createPost } from '../../utils'
// import { AButton, AInput, HeaderForm, MFormItem } from '../../components'
import { showMessage } from '../../../constants'
import { createPost } from '../../../utils'
import { AButton, AInput, AHeaderForm } from '../../atoms'
import { AFormItem } from '../../atoms'
import { data, useNavigate } from 'react-router-dom'
import { usePostContext } from '../../../contexts/PostContext'
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
  const navigate = useNavigate()
  const { data, addPostWithContextAPI } = usePostContext()
  const onFinish = async (values: FormValues) => {
    console.log('Received values of form: ', values)
    const title = values.title
    const content = values.content
    const userId = 1
    try {
      // thêm bằng api
      // const newPost = await createPost({ userId, title, body: content })
      // thêm bằng context api
      const newPost = {
        id: data.length + 1, // Tạo ID ngẫu nhiên, bạn có thể thay đổi theo cách khác
        avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed = 1`,
        title,
        href: `post/${data.length + 1}/edit`,
        description: `Post ID: ${data.length + 1}`,
        body: content
      }
      await addPostWithContextAPI(newPost)
      await showMessage('success', 'Thêm bài viết thành công', messageApi)
      console.log('New Post Created:', newPost)

      navigate('/dashboard/post')
    } catch (error) {
      showMessage('error', 'Thêm bài viết thất bại', messageApi)
      console.error('Error creating post:', error)
    }
  }
  return (
    <Form {...formItemLayout} form={form} name='editPost' onFinish={onFinish} className='w-full' scrollToFirstError>
      {contextHolder}
      <AHeaderForm title='Thêm bài viết' />
      <AFormItem
        name='title'
        label='Title'
        rules={[{ required: true, message: 'Please input your title!', whitespace: true }]}
      >
        <AInput placeholder='Enter title' />
      </AFormItem>
      <AFormItem name='content' label='Content' rules={[{ required: true, message: 'Please input content' }]}>
        <AInput placeholder='Enter content' type='textarea' />
      </AFormItem>
      <Form.Item {...tailFormItemLayout}>
        <AButton type='primary' htmlType='submit' text='Thêm bài viết' onClick={() => {}} />
      </Form.Item>
    </Form>
  )
}

export default AddPost
