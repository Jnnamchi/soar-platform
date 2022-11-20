<template>
  <div>
    <div v-if="!errorText" class="form">
      <h3 class="form__title">Change password</h3>

      <p class="form__text">Enter new password</p>
      <AppInput
        :type="'password'"
        class="form__input"
        :placeholder="'Enter new password'"
        v-model="password.value"
        :status="passwordValidationInfo"
      />

      <p class="form__text">Confirm new password</p>
      <AppInput
        :type="'password'"
        class="form__input"
        :placeholder="'Confirm new password'"
        v-model="password.confirm"
        :status="passwordConfirmValidationInfo"
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
import { convertErrorToString } from '@/utils/convert'
import InfoError from '@/components/info/InfoError.vue'

const ChangePasswordFormProps = Vue.extend({
  props: {
    changePasswordCb: Function,
  },
})

@Component({
  components: {
    AppButton,
    AppInput,
    InfoError,
  },
})
export default class ChangePasswordForm extends ChangePasswordFormProps {
  password = {
    value: '',
    confirm: '',
  }
  passwordValidationInfo = {
    type: '',
    text: '',
  }
  passwordConfirmValidationInfo = {
    type: '',
    text: '',
  }
  isLoading = false
  errorText = ''

  async submitButtonHandler() {
    this.passValidation()

    const validationSuccess = !this.passwordValidationInfo.type
    if (validationSuccess) {
      this.isLoading = true
      this.errorText = ''

      try {
        const resetPassData = {
          id: this.$route.params.id,
          password: this.password.value,
        }
        const res = await this.$store.dispatch(
          'Auth/resetPasswordAction',
          resetPassData
        )

        if (res && res.status === 204) {
          this.changePasswordCb()
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

  passValidation() {
    if (this.password.value.length < 6) {
      this.passwordValidationInfo = {
        type: 'error',
        text: 'Password length must be greater than 6 characters',
      }
      this.passwordConfirmValidationInfo.type = 'error'
      return
    }
    if (this.password.value !== this.password.confirm) {
      this.passwordValidationInfo = {
        type: 'error',
        text: 'Passwords do not match',
      }
      this.passwordConfirmValidationInfo.type = 'error'
      return
    }
    this.passwordValidationInfo = {
      type: '',
      text: '',
    }
    this.passwordConfirmValidationInfo.type = ''
  }

  resetInputStatus() {
    this.passwordValidationInfo = {
      type: '',
      text: '',
    }
    this.passwordConfirmValidationInfo = {
      type: '',
      text: '',
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  margin-top: 40px;
  .form__title {
    margin-bottom: 20px;
    font-size: 18px;
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

.refresh {
  text-decoration: underline;
  cursor: pointer;
}
</style>
