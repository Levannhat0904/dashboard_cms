import Sider from 'antd/es/layout/Sider'
import React from 'react'
import SidebarToggle from '../MSidebarToggle'
import { MCustomMenu } from '..'
// import { SidebarToggle } from '../../molecules'
interface SidebarProps {
  collapsed: boolean
  open: boolean
  toggleDrawer: () => void
  toggleCollapse: () => void
}
const index: React.FC<SidebarProps> = ({ collapsed, toggleCollapse }) => {
  return (
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
      <SidebarToggle collapsed={collapsed} onToggle={toggleCollapse} />
    </Sider>
  )
}

export default index
