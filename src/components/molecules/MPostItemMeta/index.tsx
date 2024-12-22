import React from 'react'
import { List } from 'antd'
import AvatarIcon from '../../atoms/AAvatarIcon'

interface PostItemMetaProps {
  avatar: string
  title: string
  href: string
  description: string
}

const PostItemMeta: React.FC<PostItemMetaProps> = ({ avatar, title, href, description }) => (
  <List.Item.Meta avatar={<AvatarIcon src={avatar} />} title={<a href={href}>{title}</a>} description={description} />
)

export default PostItemMeta
