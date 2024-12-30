import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelectedAuthors } from '../../../contexts/SelectedAuthorsContext'
import { useAuthors } from '../../../contexts/AuthorsContext'
import { usePosts } from '../../../hook/CustomHook'
import { IPost } from '../../../utils/AxiosApiServiceLogin'
import MainPage from '../../Templates/TPostList'
const PPost: React.FC = () => {
  const [postsTest, setPostsTest] = useState<IPost[]>([])
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
  console.log('meta: ', meta)

  return (
    <MainPage
      authors={authors}
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
