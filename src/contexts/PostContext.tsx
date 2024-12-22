import React, { createContext, useContext, useState, useEffect } from 'react'
import { fetchPosts, fetchPostByIdAPI } from '../utils'

interface PostProps {
  id: number
  avatar: string
  title: string
  href: string
  description: string
  body: string
}

interface PostContextType {
  data: PostProps[]
  loading: boolean
  setData: React.Dispatch<React.SetStateAction<PostProps[]>>
  fetchPostsData: () => Promise<void>
  fetchPostById: (id: number) => Promise<PostProps | null>
}

const PostContext = createContext<PostContextType | undefined>(undefined)

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PostProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchPostsData = async () => {
    setLoading(true)
    const posts = await fetchPosts()
    const formattedPosts = posts.map((post) => ({
      id: post.id || 1,
      avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${post.id}`,
      title: post.title,
      href: `post/${post.id}/edit`,
      description: `Post ID: ${post.id}`,
      //       content: post.body
      body: post.body
    }))
    setData(formattedPosts)
    setLoading(false)
  }
  const fetchPostById = async (id: number) => {
    console.log(id)
    const foundPost = data.find((post) => post.id === id) // Tìm bài viết trong danh sách đã tải
    console.log(foundPost)
    if (foundPost) {
      return foundPost // Nếu tìm thấy, trả về bài viết
    }

    // Nếu không tìm thấy, gọi API để lấy bài viết
    try {
      const posts = await fetchPostByIdAPI(Number(id)) // Giả sử API có hàm fetchPostByIdAPI
      const formattedPosts = [posts].map((post) => ({
        id: post.id || 1,
        avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${post.id}`,
        title: post.title,
        href: `post/${post.id}/edit`,
        description: `Post ID: ${post.id}`,
        //       content: post.body
        body: post.body
      }))
      setData(formattedPosts)
      return formattedPosts
    } catch (err) {
      fetchPostsData()
      console.error('Failed to fetch post by ID:', err)
      // return null
    }
  }

  useEffect(() => {
    fetchPostsData()
  }, [])

  return (
    <PostContext.Provider value={{ data, setData, loading, fetchPostsData, fetchPostById }}>
      {children}
    </PostContext.Provider>
  )
}

export const usePostContext = () => {
  const context = useContext(PostContext)
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider')
  }
  return context
}
