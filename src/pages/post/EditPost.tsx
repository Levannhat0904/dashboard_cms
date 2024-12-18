// import React, { useState } from 'react'
// import { useParams } from 'react-router'
// import { Button, Form, Input } from 'antd'
// import { createPost, fetchPostById } from '../../utils'
// const formItemLayout = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 6 }
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 16 }
//   }
// }

// const tailFormItemLayout = {
//   wrapperCol: {
//     xs: {
//       span: 24,
//       offset: 0
//     },
//     sm: {
//       span: 16,
//       offset: 8
//     }
//   }
// }

// const EditPost: React.FC = () => {
//   const [post, setPost] = useState<PostProps | null>(null)
//   const [error, setError] = useState<string | null>(null)
//   const handleFetchPost = async (id: number) => {
//     try {
//       const postData = await fetchPostById(id) // Gọi hàm fetchPostById
//       setPost(postData)
//     } catch (err) {
//       setError((err as Error).message)
//     }
//   }

//   const [form] = Form.useForm()

//   const onFinish = async (values: any) => {
//     console.log('Received values of form: ', values)
//     const title = values.title
//     const content = values.content
//     const userId = 1
//     try {
//       // Gửi yêu cầu thêm bài viết mới bằng hàm createPost
//       const newPost = await createPost({ userId, title, body: content })
//       console.log('New Post Created:', newPost)
//     } catch (error) {
//       console.error('Error creating post:', error)
//     }
//   }

//   return (
//     <Form {...formItemLayout} form={form} name='register' onFinish={onFinish} className='w-full' scrollToFirstError>
//       <label htmlFor='Nickname' className='inline-block mx-auto flex w-full justify-center items-center mb-10 pt-10'>
//         <span className='text-4xl'>Sửa bài viết</span>
//       </label>
//       <Form.Item
//         name='title'
//         label='Title'
//         tooltip='What do you want others to call you?'
//         rules={[{ required: true, message: 'Please input your title!', whitespace: true }]}
//       >
//         <Input size='large' />
//       </Form.Item>
//       <Form.Item name='content' label='Content' rules={[{ required: true, message: 'Please input content' }]}>
//         <Input.TextArea autoSize={{ minRows: 8, maxRows: 20 }} showCount maxLength={1000} />
//       </Form.Item>
//       <Form.Item {...tailFormItemLayout}>
//         <Button type='primary' htmlType='submit'>
//           Register
//         </Button>
//       </Form.Item>
//     </Form>
//   )
// }

// export default EditPost
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Button, Form, Input, message } from 'antd'
import { updatePost, fetchPostById } from '../../utils'
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

const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>() // Lấy ID từ URL
  const [post, setPost] = useState<PostProps | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const error_msg = () => {
    messageApi.open({
      type: 'error',
      content: 'Sửa bài viết thất bại'
    })
  }
  const success_msg = () => {
    messageApi.open({
      type: 'success',
      content: 'Sửa bài viết thành công'
    })
  }
  // Lấy thông tin bài viết khi component được tải
  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const postData = await fetchPostById(Number(id))
          setPost(postData)
          form.setFieldsValue({
            title: postData.title,
            content: postData.body
          })
        } catch (err) {
          setError((err as Error).message)
        }
      }

      fetchPost()
    }
  }, [id, form])

  const onFinish = async (values: FormValues) => {
    console.log('Received values of form: ', values)
    const title = values.title
    const content = values.content
    const userId = 1

    try {
      // Cập nhật bài viết
      const updatedPost = await updatePost(Number(id), { userId, title, body: content })
      success_msg()
      console.log('Post Updated:', updatedPost)
    } catch (error) {
      error_msg()
      console.error('Error updating post:', error)
    }
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <Form {...formItemLayout} form={form} name='editPost' onFinish={onFinish} className='w-full' scrollToFirstError>
      {contextHolder}
      <label htmlFor='Nickname' className='inline-block mx-auto flex w-full justify-center items-center mb-10 pt-10'>
        <span className='text-4xl'>Sửa bài viết</span>
      </label>

      <Button onClick={success_msg}>Success</Button>
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
          Cập nhật
        </Button>
      </Form.Item>
    </Form>
  )
}

export default EditPost
