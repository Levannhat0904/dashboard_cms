import { IApiAssetsResponse } from '../interfaces/asset/asset.interface'
import { getAccessToken } from '../utils'
import { requestUserLogin } from './login'
const accessToken = getAccessToken()
export const getAssets = async (): Promise<IApiAssetsResponse> => {
  return await requestUserLogin<IApiAssetsResponse>({
    url: `api/v1/cms/posts/filter/assets`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}
