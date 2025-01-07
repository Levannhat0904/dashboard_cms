import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import {
  addTag,
  deleteTag,
  editTag,
  fetchTagById,
  fetchTags,
  FetchTagsParams,
  IFetchTagsResponse,
  ITag
} from '../utils/AxiosApiServiceLogin'

interface TagIdParams {
  id: string
  newData?: ITag
}
export const useTags = (params: FetchTagsParams): UseQueryResult<IFetchTagsResponse> => {
  return useQuery({
    queryKey: ['fetchTags', { ...params }],
    queryFn: () => fetchTags(params),
    staleTime: 5 * 60 * 1000, // 5 phút
    gcTime: 10 * 60 * 1000 // 10 phút
  })
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
    mutationFn: ({ id, newData }: TagIdParams) => editTag(id, newData),
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

export const useFetchTagById = () => {
  // const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id }: TagIdParams) => fetchTagById(id),
    onSuccess: (response) => {
      console.log('thành công:', response.data) // Thành công
    },
    onError: (error: Error) => {
      console.error('Lỗi tag:', error.message) // Lỗi
    },
    onSettled: () => {
      console.log('Quá trình tag đã kết thúc') // Khi quá trình hoàn tất (dù thành công hay thất bại)
    }
  })
}
export const useDeleteTag = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id }: TagIdParams) => deleteTag(id),
    onSuccess: () => {
      // queryClient.invalidateQueries('fetchTags')
      queryClient.invalidateQueries({ queryKey: ['fetchTags'] })
    },
    onError: (error: Error) => {
      console.error('Lỗi khi cập nhật tag:', error.message) // Lỗi
    },
    onSettled: () => {
      console.log('Quá trình cập nhật tag đã kết thúc')
    }
  })
}
