import axios from "axios"
import { IFetchTagsParams, IFetchTagsResponse, ITag } from "../interfaces"
import client from "./client"

export const fetchTags = async (params: IFetchTagsParams) => {
  try {
    // Lấy danh sách bài viết
    const postsResponse = await client.get<IFetchTagsResponse>('api/v1/cms/tags', {
      params
    })
    // Trả về dữ liệu gộp
    console.log('check data: ', postsResponse.data)
    return {
      tags: postsResponse
    }
  } catch (error: unknown) {
    // Kiểm tra kiểu của lỗi
    if (axios.isAxiosError(error)) {
      console.log('error: ', error)
      console.error('Lỗi khi lấy dữ liệu từ API:', error.response?.data)
    } else {
      console.error('Lỗi không xác định:', error)
    }
    return {
      tags: [],
      error: true // Đánh dấu có lỗi
    }
  }
}
export const addTag = async (value: ITag) => {
  try {
    console.log('Request payload:', value)
    const response = await client.post('/api/v1/cms/tags', value)
    console.log('response tag', response)
    return response
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu lên:', error)
    throw new Error('Tải tag thất bại')
  }
}
export const editTag = async (id: string, newData?: ITag) => {
  try {
    console.log('Request payload:', newData)
    const response = await client.put(`/api/v1/cms/tags/${id}`, newData)
    console.log('response tag', response)
    return response
  } catch (error) {
    console.error('Lỗi khi update dữ liệu lên:', error)
    throw new Error('update tag thất bại')
  }
}
export const fetchTagById = async (id: string) => {
  try {
    console.log('Request payload:', id)
    const response = await client.get(`/api/v1/cms/tags/${id}`)
    console.log('response tag', response)
    return response
  } catch (error) {
    console.error('Lỗi khi update dữ liệu lên:', error)
    throw new Error('update tag thất bại')
  }
}
export const deleteTag = async (id: string) => {
  try {
    console.log('Request payload:', id)
    const response = await client.delete(`/api/v1/cms/tags/${id}`)
    console.log('response tag', response)
    return response
  } catch (error) {
    console.error('Lỗi khi update dữ liệu lên:', error)
    throw new Error('update tag thất bại')
  }
}