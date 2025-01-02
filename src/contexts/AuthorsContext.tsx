import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getUserInfo } from '../utils/AxiosApiServiceLogin'

// Định nghĩa type cho context
interface AuthorsContextType {
  authors: string[] // Hoặc định nghĩa kiểu dữ liệu tác giả nếu cần
  setAuthors: React.Dispatch<React.SetStateAction<string[]>>
}

// Tạo context với giá trị mặc định là undefined
const AuthorsContext = createContext<AuthorsContextType | undefined>(undefined)

// Tạo provider để cung cấp context cho các component con
export const AuthorsProvider = ({ children }: { children: ReactNode }) => {
  const [authors, setAuthors] = useState<string[]>([])

  // Hàm gọi API lấy danh sách tác giả
  const fetchAuthors = async () => {
    try {
      // const response = await getPostsByAuthor() // Giả sử đây là API lấy danh sách tác giả
      const response = await getUserInfo() // Giả sử đây là API lấy danh sách tác giả
      setAuthors(response.data)
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu tác giả:', error)
    }
  }
  // console.log('>>>>>>>>>>Post: ', authors)

  // Gọi hàm fetchAuthors khi component được mount
  useEffect(() => {
    fetchAuthors()
  }, [])

  return <AuthorsContext.Provider value={{ authors, setAuthors }}>{children}</AuthorsContext.Provider>
}

// Tạo hook để dễ dàng sử dụng context trong các component khác
export const useAuthors = (): AuthorsContextType => {
  const context = useContext(AuthorsContext)
  if (!context) {
    throw new Error('useAuthors must be used within an AuthorsProvider')
  }
  return context
}
