<template>
  <div class="login">
    <SigninForm v-if="loginStep === 1" :submitForm="submitLoginForm" />

    <SigninCodeForm
      v-if="loginStep === 2"
      :loginId="loginId"
      :submitForm="submitCodeForm"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SigninForm from '@/components/auth/SigninForm.vue'
import SigninCodeForm from '@/components/auth/SigninCodeForm.vue'

@Component({
  components: {
    SigninForm,
    SigninCodeForm,
  },
})
export default class LoginUser extends Vue {
  loginStep = 1
  loginId = ''

  submitLoginForm(loginId: string) {
    this.loginStep = 2
    this.loginId = loginId
  }

  submitCodeForm() {
    this.$router.push({ name: 'home' })
  }
}
</script>

<style lang="scss" scoped>
.login {
  margin-top: 50px;
}
</style>
