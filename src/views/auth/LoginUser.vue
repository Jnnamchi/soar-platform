<template>
  <div class="login">
    <LoginForm v-if="loginStep === 1" :loginSuccessCb="submitLoginForm" />

    <LoginVerificationForm
      v-if="loginStep === 2"
      :submitFormCb="submitCodeForm"
    />

    <LoginSuccessInfo v-if="loginStep === 3">
      <p>You have been successfully logged in</p>
      <p>you will be automatically redirected in few seconds</p>
    </LoginSuccessInfo>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LoginForm from '@/components/auth/LoginForm.vue'
import LoginVerificationForm from '@/components/auth/LoginVerificationForm.vue'
import LoginSuccessInfo from '@/components/auth/LoginSuccessInfo.vue'
import { RouteName } from '@/types/route'

@Component({
  components: {
    LoginForm,
    LoginVerificationForm,
    LoginSuccessInfo,
  },
})
export default class LoginUser extends Vue {
  loginStep = 1

  created() {
    if (this.$store.getters['Auth/isLoggedIn']) {
      this.$router.push({ name: RouteName.Home })
    }
  }

  submitLoginForm() {
    this.loginStep = 2
  }

  submitCodeForm() {
    this.loginStep = 3
  }
}
</script>

<style lang="scss" scoped>
.login {
  margin-top: 50px;
}
</style>
