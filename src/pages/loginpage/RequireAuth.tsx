import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'

const RequireAuth = () => {
  const { isLoggedIn } = useAuthContext()
  const location = useLocation()
  if (isLoggedIn === undefined) {
    return <div>Loading...</div>
  }
  if (!isLoggedIn) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }
  return <Outlet />
}

export default RequireAuth
