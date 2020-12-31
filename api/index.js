import axios from 'axios'

import authApi from './auth.api'
import adminApi from "./admin.api"

const API_URL = 'https://protected-everglades-85568.herokuapp.com/'
const APP_TOKEN = '5fdfccf998da9e22cd524af5'

const api = axios.create({
  baseURL: API_URL,
})
api.defaults.headers.common['app'] = APP_TOKEN
api.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    const user = localStorage.getItem('user')
    if (user) {
      const token = JSON.parse(user).token
      config.headers.authorization = `Bearer ${token}`
    }

    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export {
  API_URL,

  api,

  authApi,
  adminApi,
}
