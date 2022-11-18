import { authAPIInstance, defaultAPIInstance } from '@/api'
import { IUser } from '@/data/User'

export const AuthAPI = {
  registrationAdmin(data: IUser) {
    const url = '/account/signup'
    return authAPIInstance.post(url, data)
  },

  registrationConfirm(id: string) {
    const url = `/account/signup/${id}`
    return authAPIInstance.post(url)
  },

  login(data: { email: string; password: string }) {
    const url = '/account/2fa'
    return authAPIInstance.post(url, data)
  },

  loginConfirm(data: { id: string; code: string }) {
    const url = `/account/2fa/${data.id}`
    return authAPIInstance.post(url, { code: data.code })
  },

  userInfo() {
    const url = '/account/me'
    return defaultAPIInstance.get(url)
  },

  removeUser(id: string) {
    const url = `/account/user/${id}`
    return defaultAPIInstance.delete(url)
  },
}
