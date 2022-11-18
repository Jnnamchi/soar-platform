<template>
  <div class="login">
    <LoginForm v-if="loginStep === 1" :submitForm="submitLoginForm" />

    <TwoFactorForm
      v-if="loginStep === 2"
      :loginId="loginId"
      :submitForm="submitCodeForm"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LoginForm from '@/components/auth/LoginForm.vue'
import TwoFactorForm from '@/components/auth/TwoFactorForm.vue'

@Component({
  components: {
    LoginForm,
    TwoFactorForm,
  },
})
export default class LoginUser extends Vue {
  loginStep = 1
  loginId = ''

  submitLoginForm(loginId: string) {
    this.loginStep = 2
    this.loginId = loginId
  }

  async submitCodeForm() {
    await this.$router.push({ name: 'home' })
  }
}
</script>

<style lang="scss" scoped>
.login {
  margin-top: 50px;
}
</style>
