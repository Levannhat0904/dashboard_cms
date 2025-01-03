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

export function createSlug(input: string): string {
  return input
    .toLowerCase() // Chuyển toàn bộ chuỗi sang chữ thường
    .trim() // Loại bỏ khoảng trắng ở đầu và cuối
    .replace(/đ/g, 'd') // Thay thế 'đ' bằng 'd' để đảm bảo không bị mất
    .normalize('NFD') // Chuẩn hóa chuỗi (loại bỏ dấu tiếng Việt)
    .replace(/[\u0300-\u036f]/g, '') // Loại bỏ các ký tự dấu (chỉ những dấu không ảnh hưởng đến các ký tự gốc)
    .replace(/[^a-z0-9\s-]/g, '') // Loại bỏ các ký tự không hợp lệ
    .replace(/\s+/g, '-') // Thay khoảng trắng bằng dấu gạch ngang
    .replace(/-+/g, '-') // Loại bỏ các dấu gạch ngang thừa
}
export const validateSlug = (_, value) => {
  if (!value) {
    return Promise.reject(new Error(''))
  }
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  // Kiểm tra giá trị gốc trước khi chuẩn hóa
  if (!slugPattern.test(value)) {
    return Promise.reject(new Error('Slug chỉ được chứa các ký tự chữ thường, số và dấu gạch ngang'))
  }
  // Sau đó mới gọi hàm createSlug để chuẩn hóa giá trị
  const slug = createSlug(value)
  if (!slugPattern.test(slug)) {
    return Promise.reject(new Error('Slug chỉ được chứa các ký tự chữ thường, số và dấu gạch ngang'))
  }
  return Promise.resolve()
}
