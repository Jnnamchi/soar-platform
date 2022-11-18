<template>
  <div>
    <div class="form">
      <p class="form__text">Email</p>
      <AppInput
        type="text"
        class="form__input"
        :placeholder="'Enter your email address'"
        v-model="loginData.email"
        :info="emailInfo"
      />

      <p class="form__text">Password</p>
      <AppInput
        :type="'password'"
        class="form__input"
        :placeholder="'Enter your password'"
        v-model="loginData.password"
        :info="passwordInfo"
      />

      <div class="form__control">
        <div class="remember">
          <input type="radio" id="remember" /><label for="remember"
            >Remember for 30 days</label
          >
        </div>
        <router-link :to="{ name: 'reset-pass' }" class="pass__link"
          >Forgot password</router-link
        >
      </div>

      <AppButton
        @click.native="submitButtonHandler"
        class="button form__button"
        :isLoading="isLoading"
        >Sign in</AppButton
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { checkEmailValidation } from '@/utils/validation'

const EmailFormProps = Vue.extend({
  props: {
    submitForm: Function,
  },
})

@Component
export default class EmailForm extends EmailFormProps {
  loginData = {
    email: 'yy.ainu@gmail.com',
    password: '123123',
  }
  emailInfo = {
    type: '',
    text: '',
  }
  passwordInfo = {
    type: '',
    text: '',
  }
  isLoading = false

  submitButtonHandler() {
    this.emailValidation()
    this.passValidation()

    const validationSuccess = !this.emailInfo.type && !this.passwordInfo.type

    if (validationSuccess) {
      this.login()
    }
  }

  async login() {
    this.isLoading = true

    try {
      const res = await this.$store.dispatch(
        'moduleAuth/onLogin',
        this.loginData
      )
      if (res && res.status === 200) {
        this.submitForm(res.data.id)
      }
    } catch (error) {
      throw new Error()
    } finally {
      this.isLoading = false
    }
  }

  emailValidation() {
    const isEmailValid = checkEmailValidation(this.loginData.email.trim())
    if (!isEmailValid) {
      this.emailInfo = {
        type: 'error',
        text: "Email wasn't validated",
      }
    } else {
      this.emailInfo = {
        type: '',
        text: '',
      }
    }
  }

  passValidation() {
    if (this.loginData.password.length < 6) {
      this.passwordInfo = {
        type: 'error',
        text: 'Password length must be greater than 6 characters',
      }
    } else {
      this.passwordInfo = {
        type: '',
        text: '',
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

  .form__control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    font-size: 14px;

    .remember {
      display: flex;
      align-items: center;

      input {
        margin-right: 5px;
      }
    }

    .pass__link {
      font-weight: 600;
      color: #0052cc;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
