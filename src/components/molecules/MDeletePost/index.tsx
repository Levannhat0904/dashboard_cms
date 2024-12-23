import React from 'react'
import { Button, message } from 'antd'
import { deletePost } from '../../../utils'
import { showMessage } from '../../../constants'
import { usePostContext } from '../../../contexts/PostContext'

interface DeletePostButtonProps {
  selectedItemId: string | null
  onPostDeleted?: () => void // Hàm callback sau khi xóa thành công (tuỳ chọn)
  onClose: () => void // Hàm đóng modal sau khi xóa thành công
}

const DeletePostButton: React.FC<DeletePostButtonProps> = ({ selectedItemId, onPostDeleted, onClose }) => {
  const [messageApi, contextHolder] = message.useMessage()
  const { deletePostWithContextAPI } = usePostContext()
  const handleDelete = async () => {
    if (!selectedItemId) {
      message.warning('No post selected!')
      return
    }

    try {
      // xoá bài biết theo api
      // await deletePost(Number(selectedItemId)) // Gọi API xóa bài viết
      // Xoá bài viết theo context APi
      await deletePostWithContextAPI(Number(selectedItemId))
      showMessage('success', 'Xoá bài viết thành công', messageApi)
      onClose() // Đóng modal sau khi xóa thành công

      if (onPostDeleted) {
        onPostDeleted() // Gọi callback nếu có
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      showMessage('error', 'Xoá bài viết thất bại', messageApi)
    }
  }

  return (
    <>
      {contextHolder}
      <Button key='delete' type='primary' danger onClick={handleDelete} disabled={!selectedItemId}>
        Delete
      </Button>
    </>
  )
}

export default DeletePostButton
