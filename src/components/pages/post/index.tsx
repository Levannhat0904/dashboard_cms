// ===========
import React, { useEffect, useState } from 'react'
// import { fetchPosts } from '../../utils'
// import PostList from '../../components/organisms/OPostList'
// import { useNavigate } from 'react-router-dom'
// import FloatAddButton from '../../components/molecules/MFloatAddButton'
// import PostOptionsModal from '../../components/molecules/MPostOptionsModal'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { fetchPosts } from '../../../utils'
import FloatAddButton from '../../atoms/AFloatAddButton'
import PostOptionsModal from '../../organisms/0PostOptionsModal'
import PostList from '../../Templates/TPostList'
import { usePostContext } from '../../../contexts/PostContext'
interface FormattedPostProps {
  id: number
  avatar: string
  title: string
  href: string
  description: string
  content: string
}
const Post: React.FC = () => {
  // const [data, setData] = useState<FormattedPostProps[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null)
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  const { data, loading } = usePostContext()
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const posts = await fetchPosts()
  //     const formattedPosts = posts.map((post) => ({
  //       id: post.id,
  //       avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${post.id}`,
  //       title: post.title,
  //       href: `post/${post.id}/edit`,
  //       description: `Post ID: ${post.id}`,
  //       content: post.body
  //     }))
  //     setData(formattedPosts)
  //   }
  //   fetchData()
  // }, [])

  const handleAddPostClick = () => navigate('addPost')
  const handleItemClick = (id: number) => {
    setSelectedItemId(id)
    console.log(id)
    setIsModalOpen(true)
  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }
  return (
    <div className='mb-20 w-full h-full overflow-x-hidden'>
      {contextHolder}
      <FloatAddButton onClick={handleAddPostClick} />
      <PostOptionsModal
        isOpen={isModalOpen}
        onCancel={handleCloseModal}
        selectedItemId={selectedItemId}
        onClose={handleCloseModal}
      />
      <PostList data={data} onItemClick={handleItemClick} />
    </div>
  )
}

export default Post
