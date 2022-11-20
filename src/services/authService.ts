import { IAuthVerificationData, IAuthData, IAdminData } from '@/types/auth'
import { apiInstance } from '@/services/api'
import authHeader from './auth-header'

class AuthService {
  signupAdmin(data: IAdminData) {
    const url = '/account/signup'
    return apiInstance.post(url, data)
  }

  signupAdminConfirm(id: string) {
    const url = `/account/signup/${id}`
    return apiInstance.post(url)
  }

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

  resetPasswordRequest(email: string) {
    const url = 'account/reset-password'
    return apiInstance.post(url, { email })
  }

  removeUser(id: string) {
    const url = `/account/user/${id}`
    return apiInstance.delete(url)
  }
}

export default new AuthService()
