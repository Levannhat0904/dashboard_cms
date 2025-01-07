import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuthors } from '../../../contexts/AuthorsContext'
import { usePostsV2 } from '../../../hook/CustomHook'
import { usePaginationV2 } from '../../../hook/usePagination'
import MainPage from '../../Templates/TPostList'
import useDebouncedSearch from '../../../hook/useDebouncedSearch'
import useQueryParamUrl from '../../../hook/useQueryParamUrl'
import useParams from '../../../hook/useParams'

const PPost: React.FC = () => {
  const [, setSearchParams] = useSearchParams()
  const { authors, assets } = useAuthors()

  // Sử dụng hook để quản lý các tham số URL
  const [queryParams, updateQueryParams] = useQueryParamUrl({
    assets: [],
    authors: []
  })
  const { page, pageSize, s } = useParams()

  // API call với searchParams
  const { data, isLoading } = usePostsV2({
    page,
    pageSize,
    s,
    authors: queryParams.authors, // Lấy selected authors từ queryParams
    assets: queryParams.assets // Lấy selected assets từ queryParams
  })

  const { handleOnPageChange } = usePaginationV2()

  // Hàm xử lý khi thay đổi tác giả hoặc tài sản được chọn
  const handleSelectChange = (key: 'authors' | 'assets', selectedValues: string[]) => {
    updateQueryParams(key, selectedValues) // Cập nhật giá trị trong URL
  }

  // Hàm xử lý tìm kiếm
  const handleSearch = (s: string) => {
    setSearchParams({
      page: '1', // Reset trang về 1 khi tìm kiếm
      pageSize: pageSize.toString(),
      s,
      authors: queryParams.authors.join(','), // Chuyển authors thành chuỗi và lưu trong URL
      assets: queryParams.assets.join(',') // Chuyển assets thành chuỗi và lưu trong URL
    })
  }

  const handleInputSearchChange = useDebouncedSearch(setSearchParams, {
    delay: 1000,
    defaultPageSize: 10
  })

  return (
    <MainPage
      // Filter authors
      authors={authors}
      selectedAuthors={queryParams.authors} // Lấy selected authors từ queryParams
      handleSelectAuthorChange={(selectedAuthors: string[]) => handleSelectChange('authors', selectedAuthors)}
      // Filter assets
      assets={assets}
      selectedAssets={queryParams.assets} // Lấy selected assets từ queryParams
      handleSelectAssetChange={(selectedAssets: string[]) => handleSelectChange('assets', selectedAssets)}
      // Search
      handleInputSearchChange={handleInputSearchChange}
      handleSearch={handleSearch}
      // Data
      datas={data}
      loading={isLoading}
      handleOnPageChange={handleOnPageChange}
    />
  )
}

export default PPost
