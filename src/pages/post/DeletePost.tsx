import React from 'react'
import { useParams } from 'react-router-dom'
import { message } from 'antd'
import { deletePost } from '../../utils' // Import hàm deletePost
import { showMessage } from '../../constants'

const DeletePost: React.FC = () => {
  const { id } = useParams<{ id: string }>() // Lấy id từ URL
  const [messageApi, contextHolder] = message.useMessage()
  const handleDelete = async () => {
    try {
      // Xoá bài viếtmessage.success('Post deleted successfully!') // Thông
      await deletePost(Number(id)) // Gọi hàm deletePost với id
      //  báo thành công
      showMessage('success', 'Xoá bài viết thành công', messageApi)
      // Chuyển hướng về danh sách bài viết sau khi xoá
    } catch (error) {
      console.error('Error deleting post:', error)
      showMessage('error', 'Thêm bài viết thất bại', messageApi)
    }
  }

  return (
    <div>
      {contextHolder}
      <h3>Are you sure you want to delete this post?</h3>
      <button onClick={handleDelete}>Delete Post</button>
    </div>
  )
}

export default DeletePost
