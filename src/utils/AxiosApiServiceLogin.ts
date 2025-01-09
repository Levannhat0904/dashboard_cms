// import { AxiosRequestConfig } from 'axios'
// import axios, { AxiosResponse } from 'axios'
// import { BASE_URL_USER_LOGIN } from '../constants'
// import { getAccessToken } from './helpers'

// const accessToken = getAccessToken() // Thay bằng accessToken hợp lệ
// const client = axios.create({
//   baseURL: BASE_URL_USER_LOGIN, // Thay bằng base URL API của bạn
//   headers: {
//     // 'Content-Type': 'multipart/form-data',
//     'Custom-Header': 'application/json',
//     Authorization: `Bearer ${accessToken}`
//   }
// })

// export interface LoginRequest {
//   email: string
//   password: string
// }
// export interface Meta {
//   status: number
//   success: boolean
//   externalMessage: string
//   internalMessage: string
// }

// export interface LoginResponse {
//   meta: Meta
//   data: {
//     accessToken: string
//   }
// }
// export interface IAuthor {
//   name?: string
//   username?: string
//   avatar?: string
//   id?: string
// }

// export interface ITag {
//   id?: string
//   iconUrl?: string
//   name?: string
//   slug?: string
//   group?: 'TAG'
//   description?: string
//   featureImage?: string
//   metaDescription?: string
//   metaTitle?: string
//   ogDescription?: string
//   ogImage?: string
//   ogTitle?: string
//   twitterDescription?: string
//   twitterImage?: string
//   twitterTitle?: string
// }

// export interface ISector {
//   name?: string
//   slug?: string
//   id?: string
//   isParent?: boolean
//   featureImage?: string
//   iconUrl?: string
//   parent?: string
// }

// export interface IPostType {
//   name?: string
//   slug?: string
//   id?: string
//   iconUrl?: string
// }
// export interface IAsset {
//   slug?: string
//   name?: string
//   symbol?: string
//   iconUrl?: string
//   id?: string
// }

// export interface IPost {
//   id?: string
//   uuid?: string
//   slug?: string
//   title?: string
//   excerpt?: string
//   authors?: IAuthor[]
//   tags?: ITag[]
//   sectors?: ISector[]
//   assets?: IAsset[]
//   postType?: IPostType
//   postFormat?: string
//   status?: string
//   visibility?: string
//   totalView?: number
//   totalShare?: number
//   totalWord?: number
//   readingTime?: number
//   publishedAt?: string | null
//   createdAt?: string
//   updatedAt?: string
// }
// export interface ErrorResponse {
//   meta: Meta
// }

// // Định nghĩa kiểu lỗi cho các response lỗi
// export interface AxiosErrorResponse {
//   response: {
//     data: ErrorResponse // Thay đổi để chứa lỗi trả về từ API
//   }
// }

// export interface IApiPostResponse {
//   meta: {
//     status: number
//     success?: boolean
//     externalMessage: string
//     internalMessage: string
//   }
//   data: {
//     page: number
//     pageSize: number
//     total: number
//     datas: IPost[]
//   }
// }

// export interface IApiSectorsResponse {
//   meta: {
//     status: number
//     success?: boolean
//     externalMessage: string
//     internalMessage: string
//   }
//   data: ISector[]
// }

// export interface IApiAssetsResponse {
//   meta: {
//     status: number
//     success?: boolean
//     externalMessage: string
//     internalMessage: string
//   }
//   data: IAsset[]
// }
// export interface IFetchPostsResponse {
//   posts: {
//     data: {
//       page: number
//       pageSize: number
//       total: number
//       datas: IPost[]
//     }
//     meta: {
//       status: number
//       success?: boolean
//       externalMessage: string
//       internalMessage: string
//     }
//   }
// }
// export interface IFetchTagsResponse {
//   tags: {
//     data: {
//       data: {
//         page: number
//         pageSize: number
//         total: number
//         datas: ITag[]
//       }
//       meta: {
//         status: number
//         success?: boolean
//         externalMessage: string
//         internalMessage: string
//       }
//     }
//   }
// }
// export interface IApiUserResponse {
//   meta: {
//     status: number
//     success?: boolean
//     externalMessage: string
//     internalMessage: string
//   }
//   data: {
//     page: number
//     pageSize: number
//     total: number
//     data: IPost[]
//   }
// }
// export interface IApiAuthorResponseV2 {
//   meta: {
//     status: number
//     success?: boolean
//     externalMessage: string
//     internalMessage: string
//   }
//   data: IAuthor[]
// }

