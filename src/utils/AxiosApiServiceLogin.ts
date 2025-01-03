import { AxiosRequestConfig } from 'axios'
import axios, { AxiosResponse } from 'axios'
import { BASE_URL_USER_LOGIN } from '../constants'
import { getAccessToken } from './helpers'

const accessToken = getAccessToken() // Thay bằng accessToken hợp lệ
const client = axios.create({
  baseURL: BASE_URL_USER_LOGIN, // Thay bằng base URL API của bạn
  headers: {
    // 'Content-Type': 'multipart/form-data',
    'Custom-Header': 'application/json',
    Authorization: `Bearer ${accessToken}`
  }
})

export interface LoginRequest {
  email: string
  password: string
}
export interface Meta {
  status: number
  success: boolean
  externalMessage: string
  internalMessage: string
}

export interface LoginResponse {
  meta: Meta
  data: {
    accessToken: string
  }
}
export interface IAuthor {
  name?: string
  username?: string
  avatar?: string
  id?: string
}

export interface ITag {
  id?: string
  iconUrl?: string
  name?: string
  slug?: string
  group?: 'TAG'
  description?: string
  featureImage?: string
  metaDescription?: string
  metaTitle?: string
  ogDescription?: string
  ogImage?: string
  ogTitle?: string
  twitterDescription?: string
  twitterImage?: string
  twitterTitle?: string
}

export interface ISector {
  name?: string
  slug?: string
  id?: string
  isParent?: boolean
  iconUrl?: string
}

export interface IPostType {
  name?: string
  slug?: string
  id?: string
  iconUrl?: string
}
export interface IAsset {
  slug?: string
  name?: string
  symbol?: string
  iconUrl?: string
  id?: string
}

export interface IPost {
  id?: string
  uuid?: string
  slug?: string
  title?: string
  excerpt?: string
  authors?: IAuthor[]
  tags?: ITag[]
  sectors?: ISector[]
  assets?: IAsset[]
  postType?: IPostType
  postFormat?: string
  status?: string
  visibility?: string
  totalView?: number
  totalShare?: number
  totalWord?: number
  readingTime?: number
  publishedAt?: string | null
  createdAt?: string
  updatedAt?: string
}
export interface ErrorResponse {
  meta: Meta
}

// Định nghĩa kiểu lỗi cho các response lỗi
export interface AxiosErrorResponse {
  response: {
    data: ErrorResponse // Thay đổi để chứa lỗi trả về từ API
  }
}

export interface IApiPostResponse {
  meta: {
    status: number
    success?: boolean
    externalMessage: string
    internalMessage: string
  }
  data: {
    page: number
    pageSize: number
    total: number
    datas: IPost[]
  }
}
export interface IFetchPostsResponse {
  posts: {
    data: {
      page: number
      pageSize: number
      total: number
      datas: IPost[]
    }
    meta: {
      status: number
      success?: boolean
      externalMessage: string
      internalMessage: string
    }
  }
}
export interface IFetchTagsResponse {
  tags: {
    data: {
      data: {
        page: number
        pageSize: number
        total: number
        datas: ITag[]
      }
      meta: {
        status: number
        success?: boolean
        externalMessage: string
        internalMessage: string
      }
    }
  }
}
export interface IApiUserResponse {
  meta: {
    status: number
    success?: boolean
    externalMessage: string
    internalMessage: string
  }
  data: {
    page: number
    pageSize: number
    total: number
    datas: IPost[]
  }
}

// Hàm request login
const requestUserLogin = async <T>(options: AxiosRequestConfig): Promise<T> => {
  const onSuccess = (response: AxiosResponse<T>) => response.data
  const onError = (error: AxiosErrorResponse) => {
    // Trả về lỗi chi tiết từ API
    return Promise.reject(error.response?.data) // Ném toàn bộ lỗi từ API
  }

  return client(options).then(onSuccess).catch(onError)
}

// Hàm đăng nhập
export const loginWithAxios = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await requestUserLogin<LoginResponse>({
      url: '/api/v1/cms/auths/login',
      method: 'POST',
      data // Gửi dữ liệu đăng nhập
    })
    console.log('response: ', response)
    return response
  } catch (error: any) {
    // Lỗi sẽ chứa toàn bộ dữ liệu lỗi từ API
    console.error('Đăng nhập thất bại:', error)
    throw error // Ném lỗi ra để React Query xử lý
  }
}
export const getUserInfo = async (): Promise<T> => {
  try {
    const response = await requestUserLogin<T>({
      url: `api/v1/cms/posts/filter/authors`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    // console.info("Thông tin bài viết:", response.data.datas);
    // console.log(response.data)
    return response
  } catch (error: any) {
    console.error('Không thể lấy thông tin bài viết:', error)
    throw new Error('Không thể lấy thông tin bài viết. Vui lòng thử lại sau.')
  }
}

export const fetchAuthors = async () => {
  try {
    // Lấy thông tin tác giả
    const authorsResponse = await client.get('api/v1/cms/posts/filter/authors')
    // Trả về dữ liệu gộp
    return {
      authors: authorsResponse.data
    }
  } catch (error: any) {
    console.error('Lỗi khi lấy dữ liệu:', error)
    throw new Error('Không thể lấy dữ liệu. Vui lòng thử lại sau.')
  }
}
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
  } catch (error: any) {
    console.error('Lỗi khi lấy dữ liệu:', error)
    return {
      posts: [],
      error: true // Đánh dấu có lỗi
    }
  }
}
export interface FetchPostsParams {
  page?: number
  pageSize?: number
  authors?: string[]
  s?: string
}
export const fetchPostsV2 = async (params: FetchPostsParams) => {
  try {
    // Lấy danh sách bài viết
    const postsResponse = await client.get<IFetchPostsResponse>('api/v1/cms/posts', {
      params
    })
    // Trả về dữ liệu gộp
    console.log('check data: ', postsResponse.data)
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
// =============
export interface FetchTagsParams {
  page?: number
  pageSize?: number
  authors?: string[]
  s?: string
}
export const fetchTags = async (params: FetchTagsParams) => {
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

export const uploadImage = async (file: File): Promise<string> => {
  try {
    // Tạo FormData và thêm file vào với key là 'image'
    const formData = new FormData()
    formData.append('image', file)

    // Gửi request POST với formData
    const config = { headers: { 'content-type': 'multipart/form-data' } }
    const response = await client.post('/api/v1/cms/commons/upload-images', formData, config)

    // Trả về URL ảnh từ dữ liệu trả về
    console.log('img: ', response.data.data.url)
    return response.data.data.url // URL ảnh sau khi upload thành công
  } catch (error) {
    console.error('Lỗi khi tải ảnh lên:', error)
    throw new Error('Tải ảnh thất bại')
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
export const editTag = async (id: string, newData: ITag) => {
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
