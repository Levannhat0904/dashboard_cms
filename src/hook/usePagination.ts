import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

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

export default usePagination