// // Hàm request login
// const requestUserLogin = async <T>(options: AxiosRequestConfig): Promise<T> => {
//   const onSuccess = (response: AxiosResponse<T>) => response.data
//   const onError = (error: AxiosErrorResponse) => {
//     // Trả về lỗi chi tiết từ API
//     return Promise.reject(error.response?.data) // Ném toàn bộ lỗi từ API
//   }

//   return client(options).then(onSuccess).catch(onError)
// }

// // Hàm đăng nhập
// export const loginWithAxios = async (data: LoginRequest): Promise<LoginResponse> => {
//   try {
//     const response = await requestUserLogin<LoginResponse>({
//       url: '/api/v1/cms/auths/login',
//       method: 'POST',
//       data // Gửi dữ liệu đăng nhập
//     })
//     return response
//   } catch (error) {
//     // Lỗi sẽ chứa toàn bộ dữ liệu lỗi từ API
//     console.error('Đăng nhập thất bại:', error)
//     throw error // Ném lỗi ra để React Query xử lý
//   }
// }

// export const getUserInfo = async (): Promise<IApiAuthorResponseV2> => {
//   try {
//     const response = await requestUserLogin<IApiAuthorResponseV2>({
//       url: `api/v1/cms/posts/filter/authors`,
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${accessToken}`
//       }
//     })
//     // console.info("Thông tin bài viết:", response.data.datas);
//     return response
//   } catch (error) {
//     console.error('Không thể lấy thông tin bài viết:', error)
//     throw new Error('Không thể lấy thông tin bài viết. Vui lòng thử lại sau.')
//   }
// }
// export const getSectors = async (): Promise<IApiSectorsResponse> => {
//   try {
//     const response = await requestUserLogin<IApiSectorsResponse>({
//       url: `api/v1/cms/posts/filter/sectors`,
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${accessToken}`
//       }
//     })
//     return response
//   } catch (error) {
//     console.error('Không thể lấy thông tin bài viết:', error)
//     throw new Error('Không thể lấy thông tin bài viết. Vui lòng thử lại sau.')
//   }
// }

