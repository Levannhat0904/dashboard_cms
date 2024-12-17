import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'

const RequireAuth = () => {
  const { isLoggedIn } = useAuthContext()
  const location = useLocation()
  if (isLoggedIn === undefined) {
    // Chưa có trạng thái đăng nhập, có thể hiện thông báo loading hoặc chờ đợi
    return <div>Loading...</div>
  }
  if (!isLoggedIn) {
    // Nếu chưa đăng nhập, chuyển hướng đến trang login
    return <Navigate to='/login' state={{ from: location }} replace />
  }
  return <Outlet /> // Nếu đã đăng nhập, render các route con
}

export default RequireAuth
