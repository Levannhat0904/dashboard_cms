import React, { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelectedAuthors } from '../../../contexts/SelectedAuthorsContext'
import { useAuthors } from '../../../contexts/AuthorsContext'
import { usePosts, usePostsV2 } from '../../../hook/CustomHook'
import { FetchPostsParams, IPost } from '../../../utils/AxiosApiServiceLogin'
import MainPage from '../../Templates/TPostList'
import { debounce } from 'lodash'
import usePagination from '../../../hook/usePagination'
const PPost: React.FC = () => {
  const [postsTest, setPostsTest] = useState<IPost[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const { authors } = useAuthors()
  const { selectedAuthors, setSelectedAuthors } = useSelectedAuthors()

  const [meta, setMeta] = useState({
    page: parseInt(searchParams.get('page') || '1', 10),
    pageSize: parseInt(searchParams.get('pageSize') || '10', 10),
    total: 0,
    s: searchParams.get('s') || ''
  })
  // Cập nhật meta mỗi khi searchParams thay đổi
  useEffect(() => {
    setMeta({
      page: parseInt(searchParams.get('page') || '1', 10),
      pageSize: parseInt(searchParams.get('pageSize') || '10', 10),
      total: meta.total, // Bạn có thể giữ nguyên hoặc cập nhật `total` từ API
      s: searchParams.get('s') || ''
    })
  }, [searchParams.toString()])

  console.log('meta v: ', meta)

  const { data, isLoading, error } = usePostsV2(meta)

  useEffect(() => {
    console.log('Meta changed:', meta)
    // Khi `meta` thay đổi, sẽ tự động gọi lại API thông qua usePostsV2
  }, [meta])

  console.log('data test: ', data)

  useEffect(() => {
    // console.log('Dữ liệu trả về:', data)
    console.log()
    if (data?.posts?.data?.datas.length && Array.isArray(data.posts.data.datas)) {
      console.log('Dữ liệu hợp lệ:', data)
      setPostsTest(data?.posts.data.datas) // Gán dữ liệu hợp lệ
      setMeta({
        page: data.posts.data.page,
        pageSize: data.posts.data.pageSize,
        total: data.posts.data.total,
        s: meta.s
      })
    } else {
      setPostsTest([])
    }
  }, [data])
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

  // const handleOnPageChange = async (page: number, pageSize: number) => {
  //   if (meta.page === page && meta.pageSize === pageSize) return
  //   setMeta({
  //     page: page,
  //     pageSize: pageSize,
  //     total: meta.total,
  //     s: meta.s
  //   })
  //   const newParams = new URLSearchParams(searchParams)
  //   newParams.set('page', page.toString())
  //   newParams.set('pageSize', pageSize.toString())
  //   // Cập nhật URL
  //   setSearchParams(newParams)
  //   window.scrollTo({ top: 0, behavior: 'smooth' })
  // }
  const { handleOnPageChange } = usePagination(meta)

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

  // =============
  const handleSearch = async (s: string) => {
    const newMeta = { ...meta, page: 1, s: s }
    // setMeta((prevMeta) => ({ ...prevMeta, page: 1, s: s }))
    setSearchParams({
      page: newMeta.page.toString(),
      pageSize: newMeta.pageSize.toString(),
      authors: selectedAuthors,
      s: newMeta.s
    })
  }
  const handleInputSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value) // Gọi hàm debounce khi input thay đổi
  }
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const newMeta = { ...meta, page: 1, s: value }
      console.log(value)
      setSearchParams({
        ...searchParams,
        page: newMeta.page.toString(),
        pageSize: newMeta.pageSize.toString(),
        s: newMeta.s
      })
    }, 1000), // Thời gian debounce 1000ms
    [] // Đảm bảo khi selectedAuthors thay đổi, hàm debounce mới được tạo lại
  )

  return (
    <MainPage
      authors={authors}
      handleInputSearchChange={handleInputSearchChange}
      handleSearch={handleSearch}
      selectedAuthors={selectedAuthors}
      handleSelectAuthorChange={handleSelectAuthorChange}
      posts={postsTest}
      loading={isLoading}
      meta={meta}
      handleOnPageChange={handleOnPageChange}
    />
  )
}
export default PPost
