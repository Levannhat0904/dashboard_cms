import { Drawer } from 'antd'
import { SiderNav } from '../../molecules'
interface SidebarProps {
  collapsed: boolean
  open: boolean
  toggleDrawer: () => void
  toggleCollapse: () => void
}
const Sidebar: React.FC<SidebarProps> = ({ collapsed, open, toggleDrawer, toggleCollapse }) => {
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
        <SiderNav collapsed={collapsed} toggleCollapse={toggleCollapse} />
      </Drawer>
      {/* Sider cho web (hiển thị trên màn hình lớn) */}
      <SiderNav collapsed={collapsed} toggleCollapse={toggleCollapse} className='md:block hidden h-auto' />
    </>
  )
}
export default Sidebar
