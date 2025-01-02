import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import {
  addTag,
  deleteTag,
  editTag,
  fetchTags,
  FetchTagsParams,
  IFetchTagsResponse
} from '../utils/AxiosApiServiceLogin'

// export const useTags = (params: FetchTagsParams): UseQueryResult<IFetchTagsResponse> => {
//   return useQuery({
//     queryKey: ['fetchTags', { ...params }],
//     queryFn: () => fetchTags(params),
//     staleTime: 5 * 60 * 1000, // 5 phút
//     gcTime: 10 * 60 * 1000 // 10 phút
//   })
// }
export const useTags = (params: FetchTagsParams): UseQueryResult<IFetchTagsResponse> => {
  const { refetch, ...queryResult } = useQuery({
    queryKey: ['fetchTags', { ...params }],
    queryFn: () => fetchTags(params),
    staleTime: 5 * 60 * 1000, // 5 phút
    gcTime: 10 * 60 * 1000, // 10 phút
  })

  // Bạn có thể trả về refetch để gọi lại khi cần
  return { ...queryResult, refetch }
}
export const useAddTag = () => {
  return useMutation({
    mutationFn: addTag, // Hàm thực hiện thêm tag
    onSuccess: (response) => {
      console.log('Tag đã được thêm thành công:', response.data) // Thành công
    },
    onError: (error: Error) => {
      console.error('Lỗi khi thêm tag:', error.message) // Lỗi
    },
    onSettled: () => {
      console.log('Quá trình thêm tag đã kết thúc') // Khi quá trình hoàn tất (dù thành công hay thất bại)
    }
  })
}
export const useUpdateTag = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, newData }) => editTag(id, newData),
    onSuccess: (response) => {
      console.log('Tag đã được cập nhật thành công:', response.data) // Thành công
      queryClient.invalidateQueries({ queryKey: ['fetchTags'] })
    },
    onError: (error: Error) => {
      console.error('Lỗi khi cập nhật tag:', error.message) // Lỗi
    },
    onSettled: () => {
      console.log('Quá trình cập nhật tag đã kết thúc') // Khi quá trình hoàn tất (dù thành công hay thất bại)
    }
  })
}
export const useDeleteTag = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id }) => deleteTag(id),
    onSuccess: () => {
      queryClient.invalidateQueries('fetchTags')
    },
    onError: (error: Error) => {
      console.error('Lỗi khi cập nhật tag:', error.message) // Lỗi
    },
    onSettled: () => {
      console.log('Quá trình cập nhật tag đã kết thúc')
    }
  })
}
