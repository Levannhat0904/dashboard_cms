import { useMutation } from '@tanstack/react-query'
import { uploadImage } from '../utils/AxiosApiServiceLogin'

export const useUploadImage = () => {
  return useMutation({
    mutationFn: uploadImage, // Hàm thực hiện upload ảnh
    onSuccess: (url) => {
      console.log('Ảnh đã tải lên thành công:', url) // Thành công
    },
    onError: (error: Error) => {
      console.error('Lỗi tải ảnh:', error.message) // Lỗi
    },
    onSettled: () => {
      console.log('Quá trình tải ảnh đã kết thúc') // Khi quá trình hoàn tất
    }
  })
}
