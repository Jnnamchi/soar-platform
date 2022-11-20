<template>
  <div>
    <ChangePasswordForm
      v-if="resetPassStep === 1"
      :changePasswordCb="changePassword"
    />

    <InfoSuccess
      v-if="resetPassStep === 2"
      :text="'Password changed successfully! You will be redirected in few seconds'"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import InfoSuccess from '@/components/info/InfoSuccess.vue'
import ChangePasswordForm from '@/components/auth/ChangePasswordForm.vue'
import { RouteName } from '@/router/route.types'

const delayBeforeRedirectToLogin = 2000

@Component({
  components: {
    ChangePasswordForm,
    InfoSuccess,
  },
})
export default class ResetPassword extends Vue {
  resetPassStep = 1
  isLoading = false
  errorText = ''

  changePassword() {
    this.resetPassStep = 2

    setTimeout(() => {
      this.$router.push({ name: RouteName.Login })
    }, delayBeforeRedirectToLogin)
  }
}
</script>

<style lang="scss" scoped>
.form {
  margin-top: 50px;
}
</style>
