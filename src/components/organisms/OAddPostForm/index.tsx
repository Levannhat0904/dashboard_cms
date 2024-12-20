import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { MFormItem } from '../../molecules'

const OAddPostForm: React.FC = () => {
  const onFinish = async (values: any) => {
    const { title, content } = values
    try {
      // Gửi yêu cầu tạo bài viết mới
      message.success('Bài viết đã được tạo!')
    } catch (error) {
      message.error('Lỗi khi tạo bài viết!')
    }
  }

  return (
    <Form onFinish={onFinish}>
      <MFormItem label='Title' name='title' rules={[{ required: true, message: 'Please input your title!' }]}>
        <Input />
      </MFormItem>
      <MFormItem label='Content' name='content' rules={[{ required: true, message: 'Please input content!' }]}>
        <Input.TextArea rows={6} />
      </MFormItem>
      <Button type='primary' htmlType='submit'>
        Thêm bài viết
      </Button>
    </Form>
  )
}

export default OAddPostForm
