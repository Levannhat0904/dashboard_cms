import React, { useState } from 'react'
import { Layout } from 'antd'
import Sidebar from '../../organisms/OSidebar'
import { MContent, MFooter, MHeader } from '../../molecules'
const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [open, setOpen] = useState(false) // Quản lý trạng thái Drawer
  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }
  const toggleDrawer = () => {
    console.log('Drawer trạng thái trước:', open)
    setOpen(!open) // Đổi trạng thái Drawer
    console.log('Drawer trạng thái sau:', !open)
  }
  // console.log(location.pathname)
  return (
    <Layout style={{ minHeight: '100vh', minWidth: '100vw' }}>
      <Sidebar collapsed={collapsed} open={open} toggleDrawer={toggleDrawer} toggleCollapse={toggleCollapse} />
      <Layout>
        <MHeader toggleDrawer={toggleDrawer} collapsed={collapsed} />
        <MContent />
        <MFooter />
      </Layout>
    </Layout>
  )
}
export default DashboardLayout