// export const getAssets = async (): Promise<IApiAssetsResponse> => {
//   try {
//     const response = await requestUserLogin<IApiAssetsResponse>({
//       url: `api/v1/cms/posts/filter/assets`,
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${accessToken}`
//       }
//     })
//     return response
//   } catch (error) {
//     console.error('Không thể lấy thông tin bài viết:', error)
//     throw new Error('Không thể lấy thông tin bài viết. Vui lòng thử lại sau.')
//   }
// }

// export const fetchAuthors = async () => {
//   try {
//     // Lấy thông tin tác giả
//     const authorsResponse = await client.get('api/v1/cms/posts/filter/authors')
//     // Trả về dữ liệu gộp
//     return {
//       authors: authorsResponse.data
//     }
//   } catch (error) {
//     console.error('Lỗi khi lấy dữ liệu:', error)
//     throw new Error('Không thể lấy dữ liệu. Vui lòng thử lại sau.')
//   }
// }
// export const fetchPosts = async (page?: number, pageSize?: number, authors?: string[]) => {
//   try {
//     // Lấy danh sách bài viết
//     const postsResponse = await client.get('api/v1/cms/posts', {
//       params: { page, pageSize, authors }
//     })
//     // Trả về dữ liệu gộp
//     return {
//       posts: postsResponse.data
//     }
//   } catch (error) {
//     console.error('Lỗi khi lấy dữ liệu:', error)
//     return {
//       posts: [],
//       error: true // Đánh dấu có lỗi
//     }
//   }
// }
// export interface FetchPostsParams {
//   page?: number
//   pageSize?: number
//   authors?: string[]
//   s?: string
//   assets?: string[]
// }
// export const fetchPostsV2 = async (params: FetchPostsParams) => {
//   try {
//     // Lấy danh sách bài viết
//     const postsResponse = await client.get<IFetchPostsResponse>('api/v1/cms/posts', {
//       params
//     })
//     // Trả về dữ liệu gộp
//     return {
//       posts: postsResponse.data
//     }
//   } catch (error: unknown) {
//     // Kiểm tra kiểu của lỗi
//     if (axios.isAxiosError(error)) {
//       console.error('Lỗi khi lấy dữ liệu từ API:', error.message)
//     } else {
//       console.error('Lỗi không xác định:', error)
//     }
//     return {
//       posts: [],
//       error: true // Đánh dấu có lỗi
//     }
//   }
// }
// // =============
// export interface FetchTagsParams {
//   page?: number
//   pageSize?: number
//   authors?: string[]
//   s?: string
// }
// export const fetchTags = async (params: FetchTagsParams) => {
//   try {
//     // Lấy danh sách bài viết
//     const postsResponse = await client.get<IFetchTagsResponse>('api/v1/cms/tags', {
//       params
//     })
//     // Trả về dữ liệu gộp
//     return {
//       tags: postsResponse
//     }
//   } catch (error: unknown) {
//     // Kiểm tra kiểu của lỗi
//     if (axios.isAxiosError(error)) {
//       console.error('Lỗi khi lấy dữ liệu từ API:', error.response?.data)
//     } else {
//       console.error('Lỗi không xác định:', error)
//     }
//     return {
//       tags: [],
//       error: true // Đánh dấu có lỗi
//     }
//   }
// }

// export const uploadImage = async (file: File): Promise<string> => {
//   try {
//     // Tạo FormData và thêm file vào với key là 'image'
//     const formData = new FormData()
//     formData.append('image', file)

//     // Gửi request POST với formData
//     const config = { headers: { 'content-type': 'multipart/form-data' } }
//     const response = await client.post('/api/v1/cms/commons/upload-images', formData, config)

//     // Trả về URL ảnh từ dữ liệu trả về
//     return response.data.data.url // URL ảnh sau khi upload thành công
//   } catch (error) {
//     console.error('Lỗi khi tải ảnh lên:', error)
//     throw new Error('Tải ảnh thất bại')
//   }
// }

// export const addTag = async (value: ITag) => {
//   try {
//     const response = await client.post('/api/v1/cms/tags', value)
//     return response
//   } catch (error) {
//     console.error('Lỗi khi tải dữ liệu lên:', error)
//     throw new Error('Tải tag thất bại')
//   }
// }
// export const editTag = async (id: string, newData?: ITag) => {
//   try {
//     const response = await client.put(`/api/v1/cms/tags/${id}`, newData)
//     return response
//   } catch (error) {
//     console.error('Lỗi khi update dữ liệu lên:', error)
//     throw new Error('update tag thất bại')
//   }
// }
// export const fetchTagById = async (id: string) => {
//   try {
//     const response = await client.get(`/api/v1/cms/tags/${id}`)
//     return response
//   } catch (error) {
//     console.error('Lỗi khi update dữ liệu lên:', error)
//     throw new Error('update tag thất bại')
//   }
// }
// export const deleteTag = async (id: string) => {
//   try {
//     const response = await client.delete(`/api/v1/cms/tags/${id}`)
//     return response
//   } catch (error) {
//     console.error('Lỗi khi update dữ liệu lên:', error)
//     throw new Error('update tag thất bại')
//   }
// }
