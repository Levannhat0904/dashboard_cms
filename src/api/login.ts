import { AxiosRequestConfig, AxiosResponse } from "axios"
import client from "./client"
import { IMeta } from "../interfaces/common.interface"
import { ILoginRequest, ILoginResponse } from "../interfaces/login/login.interface"
export interface ErrorResponse {
  meta: IMeta
}
export interface AxiosErrorResponse {
  response: {
    data: ErrorResponse // Thay đổi để chứa lỗi trả về từ API
  }
}
export const requestUserLogin = async <T>(options: AxiosRequestConfig): Promise<T> => {
  const onSuccess = (response: AxiosResponse<T>) => response.data
  const onError = (error: AxiosErrorResponse) => {
    // Trả về lỗi chi tiết từ API
    return Promise.reject(error.response?.data) // Ném toàn bộ lỗi từ API
  }

  return client(options).then(onSuccess).catch(onError)
}
export const loginWithAxios = async (data: ILoginRequest): Promise<ILoginResponse> => {
  try {
    const response = await requestUserLogin<ILoginResponse>({
      url: '/api/v1/cms/auths/login',
      method: 'POST',
      data // Gửi dữ liệu đăng nhập
    })
    return response
  } catch (error) {
    // Lỗi sẽ chứa toàn bộ dữ liệu lỗi từ API
    console.error('Đăng nhập thất bại:', error)
    throw error // Ném lỗi ra để React Query xử lý
  }
}