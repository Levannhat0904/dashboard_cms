import { IMeta } from '../common.interface'

export interface IErrorResponse {
  meta: IMeta
}
export interface AxiosErrorResponse {
  response: {
    data: IErrorResponse // Thay đổi để chứa lỗi trả về từ API
  }
}
