import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import AuthService from '@/services/authService'
import { IAuthData, IChangePassword, IUserData } from '@/types/auth'

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
  user: IUserData = storedUser ? JSON.parse(storedUser) : userInitial

  get isLoggedIn(): boolean {
    return this.loggedIn
  }

  get userId(): string {
    return this.user.id || ''
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
    this.userToken = ''
    this.loggedIn = false
    this.user = {}
  }

  @Mutation
  logout(): void {
    this.userToken = ''
    this.loggedIn = false
    this.loginVerificationId = ''
    this.user = {}
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
        this.context.commit('loginFailure')
        return Promise.reject(error)
      }
    )
  }

  @Action({ rawError: true })
  resetPasswordRequestAction(email: string): Promise<any> {
    return AuthService.resetPasswordRequest(email).then(
      (res) => {
        return Promise.resolve(res)
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  @Action({ rawError: true })
  resetPasswordAction(data: IChangePassword): Promise<any> {
    return AuthService.changePassword(data).then(
      (res) => {
        return Promise.resolve(res)
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  @Action({ rawError: true })
  removeCurrentUserAction(): Promise<any> {
    const currentUserId = this.context.getters['userId']
    return AuthService.removeUser(currentUserId).then(
      (res) => {
        if (res && res.status === 204) {
          this.context.commit('logout')
        }
        return Promise.resolve(res)
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
}

export default User
