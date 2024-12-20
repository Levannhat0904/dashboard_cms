// ===========
import React, { useEffect, useState } from 'react'
import { fetchPosts } from '../../utils'
import PostList from '../../components/organisms/PostList'
import { useNavigate } from 'react-router-dom'
import FloatAddButton from '../../components/molecules/FloatAddButton'
import PostOptionsModal from '../../components/molecules/PostOptionsModal'
import { message } from 'antd'
interface FormattedPostProps {
  id: number
  avatar: string
  title: string
  href: string
  description: string
  content: string
}
const Post: React.FC = () => {
  const [data, setData] = useState<FormattedPostProps[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null)
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    const fetchData = async () => {
      const posts = await fetchPosts()
      const formattedPosts = posts.map((post) => ({
        id: post.id,
        avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${post.id}`,
        title: post.title,
        href: `post/${post.id}/edit`,
        description: `Post ID: ${post.id}`,
        content: post.body
      }))
      setData(formattedPosts)
    }
    fetchData()
  }, [])

  const handleAddPostClick = () => navigate('addPost')
  const handleModalCancel = () => setIsModalOpen(false)
  const handleItemClick = (id: number) => {
    setSelectedItemId(id)
    setIsModalOpen(true)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }
  return (
    <div className='mb-20 w-full h-full overflow-x-hidden'>
      {contextHolder}
      <FloatAddButton onClick={handleAddPostClick} />
      {/* <PostOptionsModal isOpen={isModalOpen} onCancel={handleModalCancel} selectedItemId={selectedItemId} /> */}
      <PostOptionsModal
        isOpen={isModalOpen}
        onCancel={handleCloseModal}
        selectedItemId='123'
        onClose={handleCloseModal} // Đảm bảo truyền hàm đóng modal vào đây
      />
      <PostList data={data} onItemClick={handleItemClick} />
    </div>
  )
}

export default Post
