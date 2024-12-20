import React from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar'

const { Header, Content, Footer } = Layout

const DashboardLayout: React.FC = () => (
  <Layout style={{ minHeight: '100vh', minWidth: '100vw' }}>
    <Sidebar />
    <Layout>
      <Header style={{ padding: 0 }} />
      <Content style={{ marginTop: 4, marginLeft: 10, marginRight: 10 }}>
        <div style={{ width: '100%', height: '100%', background: '#f0f2f5' }}>
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
    </Layout>
  </Layout>
)

export default DashboardLayout
