interface PostItem {
  id: string | number
  title: string
}

interface PostListProps {
  data: PostItem[]
  onItemClick: (id: string | number) => void
}

const PostList: React.FC<PostListProps> = ({ data, onItemClick }) => (
  <div className='post-list'>
    {data.map((item) => (
      <div
        key={item.id}
        className='post-item'
        onClick={() => onItemClick(item.id)}
        style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ddd' }}
      >
        {item.title}
      </div>
    ))}
  </div>
)

export default PostList
