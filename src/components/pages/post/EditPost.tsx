import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Form, message } from 'antd'
// import { AInput, AButton, MFormItem, HeaderForm } from '../../components'
import { updatePost } from '../../../utils'
import { showMessage } from '../../../constants'
import { AButton, AInput, AHeaderForm } from '../../atoms'
import { AFormItem } from '../../atoms'
import { usePostContext } from '../../../contexts/PostContext'
// import { updatePost, fetchPostById } from '../../utils'
// import { showMessage } from '../../constants'
interface FormValues {
  title: string
  content: string
}
interface PostProps {
  userId: number
  id: number
  title: string
  body: string
}
// interface PostProps {
//   id: number
//   avatar: string
//   title: string
//   href: string
//   description: string
//   content: string
// }
const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 }
  }
}

const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<PostProps | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const { fetchPostById } = usePostContext()
  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          // const postData = await fetchPostByIdAPI(Number(id))
          const postData = await fetchPostById(Number(id))
          setPost(postData)
          form.setFieldsValue({ title: postData?.title, content: postData?.body })
        } catch (err) {
          setError((err as Error).message)
        }
      }
      fetchPost()
    }
  }, [id, form])

  const onFinish = async (values: FormValues) => {
    const { title, content } = values
    const userId = 1
    try {
      await updatePost(Number(id), { userId, title, body: content })
      showMessage('success', 'Sửa bài viết thành công', messageApi)
    } catch (err) {
      showMessage('error', 'Sửa bài viết thất bại', messageApi)
      console.error('Error updating post:', err)
    }
  }

  if (error) return <div>Error: {error}</div>
  if (!post) return <div>Loading...</div>

  return (
    <Form {...formItemLayout} form={form} name='editPost' onFinish={onFinish} className='w-full' scrollToFirstError>
      {contextHolder}
      <AHeaderForm title='Sửa bài viết' />
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
        <AButton type='primary' htmlType='submit' text='Cập nhật' onClick={() => {}} />
      </Form.Item>
    </Form>
  )
}

export default EditPost
