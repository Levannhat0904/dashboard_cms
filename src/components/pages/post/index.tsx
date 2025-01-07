// import React from 'react'
// import { useSearchParams } from 'react-router-dom'
// import { useAuthors } from '../../../contexts/AuthorsContext'
// import { usePostsV2 } from '../../../hook/CustomHook'
// import { usePaginationV2 } from '../../../hook/usePagination'
// import MainPage from '../../Templates/TPostList'
// import useDebouncedSearch from '../../../hook/useDebouncedSearch'
// import useQueryParamUrl from '../../../hook/useQueryParamUrl'
// import useParams from '../../../hook/useParams'

// const PPost: React.FC = () => {
//   const [, setSearchParams] = useSearchParams()
//   const { authors, assets } = useAuthors()

//   // Sử dụng hook để quản lý các tham số URL
//   const [queryParams, updateQueryParams] = useQueryParamUrl({
//     assets: [],
//     authors: []
//   })
//   const { page, pageSize, s } = useParams()

//   // API call với searchParams
//   const { data, isLoading } = usePostsV2({
//     page,
//     pageSize,
//     s,
//     authors: queryParams.authors, // Lấy selected authors từ queryParams
//     assets: queryParams.assets // Lấy selected assets từ queryParams
//   })

//   const { handleOnPageChange } = usePaginationV2()

//   // Hàm xử lý khi thay đổi tác giả hoặc tài sản được chọn
//   const handleSelectChange = (key: 'authors' | 'assets', selectedValues: string[]) => {
//     updateQueryParams(key, selectedValues) // Cập nhật giá trị trong URL
//   }

//   // Hàm xử lý tìm kiếm
//   const handleSearch = (s: string) => {
//     setSearchParams({
//       page: '1', // Reset trang về 1 khi tìm kiếm
//       pageSize: pageSize.toString(),
//       s,
//       authors: queryParams.authors.join(','), // Chuyển authors thành chuỗi và lưu trong URL
//       assets: queryParams.assets.join(',') // Chuyển assets thành chuỗi và lưu trong URL
//     })
//   }

//   const handleInputSearchChange = useDebouncedSearch(setSearchParams, {
//     delay: 1000,
//     defaultPageSize: 10
//   })

//   return (
//     <MainPage
//       // Filter authors
//       authors={authors}
//       selectedAuthors={queryParams.authors} // Lấy selected authors từ queryParams
//       handleSelectAuthorChange={(selectedAuthors: string[]) => handleSelectChange('authors', selectedAuthors)}
//       // Filter assets
//       assets={assets}
//       selectedAssets={queryParams.assets} // Lấy selected assets từ queryParams
//       handleSelectAssetChange={(selectedAssets: string[]) => handleSelectChange('assets', selectedAssets)}
//       // Search
//       handleInputSearchChange={handleInputSearchChange}
//       handleSearch={handleSearch}
//       // Data
//       datas={data}
//       loading={isLoading}
//       handleOnPageChange={handleOnPageChange}
//     />
//   )
// }

// export default PPost

import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuthors } from '../../../contexts/AuthorsContext'
import { usePostsV2 } from '../../../hook/CustomHook'
import { usePaginationV2 } from '../../../hook/usePagination'
import MainPage from '../../Templates/TPostList'
import useDebouncedSearch from '../../../hook/useDebouncedSearch'
import useQueryParamUrl from '../../../hook/useQueryParamUrl'
import useParams from '../../../hook/useParams'
import { IAsset, IAuthor } from '../../../utils/AxiosApiServiceLogin'
export type FilterOption = {
  type: 'select' | 'input' // Thêm 'input' vào 'type'
  name: string
  label: string
  items?: IAsset[] | IAuthor[] // 'options' chỉ cần thiết cho 'select'
  onChange?: any
  selectedItems?: any
}

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
  const filterData: FilterOption[] = [
    {
      type: 'input',
      name: 'search',
      label: 'Search',
      onChange: handleInputSearchChange
    },
    {
      type: 'select',
      name: 'authors',
      label: 'Authors',
      items: authors, // Mảng lựa chọn
      selectedItems: queryParams.authors,
      onChange: (selectedAuthors: string[]) => handleSelectChange('authors', selectedAuthors)
    },
    {
      type: 'select',
      name: 'assets',
      label: 'Assets',
      items: assets, // Mảng lựa chọn
      selectedItems: queryParams.assets,
      onChange: (selectedAssets: string[]) => handleSelectChange('assets', selectedAssets)
    }
  ]

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
      // test
      filterData={filterData}
    />
  )
}

export default PPost
