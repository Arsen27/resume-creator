import axios from 'axios'

import authApi from './auth.api'
import adminApi from "./admin.api"

const API_URL = 'https://protected-everglades-85568.herokuapp.com/'
const APP_TOKEN = '5fdfccf998da9e22cd524af5'

const api = axios.create({
  baseURL: API_URL,
})
api.defaults.headers.common['app'] = APP_TOKEN

export {
  API_URL,

  api,

  authApi,
  adminApi,
}
