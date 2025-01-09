import { IMeta } from '../common.interface'

export interface ILoginRequest {
  email: string
  password: string
}
export interface ILoginResponse {
  meta: IMeta
  data: {
    accessToken: string
  }
}
