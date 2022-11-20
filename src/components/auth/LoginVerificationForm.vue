<template>
  <div>
    <div v-if="!errorText" class="form">
      <p class="form__title">
        Please enter the verification code that was sent to your email
      </p>
      <AppInput
        class="form__input"
        :placeholder="'verification code'"
        v-model="code"
        :status="codeVerificationInfo"
      />

      <AppButton
        @click.native="submitButtonHandler"
        class="button form__button"
        :isLoading="isLoading"
        >Submit</AppButton
      >
    </div>

    <InfoError v-else :text="errorText" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppButton from '@/components/UI/AppButton.vue'
import AppInput from '@/components/UI/AppInput.vue'
import InfoError from '@/components/info/InfoError.vue'
import { namespace } from 'vuex-class'
const Auth = namespace('Auth')
import { convertErrorToString } from '@/utils/convert'

const LoginVerificationFormProps = Vue.extend({
  props: {
    loginVerificationCb: Function,
  },
})

@Component({
  components: {
    AppButton,
    AppInput,
    InfoError,
  },
})
export default class LoginVerificationForm extends LoginVerificationFormProps {
  code = ''
  isLoading = false
  errorText = ''
  codeVerificationInfo = {
    type: '',
    text: '',
  }

  @Auth.Action
  loginVerificationAction!: (code: string) => Promise<any>

  async submitButtonHandler() {
    if (this.code.trim().length === 0) {
      this.codeVerificationInfo = {
        type: 'error',
        text: 'Enter verification code',
      }
    } else {
      this.isLoading = true
      this.codeVerificationInfo = {
        type: '',
        text: '',
      }

      try {
        this.errorText = ''
        const res = await this.loginVerificationAction(this.code)
        if (res.status === 'ok') {
          this.loginVerificationCb()
        } else {
          this.errorText = 'Ooops! Something went wrong. Please try again later'
        }
      } catch (error) {
        this.errorText = convertErrorToString(error)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  .form__title {
    margin-bottom: 17px;
    font-size: 16px;
    font-weight: 600;
  }

  .form__text {
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 700;
  }

  .form__input {
    margin-bottom: 20px;
    width: 100%;
  }
}
</style>
