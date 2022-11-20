import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import authService from '@/services/authService'
import {
  IAdminData,
  IParticipantInviteData,
  IParticipantSignupData,
} from '@/types/auth'

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

  @Mutation
  signupParticipantFailure(): void {
    console.log('signup participant failure')
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
  inviteParticipantAction(data: IParticipantInviteData): Promise<any> {
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

  @Action({ rawError: true })
  signupParticipantAction(data: IParticipantSignupData): Promise<any> {
    return authService.signupParticipant(data).then(
      (res) => {
        return Promise.resolve(res)
      },
      (error) => {
        this.context.commit('signupParticipantFailure')
        return Promise.reject(error)
      }
    )
  }
}

export default User
