import React from 'react'
import { useParams } from 'react-router-dom'
import { message } from 'antd'
import { deletePost } from '../../utils' // Import hàm deletePost

const DeletePost: React.FC = () => {
  const { id } = useParams<{ id: string }>() // Lấy id từ URL

  const handleDelete = async () => {
    try {
      // Xoá bài viết
      await deletePost(Number(id)) // Gọi hàm deletePost với id
      message.success('Post deleted successfully!') // Thông báo thành công
      // Chuyển hướng về danh sách bài viết sau khi xoá
    } catch (error) {
      console.error('Error deleting post:', error)
      message.error('Error deleting post.') // Thông báo lỗi
    }
  }

  return (
    <div>
      <h3>Are you sure you want to delete this post?</h3>
      <button onClick={handleDelete}>Delete Post</button>
    </div>
  )
}

export default DeletePost
