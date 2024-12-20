import React, { useState } from 'react'
import { ConfigProvider, Layout, Menu } from 'antd'
import { SidebarToggle } from '../../molecules'
import { DesktopOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
const customTheme = {
  token: {
    colorPrimary: '#013366', // Custom primary color
    colorBgBase: '#013366', // Background color for base
    colorText: '#038fdd', // Text color for items
    colorTextSecondary: '#ffffff', // Secondary text color for hover and selected
    // colorBgHover: '#444', // Background color for hover
    colorBgSelected: '#013366' // Background color for selected
  }
}
const { Sider } = Layout
const items = [
  {
    key: '1',
    label: 'Option 1',
    icon: <PieChartOutlined className='custom-class' />,
    path: '/option1',
    className: 'custom-class' // Add custom class here
  },
  {
    key: '2',
    label: 'Option 2',
    icon: <DesktopOutlined className='custom-class' />,
    path: '/option2',
    className: 'custom-class' // Add custom class here
  },
  {
    key: '3',
    label: 'Option 3',
    icon: <DesktopOutlined className='custom-class' />,
    path: '/option3',
    className: 'custom-class' // Add custom class here
  },

  {
    key: 'sub1',
    label: 'User',
    className: 'custom-class',
    icon: <UserOutlined className='!custom-class' />,
    children: [
      {
        key: '5',
        label: 'Tom',
        icon: <UserOutlined className='custom-class' />,
        path: '/user/tom',
        className: 'custom-class' // Add custom class here
      },
      {
        key: '6',
        label: 'Bill',
        icon: <UserOutlined className='custom-class' />,
        path: '/user/bill',
        className: 'custom-class' // Add custom class here
      },
      {
        key: '7',
        label: 'Alex',
        icon: <UserOutlined className='custom-class' />,
        path: '/user/alex',
        className: 'custom-class' // Add custom class here
      }
    ]
  },
  {
    key: 'sub2',
    label: 'Bài viết', // Thay đổi thành "Bài viết" thay vì "Post"
    icon: <TeamOutlined />,
    path: 'post',
    className: 'custom-class' // Add custom class here
  }
]
const CustomMenu = () => {
  const menuItems = items.map((item) => {
    if (item.children) {
      return {
        key: item.key,
        icon: item.icon,
        label: item.label,
        className: 'custom-class', // Áp dụng className cho các submenus
        children: item.children.map((child) => ({
          key: child.key,
          icon: child.icon,
          label: (
            <NavLink
              to={child.path}
              end
              className={({ isActive }) =>
                isActive
                  ? '!text-red-500 !no-underline custom-class'
                  : 'text-[#038fde] !no-underline group-hover:!text-red-500'
              }
            >
              {child.label}
            </NavLink>
          ),
          className: 'custom-class'
        }))
      }
    }

    return {
      key: item.key,
      icon: item.icon,
      label: (
        <NavLink
          to={item.path}
          end
          className={({ isActive }) =>
            isActive ? '!text-red-500 !no-underline custom-class' : 'text-[#038fde] group-hover:!text-red-500'
          }
        >
          {item.label}
        </NavLink>
      ),
      className: item.className // Áp dụng className cho từng item riêng biệt
    }
  })

  return (
    <ConfigProvider theme={customTheme}>
      <Menu mode='inline' defaultSelectedKeys={['0']} className='text-[#038fde] custom-menu' items={menuItems} />
    </ConfigProvider>
  )
}
const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Sider className='bg-[#013366]' collapsible collapsed={collapsed} width={240} trigger={null}>
      <SidebarToggle collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <CustomMenu />
    </Sider>
  )
}

export default Sidebar
