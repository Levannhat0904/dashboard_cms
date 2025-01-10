// import { useState, useEffect, useCallback } from 'react'
// import { useSearchParams } from 'react-router-dom'

// function useQueryParamUrl<T extends Record<string, string[]>>(
//   initialState: T
// ): [T, (key: keyof T, newState: string[]) => void] {
//   const [queryParams, setQueryParams] = useState<T>(initialState)
//   const [searchParams, setSearchParams] = useSearchParams()
//   const s = searchParams.get('s') || ''

//   // Đọc giá trị từ URL query parameter khi component mount
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search)
//     const newQueryParams = { ...initialState }

//     Object.keys(initialState).forEach((key) => {
//       const values = urlParams.getAll(key)
//       if (values.length > 0) {
//         newQueryParams[key] = values
//       }
//     })

//     // Cập nhật queryParams chỉ khi nó thay đổi
//     if (JSON.stringify(newQueryParams) !== JSON.stringify(queryParams)) {
//       setQueryParams(newQueryParams as T)
//     }
//   }, [initialState, queryParams])

//   // Hàm cập nhật state và URL
//   const updateQueryParams = useCallback(
//     (key: keyof T, newState: string[]) => {
//       setQueryParams((prev) => {
//         if (prev[key] !== newState) {
//           return { ...prev, [key]: newState }
//         }
//         return prev
//       })

//       const urlParams = new URLSearchParams(window.location.search)

//       urlParams.delete(key as string)

//       if (newState.length > 0) {
//         const uniqueValues = Array.from(new Set(newState))
//         uniqueValues.forEach((value) => urlParams.append(key as string, value))
//       }

//       setSearchParams({ page: '1', pageSize: '10', s: s })
//       urlParams.set('page', '1')
//       urlParams.set('pageSize', '10')
//       urlParams.set('s', s)

//       Array.from(urlParams.entries()).forEach(([paramKey, paramValue]) => {
//         if (!paramValue || paramValue === 'undefined') {
//           urlParams.delete(paramKey)
//         }
//       })

//       window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`)
//     },
//     [setSearchParams] // Tránh re-renders không cần thiết do thay đổi trong `queryParams`
//   )

//   return [queryParams, updateQueryParams]
// }

// export default useQueryParamUrl
// ok
// import { useState, useEffect, useCallback } from 'react';
// import { useSearchParams } from 'react-router-dom';

// type QueryParams<T> = T & { page: number; pageSize: number; s: string };

// function useQueryParams<T extends Record<string, string[]>>(
//   initialState: T,
//   defaultPage: number = 1,
//   defaultPageSize: number = 10
// ): [QueryParams<T>, (key: keyof T, newState: string[]) => void] {
//   const [queryParams, setQueryParams] = useState<QueryParams<T>>({
//     ...initialState,
//     page: defaultPage,
//     pageSize: defaultPageSize,
//     s: '',
//   });
//   const [searchParams] = useSearchParams();

//   // Lấy giá trị từ URL khi component mount
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const newQueryParams = { ...initialState };
//     Object.keys(initialState).forEach((key) => {
//       const values = urlParams.getAll(key);
//       if (values.length > 0) {
//         newQueryParams[key] = values;
//       }
//     });

//     // Lấy các giá trị `page`, `pageSize`, `s` từ URL
//     const page = parseInt(urlParams.get('page') || `${defaultPage}`, 10);
//     const pageSize = parseInt(urlParams.get('pageSize') || `${defaultPageSize}`, 10);
//     const s = urlParams.get('s') || '';
//     // Cập nhật queryParams chỉ khi có thay đổi
//     setQueryParams((prevParams) => {
//       const updatedParams: QueryParams<T> = {
//         ...newQueryParams,
//         page,
//         pageSize,
//         s,
//       };
//       return JSON.stringify(updatedParams) !== JSON.stringify(prevParams) ? updatedParams : prevParams;
//     });
//   }, [initialState, defaultPage, defaultPageSize]);
//   console.log(queryParams)
//   // Hàm để cập nhật state và URL
//   const updateQueryParams = useCallback(
//     (key: keyof T, newState: string[]) => {
//       setQueryParams((prev) => ({ ...prev, [key]: newState }));
//       const urlParams = new URLSearchParams(window.location.search)
//       // Xóa các giá trị cũ và thêm giá trị mới
//       urlParams.delete(key as string);
//       newState.forEach((value) => urlParams.append(key as string, value));

//       // Đảm bảo các giá trị `page`, `pageSize`, `s` được đồng bộ
//       urlParams.set('page', `${defaultPage}`);
//       urlParams.set('pageSize', `${defaultPageSize}`);
//       urlParams.set('s', searchParams.get('s') || '');
//       // Cập nhật URL
//       window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
//     },
//     [defaultPage, defaultPageSize, searchParams]
//   );

//   return [queryParams, updateQueryParams];
// }

// export default useQueryParams;

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

type QueryParams<T> = T & { page: number; pageSize: number; s: string }

function useQueryParams<T extends Record<string, string[]>>(
  initialState: T,
  defaultPage: number = 1,
  defaultPageSize: number = 10
): [QueryParams<T>, (key: keyof T, newState: string[]) => void] {
  const [searchParams] = useSearchParams()

  // Hàm xử lý giá trị khởi tạo từ URL
  const getInitialQueryParams = (): QueryParams<T> => {
    const urlParams = new URLSearchParams(window.location.search)
    const parsedParams: Partial<QueryParams<T>> = { ...initialState }
    // Lấy tất cả key-value từ URL
    for (const key of Object.keys(initialState)) {
      const values = urlParams.getAll(key)
      if (values.length > 0) {
        parsedParams[key] = values // Ép kiểu
      }
    }
    // Lấy các giá trị `page`, `pageSize`, và `s`
    parsedParams.page = parseInt(urlParams.get('page') || `${defaultPage}`, 10)
    parsedParams.pageSize = parseInt(urlParams.get('pageSize') || `${defaultPageSize}`, 10)
    parsedParams.s = urlParams.get('s') || ''

    return parsedParams as QueryParams<T>
  }

  // Khởi tạo `queryParams` từ URL
  const [queryParams, setQueryParams] = useState<QueryParams<T>>(getInitialQueryParams)

  // Đồng bộ state với URL khi URL thay đổi
  useEffect(() => {
    const updatedQueryParams = getInitialQueryParams()

    setQueryParams((prevParams) =>
      JSON.stringify(updatedQueryParams) !== JSON.stringify(prevParams) ? updatedQueryParams : prevParams
    )
  }, [searchParams, initialState, defaultPage, defaultPageSize])
  const updateQueryParams = useCallback(
    (key: keyof T, newState: string[]) => {
      setQueryParams((prev) => ({ ...prev, [key]: newState }))
      const urlParams = new URLSearchParams(window.location.search)
      // Xóa các giá trị cũ và thêm giá trị mới
      urlParams.delete(key as string)
      newState.forEach((value) => urlParams.append(key as string, value))

      // Đảm bảo các giá trị `page`, `pageSize`, `s` được đồng bộ
      urlParams.set('page', `${defaultPage}`)
      urlParams.set('pageSize', `${defaultPageSize}`)
      urlParams.set('s', searchParams.get('s') || '')
      // Cập nhật URL
      window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`)
    },
    [defaultPage, defaultPageSize, searchParams]
  )
  return [queryParams, updateQueryParams]
}

export default useQueryParams
