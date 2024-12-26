// import React from 'react'
// import { Tooltip, Avatar } from 'antd'
// import { UserOutlined } from '@ant-design/icons'
// import { IAuthor } from '../../../utils/AxiosApiServiceLogin'
// const UserAvatarDetail: React.FC<{ user: IAuthor }> = ({ user }) => {
//   const { name, username, avatar, id } = user
//   const tooltipTitle = (
//     <div className=''>
//       <p className='text-white'>
//         <strong className='text-white'>Name:</strong> {name}
//       </p>
//       <p>
//         <strong className='text-white'>Username:</strong> {username}
//       </p>
//       {/* <p>
//         <strong className='text-white'>Avatar:</strong> {avatar ? avatar : 'No avatar'}
//       </p> */}
//       <p>
//         <strong className='text-white'>ID:</strong> {id}
//       </p>
//     </div>
//   )

//   return (
//     <Tooltip title={tooltipTitle} placement='top'>
//       <Avatar style={{ backgroundColor: '#87d068' }} icon={!avatar && <UserOutlined />} src={avatar} />
//     </Tooltip>
//   )
// }

// const UserList: React.FC<{ users: IAuthor[] }> = ({ users }) => {
//   return (
//     <div>
//       {users.map((user) => (
//         <UserAvatarDetail key={user.id} user={user} />
//       ))}
//     </div>
//   )
// }

// const UserAvatarTooltip: React.FC<{ users?: IAuthor[] }> = ({ users = [] }) => (
//   <div>
//     <UserList users={users} />
//   </div>
// )

// export default UserAvatarTooltip
import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Divider, Tooltip } from 'antd'
import { IAuthor } from '../../../utils/AxiosApiServiceLogin'

// Component để hiển thị một avatar với thông tin chi tiết khi hover
const UserAvatarDetail: React.FC<{ user: IAuthor }> = ({ user }) => {
  const { name, username, avatar, id } = user

  const tooltipTitle = (
    <div className='text-white'>
      <p>
        <strong className='text-white'>Name:</strong> {name}
      </p>
      <p>
        <strong className='text-white'>Username:</strong> {username}
      </p>
      <p>
        <strong className='text-white'>ID:</strong> {id}
      </p>
    </div>
  )

  return (
    <Tooltip title={tooltipTitle} placement='top'>
      <Avatar style={{ backgroundColor: '#87d068' }} icon={!avatar && <UserOutlined />} src={avatar} />
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
const UserAvatarTooltip: React.FC<{ users?: IAuthor[] }> = ({ users = [] }) => (
  <div>
    <UserList users={users} />
  </div>
)

export default UserAvatarTooltip
