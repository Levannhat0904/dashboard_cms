// components/organisms/PostList.tsx

import { List } from 'antd'
import PostListHeader from '../../molecules/MPostListHeader'
import PostListItem from '../../molecules/MListItem'
import { IPost } from '../../../utils/AxiosApiServiceLogin'

interface PostListProps {
  posts: IPost[] // Bạn có thể thay thế 'any' bằng kiểu cụ thể của posts nếu biết
  loading: boolean
  meta: {
    page: number
    pageSize: number
    total: number
    s?: string
  }
  onPageChange: (page: number, pageSize: number) => Promise<void>
}
const PostList: React.FC<PostListProps> = ({ posts, loading, meta, onPageChange }) => (
  <>
    <PostListHeader />
    <List
      className='z-10'
      itemLayout='vertical'
      size='large'
      loading={loading}
      pagination={{
        current: meta.page,
        pageSize: meta.pageSize,
        total: meta.total,
        showSizeChanger: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        onChange: onPageChange
      }}
      dataSource={posts}
      renderItem={(item) => <PostListItem item={item} />}
    />
  </>
)

export default PostList
