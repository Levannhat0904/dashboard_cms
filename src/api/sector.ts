import { IApiSectorsResponse } from "../interfaces/sector/sector.interface"
import { getAccessToken } from "../utils"
import { requestUserLogin } from "./login"
const accessToken = getAccessToken()
export const getSectors = async (): Promise<IApiSectorsResponse> => {
  try {
    const response = await requestUserLogin<IApiSectorsResponse>({
      url: `api/v1/cms/posts/filter/sectors`,
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