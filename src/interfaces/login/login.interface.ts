import { IMeta } from '../common.interface'

export interface ILoginRequest {
  email: string
  password: string
}
export interface ILoginResponse {
  // error.response.data.meta.internalMessage
  response?: {
    data: {
      meta: IMeta
    }
  }
  meta: IMeta
  data: {
    accessToken: string
  }
}
