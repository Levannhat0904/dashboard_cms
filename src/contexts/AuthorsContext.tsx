import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { IAsset, IAuthor, ISector } from '../interfaces'
import { getSectors } from '../api/sector'
import { getUserInfo } from '../api/author'
import { getAssets } from '../api/asset'

// Định nghĩa type cho context
interface AuthorsContextType {
  authors?: IAuthor[] // Hoặc định nghĩa kiểu dữ liệu tác giả nếu cần
  setAuthors: React.Dispatch<React.SetStateAction<IAuthor[]>>
  sectors?: IAuthor[] // Hoặc định nghĩa kiểu dữ liệu tác giả nếu cần
  setSectors: React.Dispatch<React.SetStateAction<ISector[]>>
  assets?: IAuthor[] // Hoặc định nghĩa kiểu dữ liệu tác giả nếu cần
  setAssets: React.Dispatch<React.SetStateAction<ISector[]>>
}

// Tạo context với giá trị mặc định là undefined
const AuthorsContext = createContext<AuthorsContextType | undefined>(undefined)

// Tạo provider để cung cấp context cho các component con
export const AuthorsProvider = ({ children }: { children: ReactNode }) => {
  const [authors, setAuthors] = useState<IAuthor[]>([])
  const [sectors, setSectors] = useState<ISector[]>([])
  const [assets, setAssets] = useState<IAsset[]>([])

  // Hàm gọi API lấy danh sách tác giả
  const fetchSectors = async () => {
    try {
      // const response = await getPostsByAuthor() // Giả sử đây là API lấy danh sách tác giả
      const response = await getSectors() // Giả sử đây là API lấy danh sách tác giả
      setSectors(response.data)
    } catch (error) {
      console.error('Lỗi khi lấy sector:', error)
    }
  }
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
  const fetchAssets = async () => {
    try {
      const response = await getAssets()
      setAssets(response.data)
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu assets:', error)
    }
  }
  // Gọi hàm fetchAuthors khi component được mount
  useEffect(() => {
    fetchAuthors()
    fetchSectors()
    fetchAssets()
  }, [])

  return (
    <AuthorsContext.Provider value={{ setAssets, assets, authors, setAuthors, sectors, setSectors }}>
      {children}
    </AuthorsContext.Provider>
  )
}

// Tạo hook để dễ dàng sử dụng context trong các component khác
export const useAuthors = (): AuthorsContextType => {
  const context = useContext(AuthorsContext)
  if (!context) {
    throw new Error('useAuthors must be used within an AuthorsProvider')
  }
  return context
}
