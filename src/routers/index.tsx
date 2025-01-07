import { useRoutes } from 'react-router-dom'
import { HomePage } from '../components/pages'
import LoginForm from '../components/pages/loginpage/Login'
import RequireAuth from '../components/pages/loginpage/RequireAuth'
import DashboardLayout from '../components/Templates/TDashboardLayout/Dashboard'
import NotFound from '../components/pages/loginpage/NotFound'
// import TestPost from '../components/pages/post/TestPost'
import Test_A from '../Test_A'
import Tag from '../components/pages/tag'
import PPost from '../components/pages/post'
import AddTag from '../components/pages/tag/AddTag'
import EditTag from '../components/pages/tag/EditTag'
export const routes = [
  // Route công khai
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <LoginForm /> },
  { path: '/test', element: <Test_A /> },

  // Route bảo vệ
  {
    element: <RequireAuth />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          {
            path: 'post',
            element: <PPost />,
            index: true // Điều này giúp xác định route mặc định
          },
          {
            path: 'tag',
            element: <Tag />,
            index: true // Route chính cho tag
          },
          {
            path: 'tag/addTag',
            element: <AddTag />
          },
          {
            path: 'tag/edit/:id',
            element: <EditTag />
          },
          {
            path: 'user',
            element: <div>User Page</div> // Tạo route cho User, ví dụ là placeholder
          }
        ]
      }
    ]
  },

  // Route không tìm thấy
  { path: '*', element: <NotFound /> }
]
function AppRoutes() {
  return useRoutes(routes) // Hook dùng để áp dụng các route đã cấu hình
}

export default AppRoutes
