// import { useCallback } from 'react'
// import { debounce } from 'lodash'

// interface UseDebouncedSearchOptions {
//   delay?: number
//   defaultPageSize?: number
// }

// const useDebouncedSearch = (
//   setSearchParams: (params: Record<string, string>) => void,
//   options?: UseDebouncedSearchOptions
// ) => {
//   const { delay = 1000, defaultPageSize = 10 } = options || {}

//   const debouncedSearch = useCallback(
//     debounce((value: string) => {
//       setSearchParams({
//         page: '1',
//         pageSize: defaultPageSize.toString(),
//         s: value
//       })
//     }, delay),
//     [setSearchParams, defaultPageSize, delay]
//   )

//   const handleInputSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     debouncedSearch(e.target.value)
//   }

//   return handleInputSearchChange
// }

// export default useDebouncedSearch

import { debounce } from 'lodash'
import { useCallback, useState } from 'react'

interface UseDebouncedSearchOptions {
  delay?: number
  defaultPageSize?: number
}

const useDebouncedSearch = (
  setSearchParams: (params: Record<string, string>) => void,
  options?: UseDebouncedSearchOptions
) => {
  const { delay = 1000, defaultPageSize = 10 } = options || {}
  const [currentParams, setCurrentParams] = useState<Record<string, string>>({})

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      // const updatedParams = {
      //   ...currentParams, // Lấy tham số hiện tại
      //   page: '1', // Reset page khi tìm kiếm mới
      //   pageSize: currentParams.pageSize || defaultPageSize.toString(),
      //   s: value // Cập nhật giá trị tìm kiếm
      // }

      const urlParams = new URLSearchParams(window.location.search)
      const updatedParams = {
        ...Object.fromEntries(urlParams.entries()), // Chuyển đổi các tham số URL thành đối tượng
        page: '1', // Reset page khi tìm kiếm mới
        pageSize: currentParams.pageSize || defaultPageSize.toString(),
        s: value // Cập nhật giá trị tìm kiếm
      }
      setCurrentParams(updatedParams) // Lưu tham số mới
      setSearchParams(updatedParams) // Gửi tham số ra ngoài
    }, delay),
    [currentParams, defaultPageSize, delay, setSearchParams]
  )

  const handleInputSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value)
  }

  return handleInputSearchChange
}

export default useDebouncedSearch
