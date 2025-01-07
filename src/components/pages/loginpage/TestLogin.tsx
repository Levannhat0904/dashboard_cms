import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { loginWithAxios, LoginRequest, LoginResponse } from '../../../utils/AxiosApiServiceLogin'
import { Button, notification } from 'antd'
type NotificationType = 'success' | 'info' | 'warning' | 'error'
const TestLogin: React.FC = () => {
  const [api, contextHolder] = notification.useNotification()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const openNotificationWithIcon = (type: NotificationType, message: string, description: string) => {
    api[type]({
      message: message,
      description: description
    })
  }

  // const mutation = useMutation({
  //   mutationFn: (data: LoginRequest) => login(data), // Hàm thực hiện mutation
  //   onSuccess: (data) => {
  //     if (data?.data?.accessToken) {
  //       localStorage.setItem('accessToken', data.data.accessToken)
  //     }
  //     console.log('Đăng nhập thành công:', data.data.accessToken)
  //     openNotificationWithIcon('success', 'Đăng nhập thành công', 'Đăng nhập thành công')
  //     // alert('Đăng nhập thành công!')
  //   },
  //   onError: (error: ErrorResponse) => {
  //     // Kiểm tra lỗi từ phản hồi API
  //     // openNotificationWithIcon('error', 'Đăng nhập tdhất bại', error.meta)
  //     if (error?.meta) {
  //       console.error('Login failednjksd:', error.meta)
  //       // setErrorMessage(error.meta.externalMessage) // Hiển thị thông báo lỗi lên giao diện
  //     } else {
  //       // Nếu không có thông điệp lỗi từ API, hiển thị lỗi chung
  //       openNotificationWithIcon('error', 'Đăng nhập thất bại', error.meta.externalMessage)
  //     }
  //   }
  // })
  const mutation = useMutation({
    mutationFn: (data: LoginRequest) => loginWithAxios(data), // Hàm thực hiện mutation
    onSuccess: (data) => {
      if (data?.data?.accessToken) {
        localStorage.setItem('accessToken', data.data.accessToken)
      }
      console.log('Đăng nhập thành công:', data.data.accessToken)
      openNotificationWithIcon('success', 'Đăng nhập thành công', 'Đăng nhập thành công')
    },
    onError: (error: LoginResponse) => {
      console.log('errsador: ', error.meta.internalMessage)
      openNotificationWithIcon('error', 'Error', error.meta.internalMessage)
      console.error('Login failed:', error) // In lỗi ra console để debug
    }
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setErrorMessage('Vui lòng nhập đầy đủ email và mật khẩu!')

      return
    }

    setErrorMessage(null) // Reset thông báo lỗi
    mutation.mutate({ email, password })
  }

  return (
    <>
      {contextHolder}
      <Button onClick={() => openNotificationWithIcon('success', 'thất bại roi', 'skhdjsk')}>Success</Button>
      {/* <Button onClick={() => openNotificationWithIcon('warning')}>Warning</Button> */}
      <Button onClick={() => openNotificationWithIcon('error', 'thất bại roi', 'skhdjsk')}>Error</Button>
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
        <h2>Đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor='email'>Email:</label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                margin: '5px 0',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor='password'>Mật khẩu:</label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                margin: '5px 0',
                boxSizing: 'border-box'
              }}
            />
          </div>
          {errorMessage && <p style={{ color: 'red', fontSize: '14px' }}>{errorMessage}</p>}
          <button
            type='submit'
            disabled={mutation.isPending}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              cursor: mutation.isPending ? 'not-allowed' : 'pointer'
            }}
          >
            {mutation.isPending ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </>
  )
}

export default TestLogin
