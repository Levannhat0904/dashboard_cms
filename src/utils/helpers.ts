import { ACCESS_TOKEN } from '../constants'

export const getAccessToken = () => {
  return localStorage.getItem('accessToken') || '' // Hoặc giá trị mặc định khác
}
// Hàm lưu accessToken vào localStorage
export const setAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN, token)
}
// Hàm xóa accessToken khỏi localStorage
export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN)
}

//==========
//  api

export interface PostProps {
  userId: number
  id: number
  title: string
  body: string
}
// Tìm kiếm tất cả các bài viết
export const fetchPosts = async (): Promise<PostProps[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}
// Tìm kiếm bài viết theo ID
export const fetchPostById = async (id: number): Promise<PostProps> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}
// Thêm bài viết mới
export const createPost = async (newPost: Omit<PostProps, 'id'>): Promise<PostProps> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newPost)
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}
// Cập nhật bài viết (PUT)
export const updatePost = async (id: number, updatedPost: Partial<PostProps>): Promise<PostProps> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedPost)
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}
// Xóa bài viết
export const deletePost = async (id: number): Promise<void> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
}
