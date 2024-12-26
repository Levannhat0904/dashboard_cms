import React, { useEffect, useState } from 'react'
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
// function buildUrl(base, params) {
//   const queryString = Object.entries(params)
//       .flatMap(([key, value]) =>
//           Array.isArray(value)
//               ? value.map(item => ${encodeURIComponent(key)}=${encodeURIComponent(item)})
//               : ${encodeURIComponent(key)}=${encodeURIComponent(value)}
//       )
//       .join('&');
//   return ${base}?${queryString};
// }
const TestPost: React.FC = () => {
  // ==========ok=========
  // const [posts, setPosts] = useState<IPost[]>([])
  // const [authors, setAuthors] = useState([])
  // const [authorsSelect, setAuthorsSelect] = useState([])
  // const [loading, setLoading] = useState<boolean>(true)
  // const [searchParams, setSearchParams] = useSearchParams()

  // // const [page, setPage] = useState<number>(1)
  // const [meta, setMeta] = useState({
  //   page: parseInt(searchParams.get('page') || '1', 10),
  //   pageSize: parseInt(searchParams.get('pageSize') || '10', 10),
  //   // pages: 0,
  //   total: 0
  // })
  // // const [total, setTotal] = useState<number>(0)
  // const accessToken = getAccessToken()
  // // console.log(posts)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true)
  //     try {
  //       const response: IApiPostResponse = await getPostInfo(meta.page, meta.pageSize, accessToken)
  //       setPosts(response.data.datas)
  //       setMeta({
  //         page: response.data.page,
  //         pageSize: response.data.pageSize,
  //         total: response.data.total
  //       })
  //     } catch (error) {
  //       message.error('Không thể tải bài viết, vui lòng thử lại sau.')
  //       console.error('Không thể lấy thông tin bài viết:', error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   fetchData()
  // }, [meta.page, meta.pageSize, accessToken])
  // useEffect(() => {
  //   // Hàm lấy dữ liệu từ API
  //   const fetchAuthors = async () => {
  //     // const post_by_auth = await getPostsByAuthor(1, 10, ['66264fb576fdcda93db0bb5f'])
  //     // console.log('post_by_auth', post_by_auth)
  //     try {
  //       const responseUser = await getUserInfo() // Gọi API để lấy danh sách
  //       setAuthors(responseUser.data) // Cập nhật state với dữ liệu từ API
  //       console.log('authors', authors)
  //     } catch (error) {
  //       console.error('Lỗi khi lấy dữ liệu:', error)
  //     }
  //   }

  //   fetchAuthors() // Gọi hàm ngay khi component load
  // }, [posts])
  // function buildUrl(base, params) {
  //   const queryString = Object.entries(params)
  //     .flatMap(([key, value]) =>
  //       Array.isArray(value)
  //         ? value.map((item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
  //         : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  //     )
  //     .join('&')
  //   return `${base}?${queryString}`
  // }
  // console.log('re-render')
  // const handleOnChange = async (page: number, pageSize: number) => {
  //   if (meta.page === page && meta.pageSize === pageSize) return // Chỉ cập nhật khi có thay đổi
  //   setSearchParams({ page: page.toString(), pageSize: pageSize.toString() })
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth' // Sử dụng 'auto' nếu bạn muốn cuộn tức thì
  //   })

  //   setLoading(true)
  //   const response: IApiPostResponse = await getPostInfo(page, pageSize, accessToken)
  //   setPosts(response.data.datas)
  //   setMeta({
  //     page: page,
  //     pageSize: pageSize,
  //     // pages: 0,
  //     total: meta.total
  //   })
  //   setLoading(false)
  //   console.log('page: ', page)
  //   console.log('pageSize: ', pageSize)
  // }
  // console.log('check post l1: ', posts)
  // const selectAuthorComponent = (author) => {
  //   const avatar = author.avatar
  //   return (
  //     <div style={{ display: 'flex', alignItems: 'center' }}>
  //       <Avatar style={{ backgroundColor: '#87d068' }} icon={!avatar && <UserOutlined />} src={avatar} />
  //       <span style={{ marginLeft: 8 }}>{author.name}</span>
  //     </div>
  //   )
  // }
  // const handleSelectChange = async (options) => {
  //   const param = {
  //     authors: options
  //   }
  //   const url = buildUrl('', param)
  //   setSearchParams(url)
  //   const idUrl = searchParams.getAll('authors')
  //   console.log('idUrl: ', idUrl)
  //   const resultTest = await getPostsByAuthor(meta.page, meta.pageSize, options)
  //   console.log('test get data', resultTest.data.datas)
  //   setPosts(resultTest.data.datas)
  // }

  // =======ok=======

  const [posts, setPosts] = useState<IPost[]>([])
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([])

  const accessToken = getAccessToken()

  const [meta, setMeta] = useState({
    page: parseInt(searchParams.get('page') || '1', 10),
    pageSize: parseInt(searchParams.get('pageSize') || '10', 10),
    total: 0
  })

  // Hàm gọi API lấy danh sách bài viết
  // const fetchPosts = async (page: number, pageSize: number) => {
  //   setLoading(true)
  //   try {
  //     const response: IApiPostResponse = await getPostInfo(page, pageSize, accessToken)
  //     setPosts(response.data.datas)
  //     setMeta({
  //       page: response.data.page,
  //       pageSize: response.data.pageSize,
  //       total: response.data.total
  //     })
  //   } catch (error) {
  //     message.error('Không thể tải bài viết, vui lòng thử lại sau.')
  //     console.error('Không thể lấy thông tin bài viết:', error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const fetchPosts = async (page: number, pageSize: number, selectedAuthors: string[] = []) => {
    setLoading(true)
    try {
      const response: IApiPostResponse = await (selectedAuthors.length
        ? getPostsByAuthor(page, pageSize, selectedAuthors)
        : getPostInfo(page, pageSize, accessToken))
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
  const fetchAuthors = async () => {
    try {
      const response = await getUserInfo()
      setAuthors(response.data)
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu tác giả:', error)
    }
  }

  useEffect(() => {
    fetchPosts(meta.page, meta.pageSize)
  }, [meta.page, meta.pageSize])

  useEffect(() => {
    fetchAuthors()
  }, [])

  // const handleOnChange = async (page: number, pageSize: number) => {
  //   if (meta.page === page && meta.pageSize === pageSize) return
  //   setSearchParams({ page: page.toString(), pageSize: pageSize.toString() })
  //   fetchPosts(page, pageSize)
  //   window.scrollTo({ top: 0, behavior: 'smooth' })
  // }
  const handleOnChange = async (page: number, pageSize: number) => {
    if (meta.page === page && meta.pageSize === pageSize) return
    setSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      authors: selectedAuthors.join(',')
    })
    fetchPosts(page, pageSize, selectedAuthors) // Gửi cả selectedAuthors
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

  const handleSelectChange = async (selectedAuthors: string[]) => {
    console.log(selectedAuthors)
    // Reset trang về 1 khi chọn mới
    const newMeta = { ...meta, page: 1 }
    const params = {
      page: newMeta.page.toString(),
      pageSize: newMeta.pageSize.toString(),
      authors: selectedAuthors
    }
    const url = buildUrl('', params)
    setSearchParams(url)

    try {
      setLoading(true)
      const response = await getPostsByAuthor(newMeta.page, newMeta.pageSize, selectedAuthors)
      setPosts(response.data.datas)
      setMeta({
        page: response.data.page,
        pageSize: response.data.pageSize,
        total: response.data.total
      })
    } catch (error) {
      console.error('Không thể tải bài viết theo tác giả:', error)
      message.error('Không thể tải bài viết, vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
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
            size='large'
            placeholder='Please select'
            defaultValue={[]}
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
      {console.log('check post', posts)}
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
        dataSource={posts}
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
export default TestPost
