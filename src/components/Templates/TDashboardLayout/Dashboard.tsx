import React, { useState } from 'react'
// const Dashboard: React.FC = () => {
//   return <DashboardLayout></DashboardLayout>
// }
// export default Dashboard
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
  console.log(location.pathname)
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

{
  /* <Header className='bg-white flex justify-center items-center w-full pl-0 pr-0'>
  <div className='flex justify-center items-center h-full'>
    <Button
      type='primary'
      onClick={toggleDrawer}
      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      className='md:hidden flex ml-2 bg-transparent text-black hover:!bg-transparent hover:!text-black border-none'
    />
  </div>
  <AInputSearch />
  <div className='mr-3 text-white  content-center justify-center'>
    <Button>
      <LogoutOutlined />
    </Button>
  </div>
</Header> */
}
