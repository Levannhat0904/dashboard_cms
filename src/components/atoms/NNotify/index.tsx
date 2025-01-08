import { notification } from 'antd'
import React from 'react'

const useCustomNotification = () => {
  const [api, contextHolder] = notification.useNotification()

  const openNotification = ({
    message = 'Notification Title',
    description = 'Default description for the notification.',
    key,
    btn,
    duration = 4.5,
    onClose
  }) => {
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

  const closeNotification = (key) => {
    if (key) {
      api.destroy(key)
    } else {
      api.destroy()
    }
  }

  return { openNotification, closeNotification, contextHolder }
}

export default useCustomNotification
