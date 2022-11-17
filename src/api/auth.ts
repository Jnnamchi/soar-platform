import { LoginAPIInstance, DefaultAPIInstance } from '@/api'

export const AuthAPI = {
  login(email: string, password: string, first_name: string) {
    const url = '/account/signup'
    const data = { email, password, first_name }
    return LoginAPIInstance.post(url, data)
  },

  logout() {
    const url = 'account/logout'
    return DefaultAPIInstance.post(url)
  },
}
