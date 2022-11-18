<template>
  <div>
    <div class="form">
      <p class="form__title">
        Please enter the verification code that was sent to your email
      </p>
      <AppInput
        class="form__input"
        :placeholder="'verification code'"
        v-model="code"
      />

      <AppButton
        @click.native="submitButtonHandler"
        class="button form__button"
        :isLoading="isLoading"
        >Submit</AppButton
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

const SigninCodeFormProps = Vue.extend({
  props: {
    loginId: String,
    submitForm: Function,
  },
})

@Component
export default class SigninCodeForm extends SigninCodeFormProps {
  code = ''
  isLoading = false

  get id() {
    return this.loginId
  }

  async submitButtonHandler() {
    this.isLoading = true

    try {
      const res = await this.$store.dispatch('moduleAuth/onLoginConfirm', {
        id: this.id,
        code: this.code,
      })
      if (res && res.status === 200) {
        this.submitForm()
      }
    } catch (error) {
      throw new Error()
    } finally {
      this.isLoading = false
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
