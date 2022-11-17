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
        :placeholder="'Choose password'"
        :type="'password'"
        v-model="signupForm.password"
      />

      <AppInput
        class="form__input"
        :placeholder="'Repeat password'"
        :type="'password'"
        v-model="signupForm.passwordConfirm"
      />

      <AppButton class="button form__button" @click.native="submitButtonHandler"
        >Submit</AppButton
      >
    </div>
  </div>
</template>

<script lang="ts">
import { checkEmailValidation } from '@/utils/validation'
import { Component, Vue } from 'vue-property-decorator'

const SignupParticipantFormProps = Vue.extend({
  props: {
    validEmail: String,
    submitForm: Function,
  },
})

@Component({})
export default class SignupParticipantForm extends SignupParticipantFormProps {
  emailInfo = {
    type: '',
    text: '',
  }
  signupForm = {
    email: this.validEmail,
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirm: '',
  }

  submitButtonHandler() {
    const isEmailValid = checkEmailValidation(this.signupForm.email.trim())

    console.log('is email valid: ', isEmailValid, this.signupForm.email)
    if (isEmailValid) {
      this.submitForm(this.signupForm)
    } else {
      console.log('show validation error')
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
