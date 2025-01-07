import React from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

interface ButtonIconProps {
  collapsed: boolean
  onToggle?: () => void
}

const CollapButton: React.FC<ButtonIconProps> = ({ collapsed, onToggle }) => (
  <span onClick={onToggle} style={{ cursor: 'pointer', color: '#fff' }}>
    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
  </span>
)

export default CollapButton
