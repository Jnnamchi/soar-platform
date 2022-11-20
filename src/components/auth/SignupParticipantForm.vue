<template>
  <div>
    <div v-if="!errorText" class="form">
      <p class="form__title">Start your registration</p>

      <AppInput
        class="form__input"
        :placeholder="'Your email'"
        v-model="email"
        :disabled="true"
      />

      <AppInput
        class="form__input"
        :placeholder="'First name'"
        v-model="form.first_name"
      />

      <AppInput
        class="form__input"
        :placeholder="'Last name'"
        v-model="form.last_name"
      />

      <AppInput
        class="form__input"
        :placeholder="'Choose password'"
        :type="'password'"
        :status="passwordVerificationInfo"
        v-model="form.password"
      />

      <AppInput
        class="form__input"
        :placeholder="'Repeat password'"
        :type="'password'"
        v-model="passwordConfirm"
      />

      <AppButton
        class="button form__button"
        @click.native="submitButtonHandler"
        :isLoading="isLoading"
        >Submit</AppButton
      >
    </div>

    <InfoError v-if="errorText" :text="errorText" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppButton from '@/components/UI/AppButton.vue'
import AppInput from '@/components/UI/AppInput.vue'
import { convertErrorToString } from '@/utils/convert'

const SignupParticipantFormProps = Vue.extend({
  props: {
    submitFormCb: Function,
  },
})

@Component({
  components: {
    AppButton,
    AppInput,
  },
})
export default class SignupParticipantForm extends SignupParticipantFormProps {
  email = ''
  form = {
    first_name: '',
    last_name: '',
    password: '',
  }
  passwordConfirm = ''
  passwordVerificationInfo = {
    type: '',
    text: '',
  }
  isLoading = false
  errorText = ''

  submitButtonHandler() {
    this.passValidation()

    const validationSuccess = !this.passwordVerificationInfo.type

    if (validationSuccess) {
      this.signup()
    }
  }

  async signup() {
    this.isLoading = true

    try {
      const formData = { ...this.form, invitation_id: this.$route.params.id }
      const res = await this.$store.dispatch(
        'Signup/signupParticipantAction',
        formData
      )

      if (res && res.status === 204) {
        this.submitFormCb()
      }
    } catch (error) {
      this.errorText = convertErrorToString(error)
    } finally {
      this.isLoading = false
    }
  }

  passValidation() {
    if (this.form.password.length < 6) {
      this.passwordVerificationInfo = {
        type: 'error',
        text: 'Password length must be greater than 6 characters',
      }
    } else {
      this.passwordVerificationInfo = {
        type: '',
        text: '',
      }
      const isPassValid = this.form.password === this.passwordConfirm

      this.passwordVerificationInfo = isPassValid
        ? {
            type: '',
            text: '',
          }
        : {
            type: 'error',
            text: 'The password confirmation does not match',
          }
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  padding: 27px;
  margin-bottom: 15px;
  border-radius: 8px;
  background-color: #f4f5f7;

  .form__title {
    margin-bottom: 17px;
    font-size: 16px;
    font-weight: 600;
  }

  .form__input {
    margin-bottom: 17px;
  }
}

.redirect {
  font-size: 11px;
  text-align: center;

  &__link {
    color: #0065ff;
    text-decoration: underline;
  }
}
</style>
