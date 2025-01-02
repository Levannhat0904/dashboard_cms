import axios from 'axios'
import { BASE_URL_USER_LOGIN } from '../constants'
import { getAccessToken } from './helpers'
const accessToken = getAccessToken()

const client = axios.create({
  baseURL: BASE_URL_USER_LOGIN, // Thay bằng base URL API của bạn
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
})
export default client
