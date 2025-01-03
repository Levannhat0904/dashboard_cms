import { useCallback } from 'react'
import { debounce } from 'lodash'

interface UseDebouncedSearchOptions {
  delay?: number
  defaultPageSize?: number
}

const useDebouncedSearch = (
  setSearchParams: (params: Record<string, string>) => void,
  options?: UseDebouncedSearchOptions
) => {
  const { delay = 1000, defaultPageSize = 10 } = options || {}

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchParams({
        page: '1',
        pageSize: defaultPageSize.toString(),
        s: value
      })
    }, delay),
    [setSearchParams, defaultPageSize, delay]
  )

  const handleInputSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value)
  }

  return handleInputSearchChange
}

export default useDebouncedSearch
