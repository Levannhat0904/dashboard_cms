import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { ErrorResponse, fetchPosts, IFetchPostsResponse } from '../utils/AxiosApiServiceLogin'

export const usePosts = (page?: number, pageSize?: number, authors?: string[]): UseQueryResult<IFetchPostsResponse> => {
  return useQuery({
    queryKey: ['postsWithAuthors', page, pageSize, authors],
    queryFn: () => fetchPosts(page, pageSize, authors),
    staleTime: 5 * 60 * 1000, // 5 phút
    gcTime: 10 * 60 * 1000 // 10 phút
  })
}
// export const useAuthors = (page?: number, pageSize?: number, authors?: string[]) => {
//   return useQuery({
//     queryKey: ['postsWithAuthors', page, pageSize, authors],
//     queryFn: () => fetchPosts(page, pageSize, authors),
//     staleTime: 5 * 60 * 1000 // 5 phút
//     // cacheTime: 10 * 60 * 1000 // 10 phút
//   })
// }
