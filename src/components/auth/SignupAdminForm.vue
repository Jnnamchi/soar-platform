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
        v-model="signupForm.firstName"
      />

      <AppInput
        class="form__input"
        :placeholder="'Last name'"
        v-model="signupForm.lastName"
      />

      <AppInput
        class="form__input"
        :placeholder="'Job title'"
        v-model="signupForm.jobTitle"
      />

      <AppInput
        class="form__input"
        :placeholder="'Phone'"
        v-model="signupForm.phone"
      />

      <AppInput
        class="form__input"
        :placeholder="'Your company name'"
        v-model="signupForm.companyName"
      />

      <AppInput
        class="form__input"
        :placeholder="'Your organization size'"
        v-model="signupForm.organizatoinSize"
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
        v-model="signupForm.passwordConfirm"
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
import { checkEmailValidation } from '@/utils/validation'
import { Component, Vue } from 'vue-property-decorator'

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
    firstName: 'yy',
    lastName: '',
    jobTitle: '',
    phone: '',
    companyName: '',
    organizatoinSize: '',
    industry: '',
    password: '123123',
    passwordConfirm: '',
  }

  submitButtonHandler() {
    this.emailValidation()
    this.passValidation()

    const validationSuccess =
      this.emailInfo.type === 'success' &&
      !this.passwordInfo.type &&
      !this.passwordConfirmInfo.type

    if (validationSuccess) {
      this.isLoading = true
      setTimeout(() => {
        this.submitForm(this.signupForm)
        this.isLoading = false
      }, 3000)
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
      const isPassValid =
        this.signupForm.password === this.signupForm.passwordConfirm

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
