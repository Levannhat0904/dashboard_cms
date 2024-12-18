import React, { useEffect, useState } from 'react'
import { FileAddOutlined, LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'
import { Avatar, Modal, List, Space, Button, FloatButton } from 'antd'
import { fetchPosts } from '../../utils'
import { Link, useNavigate } from 'react-router-dom'

interface FormattedPostProps {
  href: string
  title: string
  avatar: string
  description: string
  content: string
  id: number
}
// interface PostProps {
//   userId: number
//   id: number
//   title: string
//   body: string
// }
const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

const Post: React.FC = () => {
  const [data, setData] = useState<FormattedPostProps[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null)
  const showModal = (itemId: number) => {
    console.log('itemId', itemId)
    // Tìm item theo id hoặc lấy dữ liệu cần thiết
    // const selectedItem = data.find((item) => item.id === itemId)
    // setModalContent(selectedItem) // Cập nhật nội dung modal
    setSelectedItemId(itemId) // Store the item ID
    setIsModalOpen(true) // Mở modal
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  //       // const posts = await response.json()
  //       const posts = await fetchPosts()
  //       const formattedPosts = posts.map((post: PostProps) => ({
  //         href: `post/${post.id}/edit`,
  //         title: post.title,
  //         avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=$1`,
  //         description: `Post ID: ${post.id}`,
  //         content: post.body,
  //         id: post.id
  //       }))
  //       setData(formattedPosts)
  //     } catch (error) {
  //       console.error('Error fetching data:', error)
  //     }
  //   }

  //   fetchData()
  // }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy dữ liệu bài viết đã được định dạng từ fetchPosts
        const posts = await fetchPosts()

        // Đảm bảo rằng bạn đang ánh xạ đúng
        const formattedPosts = posts.map((post) => ({
          href: `post/${post.id}/edit`,
          title: post.title,
          avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${post.id}`, // Dùng `${post.id}` thay vì `$1`
          description: `Post ID: ${post.id}`,
          content: post.body,
          id: post.id
        }))

        setData(formattedPosts)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, []) // Đảm bảo chỉ gọi 1 lần khi component mount
  const navigate = useNavigate()

  const handleAddPostClick = () => {
    console.log('onClick')
    navigate('addPost') // Chuyển hướng đến trang addPost
  }

  return (
    <div className='mb-20 w-full h-full overflow-x-hidden'>
      <FloatButton icon={<FileAddOutlined />} onClick={handleAddPostClick}></FloatButton>
      <Modal title='Basic Modal' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Button type='link'>
          <Link to={`${selectedItemId}/edit`}>Sửa(ID: {selectedItemId})</Link>
        </Button>
        <Button type='link'>
          <Link to={`${selectedItemId}/delete`}>Xoá(ID: {selectedItemId})</Link>
        </Button>
      </Modal>
      <div className='z-20 w-full h-full flex justify-center '>
        <List
          className='ml-5 mr-5'
          itemLayout='vertical'
          size='small'
          pagination={{
            onChange: (page) => {
              console.log(page)
            },
            pageSize: 10
          }}
          dataSource={data}
          // footer={
          //   <div>
          //     <b>ant design</b> footer part
          //   </div>
          // }
          renderItem={(item: FormattedPostProps) => (
            <List.Item
              onClick={() => showModal(item.id)}
              key={item.title}
              actions={[
                <IconText icon={StarOutlined} text='156' key='list-vertical-star-o' />,
                <IconText icon={LikeOutlined} text='156' key='list-vertical-like-o' />,
                <IconText icon={MessageOutlined} text='2' key='list-vertical-message' />
              ]}
              extra={
                <img width={272} alt='logo' src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' />
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
            // </Modal>
          )}
        />
        {/* <FloatButton.BackTop className='z-50' /> */}
      </div>
    </div>
  )
}

export default Post
