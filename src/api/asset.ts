import { IApiAssetsResponse } from '../interfaces/asset/asset.interface'
import { getAccessToken } from '../utils'
import { requestUserLogin } from './login'
const accessToken = getAccessToken()
export const getAssets = async (): Promise<IApiAssetsResponse> => {
  try {
    const response = await requestUserLogin<IApiAssetsResponse>({
      url: `api/v1/cms/posts/filter/assets`,
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
