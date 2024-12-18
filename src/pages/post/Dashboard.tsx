import React, { useState } from 'react'
import {
  DesktopOutlined,
  ExclamationCircleOutlined,
  //   FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons'
// import type { MenuProps } from 'antd'
import { ConfigProvider } from 'antd'
import { Layout, Menu, theme } from 'antd'
import { NavLink, Outlet } from 'react-router-dom'
// const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout

// type MenuItem = Required<MenuProps>['items'][number]

// function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
//   return {
//     key,
//     icon,
//     children,
//     label
//   } as MenuItem
// }

const items = [
  {
    key: '1',
    label: 'Option 1',
    icon: <PieChartOutlined />,
    path: '/option1'
  },
  {
    key: '2',
    label: 'Option 2',
    icon: <DesktopOutlined />,
    path: '/option2'
  },
  {
    key: '3',
    label: 'Option 3',
    icon: <DesktopOutlined />,
    path: '/option3'
  },
  {
    key: '4',
    label: 'Dangerous Item',
    danger: true,
    icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
    path: '/danger'
  },
  {
    key: 'sub1',
    label: 'User',
    icon: <UserOutlined />,
    children: [
      {
        key: '5',
        label: 'Tom',
        icon: <UserOutlined />,
        path: '/user/tom'
      },
      {
        key: '6',
        label: 'Bill',
        icon: <UserOutlined />,
        path: '/user/bill'
      },
      {
        key: '7',
        label: 'Alex',
        icon: <UserOutlined />,
        path: '/user/alex'
      }
    ]
  },
  {
    key: 'sub2',
    label: 'Bài viết', // Thay đổi thành "Bài viết" thay vì "Post"
    icon: <TeamOutlined />,
    path: 'post'
    //     children: [
    //       {
    //         key: '8',
    //         label: 'Thêm bài viết', // Thêm bài viết
    //         icon: <TeamOutlined />,
    //         path: 'post/add' // Đường dẫn cho trang thêm bài viết
    //       },
    //       {
    //         key: '9',
    //         label: 'Sửa bài viết', // Sửa bài viết
    //         icon: <TeamOutlined />,
    //         path: 'post/edit' // Đường dẫn cho trang sửa bài viết
    //       },
    //       {
    //         key: '10',
    //         label: 'Xoá bài viết', // Xoá bài viết
    //         icon: <TeamOutlined />,
    //         path: 'post/delete' // Đường dẫn cho trang xoá bài viết
    //       }
    //     ]
  }
]

const CustomMenu = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#038fde',
          colorLink: '#1D4ED8',
          colorBgBase: '#013366',
          colorTextBase: '#038fde'
        }
      }}
    >
      <Menu mode='inline' defaultSelectedKeys={['1']} className='text-[#038fde] custom-menu'>
        {items.map((item) =>
          item.children ? (
            <Menu.SubMenu
              key={item.key}
              icon={item.icon}
              title={item.label}
              //       className='group !text-[#038fde] hover:!text-red-500 hover:bg-none focus:!text-red-500 active:!text-red-500'
            >
              {item.children.map((child) => (
                <Menu.Item
                  key={child.key}
                  icon={child.icon}
                  className='group hover:!text-red-500 !no-underline hover:bg-none focus:!text-red-500 active:!text-red-500'
                >
                  <NavLink
                    to={child.path}
                    end
                    className={({ isActive }) =>
                      isActive
                        ? '!text-red-500 !no-underline'
                        : '!text-[#038fde] !no-underline group-hover:!text-red-500'
                    }
                  >
                    {child.label}
                  </NavLink>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              className='group hover:!text-red-500 hover:bg-none focus:!text-red-500 active:!text-red-500'
            >
              <NavLink
                to={item.path}
                end
                className={({ isActive }) => (isActive ? '!text-red-500' : 'text-[#038fde] group-hover:!text-red-500')}
              >
                {item.label}
              </NavLink>
            </Menu.Item>
          )
        )}
      </Menu>
    </ConfigProvider>
  )
}
const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  return (
    <Layout className='' style={{ minHeight: '100vh', minWidth: '100vw' }}>
      <Sider className='bg-[#013366]' collapsible collapsed={collapsed} width={240} trigger={null}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', height: '48px' }}>
          <div className='  flex gap-4 justify-center'>
            <span onClick={() => setCollapsed(!collapsed)} style={{ cursor: 'pointer', color: '#fff' }}>
              {collapsed ? <MenuUnfoldOutlined className='text-base' /> : <MenuFoldOutlined />}
            </span>
            <div className='app-logo relative z-40'>
              <img alt='example' src='https://wieldy.g-axon.work/assets/images/logo.png' />
            </div>
          </div>
        </div>
        <CustomMenu />
      </Sider>
      <Layout>
        <Header className='' style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ marginTop: 4, marginLeft: 10, marginRight: 10 }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            style={{
              width: '100%',
              height: '100%',
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}
export default Dashboard
