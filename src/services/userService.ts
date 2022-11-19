import { apiInstance } from './api'
import authHeader from './auth-header'

class UserService {
  getUserInfo() {
    const url = '/account/me'
    return apiInstance.get(url, { headers: authHeader() })
  }
}

export default new UserService()
