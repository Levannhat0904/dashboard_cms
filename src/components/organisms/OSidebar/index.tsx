import { Drawer, Layout } from 'antd'
import { MCustomMenu, SidebarToggle } from '../../molecules'
interface SidebarProps {
  collapsed: boolean
  open: boolean
  toggleDrawer: () => void
  toggleCollapse: () => void
}
const { Sider } = Layout
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
        </Sider>
      </Drawer>

      {/* Sider cho web (hiển thị trên màn hình lớn) */}
      <Sider
        className='bg-[#013366] w-full md:block hidden'
        collapsible
        collapsed={collapsed} // Trạng thái thu gọn của Sider
        width={240}
        trigger={null}
      >
        {/* Sidebar Toggle và menu tùy chỉnh */}
        <SidebarToggle collapsed={collapsed} onToggle={toggleCollapse} />
        <MCustomMenu />
      </Sider>
    </>
  )
}
export default Sidebar
