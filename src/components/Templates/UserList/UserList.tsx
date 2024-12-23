import React from 'react'
import { List, Avatar } from 'antd'

interface UserProps {
  id: number
  name: string
  username: string
  email: string
  website: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
  }
}

interface UserListProps {
  dataUser: UserProps[]
}

const UserList: React.FC<UserListProps> = ({ dataUser }) => {
  return (
    <List
      itemLayout='horizontal'
      dataSource={dataUser}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${item.id}`} />}
            title={<a href={`http://${item.website}`}>{item.name}</a>}
            description={
              <>
                <p>Username: {item.username}</p>
                <p>Email: {item.email}</p>
                <p>
                  Address: {item.address.street}, {item.address.suite}, {item.address.city}, {item.address.zipcode}
                </p>
              </>
            }
          />
        </List.Item>
      )}
    />
  )
}

export default UserList
