import { ACCESS_TOKEN } from '../constants'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

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

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args))
}
