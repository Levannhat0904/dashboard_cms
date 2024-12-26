import { useQuery } from '@tanstack/react-query'
import { fetchPostsWithAuthors } from '../utils/AxiosApiServiceLogin'

export const usePostsWithAuthors = (page?: number, pageSize?: number, authors?: string[]) => {
  return useQuery({
    queryKey: ['postsWithAuthors', page, pageSize, authors],
    queryFn: () => fetchPostsWithAuthors(page, pageSize, authors),
    staleTime: 5 * 60 * 1000 // 5 phút
    // cacheTime: 10 * 60 * 1000 // 10 phút
  })
}
