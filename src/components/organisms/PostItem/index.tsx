import React from 'react'
import { List } from 'antd'
import PostItemMeta from '../../molecules/PostItemMeta'
import PostActions from '../../molecules/PostActions'
interface PostItemProps {
  id: number
  avatar: string
  title: string
  href: string
  description: string
  content: string
  onItemClick: (id: number) => void
}
const PostItem: React.FC<PostItemProps> = ({ id, avatar, title, href, description, content, onItemClick }) => (
  <List.Item
    key={title}
    actions={PostActions()}
    extra={<img width={272} alt='logo' src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' />}
    onClick={() => onItemClick(id)}
  >
    <PostItemMeta avatar={avatar} title={title} href={href} description={description} />
    {content}
  </List.Item>
)

export default PostItem
