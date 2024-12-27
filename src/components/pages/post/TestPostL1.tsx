import React, { useEffect, useState } from 'react'
import { Avatar, List, Select } from 'antd'
import { EditOutlined, UserOutlined } from '@ant-design/icons'
import UserAvatarTooltip from './UserAvatar'
import Tags from './Tags'
import AssetAvatarTooltip from './Assets'
import { FloatButton } from 'antd'
import Types from './Type'
import { useSearchParams } from 'react-router-dom'
import { useSelectedAuthors } from '../../../contexts/SelectedAuthorsContext'
import { useAuthors } from '../../../contexts/AuthorsContext'
import { usePosts } from '../../../hook/CustomHook'
import { IPost } from '../../../utils/AxiosApiServiceLogin'
const TestPostL1: React.FC = () => {
  const [postsTest, setPostsTest] = useState<IPost[]>([])
  // const [postsTest, setPostsTest] = useState([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const { authors } = useAuthors()
  const { selectedAuthors, setSelectedAuthors } = useSelectedAuthors()

  const [meta, setMeta] = useState({
    page: parseInt(searchParams.get('page') || '1', 10),
    pageSize: parseInt(searchParams.get('pageSize') || '10', 10),
    total: 0
  })
  // Sử dụng useMemo để tối ưu tham số URL (chỉ tính lại khi các tham số thay đổi)
  const { data, isLoading, error } = usePosts(meta.page, meta.pageSize, selectedAuthors)

  useEffect(() => {
    // console.log('Dữ liệu trả về:', data)
    console.log()
    if (data?.posts?.data?.datas.length && Array.isArray(data.posts.data.datas)) {
      console.log('Dữ liệu hợp lệ:', data)
      setPostsTest(data?.posts.data.datas) // Gán dữ liệu hợp lệ
      setMeta({
        page: data.posts.data.page,
        pageSize: data.posts.data.pageSize,
        total: data.posts.data.total
      })
    } else {
      setPostsTest([])
    }
  }, [data])
  // console.log('data?.posts?.data?.datas.length', data?.posts?.data?.datas.length)
  // Lấy giá trị từ URL khi trang tải lại
  useEffect(() => {
    setLoading(false)
    const authorsFromUrl = searchParams.getAll('authors')
    // console.log(authorsFromUrl)
    if (authorsFromUrl.length > 0) {
      setSelectedAuthors(authorsFromUrl) // Khôi phục trạng thái từ URL
    }
  }, [searchParams])

  // console.log('searchParams', selectedAuthors)
  const handleOnPageChange = async (page: number, pageSize: number) => {
    if (meta.page === page && meta.pageSize === pageSize) return
    setMeta({
      page: page,
      pageSize: pageSize,
      total: meta.total
    })
    const newParams = new URLSearchParams(searchParams)
    newParams.set('page', page.toString())
    newParams.set('pageSize', pageSize.toString())
    // Cập nhật URL
    setSearchParams(newParams)
    // console.log('post-re', postsTest)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const handleSelectAuthorChange = async (selectedAuthors: string[]) => {
    setSelectedAuthors(selectedAuthors)
    const newMeta = { ...meta, page: 1 }
    setMeta((prevMeta) => ({ ...prevMeta, page: 1 }))
    setSearchParams({
      page: newMeta.page.toString(),
      pageSize: newMeta.pageSize.toString(),
      authors: selectedAuthors // React Router sẽ tự động xử lý danh sách
    })
  }
  const selectAuthorComponent = (author: any) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar style={{ backgroundColor: '#87d068' }} icon={!author.avatar && <UserOutlined />} src={author.avatar} />
      <span style={{ marginLeft: 8 }}>{author.name}</span>
    </div>
  )
  console.log('meta: ', meta)
  // console.log('posts: ', postsTest)

  return (
    <>
      <FloatButton.BackTop />
      <div className='flex justify-end my-2 mr-3 sticky'>
        <div className='w-[400px]'>
          <Select
            mode='multiple'
            className='w-10'
            value={selectedAuthors}
            size='large'
            placeholder='Please select'
            // defaultValue={[]}
            onChange={handleSelectAuthorChange}
            style={{ width: '100%' }}
          >
            {/* Sử dụng divs trong Select */}
            {/* {options} */}
            {authors.map((author) => (
              <Select.Option key={author.id} value={author.id}>
                {selectAuthorComponent(author)}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <div className='sticky top-16 w-[-webkit-fill-available] mt-0 z-20 border-b-1 bg-slate-300 h-12 border-indigo-500 justify-center items-center ml-0 mr-0 gap-x-1  flex flex-row'>
        <div className='basis-7/12'>
          <h2>TITLE</h2>
        </div>
        <div className=' basis-1/12'>
          <div className='basis-7/12'>
            <h2>TYPE</h2>
          </div>
        </div>
        <div className=' basis-2/12'>
          <div className='basis-7/12'>
            <h2>SECTORS</h2>
          </div>
        </div>
        <div className=' basis-1/12'>
          <div className='basis-7/12'>
            <h2>ASSETS</h2>
          </div>
        </div>
        <div className=' basis-1/12'>
          <div className='basis-7/12'>
            <h2>ACTION</h2>
          </div>
        </div>
      </div>
      <List
        className='z-10'
        // header={headerList}
        itemLayout='vertical'
        size='large'
        loading={loading}
        pagination={{
          current: meta.page,
          pageSize: meta.pageSize,
          total: meta.total,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          onChange: (page: number, pageSize: number) => handleOnPageChange(page, pageSize)
        }}
        dataSource={postsTest || []}
        renderItem={(item) => (
          <List.Item key={item.title}>
            <List.Item.Meta className='pl-0' />
            <div className='flex pl-2 flex-row'>
              <div className=' basis-7/12'>
                {/* title */}
                <span className='block'>
                  <b>title:</b>
                  {item.title}
                </span>
                <span className='block'>
                  <b>excerpt:</b>
                  {item.excerpt}
                </span>
                <span className='flex items-center'>
                  <b>Auth: </b>
                  <UserAvatarTooltip users={item.authors} />
                </span>
                <span className='flex items-center'>
                  <b>Tags:</b>
                  <Tags tags={item.tags || []} />
                </span>
              </div>
              <div className=' basis-1/12'>
                {/* type */}
                <Types types={item.postType || []} />
              </div>
              <div className=' basis-2/12'>
                {/* section */}
                <span className='block'>
                  <Tags tags={item.sectors || []} />
                </span>
              </div>
              <div className=' basis-1/12'>
                {/* assets */}
                <span className='block'>
                  <AssetAvatarTooltip assets={item.assets} />
                </span>
              </div>
              <div className=' basis-1/12'>
                {/* action */}
                <div className='flex justify-center items-center'>
                  <EditOutlined />
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />
    </>
  )
}
export default TestPostL1
