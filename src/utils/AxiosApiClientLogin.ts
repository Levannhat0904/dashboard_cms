import axios, { AxiosRequestConfig } from 'axios'
import { BASE_URL_USER_LOGIN } from '../constants'

export const client = axios.create({
  baseURL: BASE_URL_USER_LOGIN, // URL gốc
  headers: {
    'Content-Type': 'application/json'
  }
})
