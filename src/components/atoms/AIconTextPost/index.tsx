// AIconTextPost
import React from 'react'
import { Space } from 'antd'

interface IconTextProps {
  icon: React.FC
  text: string
}

const IconText: React.FC<IconTextProps> = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

export default IconText
