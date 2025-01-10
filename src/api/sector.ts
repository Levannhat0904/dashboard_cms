import { IApiSectorsResponse } from '../interfaces/sector/sector.interface'
import { getAccessToken } from '../utils'
import { requestUserLogin } from './login'
const accessToken = getAccessToken()
export const getSectors = async (): Promise<IApiSectorsResponse> => {
  const response = await requestUserLogin<IApiSectorsResponse>({
    url: `api/v1/cms/posts/filter/sectors`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  return response
}
