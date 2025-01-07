import Sider from 'antd/es/layout/Sider'
import React from 'react'
import SidebarToggle from '../MSidebarToggle'
import { ACustomMenu } from '../../atoms'
import { cn } from '../../../utils'
interface SidebarProps {
  collapsed: boolean
  open?: boolean
  className?: string
  // handleLogout?: () => void
  toggleDrawer?: () => void
  toggleCollapse?: () => void
}
const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  insetInlineStart: 0,
  top: 0,
  zIndex: '1000',
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable'
}
const index: React.FC<SidebarProps> = ({ collapsed, toggleCollapse, className }) => {
  return (
    <Sider
      style={siderStyle}
      className={cn('bg-[#013366] pl-0 w-full h-screen', className)}
      collapsible
      collapsed={collapsed} // Trạng thái thu gọn của Sider
      width={240}
      trigger={null}
    >
      {/* Sidebar Toggle và menu tùy chỉnh */}
      <SidebarToggle collapsed={collapsed} onToggle={toggleCollapse} />
      <ACustomMenu />
    </Sider>
  )
}

export default index
