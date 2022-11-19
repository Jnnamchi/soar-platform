import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import AuthService from '@/services/authService'
import { IAuthData } from '@/types/auth'

const storedToken = localStorage.getItem('soarline-token')
const storedUser = localStorage.getItem('soarline-user')

const userInitial = {
  email: '',
}

@Module({ namespaced: true })
class User extends VuexModule {
  userToken = storedToken ? storedToken : ''
  loggedIn = storedToken ? true : false
  loginVerificationId = ''
  user = storedUser ? JSON.parse(storedUser) : userInitial

  get isLoggedIn(): boolean {
    return this.loggedIn
  }

  @Mutation
  loginInitialSuccess(id: string): void {
    this.loginVerificationId = id
  }

  @Mutation
  loginVerificationSuccess(token: string) {
    this.userToken = token
    localStorage.setItem('soarline-token', token)
  }

  @Mutation
  setUserInfo(user: any) {
    this.user = user
    this.loggedIn = true
    localStorage.setItem('soarline-user', JSON.stringify(user))
  }

  @Mutation
  loginFailure(): void {
    this.loggedIn = false
    this.user = null
  }

  @Mutation
  logout(): void {
    this.userToken = ''
    this.loggedIn = false
    this.loginVerificationId = ''
    this.user = null
    localStorage.removeItem('soarline-token')
    localStorage.removeItem('soarline-user')
  }

  @Action({ rawError: true })
  loginInitialAction(data: IAuthData): Promise<any> {
    return AuthService.loginInitial(data).then(
      (res) => {
        this.context.commit('loginInitialSuccess', res.data.id)
        return Promise.resolve({ status: 'ok' })
      },
      (error) => {
        this.context.commit('loginFailure')
        return Promise.reject(error)
      }
    )
  }

  @Action({ rawError: true })
  loginVerificationAction(code: string): Promise<any> {
    return AuthService.loginVerification({
      id: this.loginVerificationId,
      code,
    }).then(
      (res) => {
        this.context.commit('loginVerificationSuccess', res.data.access_token)
        return Promise.resolve({ status: 'ok' })
      },
      (error) => {
        this.context.commit('loginFailure')
        return Promise.reject(error)
      }
    )
  }

  @Action({ rawError: true })
  getUserInfoAction(): Promise<any> {
    return AuthService.getUserInfo().then(
      (res) => {
        this.context.commit('setUserInfo', res.data)
        return Promise.resolve({ status: 'ok' })
      },
      (error) => {
        console.log('error: ', error)

        this.context.commit('loginFailure')
        return Promise.reject(error)
      }
    )
  }
}

export default User
