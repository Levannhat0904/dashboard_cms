import axios, { AxiosRequestConfig } from 'axios'
import { BASE_URL_USER_LOGIN } from '../constants'

export const client = (() => {
  return axios.create({
    baseURL: BASE_URL_USER_LOGIN,
    headers: {
      Accept: "application/json, text/plain, */*",
    },
  });
})();