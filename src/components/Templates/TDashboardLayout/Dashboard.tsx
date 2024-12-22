import React, { useState } from 'react'
// const Dashboard: React.FC = () => {
//   return <DashboardLayout></DashboardLayout>
// }
// export default Dashboard
import { Button, Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../organisms/OSidebar'
import { AInputSearch } from '../../atoms'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

const { Header, Content, Footer } = Layout

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [open, setOpen] = useState(false) // Quản lý trạng thái Drawer
  const toggleCollapse = () => {
    console.log('hihi')
    setCollapsed(!collapsed)
  }
  const toggleDrawer = () => {
    console.log('Drawer trạng thái trước:', open)
    setOpen(!open) // Đổi trạng thái Drawer
    console.log('Drawer trạng thái sau:', !open)
  }
  return (
    <Layout style={{ minHeight: '100vh', minWidth: '100vw' }}>
      <Sidebar collapsed={collapsed} open={open} toggleDrawer={toggleDrawer} toggleCollapse={toggleCollapse} />
      <Layout>
        <Header className='bg-white flex justify-center items-center w-full pl-0 pr-0'>
          <div className='flex justify-center items-center h-full'>
            <Button
              type='primary'
              onClick={toggleDrawer}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              className='md:hidden flex ml-2 bg-transparent text-black hover:!bg-transparent hover:!text-black border-none'
            />
          </div>
          <AInputSearch />
        </Header>
        <Content style={{ marginTop: 4, marginLeft: 10, marginRight: 10 }}>
          <div style={{ width: '100%', height: '100%', background: '#f0f2f5' }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}
export default DashboardLayout
