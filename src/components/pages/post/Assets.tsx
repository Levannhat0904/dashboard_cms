import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Tooltip } from 'antd'
import { IAsset, IAuthor } from '../../../interfaces'

// Component để hiển thị một avatar với thông tin chi tiết khi hover
const AssetAvatarDetail: React.FC<{ asset: IAsset }> = ({ asset }) => {
  const { slug, name, symbol, iconUrl, id } = asset

  const tooltipTitle = (
    <div className='text-white'>
      <p>
        <strong className='text-white'>Name:</strong> {name}
      </p>
      <p>
        <strong className='text-white'>slug:</strong> {slug}
      </p>
      <p>
        <strong className='text-white'>ID:</strong> {id}
      </p>
      <p>
        <strong className='text-white'>symbol:</strong> {symbol}
      </p>
    </div>
  )

  return (
    <Tooltip title={tooltipTitle} placement='top'>
      <Avatar style={{ backgroundColor: '#87d068' }} icon={!iconUrl && <UserOutlined />} src={iconUrl} />
    </Tooltip>
  )
}

// Component để hiển thị danh sách các user dưới dạng Avatar.Group
const AssetList: React.FC<{ assets: IAuthor[] }> = ({ assets }) => (
  <Avatar.Group
    size='large'
    max={{
      count: 2,
      style: { color: '#f56a00', backgroundColor: '#fde3cf' }
    }}
  >
    {assets.map((asset) => (
      <AssetAvatarDetail key={asset.id} asset={asset} />
    ))}
  </Avatar.Group>
)

// Component chính để hiển thị UserList
const AssetAvatarTooltip: React.FC<{ assets?: IAsset[] }> = ({ assets = [] }) => (
  <div>
    <AssetList assets={assets} />
  </div>
)

export default AssetAvatarTooltip
