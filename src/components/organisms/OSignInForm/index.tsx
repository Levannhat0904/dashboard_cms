/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/organisms/SignInForm.tsx
import React, { useRef, useState } from 'react'
import { Form, message } from 'antd'
import { useAuthContext } from '../../../contexts/AuthContext'
import { AInput, ACheckbox, AButton } from '../../atoms'
import { MSocialLogin } from '../../molecules'
// import LoginContent from '../../atoms/LoginContent'

const OSignInForm: React.FC = () => {
  // const { login } = useAuthContext()
  const { login, isLoggedIn } = useAuthContext()
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(true)

  const onFinish = (values: { email: string; password: string }) => {
    setLoading(true)
    message.loading({ content: 'Đang xử lý...', key: 'login', duration: 0 })

    setTimeout(() => {
      if (values.email === 'demo@example.com' && values.password === 'demo#123') {
        message.success({ content: 'Đăng nhập thành công!', key: 'login', duration: 2 })
        login('fake-demo-token')
        window.location.href = '/dashboard'
      } else {
        message.error({ content: 'Thông tin đăng nhập không hợp lệ!', key: 'login', duration: 2 })
      }
      setLoading(false)
    }, 2000)
  }

  const onFinishFailed = () => {
    message.error('Vui lòng điền đầy đủ thông tin hợp lệ!')
  }
  const [isChecked, setIsChecked] = useState(false) // Quản lý trạng thái

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    setIsChecked(e.target.checked) // Cập nhật trạng thái khi thay đổi
  }
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }
  return (
    <Form id='basic' className='ant-form rounded-lg bg-white' onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <div className='mb-4'>
        <Form.Item name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
          <AInput ref={inputRef} placeholder='Email' type='email' />
        </Form.Item>
      </div>
      <div className='mb-4'>
        <Form.Item name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
          <AInput
            placeholder='Password'
            type='password'
            // className='ant-input rounded-lg border border-gray-300 bg-[#f5f5f5] px-4 py-2'
          />
        </Form.Item>
      </div>
      <div className='ant-form-item mb-4 flex items-center'>
        <ACheckbox className='mr-2' checked={isChecked} onChange={handleChange} />
        <span>by signing up, I accept</span>
        <a href='/terms-and-conditions' className='ml-2 text-blue-500 hover:text-blue-700'>
          Term &amp; Condition
        </a>
      </div>
      <div className='ant-form-item mb-4 flex'>
        <AButton type='primary' htmlType='submit' onClick={handleFocus} text='Sign In' />
        <span className='mr-2 mt-2 block text-center'>or</span>
        <a href='/signup' className='mt-2 block text-center text-blue-500 hover:text-blue-700'>
          Sign Up
        </a>
      </div>
      <div className='flex-s mt-4 flex flex-wrap justify-between self-start'>
        <span>or connect with</span>
        <MSocialLogin
          onGoogleLogin={() => {}}
          onFacebookLogin={() => {}}
          onGithubLogin={() => {}}
          onTwitterLogin={() => {}}
        />
      </div>
      <div className='gx-text-light text-sm text-[#ababab] mt-4 '>
        demo user email: <span className='font-bold'>demo@example.com</span> and password:{' '}
        <span className='font-bold'>demo#123</span>
      </div>
    </Form>
  )
}

export default OSignInForm
