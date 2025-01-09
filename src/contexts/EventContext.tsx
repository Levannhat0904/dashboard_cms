import React, { createContext, useState, useContext, ReactNode } from 'react'

// Định nghĩa kiểu dữ liệu cho context
interface EvenEditContextType {
  isEdit: boolean
  setIsEdit: (value: boolean) => void
  isOpenNotify: boolean
  setIsOpenNotify: (value: boolean) => void
  path: string
  setPath: (value: string) => void
}

// Tạo context với kiểu dữ liệu đã định nghĩa
const EvenEditContext = createContext<EvenEditContextType | undefined>(undefined)

// Tạo provider để bao quanh các component cần truy cập context
interface EvenEditProviderProps {
  children: ReactNode
}
export const EvenEditProvider: React.FC<EvenEditProviderProps> = ({ children }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isOpenNotify, setIsOpenNotify] = useState<boolean>(false)
  const [path, setPath] = useState<string>('')

  return (
    <EvenEditContext.Provider value={{ path, setPath, isOpenNotify, setIsOpenNotify, isEdit, setIsEdit }}>
      {children}
    </EvenEditContext.Provider>
  )
}

// Custom hook để dễ dàng sử dụng context trong các component con
export const useEvenEdit = (): EvenEditContextType => {
  const context = useContext(EvenEditContext)
  if (!context) {
    throw new Error('useEvenEdit must be used within an EvenEditProvider')
  }
  return context
}
