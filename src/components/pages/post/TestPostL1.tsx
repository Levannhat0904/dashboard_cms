import React, { useEffect, useMemo, useState } from 'react'
import { Avatar, List, message, Select } from 'antd'
import { EditOutlined, UserOutlined } from '@ant-design/icons'
import {
  getPostInfo,
  getPostsByAuthor,
  getUserInfo,
  IApiPostResponse,
  IPost
} from '../../../utils/AxiosApiServiceLogin'
import { getAccessToken } from '../../../utils'
import UserAvatarTooltip from './UserAvatar'
import Tags from './Tags'
import AssetAvatarTooltip from './Assets'
import { FloatButton } from 'antd'
import Types from './Type'
import { useSearchParams } from 'react-router-dom'
import { useSelectedAuthors } from '../../../contexts/SelectedAuthorsContext'
import { useAuthors } from '../../../contexts/AuthorsContext'
import { usePostsWithAuthors } from '../../../hook/CustomHook'
const TestPostL1: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([])
  const [postsTest, setPostsTest] = useState([])
  // const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const { authors, setAuthors } = useAuthors()
  // const [selectedAuthors, setSelectedAuthors] = useState<string[]>([])
  const { selectedAuthors, setSelectedAuthors } = useSelectedAuthors()

  const accessToken = getAccessToken()

  const [meta, setMeta] = useState({
    page: parseInt(searchParams.get('page') || '1', 10),
    pageSize: parseInt(searchParams.get('pageSize') || '10', 10),
    total: 0
  })
  // Gọi API để lấy danh sách tác giả
  // useEffect(() => {
  //   fetchAuthors()
  // }, [])

  // Sử dụng useMemo để tối ưu tham số URL (chỉ tính lại khi các tham số thay đổi)
  const memoizedParams = useMemo(
    () => ({
      page: meta.page,
      pageSize: meta.pageSize,
      authors: selectedAuthors.join(',')
    }),
    [meta.page, meta.pageSize, selectedAuthors]
  )
  const { data, isLoading, error } = usePostsWithAuthors(meta.page, meta.pageSize, selectedAuthors)
  console.log('>>>>>>>>>>>>>>', data?.posts.data.datas) //lấy ra dc post
  useEffect(() => {
    if (data?.posts?.data?.datas) {
      console.log('>>>>>>>>>>>>>>', data.posts.data.datas)
      setPostsTest(data.posts.data.datas) // Gán dữ liệu cho state khi có dữ liệu hợp lệ
    } else {
      console.error('Dữ liệu không hợp lệ hoặc không có')
    }
  }, [data, setPostsTest])
  // Lấy giá trị từ URL khi trang tải lại
  useEffect(() => {
    const authorsFromUrl = searchParams.getAll('authors')
    console.log(authorsFromUrl)
    if (authorsFromUrl.length > 0) {
      setSelectedAuthors(authorsFromUrl) // Khôi phục trạng thái từ URL
    }
  }, [searchParams])
  console.log(posts)

  console.log('searchParams', selectedAuthors)

  useEffect(() => {
    fetchPosts(memoizedParams.page, memoizedParams.pageSize, selectedAuthors)
  }, [memoizedParams])

  // Khi `selectedAuthors` hoặc `memoizedParams` thay đổi, gọi API

  useEffect(() => {
    if (selectedAuthors.length > 0 || memoizedParams.authors === '') {
      fetchPosts(memoizedParams.page, memoizedParams.pageSize, selectedAuthors)
    }
  }, [memoizedParams, selectedAuthors])

  // Hàm gọi API lấy bài viết
  const fetchPosts = async (page: number, pageSize: number, selectedAuthors: string[] = []) => {
    setLoading(true)
    try {
      console.log('length: ', selectedAuthors)
      const response: IApiPostResponse = await (selectedAuthors.length
        ? getPostsByAuthor(page, pageSize, selectedAuthors) // Lọc theo tác giả
        : getPostInfo(page, pageSize, accessToken))
      console.log('check', response.data.datas)
      setPosts(response.data.datas)
      setMeta({
        page: response.data.page,
        pageSize: response.data.pageSize,
        total: response.data.total
      })
    } catch (error) {
      message.error('Không thể tải bài viết, vui lòng thử lại sau.')
      console.error('Không thể lấy thông tin bài viết:', error)
    } finally {
      setLoading(false)
    }
  }

  // Hàm gọi API lấy danh sách tác giả
  // const fetchAuthors = async () => {
  //   try {
  //     const response = await getUserInfo()
  //     setAuthors(response.data)
  //   } catch (error) {
  //     console.error('Lỗi khi lấy dữ liệu tác giả:', error)
  //   }
  // }

  console.log(selectedAuthors)

  // Hàm xử lý thay đổi phân trang
  // const handleOnChange = async (page: number, pageSize: number) => {
  //   if (meta.page === page && meta.pageSize === pageSize) return
  //   setSearchParams({
  //     page: page.toString(),
  //     pageSize: pageSize.toString(),
  //     authors: selectedAuthors.join(',')
  //   })
  //   setMeta((prevMeta) => ({ ...prevMeta, page, pageSize }))
  //   window.scrollTo({ top: 0, behavior: 'smooth' })
  // }
  const handleOnChange = async (page: number, pageSize: number) => {
    if (meta.page === page && meta.pageSize === pageSize) return

    setSearchParams((prevParams) => {
      const newParams = { ...Object.fromEntries(prevParams.entries()) } // Lấy tất cả tham số hiện tại
      newParams.page = page.toString()
      newParams.pageSize = pageSize.toString()

      // Chỉ thêm tham số authors nếu có selectedAuthors
      if (selectedAuthors.length > 0) {
        newParams.authors = selectedAuthors.join(',')
      } else {
        delete newParams.authors // Nếu không có selectedAuthors, xóa tham số authors
      }

      return newParams
    })

    setMeta((prevMeta) => ({ ...prevMeta, page, pageSize }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const buildUrl = (base: string, params: Record<string, any>) => {
    const queryString = Object.entries(params)
      .flatMap(([key, value]) =>
        Array.isArray(value)
          ? value.map((item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
          : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&')
    return `${base}?${queryString}`
  }

  // Hàm xử lý thay đổi tác giả lọc
  const handleSelectChange = async (selectedAuthors: string[]) => {
    setSelectedAuthors(selectedAuthors)
    const newMeta = { ...meta, page: 1 }
    setMeta((prevMeta) => ({ ...prevMeta, page: 1 }))
    const params = {
      page: newMeta.page.toString(),
      pageSize: newMeta.pageSize.toString(),
      authors: selectedAuthors
    }
    const url = buildUrl('', params)
    setSearchParams(url)
  }

  const selectAuthorComponent = (author: any) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar style={{ backgroundColor: '#87d068' }} icon={!author.avatar && <UserOutlined />} src={author.avatar} />
      <span style={{ marginLeft: 8 }}>{author.name}</span>
    </div>
  )

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
            onChange={handleSelectChange}
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
          onChange: (page: number, pageSize: number) => handleOnChange(page, pageSize)
        }}
        dataSource={postsTest}
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
                {/* <span className='block'>
                  <b>id:</b>
                  {item.id}
                </span>
                <span className='block'>
                  <b>uuid:</b>
                  {item.uuid}
                </span>
                <span className='block'>
                  <b>slug:</b>
                  {item.slug}
                </span> */}
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
