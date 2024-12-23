import React, { useState } from 'react'
import { Button } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined } from '@ant-design/icons'
import { Header } from 'antd/es/layout/layout'
import { AInputSearch } from '../../atoms'
import { removeAccessToken } from '../../../utils'

// Định nghĩa kiểu cho props
interface HeaderProps {
  toggleDrawer: () => void
  collapsed: boolean
}
// Cập nhật component để nhận props với kiểu đã định nghĩa
const MyHeader: React.FC<HeaderProps> = ({ collapsed, toggleDrawer }) => {
  const handleLogout = () => {
    // Xóa token đăng nhập khỏi localStorage
    removeAccessToken()
    // navigate('/login')\
    window.location.reload()
  }
  return (
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
      <div className='mr-3 text-white  content-center justify-center'>
        <Button onClick={handleLogout}>
          <LogoutOutlined />
        </Button>
      </div>
    </Header>
  )
}

export default MyHeader
