import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Định nghĩa type cho context
interface SelectedAuthorsContextType {
  selectedAuthors: string[]
  setSelectedAuthors: React.Dispatch<React.SetStateAction<string[]>>
}

// Tạo context với giá trị mặc định là undefined
const SelectedAuthorsContext = createContext<SelectedAuthorsContextType | undefined>(undefined)

// Tạo provider để cung cấp context cho các component con
export const SelectedAuthorsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([])

  // Lấy giá trị từ URL khi trang tải lại
  useEffect(() => {
    const authorsFromUrl = new URLSearchParams(window.location.search).get('authors')
    if (authorsFromUrl) {
      setSelectedAuthors(authorsFromUrl.split(','))
    }
  }, [])

  return (
    <SelectedAuthorsContext.Provider value={{ selectedAuthors, setSelectedAuthors }}>
      {children}
    </SelectedAuthorsContext.Provider>
  )
}

// Tạo hook để dễ dàng sử dụng context trong các component khác
export const useSelectedAuthors = (): SelectedAuthorsContextType => {
  const context = useContext(SelectedAuthorsContext)
  if (!context) {
    throw new Error('useSelectedAuthors must be used within a SelectedAuthorsProvider')
  }
  return context
}
