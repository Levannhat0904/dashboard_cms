// components/organisms/PostList.tsx

import { List } from 'antd'
import PostListHeader from '../../molecules/MPostListHeader'
import PostListItem from '../../molecules/MListItem'
import { IFetchPostsResponse } from '../../../utils/AxiosApiServiceLogin'
interface PostListProps {
  loading: boolean
  datas: IFetchPostsResponse | undefined
  onPageChange: (page: number, pageSize: number) => void
}
const PostList: React.FC<PostListProps> = ({ datas, loading, onPageChange }) => (
  <>
    <PostListHeader />
    {console.log('datas: ', datas?.posts.data)}

    <List
      className='z-10'
      itemLayout='vertical'
      size='large'
      loading={loading}
      pagination={{
        current: datas?.posts.data.page,
        pageSize: datas?.posts.data.pageSize,
        total: datas?.posts.data.total,
        showSizeChanger: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        onChange: onPageChange
      }}
      dataSource={datas?.posts.data.datas}
      renderItem={(item) => <PostListItem item={item} />}
    />
  </>
)

export default PostList
