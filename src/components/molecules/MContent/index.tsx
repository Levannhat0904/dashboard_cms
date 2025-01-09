import { Content } from 'antd/es/layout/layout'
import React from 'react'
import { Outlet } from 'react-router-dom'
import DynamicBreadcrumb from '../../Templates/DynamicBreadcrumb'
import NNotify from '../../atoms/NNotify'

const index = () => {
  return (
    <Content style={{}}>
      <div style={{ width: '100%', height: '100%', background: '#f0f2f5' }}>
        <DynamicBreadcrumb />
        <NNotify />
        <Outlet />
      </div>
    </Content>
  )
}

export default index
