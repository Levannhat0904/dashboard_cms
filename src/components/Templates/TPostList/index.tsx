import { List, message } from 'antd'
import PostItem from '../../organisms/OPostItem'
import InputSearchTest from '../../atoms/AInputSearchTest'
import { usePostContext } from '../../../contexts/PostContext'

interface PostListProps {
  data: any[]
  onItemClick: (id: number) => void
}
const PostList: React.FC<PostListProps> = ({ data, onItemClick }) => {
  const { setData, fetchPostsData, fetchPostsDataByContextAPI } = usePostContext()
  const handleSearch = async (value: string) => {
    if (value === '') {
      // Nếu ô tìm kiếm trống, gọi lại API để tải lại tất cả người dùng
      console.log('Ô tìm kiếm trống, tải lại tất cả người dùng.')
      fetchPostsData()
      return
    }
    const result = await fetchPostsDataByContextAPI(value)
    if (result.length === 0) {
      message.warning('Không tìm thấy dữ liệu')
      fetchPostsData()
    } else {
      setData(result)
    }
  }
  return (
    <>
      <InputSearchTest handleSearch={handleSearch} />
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
              content={item.body}
              // content={item.content}
              onItemClick={onItemClick}
            />
          )}
        />
      </div>
    </>
  )
}

export default PostList
