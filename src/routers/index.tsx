import { Routes, Route } from 'react-router-dom'
import { HomePage } from '../components/pages'
import LoginForm from '../components/pages/loginpage/Login'
import RequireAuth from '../components/pages/loginpage/RequireAuth'
import DashboardLayout from '../components/Templates/TDashboardLayout/Dashboard'
import Post from '../components/pages/post'
import AddPost from '../components/pages/post/AddPost'
import EditPost from '../components/pages/post/EditPost'
import NotFound from '../components/pages/loginpage/NotFound'
import User from '../components/pages/user'
// import HomePage from '../pages/homepage'
// import LoginForm from '../pages/loginpage/Login'
// import RequireAuth from '../pages/loginpage/RequireAuth'
// import NotFound from '../pages/loginpage/NotFound'
// import Dashboard from '../pages/Dashboard'
// import Post from '../pages/post'
// import AddPost from '../pages/post/AddPost'
// import EditPost from '../pages/post/EditPost'

function AppRoutes() {
  return (
    <Routes>
      {/* Route công khai */}
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginForm />} />
      {/* Route bảo vệ */}
      <Route element={<RequireAuth />}>
        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route path='post'>
            <Route index element={<Post />} />
            <Route path='addPost' element={<AddPost />} />
            <Route path=':id/edit' element={<EditPost />} />
          </Route>
          <Route path='user'>
            <Route index element={<User />} />
            {/* <Route path='addPost' element={<AddPost />} />
            <Route path=':id/edit' element={<EditPost />} /> */}
          </Route>
        </Route>
      </Route>

      {/* Route không tìm thấy */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
