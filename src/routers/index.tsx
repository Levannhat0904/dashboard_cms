import { Routes, Route } from 'react-router-dom'
import { HomePage } from '../components/pages'
import LoginForm from '../components/pages/loginpage/Login'
import RequireAuth from '../components/pages/loginpage/RequireAuth'
import DashboardLayout from '../components/Templates/TDashboardLayout/Dashboard'
import NotFound from '../components/pages/loginpage/NotFound'
// import TestPost from '../components/pages/post/TestPost'
import Test_A from '../Test_A'
import TestLogin from '../components/pages/loginpage/TestLogin'
import TestPostL1 from '../components/pages/post/TestPostL1'
import PPost from '../components/pages/post'

function AppRoutes() {
  return (
    <Routes>
      {/* Route công khai */}
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginForm />} />
      <Route path='/test' element={<Test_A />} />
      {/* Route bảo vệ */}
      <Route element={<RequireAuth />}>
        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route path='post'>
            <Route index element={<PPost />} />
            {/* <Route path='TestPost' element={<TestPost />} /> */}
            <Route path='TestPostL1' element={<TestPostL1 />} />
            {/* <Route path='addPost' element={<AddPost />} /> */}
            {/* <Route path=':id/edit' element={<EditPost />} /> */}
          </Route>
          <Route path='user'>
            {/* <Route index element={<User />} /> */}
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
