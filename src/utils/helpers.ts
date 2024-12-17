import { ACCESS_TOKEN } from '../constants'

export const getAccessToken = () => {
  return localStorage.getItem('accessToken') || '' // Hoặc giá trị mặc định khác
}
// Hàm lưu accessToken vào localStorage
export const setAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN, token)
}
// Hàm xóa accessToken khỏi localStorage
export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN)
}
