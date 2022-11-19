import { IAuthVerificationData, IAuthData } from '@/types/auth'
import { apiInstance } from '@/services/api'
import authHeader from './auth-header'

class AuthService {
  loginInitial(data: IAuthData) {
    const url = '/account/2fa'
    return apiInstance.post(url, data)
  }

  loginVerification(data: IAuthVerificationData) {
    const url = `/account/2fa/${data.id}`
    return apiInstance.post(url, { code: data.code })
  }

  getUserInfo() {
    const url = '/account/me'
    return apiInstance.get(url, { headers: authHeader() })
  }
}

export default new AuthService()
