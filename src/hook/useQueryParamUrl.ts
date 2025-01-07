import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

function useQueryParamUrl<T extends Record<string, string[]>>(
  initialState: T
): [T, (key: keyof T, newState: string[]) => void] {
  const [queryParams, setQueryParams] = useState<T>(initialState)
  const [searchParams, setSearchParams] = useSearchParams()
  const s = searchParams.get('s') || ''

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
      urlParams.set('s', s)
      setSearchParams({ page: '1', pageSize: '10', s: s })

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
