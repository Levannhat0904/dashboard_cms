import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Space } from 'antd'
import useCustomNotification from './useCustomNotification'

const usePreventNavigation = ({
  hasUnsavedChanges = false,
  customMessage = 'Bạn có thay đổi chưa lưu. Bạn có chắc chắn muốn rời khỏi trang này?',
  onConfirm,
  onCancel
} = {}) => {
  const navigate = useNavigate()
  const { openNotification, closeNotification, contextHolder } = useCustomNotification()

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (hasUnsavedChanges) {
        event.returnValue = customMessage // Thông điệp mặc định của trình duyệt
        return customMessage
      }
    }

    // Gắn sự kiện trước khi người dùng rời khỏi trang
    window.addEventListener('beforeunload', handleBeforeUnload)

    // Cleanup khi component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [hasUnsavedChanges, customMessage])

  // Hàm xử lý điều hướng với notification
  const handleNavigate = useCallback(
    (to) => {
      if (hasUnsavedChanges) {
        const key = `prevent${Date.now()}`
        const btn = (
          <Space>
            <Button
              type='primary'
              size='small'
              onClick={() => {
                closeNotification(key) // Đóng notification
                if (onConfirm) onConfirm() // Callback xác nhận
                navigate(to) // Chuyển hướng
              }}
            >
              Rời đi
            </Button>
            <Button
              size='small'
              onClick={() => {
                closeNotification(key) // Đóng notification
                if (onCancel) onCancel() // Callback hủy bỏ
              }}
            >
              Ở lại
            </Button>
          </Space>
        )

        openNotification({
          message: 'Cảnh báo',
          description: customMessage,
          key,
          btn
        })
      } else {
        navigate(to) // Chuyển hướng ngay nếu không có thay đổi
      }
    },
    [hasUnsavedChanges, customMessage, navigate, onConfirm, onCancel, openNotification, closeNotification]
  )

  return { handleNavigate, contextHolder }
}

export default usePreventNavigation
