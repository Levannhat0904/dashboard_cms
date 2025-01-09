import { DesktopOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { ConfigProvider, Menu } from 'antd'
import { Link, NavLink } from 'react-router-dom'
import useCustomNavigate from '../../../hook/useCustomNavigate'
const items = [
  {
    key: '1',
    label: 'Option 1',
    icon: <PieChartOutlined className='custom-classs' />,
    path: '/option1',
    className: 'custom-classs' // Add custom class here
  },
  {
    key: '2',
    label: 'Option 2',
    icon: <DesktopOutlined className='custom-classs' />,
    path: '/option2',
    className: 'custom-classs' // Add custom class here
  },
  {
    key: '3',
    label: 'Tags',
    icon: <DesktopOutlined className='custom-classs' />,
    path: 'tag',
    className: 'custom-classs' // Add custom class here
  },

  {
    key: 'sub1',
    label: 'User',
    className: 'custom-classs',
    icon: <UserOutlined className='!custom-classs' />,
    children: [
      {
        key: '5',
        label: 'Tom',
        icon: <UserOutlined className='custom-classs' />,
        path: '/user/tom',
        className: 'custom-classs' // Add custom class here
      },
      {
        key: '6',
        label: 'Bill',
        icon: <UserOutlined className='custom-classs' />,
        path: '/user/bill',
        className: 'custom-classs' // Add custom class here
      },
      {
        key: '7',
        label: 'Alex',
        icon: <UserOutlined className='custom-classs' />,
        path: '/user/alex',
        className: 'custom-classs' // Add custom class here
      }
    ]
  },
  {
    key: 'sub2',
    label: 'Bài viết', // Thay đổi thành "Bài viết" thay vì "Post"
    icon: <TeamOutlined />,
    path: 'post',
    className: 'custom-classs' // Add custom class here
  }
]
const CustomMenu = () => {
  const navigate = useCustomNavigate()
  const handleNavigate = (to: string) => {
    navigate(to) // Điều hướng đến trang được chỉ định
  }
  // items={[{ title: <Link to='/dashboard/tag'>Tag</Link> }, { title: dataReceived?.name }]}
  //  items={[
  //   {
  //     title: (
  //       <span onClick={() => handleNavigate('/dashboard/tag')} style={{ cursor: 'pointer', color: 'blue' }}>
  //         Tag
  //       </span>
  //     )
  //   },
  //   { title: dataReceived?.name }
  // ]}
  const menuItems = items.map((item) => {
    if (item.children) {
      return {
        key: item.key,
        icon: item.icon,
        label: item.label,
        className: 'custom-classs', // Áp dụng className cho các submenus
        children: item.children.map((child) => ({
          key: child.key,
          icon: child.icon,
          label: (
            <div onClick={() => handleNavigate(child.path)} style={{ cursor: 'pointer', color: 'blue' }}>
              {child.label}
            </div>
          ),
          // label: <Link to={child.path}>{child.label}</Link>,
          className: 'custom-classs'
        }))
      }
    }

    return {
      key: item.key,
      icon: item.icon,
      label: (
        // <NavLink to={item.path} end>
        //   {item.label}
        // </NavLink>
        <div onClick={() => handleNavigate(item.path)} style={{ cursor: 'pointer' }}>
          {item.label}
        </div>
      ),
      className: item.className // Áp dụng className cho từng item riêng biệt
    }
  })
  const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable'
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            bodyBg: '#000'
          },
          Menu: {
            /* here is your component tokens */
            itemActiveBg: 'none',
            itemHoverColor: '#eda041',
            itemSelectedColor: '#eda041',
            itemSelectedBg: 'none',
            itemColor: 'white'
          }
        }
      }}
    >
      <Menu
        // style={siderStyle}
        mode='inline'
        defaultSelectedKeys={['0']}
        className='text-[#038fde] custom-menu bg-[#013366]'
        items={menuItems}
      />
    </ConfigProvider>
  )
}
export default CustomMenu
