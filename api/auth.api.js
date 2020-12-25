import { api } from './'

export default {
  login({ email, password }) {
    const body = {
      email, 
      password,
    }

    return api.post('api/auth/login', body)
  }
}
