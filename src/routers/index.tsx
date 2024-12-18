import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/homepage'
import LoginForm from '../pages/loginpage/Login'
import RequireAuth from '../pages/loginpage/RequireAuth'
import NotFound from '../pages/loginpage/NotFound'
import Dashboard from '../pages/post/Dashboard'
import Post from '../pages/post'
import AddPost from '../pages/post/AddPost'
import EditPost from '../pages/post/EditPost'
import DeletePost from '../pages/post/DeletePost'

function AppRoutes() {
  return (
    <Routes>
      {/* Route công khai */}
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginForm />} />
      {/* <Route path='/post' element={<Post />} /> */}
      {/* <Route path='/dashboard' element={<AddPost />} /> */}

      {/* Route bảo vệ */}
      <Route element={<RequireAuth />}>
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='post'>
            <Route index element={<Post />} />
            <Route path='addPost' element={<AddPost />} />
            <Route path=':id/edit' element={<EditPost />} />
            <Route path=':id/delete' element={<DeletePost />} />
          </Route>
        </Route>
      </Route>

      {/* Route không tìm thấy */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
