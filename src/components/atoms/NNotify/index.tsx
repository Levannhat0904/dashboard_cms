import React, { useEffect } from 'react'
import { notification, Space, Button } from 'antd'
import { useEvenEdit } from '../../../contexts/EventContext' // Giả sử bạn đã có context này
import { useNavigate } from 'react-router-dom'

const close = () => {
  // console.log('Notification was closed. Either the close button was clicked or duration time elapsed.')
}

const NNotify: React.FC = () => {
  const navigate = useNavigate()
  const { path, setIsEdit, isOpenNotify, setIsOpenNotify } = useEvenEdit() // Lấy dữ liệu từ context
  const [api, contextHolder] = notification.useNotification()
  // Tách hàm xử lý Destroy All
  const handleDestroyAll = () => {
    api.destroy() // Phá hủy tất cả thông báo
  }

  // Tách hàm xử lý Confirm
  const handleConfirm = (key: string) => {
    setIsEdit(false)
    navigate(path)
    api.destroy(key) // Phá hủy thông báo có key cụ thể
  }
  // Mở thông báo khi isOpenNotify là true
  useEffect(() => {
    if (isOpenNotify) {
      openNotification()
      // Reset isOpenNotify để ngừng việc mở thông báo tự động lần sau (nếu cần)
      setIsOpenNotify(false) // Nếu bạn muốn thông báo chỉ được mở một lần
    }
  }, [isOpenNotify, setIsOpenNotify]) // Theo dõi sự thay đổi của isOpenNotify

  const openNotification = () => {
    const key = `open${Date.now()}`
    const btn = (
      <Space>
        <Button type='link' size='small' onClick={() => handleDestroyAll()}>
          Cancel
        </Button>
        <Button type='primary' size='small' onClick={() => handleConfirm(key)}>
          Confirm
        </Button>
      </Space>
    )
    api.open({
      message: 'Notification Title',
      description:
        'A function will be called after the notification is closed (automatically after the "duration" time or manually).',
      btn,
      key,
      onClose: close
    })
  }

  return (
    <>
      {contextHolder} {/* Đảm bảo contextHolder luôn được render để hiển thị thông báo */}
    </>
  )
}

export default NNotify
