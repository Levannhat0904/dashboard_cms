import { IAuthor } from '../interfaces/author/author.interface'
import { getAccessToken } from '../utils'
import client from './client'
import { requestUserLogin } from './login'
const accessToken = getAccessToken()
export interface IApiAuthorResponseV2 {
  meta: {
    status: number
    success?: boolean
    externalMessage: string
    internalMessage: string
  }
  data: IAuthor[]
}
export const getUserInfo = async (): Promise<IApiAuthorResponseV2> => {
  try {
    const response = await requestUserLogin<IApiAuthorResponseV2>({
      url: `api/v1/cms/posts/filter/authors`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return response
  } catch (error) {
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
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error)
    throw new Error('Không thể lấy dữ liệu. Vui lòng thử lại sau.')
  }
}
