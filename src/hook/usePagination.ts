import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCallback } from 'react'

// interface Meta {
//   page: number
//   pageSize: number
//   total: number
//   s: string
// }

// const usePagination = (initialMeta: Meta) => {
//   const [meta, setMeta] = useState<Meta>(initialMeta)
//   const [searchParams, setSearchParams] = useSearchParams()

//   const handleOnPageChange = async (page: number, pageSize: number) => {
//     if (meta.page === page && meta.pageSize === pageSize) return

//     setMeta((prevMeta) => ({
//       ...prevMeta,
//       page,
//       pageSize
//     }))

//     const newParams = new URLSearchParams(searchParams)
//     newParams.set('page', page.toString())
//     newParams.set('pageSize', pageSize.toString())
//     // Cập nhật URL
//     setSearchParams(newParams)
//     window.scrollTo({ top: 0, behavior: 'smooth' })
//   }

//   return {
//     // meta,
//     handleOnPageChange
//   }
// }

// export const usePaginationV2 = (defaultPage: number = 1, defaultPageSize: number = 10) => {
//   const [searchParams, setSearchParams] = useSearchParams()
//   console.log("searchParams: ", searchParams)
//   const handleOnPageChange = useCallback(
//     (page: number = defaultPage, pageSize: number = defaultPageSize) => {
//       const newParams = new URLSearchParams(searchParams)
//       newParams.set('page', page.toString())
//       newParams.set('pageSize', pageSize.toString())
//       setSearchParams(newParams)
//       window.scrollTo({ top: 0, behavior: 'smooth' })
//     },
//     [defaultPage, defaultPageSize, searchParams, setSearchParams]
//   )

//   return {
//     handleOnPageChange
//   }
// }
// export const usePaginationV2 = (defaultPage: number = 1, defaultPageSize: number = 10) => {
//   const [searchParams, setSearchParams] = useSearchParams();

//   const handleOnPageChange = useCallback(
//     (page: number = defaultPage, pageSize: number = defaultPageSize) => {
//       // Lấy tất cả các tham số hiện tại từ URL
//       const newParams = new URLSearchParams(searchParams.toString());

//       // Cập nhật lại các tham số liên quan đến phân trang
//       newParams.set('page', page.toString());
//       newParams.set('pageSize', pageSize.toString());

//       // Giữ nguyên tất cả các tham số hiện tại
//       setSearchParams(newParams);

//       // Cuộn lên đầu trang
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     },
//     [defaultPage, defaultPageSize, searchParams, setSearchParams] // Các phụ thuộc cần thiết
//   );

//   return {
//     handleOnPageChange,
//   };
// };


export const usePaginationV2 = (defaultPage: number = 1, defaultPageSize: number = 10) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOnPageChange = (page: number = defaultPage, pageSize: number = defaultPageSize) => {
    // Lấy tất cả các tham số hiện tại từ URL
    // const updatedParams = new URLSearchParams(searchParams);
    const updatedParams = new URLSearchParams(window.location.search)
    // Cập nhật lại tham số page và pageSize, giữ nguyên các tham số khác
    updatedParams.set('page', page.toString());
    updatedParams.set('pageSize', pageSize.toString());

    // Cập nhật các tham số mới vào URL
    setSearchParams(updatedParams);

    // Cuộn lên đầu trang
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    handleOnPageChange,
  };
};



// export default usePagination
