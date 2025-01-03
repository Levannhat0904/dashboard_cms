import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelectedAuthors } from '../../../contexts/SelectedAuthorsContext'
import { useAuthors } from '../../../contexts/AuthorsContext'
import { usePostsV2 } from '../../../hook/CustomHook'
import { usePaginationV2 } from '../../../hook/usePagination'
import MainPage from '../../Templates/TPostList'
import useDebouncedSearch from '../../../hook/useDebouncedSearch'

const PPost: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { authors } = useAuthors()
  const { selectedAuthors, setSelectedAuthors } = useSelectedAuthors()
  // Lấy dữ liệu từ searchParams
  const page = parseInt(searchParams.get('page') || '1', 10)
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10)
  const s = searchParams.get('s') || ''
  // API call với searchParams
  const { data, isLoading } = usePostsV2({
    page,
    pageSize,
    s,
    authors: selectedAuthors
  })

  // Khôi phục trạng thái selectedAuthors từ URL
  useEffect(() => {
    const authorsFromUrl = searchParams.getAll('authors')
    if (authorsFromUrl.length > 0) {
      setSelectedAuthors(authorsFromUrl)
    }
  }, [searchParams, setSelectedAuthors])
  const { handleOnPageChange } = usePaginationV2()
  // Hàm xử lý khi thay đổi tác giả được chọn
  const handleSelectAuthorChange = (selectedAuthors: string[]) => {
    setSelectedAuthors(selectedAuthors)

    setSearchParams({
      page: '1',
      pageSize: pageSize.toString(),
      authors: selectedAuthors,
      s
    })
  }

  // Hàm xử lý tìm kiếm
  const handleSearch = (s: string) => {
    setSearchParams({
      page: '1',
      pageSize: pageSize.toString(),
      authors: selectedAuthors,
      s
    })
  }

  const handleInputSearchChange = useDebouncedSearch(setSearchParams, {
    delay: 1000,
    defaultPageSize: 10
  })

  return (
    <MainPage
      authors={authors}
      handleInputSearchChange={handleInputSearchChange}
      handleSearch={handleSearch}
      selectedAuthors={selectedAuthors}
      handleSelectAuthorChange={handleSelectAuthorChange}
      datas={data}
      loading={isLoading}
      handleOnPageChange={handleOnPageChange}
    />
  )
}

export default PPost
