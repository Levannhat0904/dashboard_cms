import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Tooltip } from 'antd'
import { cn } from '../../utils'
import { IAsset, IAuthor } from '../../interfaces'
// Component để hiển thị một avatar với thông tin chi tiết khi hover
const UserAvatarDetail: React.FC<{ user: IAuthor | IAsset }> = ({ user }) => {
  const generateTooltipTitle = (data: IAuthor) => (
    <div className='text-white'>
      {Object.entries(data).map(([key, value]) => (
        <p key={key}>
          <strong className='text-white'>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
        </p>
      ))}
    </div>
  )

  return (
    <Tooltip title={generateTooltipTitle(user)} placement='top'>
      {/* <Avatar style={{ backgroundColor: '#87d068' }} icon={!user.avatar && <UserOutlined />} src={user.avatar} /> */}
      <Avatar
        style={{ backgroundColor: '#87d068' }}
        icon={!(user as IAuthor).avatar && !(user as IAsset).iconUrl && <UserOutlined />}
        src={(user as IAuthor).avatar || (user as IAsset).iconUrl}
      />
    </Tooltip>
  )
}

// Component để hiển thị danh sách các user dưới dạng Avatar.Group
const UserList: React.FC<{ users: IAuthor[] }> = ({ users }) => (
  <Avatar.Group
    size='large'
    max={{
      count: 2,
      style: { color: '#f56a00', backgroundColor: '#fde3cf' }
    }}
  >
    {users.map((user) => (
      <UserAvatarDetail key={user.id} user={user} />
    ))}
  </Avatar.Group>
)

// Component chính để hiển thị UserList
const UserAvatarTooltip: React.FC<{ users?: IAuthor[]; className?: string }> = ({ users = [] }, className) => {
  const initialClass = 'block'
  return (
    <div className={cn(initialClass, className)}>
      <UserList users={users} />
    </div>
  )
}

export default UserAvatarTooltip
