import axios from 'axios'
import { BASE_URL_USER_LOGIN } from '../constants'
import { getAccessToken } from '../utils'
const accessToken = getAccessToken()

const client = axios.create({
  baseURL: BASE_URL_USER_LOGIN, // Thay bằng base URL API của bạn
  headers: {
    // 'Content-Type': 'multipart/form-data',
    'Custom-Header': 'application/json',
    Authorization: `Bearer ${accessToken}`
  }
})
export default client
