import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { getAccessToken, removeAccessToken, setAccessToken } from '../utils'

interface AuthContextType {
  accessToken: string
  setAccessToken: (token: string) => void
  login: (token: string) => void
  logout: () => void
  isLoggedIn: boolean | undefined // Để xử lý bất đồng bộ, trạng thái có thể là undefined trong lúc chưa kiểm tra xong
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessTokenState] = useState<string>('')
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined) // Chứa trạng thái đăng nhập, ban đầu là undefined

  // Kiểm tra token trong localStorage và cập nhật isLoggedIn bất đồng bộ
  useEffect(() => {
    const fetchAccessToken = async () => {
      const storedToken = await getAccessToken() // Giả sử `getAccessToken` trả về Promise
      if (storedToken) {
        setAccessTokenState(storedToken)
        setIsLoggedIn(true) // Đăng nhập thành công
      } else {
        setIsLoggedIn(false) // Không có token, không đăng nhập
      }
    }
    fetchAccessToken()
  }, [])

  const login = (token: string) => {
    setAccessTokenState(token)
    setAccessToken(token) // Lưu token vào localStorage
    setIsLoggedIn(true) // Đánh dấu là đã đăng nhập
  }

  const logout = () => {
    setAccessTokenState('')
    removeAccessToken() // Xóa token khỏi localStorage
    setIsLoggedIn(false) // Đánh dấu là đã đăng xuất
  }

  const value = {
    accessToken,
    setAccessToken: setAccessTokenState,
    login,
    logout,
    isLoggedIn
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
