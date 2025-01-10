import { useMutation } from '@tanstack/react-query'
import { uploadImage } from '../api/img'

export const useUploadImage = () => {
  return useMutation({
    mutationFn: uploadImage, // Hàm thực hiện upload ảnh
    onSuccess: (url) => {},
    onError: (error: Error) => {
      console.error('Lỗi tải ảnh:', error.message) // Lỗi
    },
    onSettled: () => {}
  })
}
