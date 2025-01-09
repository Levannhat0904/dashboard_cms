import axios from 'axios'
import client from './client'
import { IFetchPostsParams, IFetchPostsResponse } from '../interfaces'

export const fetchPosts = async (page?: number, pageSize?: number, authors?: string[]) => {
  try {
    // Lấy danh sách bài viết
    const postsResponse = await client.get('api/v1/cms/posts', {
      params: { page, pageSize, authors }
    })
    // Trả về dữ liệu gộp
    return {
      posts: postsResponse.data
    }
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error)
    return {
      posts: [],
      error: true // Đánh dấu có lỗi
    }
  }
}
export const fetchPostsV2 = async (params: IFetchPostsParams) => {
  try {
    // Lấy danh sách bài viết
    const postsResponse = await client.get<IFetchPostsResponse>('api/v1/cms/posts', {
      params
    })
    // Trả về dữ liệu gộp
    return {
      posts: postsResponse.data
    }
  } catch (error: unknown) {
    // Kiểm tra kiểu của lỗi
    if (axios.isAxiosError(error)) {
      console.error('Lỗi khi lấy dữ liệu từ API:', error.message)
    } else {
      console.error('Lỗi không xác định:', error)
    }
    return {
      posts: [],
      error: true // Đánh dấu có lỗi
    }
  }
}
