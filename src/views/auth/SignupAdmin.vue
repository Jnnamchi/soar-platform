<template>
  <div>
    <p class="auth__intro">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio facilisis
      malesuada diam nisl vel enim nisi. Mattis ut iaculis amet ultrices nibh.
    </p>

    <EmailForm
      v-if="signupStep === 1"
      :title="'Start your registration'"
      :submitForm="submitEmailForm"
    />

    <SignupAdminForm
      v-if="signupStep === 2"
      :validEmail="validEmail"
      :signupCb="submitAdminForm"
    />

    <InfoSuccess
      v-if="signupStep === 3"
      :text="'Check your email to activate your account'"
    />

    <p class="redirect">
      Already a member?
      <router-link :to="{ name: 'login' }" class="redirect__link"
        >Login</router-link
      >
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EmailForm from '@/components/auth/EmailForm.vue'
import SignupAdminForm from '@/components/auth/SignupAdminForm.vue'
import InfoSuccess from '@/components/info/InfoSuccess.vue'

@Component({
  components: {
    EmailForm,
    SignupAdminForm,
    InfoSuccess,
  },
})
export default class SignupAdmin extends Vue {
  signupStep = 1
  validEmail = ''

  submitEmailForm(validEmail: string) {
    this.validEmail = validEmail
    this.signupStep = 2
  }

  submitAdminForm() {
    this.signupStep = 3
  }
}
</script>

<style lang="scss" scoped>
.auth__intro {
  margin-bottom: 15px;
  color: #505f79;
  font-size: 14px;
  line-height: 20px;
}

.redirect {
  margin-top: 15px;
  font-size: 11px;
  text-align: center;

  &__link {
    color: #0065ff;
    text-decoration: underline;
  }
}
</style>
