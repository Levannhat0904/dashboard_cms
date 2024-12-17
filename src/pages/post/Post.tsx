import React, { useEffect, useState } from 'react'
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'
import { Avatar, Modal, List, Space, Button } from 'antd'
import Header from '../layout/Header'
import Footer from '../layout/Footer'

interface itemProps {
  title: string
  avatar: string
  href: string
  description: string
  content: string
  id: number
}
interface PostProps {
  id: number
  title: string
  avatar: string
  href: string
  description: string
  content: string
  body: string
}
const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

const Post: React.FC = () => {
  const [data, setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null)
  const showModal = (itemId) => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const posts = await response.json()
        const formattedPosts = posts.map((post: PostProps) => ({
          href: `:${post.id}/edit`,
          title: post.title,
          avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=$1`,
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
  }, [])
  return (
    <div className='mb-20 w-screen h-screen overflow-x-hidden'>
      <Header />
      <Modal title='Basic Modal' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Button type='link' onClick={() => console.log('Button 1 clicked')}>
          Button Link 1 (ID: {selectedItemId})
        </Button>
        <Button type='link' onClick={() => console.log('Button 2 clicked')}>
          Button Link 2 (ID: {selectedItemId})
        </Button>
      </Modal>
      <div className='z-20 w-screen h-screen flex justify-center '>
        <List
          className='mt-20 ml-5 mr-5'
          itemLayout='vertical'
          size='large'
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
          renderItem={(item: itemProps) => (
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
      <Footer />
    </div>
  )
}

export default Post
