import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { IAdminData, IParticipantInviteData } from '@/types/auth'
import authService from '@/services/authService'

@Module({ namespaced: true })
class User extends VuexModule {
  admin!: IAdminData

  @Mutation
  signupFailure(): void {
    console.log('signup admin failure')
  }

  @Mutation
  inivteParticipantFailure(): void {
    console.log('invite participant failure')
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

  @Action({ rawError: true })
  inviteParticipant(data: IParticipantInviteData): Promise<any> {
    return authService.inviteParticipant(data).then(
      (res) => {
        return Promise.resolve(res)
      },
      (error) => {
        this.context.commit('inivteParticipantFailure')
        return Promise.reject(error)
      }
    )
  }
}

export default User
