import React, { useState } from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd'
import { GoogleOutlined, FacebookOutlined, GithubOutlined, TwitterOutlined } from '@ant-design/icons'
import { useAuthContext } from '../../contexts/AuthContext'
import { ValidateErrorEntity } from 'rc-field-form/lib/interface'
// interface SignInFormValues {
//   email: string
//   password: string
// }
const SignInForm: React.FC = () => {
  const { login, isLoggedIn } = useAuthContext()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false)
  const onFinish = (values: { email: string; password: string }) => {
    setLoading(true)
    message.loading({ content: 'Đang xử lý...', key: 'login', duration: 0 })

    setTimeout(() => {
      // logout()
      // Giả lập kiểm tra thông tin đăng nhập
      if (values.email === 'demo@example.com' && values.password === 'demo#123') {
        message.success({ content: 'Đăng nhập thành công!', key: 'login', duration: 2 })
        console.log(isLoggedIn)
        login('fake-demo-token') // Đăng nhập và lưu token vào context
        window.location.href = '/dashboard' // Điều hướng đến trang dashboard sau khi đăng nhập thành công
      } else {
        message.error({ content: 'Thông tin đăng nhập không hợp lệ!', key: 'login', duration: 2 })
      }
      setLoading(false)
    }, 2000)
  }
  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Lỗi khi submit:', errorInfo)
    message.error('Vui lòng điền đầy đủ thông tin hợp lệ!')
  }
  return (
    <Form id='basic' className='ant-form rounded-lg bg-white' onFinish={onFinish} onFinishFailed={onFinishFailed}>
      {/* Email Input */}
      <div className='ant-form-item  flex-wrap mb-4'>
        <Form.Item name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input
            placeholder='Email'
            type='text'
            id='basic_email'
            className='ant-input rounded-lg border border-gray-300 bg-[#f5f5f5] px-4 py-2'
            //     defaultValue="demo@example.com"
          />
        </Form.Item>
      </div>

      <div className='ant-form-item  flex-wrap mb-4'>
        <Form.Item
          name='password'
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters!' }
          ]}
        >
          <Input.Password
            placeholder='Password'
            id='basic_password'
            className='ant-input rounded-lg border border-gray-300 bg-[#f5f5f5] px-4 py-2'
          />
        </Form.Item>
      </div>

      <div className='ant-form-item mb-4 flex items-center'>
        <Checkbox className='mr-2' />
        <span>by signing up, I accept</span>
        <a href='/terms-and-conditions' className='ml-2 text-blue-500 hover:text-blue-700'>
          Term &amp; Condition
        </a>
      </div>

      {/* Sign In Button */}
      <div className='ant-form-item mb-4 flex'>
        <Button type='primary' htmlType='submit' className='ant-btn mr-3 px-4 py-4 text-lg font-semibold'>
          Sign In
        </Button>
        <span className='mr-2 mt-2 block text-center'>or</span>
        <a href='/signup' className='mt-2 block text-center text-blue-500 hover:text-blue-700'>
          Sign Up
        </a>
      </div>

      {/* Social Media Connect */}
      <div className='flex-s mt-4 flex flex-wrap justify-between self-start'>
        <span>or connect with</span>
        <ul className='social-link flex space-x-4 self-start'>
          <li>
            <div className='flex h-8 w-8 content-center items-center justify-center rounded-full border-[1px] border-sky-500'>
              <span role='img' aria-label='google' className='flex justify-center'>
                <GoogleOutlined className='text-xl text-blue-600 hover:text-blue-500' />
              </span>
            </div>
          </li>
          <li>
            <div className='flex h-8 w-8 content-center items-center justify-center rounded-full border-[1px] border-sky-500'>
              <span role='img' aria-label='facebook' className='flex justify-center'>
                <FacebookOutlined className='text-xl text-blue-600 hover:text-blue-800' />
              </span>
            </div>
          </li>
          <li>
            <div className='flex h-8 w-8 content-center items-center justify-center rounded-full border-[1px] border-sky-500'>
              <span role='img' aria-label='github' className='flex justify-center'>
                <GithubOutlined className='text-xl text-blue-400 hover:text-black' />
              </span>
            </div>
          </li>
          <li>
            <div className='flex h-8 w-8 content-center items-center justify-center rounded-full border-[1px] border-sky-500'>
              <span role='img' aria-label='twitter' className='flex justify-center'>
                <TwitterOutlined className='text-xl text-blue-400 hover:text-blue-600' />
              </span>
            </div>
          </li>
        </ul>
      </div>

      {/* Demo Text */}
      <div className='gx-text-light text-sm text-[#ababab] mt-4 text-gray-500'>
        demo user email: <span className='font-bold'>demo@example.com</span> and password:{' '}
        <span className='font-bold'>demo#123</span>
      </div>
    </Form>
  )
}

export default SignInForm
