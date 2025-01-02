import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { fetchPosts, FetchPostsParams, fetchPostsV2, IFetchPostsResponse } from '../utils/AxiosApiServiceLogin'

export const usePosts = (page?: number, pageSize?: number, authors?: string[]): UseQueryResult<IFetchPostsResponse> => {
  return useQuery({
    queryKey: ['postsWithAuthors', page, pageSize, authors],
    queryFn: () => fetchPosts(page, pageSize, authors),
    staleTime: 5 * 60 * 1000, // 5 phút
    gcTime: 10 * 60 * 1000 // 10 phút
  })
}
// Custom hook sử dụng React Query
export const usePostsV2 = (params: FetchPostsParams): UseQueryResult<IFetchPostsResponse> => {
  return useQuery({
    queryKey: ['postsWithAuthorsV2', { ...params }],
    queryFn: () => fetchPostsV2(params),
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
