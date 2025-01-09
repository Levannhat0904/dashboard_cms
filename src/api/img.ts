import client from './client'

export const uploadImage = async (file: File): Promise<string> => {
  try {
    // Tạo FormData và thêm file vào với key là 'image'
    const formData = new FormData()
    formData.append('image', file)

    // Gửi request POST với formData
    const config = { headers: { 'content-type': 'multipart/form-data' } }
    const response = await client.post('/api/v1/cms/commons/upload-images', formData, config)

    // Trả về URL ảnh từ dữ liệu trả về
    return response.data.data.url // URL ảnh sau khi upload thành công
  } catch (error) {
    console.error('Lỗi khi tải ảnh lên:', error)
    throw new Error('Tải ảnh thất bại')
  }
}
