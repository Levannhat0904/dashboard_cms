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
  fetchPostsDataByContextAPI: (query: string) => Promise<PostProps[]>
  // deletePostWithContextAPI: () => Promise<void>
  fetchPostById: (id: number) => Promise<PostProps | null>
  deletePostWithContextAPI: (id: number) => Promise<PostProps | null>
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

  // console.log(data)

  // const fetchPostsDataByContextAPI = (query: string) => {
  //   // console.log('data: ', data, query)
  //   if (loading) {
  //     console.warn('Data is still loading, cannot perform search.')
  //     return []
  //   }
  //   return data.filter(
  //     (item) =>
  //       item.title.toLowerCase().includes(query.toLowerCase()) || item.body.toLowerCase().includes(query.toLowerCase())
  //   )
  // }
  const fetchPostsDataByContextAPI = async (query: string): Promise<PostProps[]> => {
    if (loading) {
      console.warn('Data is still loading, cannot perform search.')
      return []
    }

    // Trả về Promise, mặc dù data.filter() trả về một mảng đồng bộ
    return new Promise((resolve) => {
      const filteredPosts = data.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.body.toLowerCase().includes(query.toLowerCase())
      )
      resolve(filteredPosts)
    })
  }
  const deletePostWithContextAPI = (id: number) => {
    setLoading(true) // Bắt đầu trạng thái loading
    try {
      // Lọc ra những bài viết không có ID khớp với bài cần xóa
      setData((prevData) => prevData.filter((post) => post.id !== id))
      setLoading(false) // Kết thúc trạng thái loading
    } catch (err) {
      console.error('Failed to delete post:', err)
      setLoading(false) // Kết thúc trạng thái loading
    }
  }

  const addPostWithContextAPI = async (newPost: PostProps) => {
    setLoading(true)
    try {
      // Nếu bạn muốn gọi API để thêm bài viết, bạn có thể làm như sau (giả sử bạn có hàm `addPostAPI`):
      // const savedPost = await addPostAPI(newPost);

      // Nếu không, bạn có thể trực tiếp thêm vào mảng `data`:
      // setData((prevData) => [...prevData, newPost])
      setData((prevData) => [newPost, ...prevData])
      setLoading(false) // Hoàn thành việc tải dữ liệu
    } catch (err) {
      console.error('Failed to add post:', err)
      setLoading(false) // Hoàn thành việc tải dữ liệu
    }
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
    <PostContext.Provider
      value={{
        data,
        setData,
        loading,
        fetchPostsData,
        fetchPostById,
        addPostWithContextAPI,
        fetchPostsDataByContextAPI
        // deletePostWithContextAPI
      }}
    >
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
