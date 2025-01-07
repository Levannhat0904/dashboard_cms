// import { useState, useEffect, useCallback } from 'react'
// import { useSearchParams } from 'react-router-dom'

// function useQueryParamUrl<T>(paramName: string, initialState: T): [T, (newState: T) => void] {
//   const [url, setUrl] = useState<T>(initialState)
//   const [, setSearchParams] = useSearchParams()

//   // Đọc giá trị từ URL query parameter khi component mount
//   useEffect(() => {
//     const queryParams = new URLSearchParams(window.location.search)
//     const values = queryParams.getAll(paramName)

//     if (values.length > 0) {
//       setUrl(values as T) // Lưu các giá trị của tham số này vào state
//     }
//   }, [paramName])

//   // Hàm cập nhật state và URL
//   const updateUrl = useCallback(
//     (newState: T) => {
//       setUrl(newState)

//       const queryString = new URLSearchParams(window.location.search)

//       // Kiểm tra và loại bỏ các tham số có giá trị trống
//       if (newState && (newState as string[]).length > 0) {
//         // Loại bỏ các giá trị trùng lặp trước khi cập nhật
//         const uniqueValues = Array.from(new Set(newState as string[]))

//         // Xóa tất cả các tham số cũ
//         queryString.delete(paramName)

//         // Thêm tất cả các giá trị của tham số vào URL mà không bị trùng lặp
//         uniqueValues.forEach((value) => queryString.append(paramName, value))
//       } else {
//         queryString.delete(paramName) // Nếu không có giá trị, xóa tham số
//       }
//       // Đặt lại page=1 và pageSize=10
//       queryString.set('page', '1')
//       queryString.set('pageSize', '10')
//       setSearchParams({
//         page: '1',
//         pageSize: '10'
//       })
//       // Loại bỏ các tham số trống
//       Array.from(queryString.entries()).forEach(([key, value]) => {
//         if (!value || value === 'undefined') {
//           queryString.delete(key)
//         }
//       })

//       // Thay đổi URL mà không reload trang
//       window.history.replaceState({}, '', `${window.location.pathname}?${queryString.toString()}`)
//     },
//     [paramName]
//   )

//   return [url, updateUrl]
// }

// export default useQueryParamUrl

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

function useQueryParamUrl<T extends Record<string, string[]>>(
  initialState: T
): [T, (key: keyof T, newState: string[]) => void] {
  const [queryParams, setQueryParams] = useState<T>(initialState)
  const [, setSearchParams] = useSearchParams()

  // Đọc giá trị từ URL query parameter khi component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const newQueryParams = { ...initialState }

    Object.keys(initialState).forEach((key) => {
      const values = urlParams.getAll(key)
      if (values.length > 0) {
        newQueryParams[key] = values
      }
    })

    // Cập nhật queryParams chỉ khi nó thay đổi
    if (JSON.stringify(newQueryParams) !== JSON.stringify(queryParams)) {
      setQueryParams(newQueryParams as T)
    }
  }, [initialState, queryParams])

  // Hàm cập nhật state và URL
  const updateQueryParams = useCallback(
    (key: keyof T, newState: string[]) => {
      setQueryParams((prev) => {
        if (prev[key] !== newState) {
          return { ...prev, [key]: newState }
        }
        return prev
      })

      const urlParams = new URLSearchParams(window.location.search)

      urlParams.delete(key as string)

      if (newState.length > 0) {
        const uniqueValues = Array.from(new Set(newState))
        uniqueValues.forEach((value) => urlParams.append(key as string, value))
      }

      urlParams.set('page', '1')
      urlParams.set('pageSize', '10')

      setSearchParams({ page: '1', pageSize: '10' })

      Array.from(urlParams.entries()).forEach(([paramKey, paramValue]) => {
        if (!paramValue || paramValue === 'undefined') {
          urlParams.delete(paramKey)
        }
      })

      window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`)
    },
    [setSearchParams] // Tránh re-renders không cần thiết do thay đổi trong `queryParams`
  )

  return [queryParams, updateQueryParams]
}

export default useQueryParamUrl

// const filterData = [
//   {
//     type: "select",
//     name: "authors",
//     label: "Authors",
//     options: [],
//   },
//   {
//     type: "select",
//     name: "assets",
//     label: "Assets",
//     options: [],
//   }
// ]
