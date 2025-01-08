import { notification } from 'antd'
import React from 'react'

interface NotificationParams {
  message?: string
  description?: string
  key?: string
  btn?: React.ReactNode
  duration?: number
  onClose?: () => void
}

const useCustomNotification = () => {
  const [api, contextHolder] = notification.useNotification()

  const openNotification = ({
    message = 'Notification Title',
    description = 'Default description for the notification.',
    key,
    btn,
    duration = 4.5,
    onClose
  }: NotificationParams) => {
    const uniqueKey = key || `open${Date.now()}`
    api.open({
      message,
      description,
      key: uniqueKey,
      btn,
      duration,
      onClose: onClose || (() => console.log('Notification closed:', uniqueKey))
    })
  }

  const closeNotification = (key?: string) => {
    if (key) {
      api.destroy(key)
    } else {
      api.destroy()
    }
  }

  return { openNotification, closeNotification, contextHolder }
}

export default useCustomNotification
