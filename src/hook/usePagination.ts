import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCallback } from 'react'

interface Meta {
  page: number
  pageSize: number
  total: number
  s: string
}

const usePagination = (initialMeta: Meta) => {
  const [meta, setMeta] = useState<Meta>(initialMeta)
  const [searchParams, setSearchParams] = useSearchParams()

  const handleOnPageChange = async (page: number, pageSize: number) => {
    if (meta.page === page && meta.pageSize === pageSize) return

    setMeta((prevMeta) => ({
      ...prevMeta,
      page,
      pageSize
    }))

    const newParams = new URLSearchParams(searchParams)
    newParams.set('page', page.toString())
    newParams.set('pageSize', pageSize.toString())
    // Cập nhật URL
    setSearchParams(newParams)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return {
    // meta,
    handleOnPageChange
  }
}

export const usePaginationV2 = (defaultPage: number = 1, defaultPageSize: number = 10) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleOnPageChange = useCallback(
    (page: number = defaultPage, pageSize: number = defaultPageSize) => {
      const newParams = new URLSearchParams(searchParams)
      newParams.set('page', page.toString())
      newParams.set('pageSize', pageSize.toString())
      setSearchParams(newParams)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [defaultPage, defaultPageSize, searchParams, setSearchParams]
  )

  return {
    handleOnPageChange
  }
}

export default usePagination
