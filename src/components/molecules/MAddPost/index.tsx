import React from 'react'
import { createPost } from '../../../utils'
// import PostForm from './PostForm'
// import { createPost } from './api' // điều chỉnh đường dẫn theo vị trí của tệp API

const AddPost: React.FC = () => {
  const handleFinish = async (values: { title: string; content: string }) => {
    const userId = 1
    await createPost({ userId, title: values.title, body: values.content })
  }

  //   return <PostF onFinish={handleFinish} />
}

export default AddPost
