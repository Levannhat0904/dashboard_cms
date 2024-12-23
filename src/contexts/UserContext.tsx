import React, { createContext, useContext, useState, useEffect } from 'react'
import { fetchUsers } from '../utils'

interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: {
    lat: string
    lng: string
  }
}

interface Company {
  name: string
  catchPhrase: string
  bs: string
}

interface UserProps {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}

interface UserContextType {
  dataUser: UserProps[]
  loadingUser: boolean
  setDataUser: React.Dispatch<React.SetStateAction<UserProps[]>>
  fetchUsersData: () => Promise<void>
  fetchUsersDataByContextAPI: (query: string) => Promise<UserProps[]>
  //   fetchUserById: (id: number) => Promise<UserProps | null>
  deleteUserWithContextAPI: (id: number) => Promise<void>
  addUserWithContextAPI: (newUser: UserProps) => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dataUser, setDataUser] = useState<UserProps[]>([])
  const [loadingUser, setLoading] = useState<boolean>(true)

  const fetchUsersData = async () => {
    setLoading(true)
    const users = await fetchUsers()
    setDataUser(users)
    setLoading(false)
  }

  const fetchUsersDataByContextAPI = async (query: string): Promise<UserProps[]> => {
    if (loadingUser) {
      console.warn('Data is still loading, cannot perform search.')
      return []
    }

    return new Promise((resolve) => {
      const filteredUsers = dataUser.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.username.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
      )
      resolve(filteredUsers)
    })
  }

  const deleteUserWithContextAPI = async (id: number) => {
    setLoading(true)
    try {
      setDataUser((prevData) => prevData.filter((user) => user.id !== id))
      setLoading(false)
    } catch (err) {
      console.error('Failed to delete user:', err)
      setLoading(false)
    }
  }

  const addUserWithContextAPI = async (newUser: UserProps) => {
    setLoading(true)
    try {
      setDataUser((prevData) => [newUser, ...prevData])
      setLoading(false)
    } catch (err) {
      console.error('Failed to add user:', err)
      setLoading(false)
    }
  }

  //   const fetchUserById = async (id: number): Promise<UserProps | null> => {
  //     const foundUser = data.find((user) => user.id === id)
  //     if (foundUser) {
  //       return foundUser
  //     }

  //     try {
  //       const user = await fetchUserByIdAPI(id)
  //       setDataUser((prevData) => [...prevData, user])
  //       return user
  //     } catch (err) {
  //       console.error('Failed to fetch user by ID:', err)
  //       return null
  //     }
  //   }

  useEffect(() => {
    fetchUsersData()
  }, [])

  return (
    <UserContext.Provider
      value={{
        dataUser,
        setDataUser,
        loadingUser,
        fetchUsersData,
        // fetchUserById,
        addUserWithContextAPI,
        fetchUsersDataByContextAPI,
        deleteUserWithContextAPI
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  return context
}
