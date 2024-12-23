import { Button, Drawer, Layout } from 'antd'
import { MCustomMenu, SidebarToggle } from '../../molecules'
import { LogoutOutlined } from '@ant-design/icons'
import { Footer } from 'antd/es/layout/layout'
import { removeAccessToken } from '../../../utils'
import { Navigate, useNavigate } from 'react-router-dom'
interface SidebarProps {
  collapsed: boolean
  open: boolean
  toggleDrawer: () => void
  toggleCollapse: () => void
}
const { Sider } = Layout
const Sidebar: React.FC<SidebarProps> = ({ collapsed, open, toggleDrawer, toggleCollapse }) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    // Xóa token đăng nhập khỏi localStorage
    removeAccessToken()
    // navigate('/login')\
    window.location.reload()
  }
  return (
    <>
      {/* Drawer cho mobile */}
      <Drawer
        placement='left'
        closable={false}
        onClose={toggleDrawer}
        open={open} // Trạng thái Drawer
        key='left'
        width={240} // Chiều rộng Drawer
        className='!p-0'
        styles={{ body: { padding: 0 } }}
      >
        <Sider
          className='bg-[#013366] pl-0 w-full h-full'
          collapsible
          collapsed={collapsed} // Trạng thái thu gọn của Sider
          width={240}
          trigger={null}
        >
          {/* Sidebar Toggle và menu tùy chỉnh */}
          <SidebarToggle collapsed={collapsed} onToggle={toggleCollapse} />
          <MCustomMenu />
          {/* <div className='fixed bottom-2'>
            <SidebarToggle collapsed={collapsed} onToggle={toggleCollapse} />
          </div> */}
          {/* <SidebarToggle collapsed={collapsed} onToggle={toggleCollapse} /> */}
        </Sider>
      </Drawer>

      {/* Sider cho web (hiển thị trên màn hình lớn) */}
      <Sider
        className='bg-[#013366] w-full md:block hidden relative'
        collapsible
        collapsed={collapsed} // Trạng thái thu gọn của Sider
        width={240}
        trigger={null}
      >
        {/* Sidebar Toggle và menu tùy chỉnh */}
        <SidebarToggle collapsed={collapsed} onToggle={toggleCollapse} />
        <MCustomMenu />
        <div className='top-0 text-white flex content-center justify-center'>
          <Button onClick={handleLogout}>
            Logout <LogoutOutlined />
          </Button>
        </div>
      </Sider>
    </>
  )
}
export default Sidebar
