<template>
  <div>
    <div class="form">
      <p class="form__title">Start your registration</p>

      <AppInput
        class="form__input"
        :placeholder="'Enter your email address'"
        v-model="signupForm.email"
        :info="emailInfo"
      />

      <AppInput
        class="form__input"
        :placeholder="'First name'"
        v-model="signupForm.first_name"
      />

      <AppInput
        class="form__input"
        :placeholder="'Last name'"
        v-model="signupForm.last_name"
      />

      <AppInput
        class="form__input"
        :placeholder="'Job title'"
        v-model="signupForm.job_title"
      />

      <AppInput
        class="form__input"
        :placeholder="'Phone'"
        v-model="signupForm.phone"
      />

      <AppInput
        class="form__input"
        :placeholder="'Your company name'"
        v-model="signupForm.company_name"
      />

      <AppInput
        class="form__input"
        :placeholder="'Your organization size'"
        v-model="signupForm.organization_size"
      />

      <AppInput
        class="form__input"
        :placeholder="'Your industry'"
        v-model="signupForm.industry"
      />

      <AppInput
        class="form__input"
        :placeholder="'Choose password'"
        :type="'password'"
        v-model="signupForm.password"
        :info="passwordInfo"
      />

      <AppInput
        class="form__input"
        :placeholder="'Repeat password'"
        :type="'password'"
        v-model="passwordConfirm"
        :info="passwordConfirmInfo"
      />

      <AppButton
        class="button form__button"
        @click.native="submitButtonHandler"
        :isLoading="isLoading"
        >Submit</AppButton
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { checkEmailValidation } from '@/utils/validation'

const SignupAdminFormProps = Vue.extend({
  props: {
    validEmail: String,
    submitForm: Function,
  },
})

@Component({})
export default class SignupAdminForm extends SignupAdminFormProps {
  emailInfo = {
    type: 'success',
    text: 'Email is validated',
  }
  passwordInfo = {
    type: '',
    text: '',
  }
  passwordConfirmInfo = {
    type: '',
  }
  isLoading = false
  signupForm = {
    email: this.validEmail,
    first_name: '',
    last_name: '',
    job_title: '',
    phone: '',
    company_name: '',
    organization_size: '',
    industry: '',
    password: '',
  }
  passwordConfirm = ''

  async submitButtonHandler() {
    this.emailValidation()
    this.passValidation()

    const validationSuccess =
      this.emailInfo.type === 'success' &&
      !this.passwordInfo.type &&
      !this.passwordConfirmInfo.type

    if (validationSuccess) {
      this.signup()
    }
  }

  async signup() {
    try {
      this.isLoading = true

      const res = await this.$store.dispatch(
        'moduleAuth/onSignupAdmin',
        this.signupForm
      )

      if (res.status === 204) {
        this.submitForm()
      }
    } catch (error) {
      throw new Error()
    } finally {
      this.isLoading = false
    }
  }

  emailValidation() {
    const isEmailValid = checkEmailValidation(this.signupForm.email.trim())
    if (!isEmailValid) {
      this.emailInfo = {
        type: 'error',
        text: "Email wasn't validated",
      }
    } else {
      this.emailInfo = {
        type: 'success',
        text: 'Email is validated',
      }
    }
  }

  passValidation() {
    if (this.signupForm.password.length < 6) {
      this.passwordInfo = {
        type: 'error',
        text: 'Password length must be greater than 6 characters',
      }
    } else {
      this.passwordInfo = {
        type: '',
        text: '',
      }
      const isPassValid = this.signupForm.password === this.passwordConfirm

      this.passwordInfo = isPassValid
        ? {
            type: '',
            text: '',
          }
        : {
            type: 'error',
            text: 'The password confirmation does not match',
          }

      this.passwordConfirmInfo = isPassValid
        ? {
            type: '',
          }
        : {
            type: 'error',
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
