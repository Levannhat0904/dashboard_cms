import React from 'react'
import { useUserContext } from '../../../contexts/UserContext'
import { message } from 'antd'
import InputSearchTest from '../../atoms/AInputSearchTest'
import UserList from '../../Templates/UserList/UserList'
// import InputSearchTest from '../../atoms/InputSearchTest'
// import UserList from '../../atoms/UserList'

const User: React.FC = () => {
  const { dataUser, setDataUser, fetchUsersData, fetchUsersDataByContextAPI } = useUserContext()

  const handleSearch = async (value: string) => {
    if (value === '') {
      // Nếu ô tìm kiếm trống, gọi lại API để tải lại tất cả người dùng
      console.log('Ô tìm kiếm trống, tải lại tất cả người dùng.')
      fetchUsersData()
      return
    }

    const result = await fetchUsersDataByContextAPI(value)
    if (result.length === 0) {
      message.warning('Không tìm thấy dữ liệu')
      fetchUsersData()
    } else {
      setDataUser(result)
    }
  }

  return (
    <>
      <InputSearchTest handleSearch={handleSearch} />
      <UserList dataUser={dataUser} />
    </>
  )
}

export default User
