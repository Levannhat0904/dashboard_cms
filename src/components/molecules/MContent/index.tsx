import { Content } from 'antd/es/layout/layout'
import React from 'react'
import { Outlet } from 'react-router-dom'

const index = () => {
  return (
    <Content style={{ marginTop: 4, marginLeft: 10, marginRight: 10 }}>
      <div style={{ width: '100%', height: '100%', background: '#f0f2f5' }}>
        <Outlet />
      </div>
    </Content>
  )
}

export default index
