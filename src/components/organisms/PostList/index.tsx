import React from 'react'
import { List } from 'antd'
import PostItem from '../PostItem'

interface PostListProps {
  data: any[]
  onItemClick: (id: number) => void
}

const PostList: React.FC<PostListProps> = ({ data, onItemClick }) => (
  <div className='z-20 w-full h-full flex justify-center '>
    <List
      className='ml-5 mr-5'
      itemLayout='vertical'
      size='small'
      pagination={{
        onChange: (page) => console.log(page),
        pageSize: 10
      }}
      dataSource={data}
      renderItem={(item) => (
        <PostItem
          id={item.id}
          avatar={item.avatar}
          title={item.title}
          href={item.href}
          description={item.description}
          content={item.content}
          onItemClick={onItemClick}
        />
      )}
    />
  </div>
)

export default PostList
