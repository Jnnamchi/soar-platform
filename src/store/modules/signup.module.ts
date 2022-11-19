import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { IAdminData } from '@/types/auth'
import authService from '@/services/authService'

@Module({ namespaced: true })
class User extends VuexModule {
  admin!: IAdminData

  @Mutation
  signupFailure(): void {
    console.log('signup admin failure')
  }

  @Action({ rawError: true })
  signupAdminAction(data: IAdminData): Promise<any> {
    return authService.signupAdmin(data).then(
      (res) => {
        return Promise.resolve(res)
      },
      (error) => {
        this.context.commit('signupFailure')
        return Promise.reject(error)
      }
    )
  }

  @Action({ rawError: true })
  signupAdminConfirmAction(id: string): Promise<any> {
    return authService.signupAdminConfirm(id).then(
      (res) => {
        return Promise.resolve(res)
      },
      (error) => {
        this.context.commit('signupFailure')
        return Promise.reject(error)
      }
    )
  }
}

export default User
