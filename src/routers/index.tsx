import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/homepage'
import LoginForm from '../pages/loginpage/Login'
import RequireAuth from '../pages/loginpage/RequireAuth'
import NotFound from '../pages/loginpage/NotFound'
import Dashboard from '../pages/loginpage/Dashboard'
import Post from '../pages/post/Post'

function AppRoutes() {
  return (
    <Routes>
      {/* Route công khai */}
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginForm />} />
      <Route path='/post' element={<Post />} />

      {/* Route bảo vệ */}
      <Route element={<RequireAuth />}>
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>

      {/* Route không tìm thấy */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
